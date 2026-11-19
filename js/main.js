/* MAIRI — interações (JavaScript puro) */

/* CONFIGURAÇÃO — preencha antes de publicar.
   whatsapp: DDI + DDD + número, só dígitos. Ex.: "5591900000000"
   social: ex.: { instagram: "https://...", linkedin: "https://..." } */
const CONFIG = {
    whatsapp: "",
    mensagem: "Olá! Gostaria de conversar com a Mairi.",
    social: {}
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

/* títulos: palavra por palavra */
function split(el) {
    let i = 0;
    const walk = n => [...n.childNodes].forEach(c => {
        if (c.nodeType === 3) {
            const frag = document.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach(t => {
                if (!t) return;
                if (/^\s+$/.test(t)) { frag.append(' '); return; }
                const w = document.createElement('span'); w.className = 'w';
                const b = document.createElement('b'); b.textContent = t; b.style.setProperty('--i', i++);
                w.append(b); frag.append(w);
            });
            c.replaceWith(frag);
        } else walk(c);
    });
    walk(el);
}
$$('[data-split]').forEach(split);

/* revelação ao entrar na tela */
const targets = $$('[data-rv],[data-split],[data-mask]');
if (rm || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('in'));
} else {
    const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(el => io.observe(el));
}

/* marquee: duplica o conteúdo para o loop ficar contínuo */
$$('.marq div').forEach(m => { m.innerHTML += m.innerHTML; });

/* seção ativa no menu */
if ('IntersectionObserver' in window) {
    const links = $$('nav a');
    const so = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) links.forEach(a => a.classList.toggle('act', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    ['inicio', 'mairi', 'atuacao', 'olhar', 'contato'].forEach(id => { const s = document.getElementById(id); if (s) so.observe(s); });
}

/* público: miniatura segue o mouse (desktop) / toque abre a foto (celular) */
$$('.pub li').forEach(li => {
    li.addEventListener('mousemove', e => {
        li.style.setProperty('--x', e.clientX + 28 + 'px');
        li.style.setProperty('--y', e.clientY - 140 + 'px');
    });
    const tap = () => { if (matchMedia('(hover: none)').matches) li.classList.toggle('open'); };
    li.addEventListener('click', tap);
    li.addEventListener('keydown', e => { if (e.key === 'Enter') tap(); });
});

/* rolagem: header, progresso, parallax e antes/depois da origem */
const header = $('#hd'), prog = $('#prog');
const speeds = $$('[data-speed]'), scrubs = $$('[data-scrub]');
if (rm) scrubs.forEach(el => el.style.setProperty('--p', .5));
let ticking = false;
function update() {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    header.classList.toggle('on', y > 60);
    const max = document.documentElement.scrollHeight - vh;
    prog.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    if (rm) return;
    speeds.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        el.style.translate = `0 ${((r.top + r.height / 2 - vh / 2) * -el.dataset.speed).toFixed(1)}px`;
    });
    scrubs.forEach(el => {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
        el.style.setProperty('--p', p.toFixed(4));
    });
}
const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
addEventListener('scroll', req, { passive: true });
addEventListener('resize', req);
update();