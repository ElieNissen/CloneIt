import { cleanCriteria, durationFor, isPlayable, poolFor, MIN_CRITERIA, MAX_CRITERIA } from "./game-rules.js";
import { listPersonalCards, savePersonalCard, deletePersonalCard, importImage } from "./library.js";
import { guestRoom, hostRoom, createCollection, invitationUrl, refreshCollection, sendCard, updateSharedCard, removeSharedCard } from "./sharing.js";

const cards = [
  { image: "/cards/scene-01.png", criteria: [
    "Il y a exactement 5 doigts sur chaque main du personnage.",
    "Le personnage porte un short.",
    "Le personnage lève ses deux bras.",
    "Il y a un nez sur la citrouille.",
    "On voit les dents de la citrouille."
  ] },
  { image: "/cards/scene-02.png", criteria: [
    "Il y a une brique de lait sur l’image.",
    "Le verre est rempli.",
    "Le verre est à droite de la brique de lait.",
    "Il y a écrit « milk » sur brique de lait.",
    "On voit une vague sur la brique de lait."
  ] },
  { image: "/cards/scene-03.png", criteria: [
    "Il y a une orange sur la brique de lait.",
    "Il y a au moins une feuille sur l’orange.",
    "Il y a un citron sur le verre.",
    "La paille dans le verre est à droite du citron.",
    "Le verre est rempli."
  ] },
  { image: "/cards/scene-04.png", criteria: [
    "Il y a de la fumée qui sort de la cheminée.",
    "Il n’y a pas de rails sur l’image.",
    "Il y a un homme qui tend sa main à travers la fenêtre du train.",
    "L’homme porte une casquette.",
    "Il y a exactement deux wagons sur l’image."
  ] },
  { image: "/cards/scene-05.png", criteria: [
    "Il y a de l’herbe au sol.",
    "Il y a écrit R.I.P sur la pierre tombale.",
    "La citrouille est devant la tombe.",
    "Le fantôme tire la langue.",
    "Il y a une chauve souris au dessus de la citrouille."
  ] },
  { image: "/cards/scene-06.png", criteria: [
    "L’homme porte une cape.",
    "Il y a exactement 5 bougies sur le gâteau.",
    "L’homme a la bouche ouverte.",
    "L’homme porte un slip.",
    "L’homme a des cheveux."
  ] },
  { image: "/cards/scene-07.png", criteria: [
    "Il y a une bouche sur les trois aliments.",
    "Il y a de la nourriture qui dépasse du l’hamburger.",
    "On voit une paille sur l’image.",
    "Les yeux du personnage frite ont des cils.",
    "Il y a des petits points sur le pain de l’hamburger."
  ] },
  { image: "/cards/scene-08.png", criteria: [
    "Il y a une feuille sur la tige de la pomme.",
    "La pomme a des sourcils.",
    "La pomme porte des gants.",
    "La pomme a deux pieds.",
    "On voit les pupilles dans les yeux de la pomme."
  ] },
  { image: "/cards/scene-09.png", criteria: [
    "Il y a un chien sur l’image.",
    "Le nuage est en haut à droite du cadre.",
    "Il y a au moins deux oiseaux dans le ciel.",
    "Il y a un soleil dans le ciel.",
    "Il y a une étoile de mer dans le sable."
  ] },
  { image: "/cards/scene-10.png", criteria: [
    "Il y a un canard sur l’image.",
    "Il y a des pois sur la bouée.",
    "On voit le trait de l’horizon.",
    "Il y a une pelle dans le seau.",
    "Il y a un coquillage en bas à gauche du cadre."
  ] },
  { image: "/cards/scene-11.png", criteria: [
    "Le chat porte un chapeau de sorcière.",
    "Il y a exactement deux nuages dans le ciel.",
    "On voit la queue du chat.",
    "Le chat a des moustaches.",
    "Il y a une citrouille en-dessous du balais."
  ] },
  { image: "/cards/scene-12.png", criteria: [
    "On voit le nez du clown.",
    "Il y a un chapeau sur la tête du clown.",
    "On voit les oreilles du clown.",
    "Le clown a les yeux ouverts.",
    "Le clown porte un nœud papillon avec des pois."
  ] },
  { image: "/cards/scene-13.png", criteria: [
    "On voit au moins 4 étoiles dans le ciel.",
    "On voit une planète à gauche de la fusée.",
    "La fusée a deux réacteurs qui crachent du feu.",
    "Il y a un pic au bout de la fusée.",
    "La fusée a au moins deux ailes."
  ] },
  { image: "/cards/scene-14.png", criteria: [
    "Il y a une saucisse dans le hot dog.",
    "La pizza a deux yeux et une bouche.",
    "On voit des légumes sur la part de pizza.",
    "Il y a des points sur le pain du hot dog.",
    "Il y a exactement une part de pizza."
  ] },
  { image: "/cards/scene-15.png", criteria: [
    "Il y a au moins 4 feuilles sur la fraise.",
    "On voit les graines sur la fraise.",
    "La fraise regarde à gauche.",
    "La main gauche de la fraise est levée.",
    "Il y a exactement 4 doigts à la main de la fraise."
  ] },
  { image: "/cards/scene-16.png", criteria: [
    "Il y a une étoile au sommet du sapin.",
    "On voit une canne à sucre sur le sapin.",
    "Le bonhomme de neige a un chapeau.",
    "Le bonhomme de neige a un nez pointu.",
    "Il y une boîte à droite du sapin."
  ] },
  { image: "/cards/scene-17.png", criteria: [
    "Il y a au moins 4 branches dans l’arbre.",
    "Il y a un chemin devant la porte.",
    "Le toit est en paille.",
    "Il y a exactement une fenêtre sur la maison.",
    "On voit une poignée sur la porte."
  ] },
  { image: "/cards/scene-18.png", criteria: [
    "Il y a 3 rangées de trois smileys.",
    "Il y a écrit le nombre 9 sur l’étoile.",
    "L’étoile est à gauche des smileys.",
    "Les smiley sourient.",
    "L’étoile a exactement 5 branches."
  ] },
  { image: "/cards/scene-19.png", criteria: [
    "Il y a un éléphant sur l’image.",
    "Il y a une girafe sur l’image.",
    "L’homme porte une canne.",
    "L’éléphant lève sa trompe.",
    "On voit les montagnes à l’arrière plan."
  ] },
  { image: "/cards/scene-20.png", criteria: [
    "Il y a une sucette à gauche de la maison.",
    "Il y a des briques sur le toit.",
    "Il y a au moins un buisson sur l’image.",
    "Il y a une spirale au dessus de la porte.",
    "On voit une cheminée."
  ] },
  { image: "/cards/scene-21.png", criteria: [
    "On ne voit qu’un œil de la sorcière.",
    "La sorcière porte un chapeau.",
    "Il y a une dent qui sort de la bouche de la sorcière.",
    "La sorcière a des cheveux.",
    "On voit des bulles qui sortent de la marmite."
  ] },
  { image: "/cards/scene-22.png", criteria: [
    "On voit un point d’interrogation sur l’image.",
    "Il y a des taches sur le poisson.",
    "Le poisson a un œil à moitié fermé.",
    "On voit au moins 3 nageoires sur le poisson.",
    "On voit 3 hublots sur le sous-marin."
  ] },
  { image: "/cards/scene-23.png", criteria: [
    "On voit au moins 3 dents sur l’image.",
    "Il y a des écailles sur le poisson.",
    "Le poisson a les yeux ouverts.",
    "On voit un petit poisson en haut de l’image.",
    "Le crabe est sous le gros poisson."
  ] },
  { image: "/cards/scene-24.png", criteria: [
    "On voit exactement 6 rayons de soleil.",
    "L’enfant regarde vers le bas.",
    "Il y a un poisson au bout de la canne à pêche.",
    "On voit de l’herbe.",
    "L’enfant a des cheveux."
  ] },
  { image: "/cards/scene-25.png", criteria: [
    "On voit des vagues.",
    "L’étoile de mer est en-dessous du dauphin.",
    "On voit des points dans le sable.",
    "On voit un soleil.",
    "Il y a exactement deux algues."
  ] },
  { image: "/cards/scene-26.png", criteria: [
    "Il y a un marin dans le bateau.",
    "Le bateau a deux voiles.",
    "On voit des vagues dans la mer.",
    "Le marin porte un foulard.",
    "Le marin dit bonjour avec sa main."
  ] }
];

