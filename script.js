const pages = {
  landing: { src: 'assets/landing.png', alt: 'Gutcheck Coaching intro page' },
  home: { src: 'assets/home.png', alt: 'Gutcheck Coaching home page' },
  about: { src: 'assets/about.png', alt: 'Gutcheck Coaching about page' },
  coaching: { src: 'assets/coaching.png', alt: 'Gutcheck Coaching coaching page' },
  process: { src: 'assets/process.png', alt: 'Gutcheck Coaching process page' },
  contact: { src: 'assets/contact.png', alt: 'Gutcheck Coaching contact page' }
};

const nav = [
  ['home', 22, 2, 7, 6],
  ['about', 29, 2, 8, 6],
  ['coaching', 38, 2, 10, 6],
  ['process', 50, 2, 9, 6],
  ['contact', 65, 2, 9, 6],
  ['contact', 86, 1, 12, 7]
];

const pageSpecific = {
  landing: [
    ['home', 0, 0, 100, 100],
    ['contact', 68.5, 88, 23, 7]
  ],
  home: [
    ['coaching', 7, 52, 14, 5],
    ['contact', 23, 52, 14, 5]
  ],
  about: [
    ['contact', 6, 52, 17, 5]
  ],
  coaching: [
    ['contact', 27, 68.5, 46, 5]
  ],
  process: [],
  contact: []
};

const image = document.getElementById('pageImage');
const hotspots = document.getElementById('hotspots');
const contactForm = document.getElementById('contactForm');
let currentPage = 'home';

function makeHotspot(target, x, y, w, h, label) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'hotspot';
  b.style.left = x + '%';
  b.style.top = y + '%';
  b.style.width = w + '%';
  b.style.height = h + '%';
  b.setAttribute('aria-label', label || `Go to ${target}`);
  b.addEventListener('click', () => go(target));
  return b;
}

function renderHotspots(page) {
  hotspots.innerHTML = '';
  if (page !== 'landing') nav.forEach(([target, x, y, w, h]) => hotspots.appendChild(makeHotspot(target, x, y, w, h)));
  (pageSpecific[page] || []).forEach(([target, x, y, w, h]) => hotspots.appendChild(makeHotspot(target, x, y, w, h)));
}

function go(page, replace = false) {
  if (!pages[page]) return;
  currentPage = page;
  document.body.dataset.page = page;
  image.classList.add('changing');
  window.setTimeout(() => {
    image.src = pages[page].src;
    image.alt = pages[page].alt;
    renderHotspots(page);
    image.onload = () => image.classList.remove('changing');
    if (replace) history.replaceState({ page }, '', `#${page}`);
    else history.pushState({ page }, '', `#${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 180);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  const subject = encodeURIComponent('New Gutcheck Coaching Message');
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
  window.location.href = `mailto:thegutcheckcoaching@gmail.com?subject=${subject}&body=${body}`;
});

document.querySelectorAll('[data-go]').forEach(btn => btn.addEventListener('click', () => go(btn.dataset.go)));
window.addEventListener('popstate', () => go((location.hash || '#home').slice(1), true));

go((location.hash || '#home').slice(1), true);
