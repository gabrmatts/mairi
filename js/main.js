/* MAIRI — interações (JavaScript puro) */

/* CONFIGURAÇÃO — preencha antes de publicar */
const CONFIG = {
  whatsapp: "",                       // DDI+DDD+número, só dígitos. Ex.: "5591900000000"
  mensagem: "Olá! Gostaria de conversar com a Mairi.",
  video: "",                          // link do YouTube/Vimeo ou arquivo .mp4 (ex.: "video/mairi.mp4")
  social: {},                         // ex.: { instagram: "https://...", linkedin: "https://..." }
  depoimentos: []                     // ex.: [{ texto: "...", nome: "Nome, empreendimento" }] — só reais
};

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* imagens ausentes: esconde e deixa o fundo colorido (logo vira texto) */
$$('img').forEach(i => {
  const miss = () => i.classList.add('miss');
  i.addEventListener('error', miss);
  if (i.complete && !i.naturalWidth) miss();
});

/* ano, WhatsApp e redes */
$('#yr').textContent = new Date().getFullYear();
const num = (CONFIG.whatsapp || '').replace(/\D/g, '');
const wa = num ? `https://wa.me/${num}?text=${encodeURIComponent(CONFIG.mensagem)}` : null;
$$('[data-wa]').forEach(a => { if (wa) { a.href = wa; a.target = '_blank'; a.rel = 'noopener'; } });
$('#wa-line').innerHTML = wa ? `<a href="${wa}" target="_blank" rel="noopener">WhatsApp: +${num}</a>` : 'WhatsApp: em breve';
const soc = Object.entries(CONFIG.social);
$('#soc').innerHTML = soc.length
  ? soc.map(([k, v]) => `<a href="${v}" target="_blank" rel="noopener" style="text-transform:capitalize">${k}</a>`).join(' · ')
  : 'Redes sociais: em breve';

/* depoimentos reais (bloco só aparece se houver) */
if (CONFIG.depoimentos.length) {
  const box = $('#dep');
  CONFIG.depoimentos.forEach(d => {
    const f = document.createElement('figure');
    const q = document.createElement('blockquote'); q.textContent = d.texto;
    const c = document.createElement('cite'); c.textContent = d.nome;
    f.append(q, c); box.append(f);
  });
  box.hidden = false;
}

/* vídeo (VSL) */
const vsl = $('#vsl'), note = $('#vnote');
if (!CONFIG.video) note.textContent = 'Vídeo institucional em breve.';
$('#play').addEventListener('click', () => {
  const u = CONFIG.video;
  if (!u) { note.textContent = 'Vídeo institucional em breve.'; return; }
  const yt = u.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/), vm = u.match(/vimeo\.com\/(\d+)/);
  vsl.classList.add('on');
  vsl.innerHTML = yt
    ? `<iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0" title="Vídeo institucional da Mairi" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`
    : vm
      ? `<iframe src="https://player.vimeo.com/video/${vm[1]}?autoplay=1" title="Vídeo institucional da Mairi" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
      : `<video src="${u}" controls autoplay playsinline></video>`;
});

/* menu mobile */
const bg = $('#bg'), menu = $('#menu');
const toggleMenu = open => {
  menu.classList.toggle('open', open);
  bg.setAttribute('aria-expanded', open);
  bg.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menu.setAttribute('aria-hidden', !open);
  document.body.style.overflow = open ? 'hidden' : '';
};
bg.addEventListener('click', () => toggleMenu(!menu.classList.contains('open')));
$$('a', menu).forEach(a => a.addEventListener('click', () => toggleMenu(false)));
addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });

/* entrada suave dos blocos */
const items = $$('[data-r]');
if (rm || !('IntersectionObserver' in window)) items.forEach(el => el.classList.add('in'));
else {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  items.forEach(el => io.observe(el));
}

/* header, botão flutuante e seção ativa */
const onScroll = () => {
  $('#hd').classList.toggle('on', scrollY > 40);
  document.body.classList.toggle('past', scrollY > 600);
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();
if ('IntersectionObserver' in window) {
  const links = $$('nav a');
  const so = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('act', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['mairi', 'atuacao', 'olhar', 'qa', 'contato'].forEach(id => { const s = document.getElementById(id); if (s) so.observe(s); });
}