const app = document.querySelector("#app");
let savedMode = "classic";
try { savedMode = localStorage.getItem("cloneit-mode") || "classic"; } catch {}
const classicCards = cards.map((card, index) => ({ ...card, id: `classic-${index}`, source: "classic" }));
const state = {
  stage: "ready",
  mode: ["classic", "custom", "mixed"].includes(savedMode) ? savedMode : "classic",
  personal: [],
  editing: null,
  busy: false,
  sharingAvailable: false,
  message: "",
  lastDeleted: null,
  aiAvailable: null,
  durationMs: 90_000,
  deck: [],
  deckPosition: 0,
  roundsPlayed: 0,
  card: null,
  secondsLeft: 90,
  timerEnd: 0,
  timer: null,
  progressAnimation: null
};

const arrow = '<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';

const shuffle = (items) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

app.innerHTML = `<div class="app-shell">
  <header class="topbar"><span class="brand-name">Clone<span>It</span><i aria-hidden="true">✳</i></span></header>
  <main id="stage" class="screen"></main>
</div>`;
const stage = document.querySelector("#stage");

function homeArtwork() {
  return `<div class="home-art" aria-hidden="true">
    <svg class="sketch-stack" viewBox="0 0 360 290" fill="none">
      <path d="M29 81c-11-14-11-31 1-38m-7 17-9 1m16-12-5-7" stroke="#eb846c" stroke-width="3" stroke-linecap="round"/>
      <path d="m311 181 10 7m-15 5 1 11m16-4 7 6" stroke="#4873b9" stroke-width="3" stroke-linecap="round"/>
      <g transform="rotate(9 207 157)">
        <rect x="104" y="46" width="197" height="219" rx="22" fill="#7192cb" opacity=".16" transform="translate(0 7)"/>
        <rect x="104" y="46" width="197" height="219" rx="22" fill="#a6c5f8" stroke="#7299d8" stroke-width="1.5"/>
        <rect x="115" y="57" width="175" height="197" rx="15" stroke="#dce9ff" stroke-width="1.5" stroke-dasharray="5 6"/>
      </g>
      <g transform="rotate(-8 162 143)">
        <rect x="58" y="28" width="202" height="229" rx="22" fill="#2b5289" opacity=".10" transform="translate(0 7)"/>
        <rect x="58" y="28" width="202" height="229" rx="22" fill="#fffdf4" stroke="#d7dfeb" stroke-width="1.5"/>
        <path d="M80 220c37-6 56 3 77-1s58-2 81 1" stroke="#c6d5e9" stroke-width="2" stroke-linecap="round"/>
        <path d="m100 153 58-55 61 54m-107-7v63h94v-65" stroke="#315d9f" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M147 208v-39h24v39m17-58h-20v-18h20v18Z" stroke="#315d9f" stroke-width="3" stroke-linejoin="round"/>
        <path d="M203 95c7-16 22-18 29-4" stroke="#eb846c" stroke-width="3" stroke-linecap="round"/>
        <circle cx="219" cy="78" r="12" stroke="#eb846c" stroke-width="3"/>
        <path d="m219 56 1-6m16 16 5-4m-39 4-4-4m38 23 6 2" stroke="#eb846c" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M82 195c-4-7-3-16 2-21m2 23c2-7 5-10 9-12" stroke="#4e947d" stroke-width="3" stroke-linecap="round"/>
      </g>
      <g transform="rotate(25 268 198)">
        <path d="M258 145h20v96l-10 21-10-21v-96Z" fill="#ed947d" stroke="#cc705c" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M258 241h20l-10 21-10-21Z" fill="#f8dfb6"/>
        <path d="m264 254 4 8 4-8" fill="#315d9f"/>
        <path d="M268 147v92" stroke="#ffcebc" stroke-width="3"/>
        <path d="M258 141a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v11h-20v-11Z" fill="#cadbf1" stroke="#91acd0" stroke-width="1.5"/>
      </g>
    </svg>
    <span class="time-sticker">${state.card ? durationFor(state.card) : 90}<span>secondes</span></span>
  </div>`;
}

