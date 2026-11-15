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
const state = {
  stage: "ready",
  deck: [],
  deckPosition: 0,
  roundNumber: 0,
  card: null,
  secondsLeft: 90,
  timerEnd: null,
  timer: null
};

const icon = (name, size = 20) => {
  const paths = {
    sparkle: '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"/><path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    expand: '<path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    trash: '<path d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3"/>'
  };
  return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || ""}</svg>`;
};

const shuffle = (items) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const roundLabel = () => `Manche ${String(state.roundNumber).padStart(2, "0")}`;

function renderHeader({ badge = "" } = {}) {
  return `<header class="topbar">
    <div class="brand-lockup">
      <span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M7 6h13a4 4 0 0 1 4 4v15H11a4 4 0 0 1-4-4V6Z"/><path d="M7 6v15a4 4 0 0 0 4 4"/><circle cx="14" cy="14" r="1"/><circle cx="19" cy="14" r="1"/><path d="M14 18c1.5 1.8 3.5 1.8 5 0"/></svg></span>
      <span class="brand-name">CloneIt</span>
    </div>
    ${badge ? `<span class="topbar-badge">${badge}</span>` : ""}
  </header>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function prepareRound() {
  if (!state.deck.length || state.deckPosition >= state.deck.length) {
    state.deck = shuffle(cards.map((_, index) => index));
    state.deckPosition = 0;
  }
  state.card = cards[state.deck[state.deckPosition++]];
  state.roundNumber += 1;
  state.secondsLeft = 90;
  state.stage = "ready";
  renderReady();
}

function renderReady() {
  app.innerHTML = `<main class="screen game-screen ready-screen">
    ${renderHeader({ badge: roundLabel() })}
    <section class="ready-content">
      <h1>Prêts&nbsp;?</h1>
      <div class="sealed-card" aria-hidden="true"><span class="sealed-logo">C<span>.</span></span></div>
    </section>
    <div class="bottom-action"><button class="primary-button" type="button" data-action="start-timer">Lancer 1:30 ${icon("arrow", 19)}</button></div>
  </main>`;
}

function timerMarkup() {
  return `<div class="timer-dominant" aria-live="off"><span class="timer-readout" aria-label="${formatTime(state.secondsLeft)}">${formatTime(state.secondsLeft)}</span><span class="timer-track"><i class="timer-progress" style="width:100%"></i></span></div>`;
}

function formatTime(total) {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function renderDraw() {
  app.innerHTML = `<main class="screen game-screen draw-screen">
    ${renderHeader({ badge: roundLabel() })}
    ${timerMarkup()}
    ${renderIllustrationCard("draw-image-card")}
    <div class="bottom-action draw-bottom"><button class="primary-button finish-button" type="button" data-action="finish">Correction ${icon("arrow", 19)}</button></div>
  </main>`;
}

function renderIllustrationCard(className = "") {
  return `<figure class="illustration-card ${className}">
    <div class="illustration-card-top"><button class="zoom-button" type="button" data-action="fullscreen" aria-label="Afficher l’illustration en plein écran">${icon("expand", 17)}<span>Agrandir</span></button></div>
    <div class="illustration-image-wrap"><img src="${state.card.image}" alt="Illustration à décrire aux joueurs" /></div>
  </figure>`;
}

function renderCorrection() {
  clearInterval(state.timer);
  state.timer = null;
  closeFullscreen();
  state.stage = "correction";
  const criteria = state.card.criteria.map((item, index) => `<li class="criterion-row"><span class="criterion-number">${String(index + 1).padStart(2, "0")}</span><span class="criterion-text">${escapeHtml(item)}</span><span class="criterion-point">+1<span>pt</span></span></li>`).join("");
  app.innerHTML = `<main class="screen game-screen correction-screen">
    ${renderHeader({ badge: roundLabel() })}
    <section class="correction-content">
      ${renderIllustrationCard("correction-image-card")}
      <div class="criteria-heading"><h1>À vérifier ensemble</h1></div>
      <ol class="criteria-list">${criteria}</ol>
    </section>
    <div class="bottom-action correction-bottom"><button class="primary-button" type="button" data-action="next">Suivante ${icon("arrow", 19)}</button></div>
  </main>`;
}

function openFullscreen() {
  if (document.querySelector("#image-modal")) return;
  const modal = document.createElement("div");
  modal.className = "image-modal";
  modal.id = "image-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Illustration");
  const modalTimer = state.stage === "draw" ? `<span class="modal-timer" aria-label="${formatTime(state.secondsLeft)}">${formatTime(state.secondsLeft)}</span>` : "";
  modal.innerHTML = `<div class="modal-toolbar"><span></span><div class="modal-controls">${modalTimer}<button class="modal-close" type="button" data-action="close-fullscreen" aria-label="Fermer">${icon("close", 22)}</button></div></div><img src="${state.card.image}" alt="Illustration" />`;
  document.body.append(modal);
  document.body.classList.add("modal-open");
  modal.querySelector("button").focus();
}

function closeFullscreen() {
  document.querySelector("#image-modal")?.remove();
  document.body.classList.remove("modal-open");
}

function startTimer() {
  state.stage = "draw";
  state.secondsLeft = 90;
  state.timerEnd = Date.now() + 90_000;
  renderDraw();
  state.timer = window.setInterval(() => {
    state.secondsLeft = Math.max(0, Math.ceil((state.timerEnd - Date.now()) / 1000));
    const readouts = document.querySelectorAll(".timer-readout, .modal-timer");
    readouts.forEach((readout) => {
      readout.textContent = formatTime(state.secondsLeft);
      readout.setAttribute("aria-label", `${state.secondsLeft} secondes restantes`);
    });
    const progress = document.querySelector(".timer-progress");
    if (progress) progress.style.width = `${(state.secondsLeft / 90) * 100}%`;
    if (state.secondsLeft <= 0) renderCorrection();
  }, 200);
}

app.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "start-timer") startTimer();
  else if (action === "finish") renderCorrection();
  else if (action === "next") prepareRound();
  else if (action === "fullscreen") openFullscreen();
  else if (action === "close-fullscreen") closeFullscreen();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeFullscreen();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible" || state.stage !== "draw") return;
  state.secondsLeft = Math.max(0, Math.ceil((state.timerEnd - Date.now()) / 1000));
  if (state.secondsLeft <= 0) renderCorrection();
});

if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));

prepareRound();
