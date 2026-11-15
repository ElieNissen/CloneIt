const token = new URLSearchParams(location.hash.slice(1)).get("setup");
const form = document.querySelector("#setup-form");
const status = document.querySelector("#setup-status");
const done = document.querySelector("#setup-done");
const submit = document.querySelector("#setup-submit");
const key = document.querySelector("#gemini-key");

function complete() {
  key.value = "";
  form.hidden = true;
  done.hidden = false;
  status.textContent = "Gemini est activé. La clé est enregistrée côté serveur et cette page est maintenant verrouillée.";
}

async function setupRequest(method = "GET", body) {
  const response = await fetch("/api/setup", {
    method, cache: "no-store", credentials: "omit",
    headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "La configuration n’a pas abouti.");
  return data;
}

if (!/^[a-f0-9]{64}$/.test(token || "")) {
  status.textContent = "Ouvre le lien privé de configuration fourni dans le chat.";
} else {
  setupRequest().then((data) => {
    if (data.configured) return complete();
    status.textContent = "Le lien est valide. Tu peux connecter ton projet Gemini gratuit.";
    form.hidden = false;
  }).catch((error) => { status.textContent = error.message; });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  submit.disabled = true;
  submit.textContent = "Vérification…";
  try {
    await setupRequest("POST", { apiKey: key.value.trim(), freeTierConfirmed: document.querySelector("#free-tier").checked });
    complete();
  } catch (error) { status.textContent = error.message; }
  finally { submit.disabled = false; submit.textContent = "Activer Gemini"; }
});