function invalidateDeck() {
  state.deck = [];
  state.deckPosition = 0;
  state.card = null;
}

function chooseCard() {
  const pool = poolFor(state.mode, classicCards, state.personal);
  if (!pool.length) { state.card = null; return; }
  if (state.deckPosition >= state.deck.length) {
    state.deck = shuffle(pool);
    state.deckPosition = 0;
  }
  state.card = state.deck[state.deckPosition++];
}

function renderReady() {
  state.stage = "ready";
  stage.className = "screen ready-screen";
  if (!state.card) chooseCard();
  const firstRound = state.roundsPlayed === 0;
  const count = state.card?.criteria.length || 0;
  const seconds = state.card ? durationFor(state.card) : 0;
  const personalCount = state.personal.filter(isPlayable).length;
  stage.innerHTML = `
    <section class="welcome">
      ${homeArtwork()}
      <h1>${firstRound ? 'À vos<br/><span>gribouillis !</span>' : 'Au prochain<br/><span>narrateur !</span>'}</h1>
      <p>${firstRound ? 'Un joueur décrit l’image, les autres dessinent sur papier. Puis, on compare !' : 'Passez le téléphone. La nouvelle image se dévoile au départ du chrono.'}</p>
    </section>
    <div class="game-options">
      <div class="mode-selector" role="group" aria-label="Images de la partie">${[["classic", "Classiques"], ["custom", "Mes images"], ["mixed", "Mélange"]].map(([mode, label]) => `<button type="button" data-action="mode" data-mode="${mode}" aria-pressed="${state.mode === mode}">${label}</button>`).join("")}</div>
      <button class="library-link" data-action="library" type="button">Mes images <span>${personalCount ? personalCount + ' prêtes' : 'Ajouter'}</span> ↗</button>
    </div>
    <div class="round-action">
      ${state.card ? `<p class="round-brief" aria-live="polite"><strong>${count} critères</strong><span>·</span><strong>${seconds} secondes</strong>${state.card.source === "custom" ? '<small>Image personnelle · annoncez la durée aux joueurs.</small>' : ''}</p><button class="primary-button" type="button" data-action="start">Commencer la manche ${arrow}</button>` : `<p class="empty-mode">Ajoute une image et ses critères pour jouer.</p><button class="primary-button" type="button" data-action="library">Ajouter mes images ${arrow}</button>`}
    </div>`;
  window.scrollTo(0, 0);
}

