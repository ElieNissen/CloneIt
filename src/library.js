let connection;
function openDatabase() {
  if (!connection) connection = new Promise((resolve, reject) => {
    const request = indexedDB.open("cloneit-library", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("cards", { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("La bibliothèque ne peut pas être ouverte sur cet appareil."));
  });
  return connection;
}

async function transaction(mode, run) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("cards", mode);
    const request = run(tx.objectStore("cards"));
    tx.oncomplete = () => resolve(request.result);
    tx.onerror = () => reject(new Error("Enregistrement impossible. Le stockage du téléphone est peut-être plein."));
    tx.onabort = () => reject(new Error("L’enregistrement a été interrompu."));
  });
}

export const listPersonalCards = () => transaction("readonly", (store) => store.getAll());
export const savePersonalCard = (card) => transaction("readwrite", (store) => store.put(card));
export const deletePersonalCard = (id) => transaction("readwrite", (store) => store.delete(id));

export async function importImage(file) {
  if (!file || !file.type.startsWith("image/")) throw new Error("Choisis une image dans tes photos ou tes fichiers.");
  if (file.size > 20 * 1024 * 1024) throw new Error("Cette image est trop lourde. Choisis un fichier de moins de 20 Mo.");
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const ratio = Math.min(1, 1400 / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.naturalWidth * ratio));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * ratio));
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/jpeg", .86);
    if (image.length > 4_000_000) throw new Error("Cette image est trop détaillée. Essaie une version plus petite.");
    return {
      id: crypto.randomUUID(), source: "custom", image,
      title: (file.name?.replace(/\.[^.]+$/, "") || "Mon image").slice(0, 60),
      criteria: [], createdAt: Date.now()
    };
  } catch (error) {
    if (error.message?.startsWith("Cette image")) throw error;
    throw new Error("Ce format d’image ne peut pas être lu. Essaie une image JPG, PNG ou WebP.");
  } finally { URL.revokeObjectURL(url); }
}
