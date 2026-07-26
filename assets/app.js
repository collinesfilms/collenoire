/* ─────────────────────────────────────────────────────────────
   Colle Noire — page cartel
   1. Traductions   2. Lecteur   3. Révélation du texte
   ───────────────────────────────────────────────────────────── */

document.documentElement.classList.add('js');

/* ── 1. Traductions ─────────────────────────────────────────
   Tout le texte de la page vit ici. Modifie-le ici, pas dans
   le HTML : les deux langues doivent rester en regard.        */

const STRINGS = {
  fr: {
    docTitle:    "Apparaître l'Arc-en-Ciel — Château de la Colle Noire",
    title:       "Apparaître l'Arc-en-Ciel",
    artist:      "Anna Giner",
    meta:        "2026",
    spec:        "Film, couleur, son — 4:52",

    p1: "Apparaître l'Arc-en-Ciel (2026) transforme l'oliveraie du château de la Colle Noire en un petit théâtre, où, sous les yeux d'un public émerveillé, deux illusionnistes font surgir un arc-en-ciel. Après le départ des visiteurs le phénomène réapparaît en pleine nuit, comme s'il retrouvait une existence propre, presque sauvage, à l'abri des regards humains.",
    p2: "Le film s'inspire d'études récentes pointant la raréfaction des conditions d'apparition des arcs-en-ciel en Europe méditerranéenne sous l'effet du réchauffement climatique. Il imagine un futur où le phénomène naturel serait devenu si rare qu'il ne pourrait plus être admiré qu'à l'occasion de spectacles qui lui seraient dédiés. Entre féérie et réflexion environnementale, le film interroge l'impact du changement climatique sur le paysage, nos émotions et notre imaginaire collectif.",

    /* Générique abrégé : le générique complet défile à la fin du film.
       On garde ici ce qu'un visiteur peut vouloir retrouver. */
    creditsLabel: "Générique",
    cRole1:  "Réalisation",           cName1:  "Anna Giner",
    cRole2:  "Avec",                  cName2:  "Kris Bole · Laëtitia Chaboche",
    cRole3:  "Assistant réalisateur", cName3:  "Édouard Licoys",
    cRole4:  "Chef opérateur",        cName4:  "Adrian Cacciola",
    cRole5:  "Assistante caméra",     cName5:  "Gaëlle Monfort",
    cRole6:  "Chef machiniste",       cName6:  "Angel Manach",
    cRole7:  "Ingénieur du son",      cName7:  "Gauthier Hammer",
    cRole8:  "Montage",               cName8:  "Anna Giner · Adrian Cacciola",
    cRole9:  "Montage et mixage son", cName9:  "Gauthier Hammer",
    cRole10: "Étalonnage et VFX",     cName10: "Adrian Cacciola",
    cRole11: "Production",            cName11: "Clément Château · Laurent Hopp",
    cRole12: "Lieu",                  cName12: "Château de la Colle Noire, Montauroux",

    play: "Lire le film", pause: "Pause", resume: "Lecture",
    seek: "Position dans le film",
    mute: "Couper le son", unmute: "Rétablir le son",
    full: "Plein écran",
    langSwitch: "Switch to English"
  },

  en: {
    docTitle:    "Apparaître l'Arc-en-Ciel — Château de la Colle Noire",
    title:       "Apparaître l'Arc-en-Ciel",
    artist:      "Anna Giner",
    meta:        "2026",
    spec:        "Film, colour, sound — 4:52",

    p1: "Apparaître l'Arc-en-Ciel (2026) turns the olive grove of the Château de la Colle Noire into a small theatre, where, before an enchanted audience, two illusionists conjure up a rainbow. After the visitors leave, the phenomenon reappears in the dead of night, as though reclaiming a life of its own — wild, almost, and sheltered from human eyes.",
    p2: "The film draws on recent studies pointing to the increasing rarity of the conditions needed for rainbows to appear in Mediterranean Europe as a result of global warming. It imagines a future in which the natural phenomenon has become so rare that it can only be admired at shows staged in its honour. Between wonder and environmental reflection, the film questions the impact of climate change on landscape, on our emotions, and on our collective imagination.",

    creditsLabel: "Credits",
    cRole1:  "Director",                 cName1:  "Anna Giner",
    cRole2:  "With",                     cName2:  "Kris Bole · Laëtitia Chaboche",
    cRole3:  "First Assistant Director", cName3:  "Édouard Licoys",
    cRole4:  "Director of Photography",  cName4:  "Adrian Cacciola",
    cRole5:  "Camera Assistant",         cName5:  "Gaëlle Monfort",
    cRole6:  "Key Grip",                 cName6:  "Angel Manach",
    cRole7:  "Sound Engineer",           cName7:  "Gauthier Hammer",
    cRole8:  "Editing",                  cName8:  "Anna Giner · Adrian Cacciola",
    cRole9:  "Sound Editing & Mixing",   cName9:  "Gauthier Hammer",
    cRole10: "Colour Grading & VFX",     cName10: "Adrian Cacciola",
    cRole11: "Production",               cName11: "Clément Château · Laurent Hopp",
    cRole12: "Location",                 cName12: "Château de la Colle Noire, Montauroux",

    play: "Play film", pause: "Pause", resume: "Play",
    seek: "Seek",
    mute: "Mute", unmute: "Unmute",
    full: "Fullscreen",
    langSwitch: "Passer en français"
  }
};