function formatTime(total) {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function renderImage() {
  return `<figure class="scene"><img class="scene-image" src="${state.card.image}" alt="Illustration à décrire et à comparer aux dessins" /></figure>`;
}

function renderDraw() {
  stage.className = "screen draw-screen";
  stage.innerHTML = `<section class="timer" aria-label="Temps restant">
      <span class="timer-readout" role="timer" aria-live="off">${formatTime(state.secondsLeft)}</span>
      <div class="timer-track" aria-hidden="true"><div class="timer-progress"></div></div>
    </section>
    ${renderImage()}
    <div class="round-ending" aria-live="polite"></div>`;
}

function animateProgress() {
  state.progressAnimation?.cancel();
  const bar = document.querySelector(".timer-progress");
  const remaining = Math.max(0, state.timerEnd - Date.now());
  // The bar runs on its own timeline, independently of the seconds display.
  state.progressAnimation = bar?.animate(
    [{ transform: `scaleX(${remaining / state.durationMs})` }, { transform: "scaleX(0)" }],
    { duration: remaining, easing: "linear", fill: "forwards" }
  );
}

function tick() {
  if (state.stage !== "draw") return;
  state.secondsLeft = Math.max(0, Math.ceil((state.timerEnd - Date.now()) / 1000));
  const readout = document.querySelector(".timer-readout");
  if (readout && readout.textContent !== formatTime(state.secondsLeft)) {
    readout.textContent = formatTime(state.secondsLeft);
  }
  if (state.secondsLeft === 0) finishRound();
}

function finishRound() {
  if (state.stage !== "draw") return;
  clearInterval(state.timer);
  state.timer = null;
  state.progressAnimation?.cancel();
  state.progressAnimation = null;
  state.stage = "finished";
  stage.classList.add("round-finished");
  document.querySelector(".timer-progress").style.transform = "scaleX(0)";
  document.querySelector(".timer-readout").textContent = "00:00";
  document.querySelector(".round-ending").innerHTML = `<p>C’est l’heure de la correction !</p><button class="primary-button" type="button" data-action="correct">Voir la correction ${arrow}</button>`;
}

async function startRound() {
  if (state.stage !== "ready") return;
  state.stage = "loading";
  const button = stage.querySelector('[data-action="start"]');
  button.disabled = true;
  if (!state.card) { renderReady(); return; }
  // Load the model before the 90 seconds begin.
  const model = new Image();
  model.src = state.card.image;
  try { await model.decode(); } catch { /* A cached image can still render. */ }
  state.roundsPlayed += 1;
  state.secondsLeft = durationFor(state.card);
  state.durationMs = state.secondsLeft * 1000;
  state.timerEnd = Date.now() + state.durationMs;
  state.stage = "draw";
  renderDraw();
  animateProgress();
  state.timer = window.setInterval(tick, 100);
}

function renderCorrection() {
  if (state.stage !== "finished") return;
  state.stage = "correction";
  stage.className = "screen correction-screen";
  stage.innerHTML = `${renderImage()}
    <section class="criteria" aria-labelledby="criteria-title">
      <h1 id="criteria-title">À vérifier ensemble</h1>
      <ol class="criteria-list">${state.card.criteria.map((item, index) => `<li class="criterion-row"><span class="criterion-number" aria-hidden="true">${index + 1}</span><span class="criterion-text">${escapeHtml(item)}</span><span class="criterion-point">+1</span></li>`).join("")}</ol>
    </section>
    <div class="round-action"><button class="primary-button" type="button" data-action="next">Manche suivante ${arrow}</button></div>`;
  window.scrollTo(0, 0);
}

function messageMarkup() {
  return state.message ? `<p class="library-message" role="status">${escapeHtml(state.message)}</p>` : "";
}

function renderLibrary() {
  state.stage = "library";
  stage.className = "screen library-screen";
  const ready = state.personal.filter(isPlayable).length;
  stage.innerHTML = `<div class="page-heading">${guestRoom ? '<span>La partie entre amis</span>' : '<button type="button" class="back-link" data-action="home">← Jouer</button>'}<span>${ready} prête${ready > 1 ? 's' : ''}</span></div>
    <h1>${guestRoom ? 'Ajoute tes images' : 'Mes images'}<span>✳</span></h1>
    ${guestRoom ? '<p class="contribution-intro">Tes photos rejoignent directement le jeu de l’organisateur.</p>' : `<div class="sharing-panel"><button class="secondary-button" type="button" data-action="share" ${state.busy ? "disabled" : ""}>↗ ${hostRoom ? "Partager le lien d’ajout" : "Inviter des amis à ajouter leurs images"}</button>${invitationUrl() ? `<input class="invite-url" readonly value="${escapeHtml(invitationUrl())}" aria-label="Lien à partager pour ajouter des images"/><button class="text-button" type="button" data-action="refresh-shared">Actualiser les contributions</button>` : ''}<p>Un lien à ouvrir sur leur téléphone. Sans compte.</p></div>`}
    <div class="import-zone" id="drop-zone">
      <label class="upload-button" for="image-upload">＋ Ajouter des images<input id="image-upload" type="file" accept="image/*" multiple ${state.busy ? "disabled" : ""}/></label>
      <button class="text-button" data-action="paste" type="button" ${state.busy ? "disabled" : ""}>Coller une image</button>
      <p>Photos, fichiers ou glisser-déposer.<br/>Les images sont envoyées à Google Gemini pour préparer les critères.</p>
      <details><summary>Depuis un lien</summary><div class="url-import"><input id="image-url" type="url" placeholder="https://…" aria-label="Adresse directe de l’image"/><button type="button" class="small-button" data-action="import-url" ${state.busy ? "disabled" : ""}>Ajouter</button></div></details>
    </div>
    ${state.busy ? '<p class="preparing" role="status"><span class="spinner"></span>Préparation des images…</p>' : ""}
    ${messageMarkup()}
    ${state.lastDeleted ? '<button class="text-button" type="button" data-action="undo-delete">Annuler la suppression</button>' : ""}
    ${state.personal.length ? `<div class="library-grid">${[...state.personal].sort((a, b) => b.createdAt - a.createdAt).map((card) => `<button class="library-card" type="button" data-action="edit" data-id="${card.id}"><img src="${card.image}" alt="${escapeHtml(card.title)}" loading="lazy"/><span class="library-card-title">${escapeHtml(card.title)}</span><span class="library-card-info">${guestRoom && card.shared ? 'Envoyée · ' : ''}${isPlayable(card) ? `${card.criteria.length} critères · ${durationFor(card)} s` : "À préparer"}</span></button>`).join("")}</div>` : '<div class="library-empty"><span aria-hidden="true">✧</span><p>Vos photos, vos mèmes,<br/>vos prochaines manches.</p></div>'}
    <p class="storage-note">${guestRoom ? "Seules tes propres images sont affichées ici." : hostRoom ? "Les contributions de tes amis se synchronisent ici." : "Bibliothèque enregistrée sur cet appareil."}</p>`;
}

function renderEditor() {
  const card = state.editing;
  if (!card) return renderLibrary();
  state.stage = "editor";
  stage.className = "screen editor-screen";
  const criteria = cleanCriteria(card.criteria);
  stage.innerHTML = `<div class="page-heading"><button type="button" class="back-link" data-action="library-back">← Mes images</button><button type="button" class="delete-button" data-action="delete">Supprimer</button></div>
    <figure class="editor-image"><img src="${card.image}" alt="Image personnelle à préparer"/></figure>
    <input class="card-title-input" id="card-title" maxlength="60" value="${escapeHtml(card.title)}" aria-label="Titre de l’image"/>
    <div class="editor-heading"><h1>Les détails à retrouver</h1><span id="editor-duration">${criteria.length} critères · ${durationFor(card)} s</span></div>
    ${messageMarkup()}
    <button class="secondary-button" data-action="generate" type="button" ${state.busy ? "disabled" : ""}>${state.busy ? '<span class="spinner"></span>Analyse en cours…' : `✦ ${criteria.length ? "Régénérer avec l’IA" : "Créer les critères avec l’IA"}`}</button>
    ${state.aiAvailable === false ? '<p class="ai-status">La génération IA n’est pas encore activée. Tu peux conserver l’image et saisir tes critères.</p>' : '<p class="ai-status">Jusqu’à 10 détails clairs. La durée s’adapte automatiquement.</p>'}
    <div class="criteria-editor">${(card.criteria.length ? card.criteria : [""]).map((text, index) => `<div class="editable-criterion"><span>${index + 1}</span><textarea rows="2" maxlength="240" data-criterion="${index}" aria-label="Critère ${index + 1}" placeholder="Un détail visible à dessiner…" ${state.busy ? "disabled" : ""}>${escapeHtml(text)}</textarea><button type="button" data-action="remove-criterion" data-index="${index}" aria-label="Retirer le critère ${index + 1}" ${state.busy ? "disabled" : ""}>×</button></div>`).join("")}</div>
    <button type="button" class="text-button" data-action="add-criterion" ${state.busy || card.criteria.length >= MAX_CRITERIA ? "disabled" : ""}>＋ Ajouter un critère</button>
    <div class="round-action"><button class="primary-button" type="button" data-action="save-card" ${state.busy ? "disabled" : ""}>${isPlayable(card) ? "Enregistrer la carte" : "Garder pour plus tard"} ${arrow}</button></div>`;
}

function editorValues() {
  if (!state.editing || state.stage !== "editor") return;
  state.editing.title = document.querySelector("#card-title").value.trim().slice(0, 60) || "Mon image";
  state.editing.criteria = [...stage.querySelectorAll("[data-criterion]")].map((input) => input.value);
}

async function persistCard(card) {
  const saved = { ...card, criteria: cleanCriteria(card.criteria) };
  await savePersonalCard(saved);
  const index = state.personal.findIndex((item) => item.id === saved.id);
  if (index < 0) state.personal.push(saved); else state.personal[index] = saved;
  invalidateDeck();
  return saved;
}

async function saveAndShare(card) {
  const saved = await persistCard(card);
  if (!guestRoom && !hostRoom) return saved;
  const shared = await sendCard(saved);
  return persistCard(shared);
}

async function syncCollection() {
  if (guestRoom || !hostRoom || state.busy || !["ready", "library"].includes(state.stage)) return;
  const { cards: shared } = await refreshCollection();
  if (state.busy || !["ready", "library"].includes(state.stage)) return;
  const old = new Map(state.personal.map((card) => [card.id, card]));
  const others = state.personal.filter((card) => card.roomId !== hostRoom.id);
  const merged = shared.map((card) => ({ ...old.get(card.id), ...card, editToken: old.get(card.id)?.editToken }));
  const next = [...others, ...merged];
  const signature = (items) => JSON.stringify(items.map((card) => [card.id, card.criteria, card.title]).sort((a, b) => a[0].localeCompare(b[0])));
  if (signature(next) !== signature(state.personal)) {
    state.personal = next; invalidateDeck();
    if (state.stage === "ready") renderReady(); else renderLibrary();
  }
}

async function refreshAiAvailability() {
  const response = await fetch("/api/config", { cache: "no-store" });
  if (!response.ok) throw new Error("La préparation IA n’est pas disponible pour le moment.");
  const config = await response.json();
  state.aiAvailable = config.aiAvailable === true;
  state.sharingAvailable = config.sharingAvailable === true;
  return state.aiAvailable;
}

async function analysisImage(image) {
  if (image.startsWith("data:")) return image;
  const response = await fetch(image);
  if (!response.ok) throw new Error("Cette image n’est plus disponible.");
  const blob = await response.blob();
  return (await importImage(new File([blob], "Image", { type: blob.type }))).image;
}

async function analyzeCard(card) {
  await refreshAiAvailability();
  const response = await fetch("/api/analyze", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: await analysisImage(card.image) }), signal: AbortSignal.timeout(70_000)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "L’image n’a pas pu être analysée.");
  const prepared = { ...card, title: result.title || card.title, criteria: cleanCriteria(result.criteria) };
  if (!isPlayable(prepared)) throw new Error("L’IA n’a pas trouvé assez de détails. Essaie une autre image.");
  return persistCard(prepared);
}

