(() => {
  const WHATSAPP_NUMBER = ""; // Ex.: "5591999999999" (DDI+DDD+número). Vazio abre o WhatsApp para escolher o contato.
  const FORM_ENDPOINT = ""; // Opcional: URL de um serviço de formulários (ex.: Formspree). Vazio envia pelo WhatsApp.
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ic = p => `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.500" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  // conteúdo
  const desafios = [["Dificuldade de acesso a novos mercados", '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>'], ["Baixa visibilidade comercial", '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>'], ["Dependência de atravessadores", '<path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/>'], ["Dificuldade de posicionamento de marca", '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3"/>'], ["Ausência de estratégias de comunicação", '<path d="M4 5h16v11H9l-5 4z"/>'], ["Dificuldade de fidelização de clientes", '<path d="M12 21s-8-5-8-11a4.500 4.500 0 018-2.700A4.500 4.500 0 0120 10c0 6-8 11-8 11z"/>']];
  const dd = ["Bons produtos ficam restritos ao entorno quando faltam canais e estratégia de inserção.", "Sem presença estruturada, o valor do que se produz não é percebido.", "Quem intermedeia captura margem e afasta o produtor do consumidor final.", "A marca ainda não comunica tudo o que o empreendimento tem de único.", "Falta planejamento para contar a história de forma consistente e contínua.", "Sem relacionamento e pós-venda, a primeira compra raramente vira a segunda."];
  $("#dg").innerHTML = desafios.map((d, i) => `<article class="card rv" style="--d:${(i % 3) * .1}s"><span class="n">0${i + 1}</span>${ic(d[1])}<h3>${d[0]}</h3><p>${dd[i]}</p></article>`).join("");
  const dif = ["Especialização nas dimensões culturais e socioeconômicas locais", "Respeito aos saberes tradicionais", "Marketing ético", "Valorização identitária", "Conexão entre produção sustentável e mercados justos"];
  $("#dif").innerHTML = dif.map((t, i) => `<li class="rv" style="--d:${i * .08}s"><svg viewBox="0 0 24 24"><use href="#spica"/></svg>${t}</li>`).join("");
  const faq = [["O que é a Mairi Consultoria em Marketing?", "A Mairi é uma consultoria de marketing e marketing digital voltada a empreendimentos dos Povos Tradicionais das Amazônias, unindo estratégia de negócios e valorização de identidades locais."],
  ["Para quem são os serviços da Mairi?", "Para empreendimentos tradicionais da Amazônia, como associações, cooperativas e empresas que desejam ampliar sua presença no mercado preservando sua identidade."],
  ["Quais serviços são oferecidos?", "Planejamento de marketing e marketing digital, criação de conteúdo para mídias sociais e planejamento de fidelização e pós-venda."],
  ["Como funciona o planejamento de marketing?", "Começamos conhecendo o empreendimento e seus desafios. A partir disso, definimos estratégias, estruturamos canais e planejamos a inserção mercadológica."],
  ["A Mairi atende empreendimentos de diferentes regiões da Amazônia?", "A Mairi atua com foco nos empreendimentos dos Povos Tradicionais das Amazônias. Fale conosco para conversarmos sobre a realidade do seu território."],
  ["Como posso solicitar uma consultoria?", "Basta chamar a Mairi pelo WhatsApp. Vamos ouvir você, entender seu empreendimento e indicar os próximos passos."]];
  $("#faqs").innerHTML = faq.map((f, i) => `<div class="q rv"><h3 style="font:inherit"><button aria-expanded="false" aria-controls="a${i}" id="b${i}">${f[0]}<span class="pm"></span></button></h3><div class="a" id="a${i}" role="region" aria-labelledby="b${i}"><div><p>${f[1]}</p></div></div></div>`).join("");
  $$(".q button").forEach(b => b.onclick = () => { const o = b.getAttribute("aria-expanded") === "true"; $$(".q button").forEach(x => x.setAttribute("aria-expanded", "false")); b.setAttribute("aria-expanded", String(!o)) });
  // WhatsApp
  $$("[data-wa]").forEach(a => { const s = a.dataset.wa; const t = encodeURIComponent("Olá! Gostaria de conversar com a Mairi" + (s ? ` sobre: ${s}.` : ".")); a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${t}`; a.target = "_blank"; a.rel = "noopener" });
  $("#yr").textContent = new Date().getFullYear();
  // header / menu
  const hd = $("#hd"), bur = $("#bur"), nv = $("#nv");
  const sc = () => hd.classList.toggle("on", scrollY > 30); addEventListener("scroll", sc, { passive: true }); sc();
  const tog = o => { nv.classList.toggle("open", o); bur.setAttribute("aria-expanded", String(o)); document.body.style.overflow = o ? "hidden" : "" };
  bur.onclick = () => tog(!nv.classList.contains("open"));
  $$("nav a").forEach(a => a.onclick = () => tog(false));
  addEventListener("keydown", e => { if (e.key === "Escape") tog(false) });
  // vídeo placeholder
  $("#play").onclick = () => $("#msg").classList.add("on"); $("#cl").onclick = () => $("#msg").classList.remove("on");
  // reveal + contadores + barras
  const count = el => { const to = +el.dataset.c; if (reduce) { el.textContent = to; return } const t0 = performance.now(); const f = n => { const p = Math.min((n - t0) / 1400, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f) }; requestAnimationFrame(f) };
  const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const t = e.target; t.classList.add("in"); $$("[data-c]", t).forEach(count); if (t.matches("[data-c]")) count(t); $$("[data-w]", t).forEach(b => b.style.width = b.dataset.w + "%"); io.unobserve(t) }), { threshold: .15, rootMargin: "0px 0px -6% 0px" });
  $$(".rv,.sk").forEach(el => io.observe(el));
  // seção ativa
  const links = $$("nav a"), so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle("act", a.getAttribute("href") === "#" + e.target.id)) }), { rootMargin: "-45% 0px -50% 0px" });
  $$("main section").forEach(s => so.observe(s));

  // logo reserva caso o arquivo não seja encontrado
  const LOGO = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 48"><g transform="translate(0,4) scale(1.667)"><path fill="#D9C5AE" d="M12 0l2.2 8.2L22 6l-6 6 6 6-7.8-2.2L12 24l-2.2-8.2L2 18l6-6-6-6 7.8 2.2z"/></g><g transform="translate(58,0)" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="square"><path d="M4 44V4l16 24L36 4v40"/><path d="M46 44L62 4l16 40M52 30h20"/><path d="M92 4v40"/><path d="M106 44V4h16q12 0 12 11t-12 11h-16M122 26l14 18"/><path d="M150 4v40"/></g></svg>');
  $$("img.lg").forEach(i => { const fb = () => { i.onerror = null; i.src = LOGO }; i.addEventListener("error", fb); if (i.complete && i.naturalWidth === 0) fb() });
  // formulário
  const fm = $("#fm");
  fm.addEventListener("submit", async e => {
    e.preventDefault(); const st = $("#fst"), d = Object.fromEntries(new FormData(fm));
    if (d.site) return;
    $$("input,select,textarea", fm).forEach(x => x.removeAttribute("aria-invalid"));
    const miss = ["nome", "empreendimento", "contato"].filter(k => !(d[k] || "").trim());
    if (miss.length || !$("#f7").checked) { miss.forEach(k => fm.elements[k].setAttribute("aria-invalid", "true")); st.textContent = miss.length ? "Preencha os campos obrigatórios." : "Confirme o consentimento para continuar."; return }
    const msg = `Olá! Sou ${d.nome}, do empreendimento ${d.empreendimento}` + (d.regiao ? ` (${d.regiao})` : "") + ".\n" + (d.servico ? `Tenho interesse em: ${d.servico}.\n` : "") + (d.mensagem ? d.mensagem + "\n" : "") + `Contato: ${d.contato}`;
    const wa = () => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    if (FORM_ENDPOINT) { try { const r = await fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) }); if (!r.ok) throw 0; st.textContent = "Mensagem enviada. A Mairi entrará em contato em breve."; fm.reset(); return } catch (_) { st.textContent = "Não foi possível enviar agora. Abrindo o WhatsApp."; wa(); return } }
    st.textContent = "Abrindo o WhatsApp com a sua mensagem."; wa(); fm.reset();
  });
  // refinamentos de interação (mouse)
  if (matchMedia("(pointer:fine)").matches && !reduce) {
    $$(".card,.pil,.of,.pc,.st").forEach(c => c.addEventListener("pointermove", e => { const r = c.getBoundingClientRect(); c.style.setProperty("--mx", e.clientX - r.left + "px"); c.style.setProperty("--my", e.clientY - r.top + "px") }));
    $$(".btn.p,.btn.wa").forEach(b => { b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .1}px,${(e.clientY - r.top - r.height / 2) * .18 - 2}px)` }); b.addEventListener("pointerleave", () => b.style.transform = "") });
  }

  // slideshow do hero
  const sl = $$(".hsl"), dots = $$(".hdots button"); let k = 0, tm;
  const go = n => { sl[k].classList.remove("on"); dots[k].classList.remove("on"); dots[k].removeAttribute("aria-current"); k = (n + sl.length) % sl.length; sl[k].classList.add("on"); dots[k].classList.add("on"); dots[k].setAttribute("aria-current", "true") };
  const start = () => { clearInterval(tm); if (!reduce) tm = setInterval(() => go(k + 1), 6500) };
  dots.forEach((d, i) => d.onclick = () => { go(i); start() }); start();
  document.addEventListener("visibilitychange", () => document.hidden ? clearInterval(tm) : start());
})();