let lang = 'fr';

const langBtn = document.getElementById('lang');

function translate(to) {
  lang = to;
  const t = STRINGS[to];

  document.documentElement.lang = to;
  document.title = t.docTitle;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const v = t[el.dataset.i18nAria];
    if (v !== undefined) el.setAttribute('aria-label', v);
  });

  // Les libellés que l'état du lecteur pilote, remis d'aplomb.
  syncPlayLabel();
  syncMuteLabel();

  langBtn.querySelector('.lang__on').textContent  = to.toUpperCase();
  langBtn.querySelector('.lang__off').textContent = to === 'fr' ? 'EN' : 'FR';
  langBtn.setAttribute('aria-label', t.langSwitch);
}

langBtn.addEventListener('click', () => translate(lang === 'fr' ? 'en' : 'fr'));

/* ── 2. Lecteur ─────────────────────────────────────────────── */

const player  = document.getElementById('player');
const film    = document.getElementById('film');
const playBtn = document.getElementById('playBtn');
const toggle  = document.getElementById('toggle');
const seek    = document.getElementById('seek');
const cur     = document.getElementById('cur');
const dur     = document.getElementById('dur');
const muteBtn = document.getElementById('mute');
const fullBtn = document.getElementById('full');

// On avait laissé les contrôles natifs pour le cas sans JS.
film.removeAttribute('controls');
player.classList.add('is-paused');

const clock = s =>
  (!isFinite(s) || s < 0) ? '0:00'
  : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

function syncPlayLabel() {
  const t = STRINGS[lang];
  toggle.setAttribute('aria-label', film.paused ? t.resume : t.pause);
  playBtn.setAttribute('aria-label', t.play);
}
function syncMuteLabel() {
  muteBtn.setAttribute('aria-label', film.muted ? STRINGS[lang].unmute : STRINGS[lang].mute);
}

function start() {
  player.classList.add('is-started');
  film.play();
  showBar();
}

playBtn.addEventListener('click', start);
toggle.addEventListener('click', () => film.paused ? film.play() : film.pause());

/* Un tap sur l'image bascule la lecture, une fois le film lancé. On écoute
   sur le conteneur plutôt que sur la vidéo — plus sûr — en laissant passer
   ce qui vient des contrôles ou de l'affiche, dont le clic a déjà un sens. */
player.addEventListener('click', e => {
  if (!player.classList.contains('is-started')) return;
  if (e.target.closest('.player__bar, .player__poster')) return;
  film.paused ? film.play() : film.pause();
});

film.addEventListener('play',  () => {
  player.classList.add('is-playing');
  player.classList.remove('is-paused');
  syncPlayLabel();
  hideBarSoon();
});

film.addEventListener('pause', () => {
  player.classList.remove('is-playing');
  player.classList.add('is-paused');
  syncPlayLabel();
  showBar();          // en pause, la barre reste
  clearTimeout(barTimer);
});

film.addEventListener('ended', () => {
  // Retour à l'affiche : l'œuvre se repose.
  player.classList.remove('is-started');
  film.currentTime = 0;
});

film.addEventListener('loadedmetadata', () => { dur.textContent = clock(film.duration); });

film.addEventListener('timeupdate', () => {
  if (scrubbing || !isFinite(film.duration)) return;
  const pct = (film.currentTime / film.duration) * 100;
  seek.value = Math.round(pct * 10);
  seek.style.setProperty('--pct', pct + '%');
  cur.textContent = clock(film.currentTime);
});