async function addImages(files) {
  if (state.busy || !files.length) return;
  state.busy = true;
  state.message = "";
  renderLibrary();
  let added = 0;
  let prepared = 0;
  let lastCard;
  const errors = [];
  for (const file of [...files].slice(0, 10)) {
    if (state.personal.length >= 50) { errors.push("La bibliothèque est limitée à 50 images sur cet appareil."); break; }
    try {
      lastCard = await persistCard({ ...await importImage(file), ...(guestRoom ? { pendingRoomId: guestRoom.id } : {}) });
      added++;
      try { lastCard = await analyzeCard(lastCard); prepared++; }
      catch (error) { errors.push(error.message); }
      if (guestRoom || hostRoom) {
        try { lastCard = await saveAndShare(lastCard); }
        catch (error) { errors.push(error.message); }
      }
    } catch (error) { errors.push(error.message); }
  }
  state.busy = false;
  state.message = errors.length ? [...new Set(errors)].join(" ") : `${prepared} carte${prepared > 1 ? 's' : ''} prête${prepared > 1 ? 's' : ''} !`;
  if (files.length > 10) state.message += " Ajoute les images par lots de 10 maximum.";
  if (added === 1 && lastCard) { state.editing = { ...lastCard, criteria: [...lastCard.criteria] }; renderEditor(); }
  else renderLibrary();
}

