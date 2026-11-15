export const MIN_CRITERIA = 3;
export const MAX_CRITERIA = 10;

export function cleanCriteria(criteria) {
  if (!Array.isArray(criteria)) return [];
  return [...new Set(criteria.filter((s) => typeof s === "string").map((s) => s.trim()).filter(Boolean))].slice(0, MAX_CRITERIA);
}

export function durationFor(card) {
  if (card.source !== "custom") return 90;
  return Math.max(30, Math.min(90, Math.round(cleanCriteria(card.criteria).length * 9 / 5) * 5));
}

export function isPlayable(card) {
  const length = cleanCriteria(card.criteria).length;
  return length >= MIN_CRITERIA && length <= MAX_CRITERIA;
}

export function poolFor(mode, classics, personal) {
  const ready = personal.filter(isPlayable);
  if (mode === "custom") return ready;
  if (mode === "mixed") return [...classics, ...ready];
  return classics;
}
