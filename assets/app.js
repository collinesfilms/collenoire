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
    docTitle:    "Titre de l'œuvre — Château de la Colle Noire",
    title:       "Titre de l'œuvre",
    artist:      "Prénom Nom",
    meta:        "2026",
    spec:        "Film, couleur, son — 4:32",

    p1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    p2: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    creditsLabel: "Générique",
    cRole1: "Œuvre",      cName1: "Prénom Nom",
    cRole2: "Film",       cName2: "Prénom Nom",
    cRole3: "Image",      cName3: "Prénom Nom",
    cRole4: "Montage",    cName4: "Prénom Nom",
    cRole5: "Son",        cName5: "Prénom Nom",
    cRole6: "Production", cName6: "Prénom Nom",
    cRole7: "Lieu",       cName7: "Château de la Colle Noire, Montauroux",

    play: "Lire le film", pause: "Pause", resume: "Lecture",
    seek: "Position dans le film",
    mute: "Couper le son", unmute: "Rétablir le son",
    full: "Plein écran",
    langSwitch: "Switch to English"
  },

  en: {
    docTitle:    "Title of the Work — Château de la Colle Noire",
    title:       "Title of the Work",
    artist:      "First Last",
    meta:        "2026",
    spec:        "Film, colour, sound — 4:32",

    p1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    p2: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    creditsLabel: "Credits",
    cRole1: "Work",       cName1: "First Last",
    cRole2: "Film",       cName2: "First Last",
    cRole3: "Cinematography", cName3: "First Last",
    cRole4: "Editing",    cName4: "First Last",
    cRole5: "Sound",      cName5: "First Last",
    cRole6: "Production", cName6: "First Last",
    cRole7: "Location",   cName7: "Château de la Colle Noire, Montauroux",

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

const credits = document.querySelector('.credits');
credits.addEventListener('toggle', checkSnap);
window.addEventListener('resize', checkSnap);
checkSnap();

/* ── 5. Générique : ouverture animée ────────────────────────── */

/* <details> ne s'anime pas tout seul. On prend donc la main sur le clic :
   à l'ouverture on ouvre d'abord pour pouvoir mesurer, à la fermeture on
   laisse ouvert jusqu'à la fin de l'animation — sinon le navigateur
   escamote le contenu à la première image et il n'y a plus rien à animer. */

const credHead = credits.querySelector('.credits__head');
const credBody = credits.querySelector('.credits__body');
const EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
const calm = matchMedia('(prefers-reduced-motion: reduce)');
let credAnim = null;

credHead.addEventListener('click', e => {
  e.preventDefault();
  if (calm.matches) { credits.open = !credits.open; return; }

  if (credAnim) credAnim.cancel();
  const closing = credits.open;
  credits.open = true;                       // ouvert dans les deux cas, le temps de l'animation

  const h = credBody.scrollHeight + 'px';
  credAnim = credBody.animate(
    { height: closing ? [h, '0px'] : ['0px', h],
      opacity: closing ? [1, 0] : [0, 1] },
    { duration: 380, easing: EASE }
  );

  credAnim.onfinish = () => {
    credAnim = null;
    if (closing) credits.open = false;       // la fermeture réelle, une fois l'animation finie
    checkSnap();
  };
  credAnim.oncancel = () => { credAnim = null; };
});

/* L'invite à défiler disparaît dès le premier geste. */
const cue = document.getElementById('cue');
document.getElementById('scroll').addEventListener('scroll', function once() {
  cue.classList.add('is-gone');
  this.removeEventListener('scroll', once);
}, { passive: true });

translate('fr');
