/* =========================================================
   Sites de negócio da Clika — comportamento compartilhado
   Os dados de cada negócio vêm do bloco <script id="dados-site"> da página
   (gerado a partir do config.json e do dados.csv). Não edite aqui por cliente.
   ========================================================= */
(function () {
  "use strict";
  const S = JSON.parse(document.getElementById("dados-site").textContent);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
  const DIAS_CURTO = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const wa = (msg) => "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(msg);
  const horaTxt = (min) => { min = ((min % 1440) + 1440) % 1440; const h = Math.floor(min / 60), m = min % 60; return h + "h" + (m ? String(m).padStart(2, "0") : ""); };

  /* ---------- Revelação ao rolar: nada fica escondido se algo falhar ---------- */
  (function reveal() {
    const els = $$(".rv");
    const show = (el) => el.classList.add("in");
    if (reduced || !("IntersectionObserver" in window)) return els.forEach(show);
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    let t = false;
    const sweep = () => { t = false; els.forEach((el) => { if (!el.classList.contains("in") && el.getBoundingClientRect().top < innerHeight) show(el); }); };
    addEventListener("scroll", () => { if (!t) { t = true; requestAnimationFrame(sweep); } }, { passive: true });
    setTimeout(sweep, 1000);
  })();

  /* ---------- Aberto agora (pelo primeiro grupo de horários) ---------- */
  const grupo = (S.horarios && S.horarios[0]) ? S.horarios[0].linhas : [];
  function faixasDoDia(d) {
    const out = [];
    grupo.forEach((l) => { if (l.dias.includes(d) && l.abre != null) out.push([l.abre, l.fecha]); });
    return out.sort((a, b) => a[0] - b[0]);
  }
  function status(now = new Date()) {
    const d = now.getDay(), m = now.getHours() * 60 + now.getMinutes();
    // Ontem passando da meia-noite (ex.: 18h à 1h)
    const ontem = (d + 6) % 7;
    for (const [a, f] of faixasDoDia(ontem)) if (f > 1440 && m < f - 1440) return { aberto: true, fecha: f };
    for (const [a, f] of faixasDoDia(d)) if (m >= a && m < f) return { aberto: true, fecha: f };
    for (const [a] of faixasDoDia(d)) if (a > m) return { aberto: false, quando: "hoje", abre: a };
    for (let i = 1; i <= 7; i++) {
      const dd = (d + i) % 7, f = faixasDoDia(dd);
      if (f.length) return { aberto: false, quando: i === 1 ? "amanhã" : DIAS[dd], abre: f[0][0] };
    }
    return null;
  }
  $$("[data-live]").forEach((el) => {
    const st = status();
    if (!st) { el.remove(); return; }
    el.classList.toggle("open", st.aberto);
    el.innerHTML = '<span class="dot"></span>' + (st.aberto
      ? "<b>Aberto agora</b> · fecha às " + horaTxt(st.fecha)
      : "Fechado · abre " + st.quando + " às " + horaTxt(st.abre));
  });
  // Próxima fornada / próxima sessão (opcional no config: "proximos")
  $$("[data-next]").forEach((el) => {
    if (!S.proximos) { el.remove(); return; }
    const now = new Date(), m = now.getHours() * 60 + now.getMinutes();
    const prox = S.proximos.horas.find((h) => h * 60 > m);
    el.innerHTML = '<span class="dot"></span>' + esc(S.proximos.rotulo) + " " + (prox != null ? "às " + prox + "h" : "amanhã às " + S.proximos.horas[0] + "h");
  });
  // Linha de hoje na tabela de horários
  const hoje = new Date().getDay();
  $$(".hours-row[data-dias]").forEach((r) => { if (r.dataset.dias.split(",").map(Number).includes(hoje)) r.classList.add("today"); });
  $$("[data-dia-semana]").forEach((p) => { if (Number(p.dataset.diaSemana) === hoje) p.classList.add("today"); });

  /* ---------- Abas do catálogo ---------- */
  $$(".tabbed").forEach((box) => {
    const cats = $$(".cat", box);
    if (cats.length < 2) return;
    const bar = document.createElement("div");
    bar.className = "chips"; bar.setAttribute("role", "group"); bar.setAttribute("aria-label", "Categorias");
    cats.forEach((c, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip"; b.textContent = c.dataset.cat;
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      b.addEventListener("click", () => {
        if (b.getAttribute("aria-pressed") === "true") return;
        $$(".chip", bar).forEach((x) => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
        cats.forEach((x) => { x.hidden = x !== c; x.classList.remove("swap"); });
        void c.offsetWidth; c.classList.add("swap");
      });
      bar.appendChild(b);
    });
    cats.forEach((c, i) => { c.hidden = i !== 0; });
    box.prepend(bar);
  });

  /* ---------- Mapa: traça a rota ---------- */
  $$("[data-route]").forEach((b) => b.addEventListener("click", () => {
    const map = b.closest(".map"); const on = !map.classList.contains("go");
    map.classList.toggle("go", on);
    b.lastChild.textContent = on ? " Rota traçada" : " Traçar rota";
  }));

  /* ---------- Grade de aulas ---------- */
  $$("[data-grade]").forEach((box) => {
    const aulas = S.aulas || [];
    const dias = [...new Set(aulas.map((a) => a.dia))];
    if (!dias.length) return;
    const nomeHoje = DIAS[hoje];
    let atual = dias.find((d) => d.toLowerCase().startsWith(nomeHoje.slice(0, 3))) || dias[0];
    const bar = $(".chips", box), list = $(".grade-list", box);
    function paint(anim) {
      $$(".chip", bar).forEach((c) => c.setAttribute("aria-pressed", c.dataset.dia === atual ? "true" : "false"));
      const doDia = aulas.filter((a) => a.dia === atual);
      list.innerHTML = doDia.length ? doDia.map((a) => `<a class="aula card" data-wa href="${esc(wa(S.msgAula.replace("{aula}", a.nome).replace("{dia}", a.dia.toLowerCase()).replace("{hora}", a.hora)))}" target="_blank" rel="noopener">
        <time>${esc(a.hora)}</time><div><b>${esc(a.nome)}</b><small>${esc(a.info)}</small></div><span class="item-go"><svg class="i i-fill" aria-hidden="true"><use href="#i-wa"/></svg></span></a>`).join("")
        : '<p class="grade-empty card">Sem aulas neste dia.</p>';
      if (anim && !reduced) { list.classList.remove("swap"); void list.offsetWidth; list.classList.add("swap"); }
    }
    bar.innerHTML = dias.map((d) => `<button type="button" class="chip" data-dia="${esc(d)}">${esc(d)}${d === atual ? " · hoje" : ""}</button>`).join("");
    $$(".chip", bar).forEach((c) => c.addEventListener("click", () => { atual = c.dataset.dia; paint(true); }));
    paint(false);
  });

  /* ---------- Agendamento em 3 toques ---------- */
  $$("[data-agenda]").forEach((form) => {
    const diasBox = $("[data-dias-livres]", form);
    if (diasBox) {
      const opts = [];
      for (let i = 0, n = 0; i < 14 && n < 7; i++) {
        const d = new Date(); d.setDate(d.getDate() + i);
        const fx = faixasDoDia(d.getDay());
        if (!fx.length) continue;
        // Hoje só entra se ainda falta pelo menos 1 hora para fechar
        if (i === 0) { const m = d.getHours() * 60 + d.getMinutes(); if (!fx.some(([, f]) => f - m >= 60)) continue; }
        const rot = i === 0 ? "Hoje" : i === 1 ? "Amanhã" : DIAS_CURTO[d.getDay()];
        const data = String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0");
        const texto = (i === 0 ? "hoje" : i === 1 ? "amanhã" : DIAS[d.getDay()]) + " (" + data + ")";
        opts.push(`<label><input type="radio" name="dia" value="${esc(texto)}"${n === 0 ? " checked" : ""}><span>${rot}<small>${data}</small></span></label>`);
        n++;
      }
      diasBox.innerHTML = opts.join("");
    }
    const out = $("[data-agenda-msg]", form), go = $("[data-agenda-go]", form);
    function update() {
      const v = (n) => { const el = form.querySelector(`input[name="${n}"]:checked`); return el ? el.value : ""; };
      let msg = S.msgAgenda;
      ["item", "dia", "periodo", "pessoa"].forEach((k) => { msg = msg.replace("{" + k + "}", v(k)); });
      msg = msg.replace(/,?\s*com tanto faz/i, "").replace(/\s+([,.?!])/g, "$1").replace(/\s+/g, " ").trim();
      if (out) out.innerHTML = "Mensagem pronta: <b>" + esc(msg) + "</b>";
      go.href = wa(msg);
    }
    form.addEventListener("change", update);
    update();
  });

  /* ---------- Formulário de contato → WhatsApp ---------- */
  $$("[data-contato]").forEach((form) => form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const nome = (d.get("nome") || "").toString().trim();
    const sobre = (d.get("sobre") || "").toString().trim();
    const msg = (d.get("mensagem") || "").toString().trim();
    const texto = `Oi! ${nome ? "Sou " + nome + ". " : ""}${S.rotuloForm}: ${sobre}.${msg ? " " + msg : ""}`;
    abrirWhats(texto, true);
  }));

  /* ---------- WhatsApp: no protótipo abre uma simulação; no site do cliente, o WhatsApp de verdade ---------- */
  function abrirWhats(texto, forcarNovaAba) {
    if (!S.demo) { window.open(wa(texto), "_blank", "noopener"); return; }
    simular(texto);
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-wa]");
    if (!a || !S.demo || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    let t = ""; try { t = new URL(a.href).searchParams.get("text") || ""; } catch (err) {}
    simular(t);
  });
  function simular(texto) {
    const back = document.createElement("div");
    back.className = "sim-back";
    back.innerHTML = `<div class="sim" role="dialog" aria-modal="true" aria-label="Conversa no WhatsApp (simulação)">
      <div class="sim-top"><button type="button" data-x aria-label="Fechar">✕</button><span class="sim-av">${esc(S.inicial)}</span><div><b>${esc(S.nome)}</b><small data-st>WhatsApp Business</small></div></div>
      <div class="sim-body"><span class="sim-note">Simulação do site de exemplo. No site do cliente, o botão abre o WhatsApp do negócio com esta mensagem pronta.</span></div>
      <div class="sim-foot"><textarea aria-label="Mensagem" rows="2"></textarea><button type="button" class="sim-send" aria-label="Enviar">➤</button></div>
      <a class="sim-real" href="#" target="_blank" rel="noopener">Abrir no WhatsApp de verdade (fala com a Clika)</a>
    </div>`;
    document.body.appendChild(back);
    const ta = $("textarea", back), body = $(".sim-body", back), st = $("[data-st]", back), real = $(".sim-real", back);
    ta.value = texto;
    const sync = () => { real.href = wa(ta.value); };
    sync(); ta.addEventListener("input", sync);
    const close = () => { back.remove(); document.removeEventListener("keydown", onKey); };
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    back.addEventListener("click", (e) => { if (e.target === back || e.target.closest("[data-x]")) close(); });
    $(".sim-send", back).addEventListener("click", () => {
      const msg = ta.value.trim(); if (!msg) return;
      const hora = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      body.insertAdjacentHTML("beforeend", `<div class="bub me">${esc(msg)}<small>${hora} ✓✓</small></div>`);
      $(".sim-foot", back).remove();
      st.textContent = "digitando…";
      setTimeout(() => {
        st.textContent = "online";
        body.insertAdjacentHTML("beforeend", `<div class="bub them">${esc(S.resposta)}<small>${hora}</small></div>`);
        body.scrollTop = body.scrollHeight;
      }, 1300);
    });
    setTimeout(() => ta.focus(), 50);
  }

  /* ---------- Preços pela planilha do Google (opcional) ---------- */
  if (S.planilha) {
    fetch(S.planilha, { cache: "no-store" }).then((r) => r.ok ? r.text() : Promise.reject()).then((txt) => {
      const linhas = lerCSV(txt);
      linhas.filter((l) => (l.tipo || "").toLowerCase() === "item").forEach((l) => {
        $$(`[data-item="${CSS.escape(l.nome)}"]`).forEach((el) => {
          const p = $(".item-price", el);
          if (p && l.preco) p.firstChild.textContent = formatar(l.preco);
          const off = /^(nao|não|esgotado|n)$/i.test((l.disponivel || "").trim());
          el.classList.toggle("off", off);
        });
      });
    }).catch(() => {});
  }
  function formatar(v) {
    const n = Number(String(v).replace(",", "."));
    if (isNaN(n)) return v;
    return "R$ " + (Number.isInteger(n) ? String(n) : n.toFixed(2).replace(".", ","));
  }
  function lerCSV(text) {
    const rows = []; let row = [], f = "", q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) { if (c === '"' && text[i + 1] === '"') { f += '"'; i++; } else if (c === '"') q = false; else f += c; }
      else if (c === '"') q = true;
      else if (c === ",") { row.push(f); f = ""; }
      else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(f); rows.push(row); row = []; f = ""; }
      else f += c;
    }
    if (f || row.length) { row.push(f); rows.push(row); }
    const head = rows.shift().map((h) => h.trim().toLowerCase());
    return rows.filter((r) => r.some((v) => v.trim())).map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] || "").trim()])));
  }

  /* ---------- Menu: troca de página suave ---------- */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a || a.target || a.hasAttribute("data-wa") || e.metaKey || e.ctrlKey || e.shiftKey || reduced) return;
    const href = a.getAttribute("href") || "";
    if (!/\.html$|\/$/.test(href) || href.startsWith("http") || href.startsWith("#")) return;
    const main = $("main"); if (!main) return;
    e.preventDefault();
    main.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-10px)" }], { duration: 200, easing: "cubic-bezier(0.65,0,0.35,1)", fill: "forwards" });
    setTimeout(() => { location.href = a.href; }, 190);
  });
  addEventListener("pageshow", (e) => { if (e.persisted) { const m = $("main"); m && m.getAnimations().forEach((x) => x.cancel()); } });
})();