/* Scrub */
let scrubbing = false;
const seekTo = () => {
  if (!isFinite(film.duration)) return;
  const pct = seek.value / 10;
  film.currentTime = (pct / 100) * film.duration;
  seek.style.setProperty('--pct', pct + '%');
  cur.textContent = clock(film.currentTime);
};
seek.addEventListener('pointerdown', () => { scrubbing = true; });
seek.addEventListener('pointerup',   () => { scrubbing = false; });
seek.addEventListener('input', seekTo);

muteBtn.addEventListener('click', () => {
  film.muted = !film.muted;
  player.classList.toggle('is-muted', film.muted);
  syncMuteLabel();
});

fullBtn.addEventListener('click', () => {
  if (document.fullscreenElement) { document.exitFullscreen(); return; }
  if (player.requestFullscreen)              player.requestFullscreen();
  else if (film.webkitEnterFullscreen)       film.webkitEnterFullscreen(); // iOS : vidéo seule
});

/* Barre : visible au survol/toucher, s'efface pendant la lecture */
let barTimer;
const showBar = () => { player.classList.add('show-bar'); };
const hideBarSoon = () => {
  clearTimeout(barTimer);
  barTimer = setTimeout(() => {
    if (!film.paused) player.classList.remove('show-bar');
  }, 2600);
};
const wake = () => { showBar(); if (!film.paused) hideBarSoon(); };

player.addEventListener('pointerdown', wake, { passive: true });
player.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') wake(); }, { passive: true });

/* Souris uniquement. Au toucher, pointerleave se déclenche dès que le doigt
   se lève — le pointeur cesse d'exister — et escamotait la barre à chaque
   tap, un dixième de seconde après l'avoir montrée. */
player.addEventListener('pointerleave', e => {
  if (e.pointerType !== 'mouse') return;
  if (!film.paused) player.classList.remove('show-bar');
});

/* Clavier */
document.addEventListener('keydown', e => {
  if (e.target.matches('input, button, summary')) return;
  switch (e.key) {
    case ' ': case 'k': e.preventDefault(); player.classList.contains('is-started') ? (film.paused ? film.play() : film.pause()) : start(); break;
    case 'ArrowLeft':   film.currentTime -= 5; break;
    case 'ArrowRight':  film.currentTime += 5; break;
    case 'm':           muteBtn.click(); break;
    case 'f':           fullBtn.click(); break;
  }
});

/* ── 3. Révélation du texte ─────────────────────────────────── */

const inner = document.getElementById('contextInner');
new IntersectionObserver(
  ([entry]) => inner.classList.toggle('is-revealed', entry.intersectionRatio > 0.3),
  { threshold: [0, 0.3, 1] }
).observe(inner);

/* Le film s'arrête quand il n'est plus au centre. On ne le relance pas
   tout seul au retour : reprendre le son sans qu'on l'ait demandé
   surprendrait plus que ça n'aiderait. */
new IntersectionObserver(
  ([entry]) => { if (entry.intersectionRatio < 0.5 && !film.paused) film.pause(); },
  { threshold: [0, 0.5, 1] }
).observe(document.getElementById('stage'));

/* ── 4. Garde-fou du snap ───────────────────────────────────── */

const scroller = document.getElementById('scroll');
const context  = document.getElementById('context');

/* Sous « mandatory », le navigateur exige de se poser sur un point
   d'accroche. Une section plus haute que l'écran n'en a qu'un, en haut :
   son bas devient alors inatteignable. On mesure, et on relâche s'il faut. */
function checkSnap() {
  scroller.classList.toggle('is-loose', context.scrollHeight > scroller.clientHeight);
}

/* Même mesure, mais après une ouverture ou une fermeture du générique.
   Repasser en « mandatory » replace le défilement d'autorité : le
   navigateur saute sans prévenir au point d'accroche le plus proche —
   c'est de là que venaient les à-coups. On se pose donc nous-mêmes, sans
   animation, avant de lui rendre la main. */
function settleSnap() {
  if (context.scrollHeight > scroller.clientHeight) {
    scroller.classList.add('is-loose');
    return;
  }
  const top = scroller.scrollTop
            + context.getBoundingClientRect().top
            - scroller.getBoundingClientRect().top;

  const behavior = scroller.style.scrollBehavior;
  scroller.style.scrollBehavior = 'auto';   // sinon le recalage se voit
  scroller.scrollTop = top;
  scroller.classList.remove('is-loose');    // déjà posé : plus rien à saisir
  scroller.style.scrollBehavior = behavior;
}

const credits = document.querySelector('.credits');
window.addEventListener('resize', checkSnap);
checkSnap();

/* ── 5. Générique : ouverture animée ────────────────────────── */