async function pasteImage() {
  try {
    if (!navigator.clipboard?.read) throw new Error("Utilise le collage du navigateur ou importe une image depuis tes photos.");
    const items = await navigator.clipboard.read();
    for (const item of items) {
      const type = item.types.find((value) => value.startsWith("image/"));
      if (type) return addImages([new File([await item.getType(type)], "Image collée", { type })]);
    }
    throw new Error("Copie l’image elle-même, puis colle-la ici. Tu peux aussi l’importer depuis tes photos.");
  } catch (error) {
    state.message = error.name === "NotAllowedError" ? "Le presse-papiers n’est pas accessible. Utilise le collage du navigateur ou choisis un fichier." : error.message;
    renderLibrary();
  }
}

async function importFromUrl() {
  if (state.busy) return;
  try {
    const url = new URL(document.querySelector("#image-url").value.trim());
    if (url.protocol !== "https:") throw new Error("Utilise une adresse d’image en https.");
    const response = await fetch(url.href, { credentials: "omit", referrerPolicy: "no-referrer", signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error("Chargement impossible.");
    const blob = await response.blob();
    return addImages([new File([blob], "Image importée", { type: blob.type })]);
  } catch {
    state.message = "Ce lien ne permet pas de charger l’image directement. Enregistre-la dans tes photos, puis importe-la ici.";
    renderLibrary();
  }
}

async function handleAction(button) {
  const action = button.dataset.action;
  if (state.busy) return;
  if (action === "start") return startRound();
  if (action === "correct") return renderCorrection();
  if (action === "next" && state.stage === "correction") { state.card = null; return renderReady(); }
  if (action === "mode" && state.stage === "ready") {
    state.mode = button.dataset.mode;
    try { localStorage.setItem("cloneit-mode", state.mode); } catch {}
    invalidateDeck(); return renderReady();
  }
  if (action === "home") { state.message = ""; return renderReady(); }
  if (action === "library") { state.message = ""; return renderLibrary(); }
  if (action === "edit") {
    const card = state.personal.find((item) => item.id === button.dataset.id);
    if (card) { state.editing = { ...card, criteria: [...card.criteria] }; state.message = ""; renderEditor(); window.scrollTo(0, 0); }
  }
  if (action === "share") {
    state.busy = true; state.message = ""; renderLibrary();
    try {
      await createCollection();
      for (const card of [...state.personal]) if (!card.roomId) await saveAndShare(card);
      state.message = "Lien prêt : partage-le pour que tes amis ajoutent leurs photos.";
      const url = invitationUrl();
      try {
        if (navigator.share) await navigator.share({ title: "Ajoute tes images à CloneIt", url });
        else { await navigator.clipboard.writeText(url); state.message = "Lien copié ! Envoie-le à tes amis."; }
      } catch { /* The visible link remains available when sharing is cancelled. */ }
    } catch (error) { state.message = error.message; }
    finally { state.busy = false; renderLibrary(); }
  }
  if (action === "refresh-shared") {
    try { await syncCollection(); state.message = "Contributions à jour."; }
    catch (error) { state.message = error.message; }
    renderLibrary();
  }
  if (action === "paste") return pasteImage();
  if (action === "import-url") return importFromUrl();
  if (["save-card", "library-back"].includes(action)) {
    editorValues(); await saveAndShare(state.editing); state.editing = null; state.message = ""; renderLibrary(); window.scrollTo(0, 0);
  }
  if (action === "generate") {
    editorValues(); state.busy = true; state.message = ""; renderEditor();
    try { state.editing = await analyzeCard(state.editing); if (guestRoom || hostRoom) state.editing = await saveAndShare(state.editing); }
    catch (error) { state.message = error.message; }
    finally { state.busy = false; renderEditor(); }
  }
  if (action === "add-criterion") {
    editorValues(); if (state.editing.criteria.length < MAX_CRITERIA) state.editing.criteria.push(""); renderEditor();
    stage.querySelector(".editable-criterion:last-child textarea")?.focus();
  }
  if (action === "remove-criterion") { editorValues(); state.editing.criteria.splice(Number(button.dataset.index), 1); renderEditor(); }
  if (action === "delete") {
    state.lastDeleted = state.personal.find((card) => card.id === state.editing.id);
    if (state.lastDeleted && !state.lastDeleted.image.startsWith("data:")) state.lastDeleted = { ...state.lastDeleted, image: await analysisImage(state.lastDeleted.image) };
    if (state.editing.roomId) await removeSharedCard(state.editing);
    await deletePersonalCard(state.editing.id);
    state.personal = state.personal.filter((card) => card.id !== state.editing.id);
    state.editing = null; invalidateDeck(); state.message = "Image supprimée."; renderLibrary();
  }
  if (action === "undo-delete" && state.lastDeleted) {
    const restore = { ...state.lastDeleted }; delete restore.roomId; delete restore.shared; delete restore.editToken;
    if (!restore.image.startsWith("data:")) {
      const response = await fetch(restore.image); const file = new File([await response.blob()], restore.title, { type: response.headers.get("Content-Type") || "image/jpeg" });
      const imported = await importImage(file); restore.image = imported.image;
    }
    await saveAndShare(restore); state.lastDeleted = null; state.message = "Image restaurée."; renderLibrary();
  }
}

app.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  handleAction(button).catch((error) => { state.message = error.message; if (state.stage === "editor") renderEditor(); else if (state.stage === "library") renderLibrary(); });
});
app.addEventListener("change", (event) => {
  if (event.target.id === "image-upload") addImages(event.target.files);
});
app.addEventListener("input", (event) => {
  if (event.target.matches("[data-criterion]")) {
    editorValues();
    document.querySelector("#editor-duration").textContent = `${cleanCriteria(state.editing.criteria).length} critères · ${durationFor(state.editing)} s`;
    const save = stage.querySelector('[data-action="save-card"]');
    save.innerHTML = `${isPlayable(state.editing) ? "Enregistrer la carte" : "Garder pour plus tard"} ${arrow}`;
  }
});
document.addEventListener("paste", (event) => {
  if (!["ready", "library"].includes(state.stage)) return;
  const files = [...(event.clipboardData?.files || [])].filter((file) => file.type.startsWith("image/"));
  if (files.length) { event.preventDefault(); addImages(files); }
});
app.addEventListener("dragover", (event) => {
  if (state.stage === "library") { event.preventDefault(); document.querySelector("#drop-zone")?.classList.add("drag-over"); }
});
app.addEventListener("dragleave", () => document.querySelector("#drop-zone")?.classList.remove("drag-over"));
app.addEventListener("drop", (event) => {
  if (state.stage === "library") { event.preventDefault(); addImages([...(event.dataTransfer?.files || [])]); }
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && state.stage === "draw") {
    tick();
    if (state.stage === "draw") animateProgress();
  }
});

if ("serviceWorker" in navigator) {
  let hadController = Boolean(navigator.serviceWorker.controller);
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    // Pick up an installed update on the welcome screen without interrupting a round.
    if (hadController && state.stage === "ready") window.location.reload();
    hadController = true;
  });
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
}

if (guestRoom) renderLibrary(); else renderReady();
listPersonalCards().then(async (saved) => {
  state.personal = guestRoom ? saved.filter((card) => card.roomId === guestRoom.id || card.pendingRoomId === guestRoom.id) : saved;
  if (state.stage === "ready") { invalidateDeck(); renderReady(); }
  else if (state.stage === "library") renderLibrary();
  await syncCollection();
}).catch((error) => { state.message = error.message; });
refreshAiAvailability().catch(() => { state.aiAvailable = null; });
window.setInterval(() => syncCollection().catch(() => {}), 15_000);
