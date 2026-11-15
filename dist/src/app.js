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
const ROUND_DURATION = 90_000;
const state = {
  stage: "ready",
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
    <span class="time-sticker">90<span>secondes</span></span>
  </div>`;
}

function renderReady() {
  state.stage = "ready";
  stage.className = "screen ready-screen";
  const firstRound = state.roundsPlayed === 0;
  stage.innerHTML = `
    <section class="welcome">
      ${homeArtwork()}
      <h1>${firstRound ? 'À vos<br/><span>gribouillis !</span>' : 'Au prochain<br/><span>narrateur !</span>'}</h1>
      <p>${firstRound ? 'Un joueur décrit l’image, les autres dessinent sur papier. Puis, on compare !' : 'Passez le téléphone. La nouvelle image se dévoile au départ du chrono.'}</p>
    </section>
    <div class="round-action"><button class="primary-button" type="button" data-action="start">Commencer la manche ${arrow}</button></div>`;
  window.scrollTo(0, 0);
}

function chooseCard() {
  if (state.deckPosition >= state.deck.length) {
    state.deck = shuffle(cards.map((_, index) => index));
    state.deckPosition = 0;
  }
  state.card = cards[state.deck[state.deckPosition++]];
  state.roundsPlayed += 1;
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
    [{ transform: `scaleX(${remaining / ROUND_DURATION})` }, { transform: "scaleX(0)" }],
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
  const button = stage.querySelector("button");
  button.disabled = true;
  chooseCard();
  // Load the model before the 90 seconds begin.
  const model = new Image();
  model.src = state.card.image;
  try { await model.decode(); } catch { /* A cached image can still render. */ }
  state.secondsLeft = 90;
  state.timerEnd = Date.now() + ROUND_DURATION;
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

app.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "start") startRound();
  else if (action === "correct") renderCorrection();
  else if (action === "next" && state.stage === "correction") renderReady();
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

renderReady();
