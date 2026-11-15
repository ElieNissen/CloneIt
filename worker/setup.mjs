const encoder = new TextEncoder();
const bytesToHex = (buffer) => [...new Uint8Array(buffer)].map((n) => n.toString(16).padStart(2, "0")).join("");
const hexToBytes = (value) => Uint8Array.from(value.match(/../g), (part) => parseInt(part, 16));
const secretPath = "settings/gemini-key.json";

async function vaultCryptoKey(env) {
  if (!/^[a-f0-9]{64}$/.test(env.KEY_VAULT_SECRET || "")) return null;
  return crypto.subtle.importKey("raw", hexToBytes(env.KEY_VAULT_SECRET), "AES-GCM", false, ["encrypt", "decrypt"]);
}

export async function configuredGeminiKey(env) {
  if (env.GEMINI_API_KEY && env.GEMINI_FREE_TIER_CONFIRMED === "true") return env.GEMINI_API_KEY;
  if (!env.BUCKET || !env.KEY_VAULT_SECRET) return null;
  try {
    const object = await env.BUCKET.get(secretPath);
    if (!object) return null;
    const saved = await object.json();
    if (saved.freeTierConfirmed !== true) return null;
    const key = await vaultCryptoKey(env);
    if (!key) return null;
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: hexToBytes(saved.iv), additionalData: encoder.encode("cloneit-gemini-v1") }, key, hexToBytes(saved.ciphertext));
    return new TextDecoder().decode(decrypted);
  } catch { return null; }
}

function setupResponse(body, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer" } });
}

export async function handleSetup(request, env, upstreamFetch) {
  if (!env.BUCKET || !env.KEY_VAULT_SECRET || !env.SETUP_TOKEN_HASH) return setupResponse({ error: "Ce lien de configuration n’est pas disponible." }, 503);
  const token = request.headers.get("Authorization")?.match(/^Bearer ([a-f0-9]{64})$/)?.[1];
  const digest = token ? bytesToHex(await crypto.subtle.digest("SHA-256", encoder.encode(token))) : "";
  if (digest !== env.SETUP_TOKEN_HASH) return setupResponse({ error: "Ouvre le lien privé de configuration fourni dans le chat." }, 403);
  if (await env.BUCKET.head(secretPath)) return setupResponse({ configured: true, locked: true });
  if (request.method === "GET") return setupResponse({ configured: false });
  if (request.method !== "POST") return setupResponse({ error: "Méthode non autorisée." }, 405);
  if (request.headers.get("Origin") !== new URL(request.url).origin || !request.headers.get("Content-Type")?.startsWith("application/json")) return setupResponse({ error: "Requête non autorisée." }, 403);
  let data;
  try {
    if (Number(request.headers.get("Content-Length")) > 2048) throw new Error();
    const text = await request.text();
    if (text.length > 2048) throw new Error();
    data = JSON.parse(text);
  } catch { return setupResponse({ error: "Le formulaire n’a pas pu être lu." }, 400); }
  const apiKey = typeof data.apiKey === "string" ? data.apiKey.trim() : "";
  if (apiKey.length < 30 || apiKey.length > 256 || /\s/.test(apiKey)) return setupResponse({ error: "La clé Gemini semble incomplète. Copie-la entièrement depuis Google AI Studio." }, 400);
  if (data.freeTierConfirmed !== true) return setupResponse({ error: "Vérifie que ton projet Google est au palier gratuit, sans facturation activée." }, 400);
  try {
    // Reading model metadata does not generate content or consume paid inference.
    const checked = await upstreamFetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite", { headers: { "x-goog-api-key": apiKey }, signal: AbortSignal.timeout(20_000) });
    if (!checked.ok) return setupResponse({ error: "Google n’a pas accepté cette clé pour le modèle utilisé. Vérifie le projet et la clé dans AI Studio." }, 422);
    const key = await vaultCryptoKey(env);
    if (!key) return setupResponse({ error: "Le stockage sécurisé n’est pas prêt." }, 503);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv, additionalData: encoder.encode("cloneit-gemini-v1") }, key, encoder.encode(apiKey));
    await env.BUCKET.put(secretPath, JSON.stringify({ iv: bytesToHex(iv), ciphertext: bytesToHex(ciphertext), freeTierConfirmed: true, configuredAt: Date.now() }), { httpMetadata: { contentType: "application/json" } });
    return setupResponse({ configured: true, locked: true });
  } catch { return setupResponse({ error: "La vérification n’a pas abouti. Réessaie dans un instant." }, 503); }
}
