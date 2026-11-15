function loadHostRoom() {
  try { return JSON.parse(localStorage.getItem("cloneit-host-room") || "null"); } catch { return null; }
}
function invitation() {
  const match = location.hash.match(/^#join=([a-f0-9-]{36})\.([a-f0-9]{64})$/);
  return match ? { id: match[1], inviteToken: match[2] } : null;
}
export const guestRoom = invitation();
export let hostRoom = loadHostRoom();

async function request(path, method = "GET", data, token) {
  const response = await fetch(path, {
    method, cache: "no-store", headers: { ...(data ? { "Content-Type": "application/json" } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...(data ? { body: JSON.stringify(data) } : {})
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Le partage n’a pas abouti. Réessaie.");
  return result;
}

export async function createCollection() {
  if (!hostRoom) {
    hostRoom = await request("/api/rooms", "POST", {});
    localStorage.setItem("cloneit-host-room", JSON.stringify(hostRoom));
  }
  return invitationUrl();
}
export const invitationUrl = () => hostRoom ? `${location.origin}/#join=${hostRoom.id}.${hostRoom.inviteToken}` : "";
export const refreshCollection = () => hostRoom ? request(`/api/rooms/${hostRoom.id}`, "GET", null, hostRoom.ownerToken) : Promise.resolve({ cards: [] });

export async function sendCard(card) {
  const room = guestRoom || hostRoom;
  if (!room) return card;
  if (card.roomId) return updateSharedCard(card);
  if (!card.image.startsWith("data:image/")) throw new Error("Réimporte cette image pour l’ajouter à la partie.");
  const result = await request(`/api/rooms/${room.id}/cards`, "POST", { id: card.id, title: card.title, image: card.image, criteria: card.criteria }, room.ownerToken || room.inviteToken);
  return { ...card, roomId: room.id, shared: true, editToken: result.editToken };
}
export async function updateSharedCard(card) {
  if (!card.roomId) return card;
  await request(`/api/rooms/${card.roomId}/cards/${card.id}`, "PATCH", { title: card.title, criteria: card.criteria }, card.editToken || hostRoom?.ownerToken);
  return card;
}
export const removeSharedCard = (card) => request(`/api/rooms/${card.roomId}/cards/${card.id}`, "DELETE", null, card.editToken || hostRoom?.ownerToken);
