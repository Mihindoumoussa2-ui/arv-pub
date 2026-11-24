let slides = document.querySelectorAll('.slide');
let audio = document.getElementById('voix');
let btn = document.getElementById('soundBtn');
let bar = document.getElementById('bar');
let timer = null;
let current = 0;

// TA VOIX FAIT 1 MIN 39 = 99 SECONDES
let DUREE_TOTALE = 99;

// Temps de chaque slide, calculé pour 99s, voix et écrits finissent ensemble
let temps = [0, 7, 25, 45, 66, 81];

function show(i){
  // Sécurité anti-noir : si i dépasse, on reste sur le dernier slide
  if(i >= slides.length) i = slides.length - 1;
  if(i < 0) i = 0;
  current = i;
  slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
  let anims = slides[i].querySelectorAll('.anim');
  anims.forEach(a => { a.style.animation = 'none'; void a.offsetWidth; a.style.animation = ''; });
}

function start(){
  clearInterval(timer);
  show(0);
  timer = setInterval(() => {
    let t = audio.currentTime;
    let idx = 0;
    temps.forEach((tp, i) => { if(t >= tp) idx = i; });
    if(idx !== current) show(idx);
    let pct = (t / DUREE_TOTALE) * 100;
    if(pct > 100) pct = 100;
    bar.style.width = pct + '%';

    // FIN : à 99s on reste sur le slide Contact, on ne met JAMAIS noir
    if(audio.ended || t >= DUREE_TOTALE - 0.2){
      clearInterval(timer);
      show(5);
      bar.style.width = '100%';
      btn.style.display = 'block';
      btn.textContent = '▶ REVOIR LA PUB';
    }
  }, 100);
}

btn.addEventListener('click', () => {
  if(audio.ended) audio.currentTime = 0;
  audio.play();
  btn.style.display = 'none';
  start();
});