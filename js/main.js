(() => {
    const WHATSAPP_NUMBER = ""; // Ex.: "5591999999999" (DDI+DDD+número). Vazio abre o WhatsApp para escolher o contato.
    const FORM_ENDPOINT = ""; // Opcional: URL de um serviço de formulários (ex.: Formspree). Vazio envia pelo WhatsApp.
    const SIMULATE_SEND = true; // true: simula o envio (demonstração). false: usa FORM_ENDPOINT ou WhatsApp.
    // Redes sociais: substitua pelos perfis oficiais da Mairi
    const SOCIAL = { instagram: "https://www.instagram.com/", facebook: "https://www.facebook.com/", linkedin: "https://www.linkedin.com/" };
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
    const bird = $(".hbird"); if (bird) bird.classList.add("pre");
    const startRv = () => { $$(".rv,.sk").forEach(el => io.observe(el)); if (bird) setTimeout(() => { bird.classList.remove("pre"); setTimeout(() => bird.classList.add("live"), 1600) }, 250) };
    // seção ativa
    const links = $$("nav a"), so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => { const on = a.getAttribute("href") === "#" + e.target.id; a.classList.toggle("act", on); on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current") }) }), { rootMargin: "-45% 0px -50% 0px" });
    $$("main section").forEach(s => so.observe(s));

    // logo reserva caso o arquivo não seja encontrado
    const LOGO = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 48"><g transform="translate(0,4) scale(1.667)"><path fill="#D9C5AE" d="M12 0l2.2 8.2L22 6l-6 6 6 6-7.8-2.2L12 24l-2.2-8.2L2 18l6-6-6-6 7.8 2.2z"/></g><g transform="translate(58,0)" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="square"><path d="M4 44V4l16 24L36 4v40"/><path d="M46 44L62 4l16 40M52 30h20"/><path d="M92 4v40"/><path d="M106 44V4h16q12 0 12 11t-12 11h-16M122 26l14 18"/><path d="M150 4v40"/></g></svg>');
    $$("img.lg").forEach(i => { const fb = () => { i.onerror = null; i.src = LOGO }; i.addEventListener("error", fb); if (i.complete && i.naturalWidth === 0) fb() });
    // formulário
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const fmEl = $("#fm"), fBody = $("#fbody"), fOk = $("#fok"), fSub = $("#fsub"), fStat = $("#fst");
    const setErr = (id, msg) => { const i = $("#" + id), e = $("#e" + id.slice(1)); if (!i || !e) return; e.textContent = msg || ""; msg ? i.setAttribute("aria-invalid", "true") : i.removeAttribute("aria-invalid") };
    const okContact = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || v.replace(/\D/g, "").length >= 10;
    const collect = () => { const fd = new FormData(fmEl), g = k => (fd.get(k) || "").toString().trim(); return { nome: g("nome"), empreendimento: g("empreendimento"), tipo: g("tipo"), regiao: g("regiao"), contato: g("contato"), servicos: fd.getAll("servico"), mensagem: g("mensagem"), site: g("site") } };
    function validate(d) {
        let bad = null; const chk = (id, m) => { setErr(id, m); if (m && !bad) bad = id };
        chk("f1", d.nome.length < 2 ? "Informe seu nome." : "");
        chk("f2", d.empreendimento ? "" : "Informe o nome do empreendimento.");
        chk("f4", okContact(d.contato) ? "" : "Informe um WhatsApp com DDD ou um e-mail válido.");
        chk("f7", $("#f7").checked ? "" : "Confirme o consentimento para continuar.");
        if (bad) $("#" + bad).focus(); return !bad
    }
    ["input", "change"].forEach(t => fmEl.addEventListener(t, e => { const i = e.target; if (i.id && i.hasAttribute("aria-invalid")) setErr(i.id, "") }));
    const buildMsg = d => `Olá! Sou ${d.nome}, do empreendimento ${d.empreendimento}` + (d.tipo ? ` (${d.tipo})` : "") + (d.regiao ? `, de ${d.regiao}` : "") + ".\n" + (d.servicos.length ? `Tenho interesse em: ${d.servicos.join(", ")}.\n` : "") + (d.mensagem ? d.mensagem + "\n" : "") + `Contato: ${d.contato}`;
    const waUrl = d => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMsg(d))}`;
    function showOk(d, note) {
        $("#ok-t").textContent = `Obrigado, ${d.nome.split(" ")[0]}.`;
        $("#ok-p").textContent = `Recebemos as informações sobre ${d.empreendimento}. A Mairi entrará em contato pelo canal que você informou.`;
        const rows = [["Empreendimento", d.empreendimento], ["Tipo", d.tipo], ["Região", d.regiao], ["Interesse", d.servicos.join(", ")], ["Contato", d.contato]].filter(r => r[1]);
        $("#ok-l").innerHTML = rows.map(r => `<li><b>${r[0]}</b>${esc(r[1])}</li>`).join("");
        $("#ok-n").textContent = note || ""; $("#ok-n").hidden = !note; $("#ok-wa").href = waUrl(d);
        fBody.hidden = true; fOk.hidden = false; fOk.tabIndex = -1; fOk.focus({ preventScroll: true });
    }
    $("#ok-again").onclick = () => { fmEl.reset(); $$("[aria-invalid]", fmEl).forEach(i => setErr(i.id, "")); fOk.hidden = true; fBody.hidden = false; $("#f1").focus() };
    fmEl.addEventListener("submit", async e => {
        e.preventDefault(); const d = collect(); if (d.site || !validate(d)) return;
        const bl = $(".bl", fSub); fSub.disabled = true; fSub.classList.add("busy"); bl.textContent = "Enviando"; fStat.textContent = "Enviando sua mensagem...";
        const done = () => { fSub.disabled = false; fSub.classList.remove("busy"); bl.textContent = "Enviar mensagem"; fStat.textContent = "" };
        if (SIMULATE_SEND) { await new Promise(r => setTimeout(r, reduce ? 400 : 1900)); done(); showOk(d, "Modo demonstração: nenhum dado foi enviado."); return }
        if (FORM_ENDPOINT) { try { const r = await fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) }); if (!r.ok) throw 0; done(); showOk(d); return } catch (_) { done(); window.open(waUrl(d), "_blank", "noopener"); showOk(d); return } }
        done(); window.open(waUrl(d), "_blank", "noopener"); showOk(d);
    });
    // refinamentos de interação (mouse)
    if (matchMedia("(pointer:fine)").matches && !reduce) {
        $$(".card,.pil,.of,.pc,.st").forEach(c => c.addEventListener("pointermove", e => { const r = c.getBoundingClientRect(); c.style.setProperty("--mx", e.clientX - r.left + "px"); c.style.setProperty("--my", e.clientY - r.top + "px") }));
        $$(".btn.p,.btn.wa").forEach(b => { b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .1}px,${(e.clientY - r.top - r.height / 2) * .18 - 2}px)` }); b.addEventListener("pointerleave", () => b.style.transform = "") });
    }


    // quiz de entrada
    const QC = ["var(--br)", "#7f95ee", "#c9bf5a", "#e0715a"];
    const QZ = [
        { q: "Onde você vende a maior parte da sua produção hoje?", o: [["Apenas na minha comunidade ou cidade", 0], ["Principalmente por atravessadores ou intermediários", 2], ["Em vários lugares, mas quero vender mais", null]] },
        { q: "Como as pessoas descobrem o seu produto?", o: [["Quase só pelo boca a boca", 1], ["Divulgo, mas sem planejamento", 4], ["Já tenho boa visibilidade", null]] },
        { q: "Sua marca comunica o que o seu empreendimento tem de único?", o: [["Ainda não, falta clareza", 3], ["Em parte, mas sem consistência", 3], ["Sim, mas não alcança o público certo", 1]] },
        { q: "Depois da primeira venda, o que acontece?", o: [["Não mantemos contato com o cliente", 5], ["Alguns voltam, mas por acaso", 5], ["Já temos relacionamento e queremos fortalecer", null]] }];
    const qz = $("#qz"), root = document.documentElement, box = $("#qstep"), prog = $("#qprog"), inertEls = $$("header,main,footer,.fw");
    let st = -1, busy = false; const ans = [];
    const arrow = '<svg><use href="#arrow"/></svg>';
    const result = () => { const t = {}; ans.forEach((a, i) => { const v = QZ[i].o[a][1]; if (v !== null) t[v] = (t[v] || 0) + 1 }); return Object.keys(t).sort((a, b) => t[b] - t[a]).map(Number) };
    function render() {
        prog.innerHTML = QZ.map((_, i) => `<i class="${i <= st ? "on" : ""}"></i>`).join("");
        prog.style.visibility = st >= 0 && st < QZ.length ? "visible" : "hidden";
        box.dataset.n = st >= 0 && st < QZ.length ? String(st + 1).padStart(2, "0") : "";
        if (st < 0) box.innerHTML = `<p class="qe">Antes de entrar</p><h2 id="qt" class="qh">Vamos entender o momento do seu empreendimento.</h2><p class="ql">${QZ.length} perguntas rápidas, menos de 1 minuto. No final, mostramos como a Mairi pode ajudar.</p><ul class="qchips"><li>${QZ.length} perguntas</li><li>Menos de 1 minuto</li><li>Sem cadastro</li></ul><button type="button" class="btn p" id="qgo">Começar ${arrow}</button>`;
        else if (st < QZ.length) { const q = QZ[st]; box.innerHTML = `<p class="qe">Pergunta ${st + 1} de ${QZ.length}</p><h2 id="qt" class="qh">${q.q}</h2><div class="qo" role="group" aria-labelledby="qt">${q.o.map((o, i) => `<button type="button" class="qb${ans[st] === i ? " sel" : ""}" data-i="${i}"><span>${String.fromCharCode(65 + i)}</span>${o[0]}</button>`).join("")}</div>${st ? '<button type="button" class="qback" id="qbk">Voltar</button>' : ""}` }
        else { const p = result().slice(0, 3); box.innerHTML = `<p class="qe">Resumo das suas respostas</p><h2 id="qt" class="qh">${p.length ? "Estes são os seus principais desafios." : "Seu empreendimento já tem boas bases."}</h2>${p.length ? `<ul class="qr">${p.map(i => `<li style="--ac:${QC[i % 4]}"><span class="qi">${ic(desafios[i][1])}</span><div><b>${desafios[i][0]}</b><span>${dd[i]}</span></div></li>`).join("")}</ul>` : '<p class="ql">A Mairi pode ajudar a ampliar mercados e fortalecer ainda mais a sua marca.</p>'}<button type="button" class="btn p" id="qenter">Conhecer a Mairi ${arrow}</button>` }
        const h = $("#qt"); h.tabIndex = -1; h.focus({ preventScroll: true }); qz.scrollTo(0, 0);
    }
    function finish(use) {
        const p = use ? result() : [];
        p.forEach(i => { const c = $$("#dg .card")[i]; if (c) c.classList.add("hit") });
        if (p.length) $("#f6").value = "Respondi o quiz do site. Meus principais desafios: " + p.slice(0, 3).map(i => desafios[i][0].toLowerCase()).join("; ") + ".";
        try { sessionStorage.setItem("mairiQuiz", "1") } catch (_) { }
        qz.classList.add("out");
        setTimeout(() => { root.classList.remove("qz-lock"); inertEls.forEach(e => e.inert = false); scrollTo(0, 0); startRv() }, reduce ? 0 : 650);
    }
    box.addEventListener("click", e => {
        const b = e.target.closest("button"); if (!b || busy) return;
        if (b.id === "qgo") { st = 0; render() }
        else if (b.classList.contains("qb")) { busy = true; ans[st] = +b.dataset.i; $$(".qb", box).forEach(x => x.classList.toggle("sel", x === b)); setTimeout(() => { st++; busy = false; render() }, reduce ? 0 : 320) }
        else if (b.id === "qbk") { st--; render() }
        else if (b.id === "qenter") finish(true);
    });
    $("#qskip").onclick = () => finish(false);
    if (root.classList.contains("qz-lock")) { inertEls.forEach(e => e.inert = true); render() } else startRv();

    // barra de progresso de leitura
    const pg = $("#pgbar");
    const upd = () => { const m = document.documentElement.scrollHeight - innerHeight; pg.style.transform = `scaleX(${m > 0 ? Math.min(scrollY / m, 1) : 0})` };
    addEventListener("scroll", upd, { passive: true }); upd();

    // esconde o botão flutuante do WhatsApp na seção de contato
    const fw = $("#fw");
    new IntersectionObserver(es => es.forEach(e => fw.classList.toggle("off", e.isIntersecting)), { threshold: .15 }).observe($("#contato"));

    $$("[data-social]").forEach(a => a.href = SOCIAL[a.dataset.social] || "#");

    // paralaxe suave da ave (mouse)
    if (bird && matchMedia("(pointer:fine)").matches && !reduce) {
        const hero = $("#hero");
        hero.addEventListener("pointermove", e => { const r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; bird.style.setProperty("--px", (-x * 26).toFixed(1) + "px"); bird.style.setProperty("--py", (-y * 18).toFixed(1) + "px") });
        hero.addEventListener("pointerleave", () => { bird.style.setProperty("--px", "0px"); bird.style.setProperty("--py", "0px") });
    }

    // acessibilidade
    const AC0 = { size: 0, hc: 0, ul: 0, font: 0, space: 0, still: 0, cursor: 0, focus: 0 };
    let AC = { ...AC0 };
    try { AC = { ...AC0, ...JSON.parse(localStorage.getItem("mairiAc") || "{}") } } catch (_) { }
    const acBtn = $("#acBtn"), acPanel = $("#acPanel"), acSt = $("#acSt"), SIZES = { "-1": 90, "0": 100, "1": 115, "2": 130, "3": 150 };
    function acApply() {
        root.style.fontSize = SIZES[AC.size] + "%"; $("#acLvl").textContent = SIZES[AC.size] + "%";
        ["hc", "ul", "font", "space", "still", "cursor", "focus"].forEach(k => { root.classList.toggle("a11y-" + k, !!AC[k]); const b = $(`[data-ac="${k}"]`); if (b) b.setAttribute("aria-pressed", String(!!AC[k])) });
        try { localStorage.setItem("mairiAc", JSON.stringify(AC)) } catch (_) { }
    }
    const acOpen = o => { acPanel.hidden = !o; acBtn.setAttribute("aria-expanded", String(o)); acBtn.setAttribute("aria-label", o ? "Fechar menu de acessibilidade" : "Abrir menu de acessibilidade"); if (o) $("#acMinus").focus() };
    acBtn.onclick = () => acOpen(acPanel.hidden);
    $("#acX").onclick = () => { acOpen(false); acBtn.focus() };
    addEventListener("keydown", e => { if (e.key === "Escape" && !acPanel.hidden) { acOpen(false); acBtn.focus() } });
    $("#acPlus").onclick = () => { AC.size = Math.min(3, AC.size + 1); acApply() };
    $("#acMinus").onclick = () => { AC.size = Math.max(-1, AC.size - 1); acApply() };
    $$("[data-ac]").forEach(b => b.onclick = () => { AC[b.dataset.ac] = AC[b.dataset.ac] ? 0 : 1; acApply() });
    // leitura em voz alta
    const tts = $("#acTts"), canTts = "speechSynthesis" in window;
    const stopTts = () => { if (canTts) speechSynthesis.cancel(); tts.setAttribute("aria-pressed", "false"); tts.textContent = "Ouvir a página" };
    tts.addEventListener("mousedown", e => e.preventDefault());
    tts.onclick = () => {
        if (!canTts) { acSt.textContent = "Seu navegador não oferece leitura em voz alta."; return }
        if (tts.getAttribute("aria-pressed") === "true") { stopTts(); return }
        const sel = String(getSelection()).trim(), txt = (sel || $("#main").innerText).replace(/\s+/g, " ");
        const parts = txt.match(/[^.!?]{1,220}[.!?]?/g) || [];
        speechSynthesis.cancel();
        parts.forEach((p, i) => { const u = new SpeechSynthesisUtterance(p.trim()); u.lang = "pt-BR"; u.rate = .95; if (i === parts.length - 1) u.onend = stopTts; speechSynthesis.speak(u) });
        tts.setAttribute("aria-pressed", "true"); tts.textContent = "Parar leitura";
        acSt.textContent = sel ? "Lendo o trecho selecionado." : "Lendo a página.";
    };
    $("#acReset").onclick = () => { AC = { ...AC0 }; stopTts(); acApply(); acSt.textContent = "Configurações restauradas." };
    acApply();
})();