/* <details> ne s'anime pas tout seul. On prend donc la main sur le clic :
   à l'ouverture on ouvre d'abord pour pouvoir mesurer, à la fermeture on
   laisse ouvert jusqu'à la fin de l'animation — sinon le navigateur
   escamote le contenu à la première image et il n'y a plus rien à animer. */

const credHead = credits.querySelector('.credits__head');
const credBody = credits.querySelector('.credits__body');
const prose    = document.querySelector('.prose');
const EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
const calm = matchMedia('(prefers-reduced-motion: reduce)');
let credAnim = null;
let proseAnim = null;

/* L'état de repos, posé d'un bloc : tant qu'on le fait en une seule fois,
   rien ne peut se peindre entre deux moitiés d'état. */
function rest(open) {
  credits.open = open;
  prose.classList.toggle('is-hidden', open);
  prose.setAttribute('aria-hidden', open ? 'true' : 'false');
}

/* Le texte s'efface pendant que le générique prend sa place : les deux
   animations tournent en parallèle, même durée et même easing, pour que
   le générique atterrisse pile au centre de l'écran (le snap ne bouge
   pas — c'est le contenu qui se redistribue autour de lui) sans à-coup. */
credHead.addEventListener('click', e => {
  /* L'intention se lit sur la classe, pas sur `open` : à la fermeture ce
     dernier reste vrai le temps de l'animation, et un second tap pendant
     ce temps-là repartait fermer ce qui se fermait déjà. */
  e.preventDefault();
  const closing = credits.classList.contains('is-open');

  credits.classList.toggle('is-open', !closing);   // le « + » se retourne tout de suite

  if (calm.matches) {
    rest(!closing);
    settleSnap();
    return;
  }

  /* Une animation en cours ? On note où elle en est pour repartir de là :
     sans ça, l'interruption ramène brutalement à la hauteur de départ. */
  const from = credAnim && { c: credBody.getBoundingClientRect().height,
                             p: prose.getBoundingClientRect().height };
  if (credAnim)  credAnim.cancel();
  if (proseAnim) proseAnim.cancel();

  credits.open = true;                       // ouvert dans les deux cas, le temps de l'animation
  prose.classList.remove('is-hidden');        // idem : mesurable dans les deux cas

  /* Relâché pendant toute l'animation : une accroche obligatoire qui
     reprend la main en plein vol arrache le défilement. */
  scroller.classList.add('is-loose');

  const h  = credBody.scrollHeight || 1;
  const ph = prose.scrollHeight    || 1;

  const c0 = from ? from.c : (closing ? h : 0);
  const p0 = from ? from.p : (closing ? 0 : ph);
  const c1 = closing ? 0 : h;
  const p1 = closing ? ph : 0;

  /* Le chemin restant est plus court après une interruption : on raccourcit
     la durée d'autant, sinon la reprise traîne. */
  const travel = Math.max(Math.abs(c1 - c0) / h, Math.abs(p1 - p0) / ph);

  /* fill: 'both' — sans lui, la dernière image rend l'élément à son état
     CSS de base (générique déplié, texte entier) le temps d'une frame,
     avant que le code ci-dessous ne verrouille l'état de repos. */
  const opts = { duration: Math.max(160, Math.round(380 * travel)),
                 easing: EASE, fill: 'both' };

  credAnim = credBody.animate(
    { height:  [c0 + 'px', c1 + 'px'],
      opacity: [c0 / h,    c1 / h] },
    opts
  );
  proseAnim = prose.animate(
    { height:  [p0 + 'px', p1 + 'px'],
      opacity: [p0 / ph,   p1 / ph] },
    opts
  );

  /* Un seul point d'arrivée pour les deux animations. Un clic pendant
     l'animation les annule : la promesse est rejetée, et ce bloc — devenu
     caduc — ne s'exécute pas. On garde les deux animations sous la main
     plutôt que de relire les variables, qu'un clic aurait pu remplacer. */
  const mine = [credAnim, proseAnim];
  Promise.all(mine.map(a => a.finished)).then(() => {
    rest(!closing);
    mine.forEach(a => a.cancel());     // le fill rendu, le CSS reprend la main
    if (credAnim === mine[0]) credAnim = proseAnim = null;
    settleSnap();
  }).catch(() => {});   // annulée : le clic suivant a déjà pris le relais
});

/* L'invite à défiler disparaît dès le premier geste. */
const cue = document.getElementById('cue');
document.getElementById('scroll').addEventListener('scroll', function once() {
  cue.classList.add('is-gone');
  this.removeEventListener('scroll', once);
}, { passive: true });

translate('fr');
