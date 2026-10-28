/* =========================================================
   Clika — comportamento compartilhado por todas as páginas
   ========================================================= */

/* ============ CONFIGURAÇÃO — edite só aqui ============ */
const CONFIG = {
  // WhatsApp do negócio: 55 + DDD + número, só dígitos
  whatsapp: "5514991337516",
  mensagemWhatsapp: "Oi! Vi o site da Clika e quero saber mais sobre um site para o meu negócio.",
  // Link completo do perfil. Vazio = o link do Instagram some do site
  instagram: "https://www.instagram.com/somosclika/",
  // Link CSV da planilha publicada no Google Sheets. Se estiver vazio ou falhar, usa o arquivo /planos.csv
  planilhaCSV: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQnioN_rxtpeQ4hnQO8J-OSq19QYkyx2gqMKIEeijvuurMrzX9El88a7bHAjmUFvxQaYhI9T1-voYC7/pub?gid=0&single=true&output=csv"
};
/* ====================================================== */

window.__clika = true; // avisa o <head> que o script carregou (senão ele mostra tudo sem animação)

const waLink = (msg) => "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg || CONFIG.mensagemWhatsapp);
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const ICON = (id) => `<svg class="i" aria-hidden="true"><use href="#i-${id}"/></svg>`;

/* Links de WhatsApp e Instagram (data-msg muda a mensagem pronta) */
document.querySelectorAll(".js-wa").forEach((a) => { a.href = waLink(a.dataset.msg); a.target = "_blank"; a.rel = "noopener"; });
document.querySelectorAll(".js-ig").forEach((a) => {
  if (!CONFIG.instagram) { a.remove(); return; }
  a.href = CONFIG.instagram; a.target = "_blank"; a.rel = "noopener";
});

/* Menu do celular */
const menuBtn = document.querySelector(".menu-btn");
const mobileNav = document.getElementById("menu-celular");
if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const open = menuBtn.getAttribute("aria-expanded") !== "true";
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    mobileNav.classList.toggle("open", open);
  });
}

/* Revelação ao rolar: o que já está na tela aparece na hora; o resto, ao chegar perto */
(function reveal() {
  const els = [...document.querySelectorAll(".reveal")];
  const show = (el) => el.classList.add("in");
  if (reduced || !("IntersectionObserver" in window)) { els.forEach(show); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -6% 0px", threshold: 0 });
  els.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) requestAnimationFrame(() => show(el)); else io.observe(el);
  });
  // Rede de segurança: a cada rolagem, tudo que já chegou na tela (ou passou dela) aparece,
  // mesmo que o observador atrase numa rolagem rápida. Nada fica em branco.
  let ticking = false;
  const sweep = () => {
    ticking = false;
    els.forEach((el) => { if (!el.classList.contains("in") && el.getBoundingClientRect().top < innerHeight) { show(el); io.unobserve(el); } });
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(sweep); } }, { passive: true });
  setTimeout(sweep, 1200);
  addEventListener("hashchange", () => els.forEach(show));
})();

/* Antes e depois: arrastar ou tocar no botão */
document.querySelectorAll("[data-ba]").forEach((box) => {
  const area = box.querySelector(".ba-area");
  const toggle = box.querySelector(".ba-toggle");
  let pos = 50, dragging = false;
  const set = (p) => {
    pos = Math.max(0, Math.min(100, p));
    area.style.setProperty("--pos", pos + "%");
    area.setAttribute("aria-valuenow", Math.round(pos));
  };
  const fromX = (x) => { const r = area.getBoundingClientRect(); set(((x - r.left) / r.width) * 100); };
  area.addEventListener("pointerdown", (e) => { dragging = true; area.classList.add("dragging"); area.setPointerCapture(e.pointerId); fromX(e.clientX); });
  area.addEventListener("pointermove", (e) => dragging && fromX(e.clientX));
  const stop = () => { dragging = false; area.classList.remove("dragging"); };
  ["pointerup", "pointercancel", "lostpointercapture"].forEach((ev) => area.addEventListener(ev, stop));
  area.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { set(pos - 10); e.preventDefault(); }
    if (e.key === "ArrowRight") { set(pos + 10); e.preventDefault(); }
  });
  toggle.addEventListener("click", () => set(pos > 50 ? 0 : 100));
  set(50);
});

/* Planos vindos da planilha (reserva: arquivo planos.csv). A cópia fixa no HTML é o que o Google lê */
function parseCSV(text) {
  const rows = []; let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const head = rows.shift().map((h) => h.trim().toLowerCase());
  return rows.filter((r) => r.some((v) => v.trim())).map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] || "").trim()])));
}
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function priceHTML(v) {
  const n = Number(String(v).replace(",", "."));
  if (isNaN(n)) return `<span class="int">${esc(v)}</span>`;
  const [int, cents] = n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).split(",");
  return `<span class="cur">R$</span><span class="int">${int}</span><span class="cents">,${cents}</span>`;
}
function planHTML(p) {
  const feat = /^s/i.test(p.destaque);
  const items = p.itens.split(";").filter(Boolean).map((i) => `<li>${ICON("check")}${esc(i.trim())}</li>`).join("");
  return `<article class="plan${feat ? " featured" : ""}">
    <div class="plan-top"><h3>${esc(p.plano)}</h3>${feat ? '<span class="plan-tag">Recomendado</span>' : ""}</div>
    <p class="plan-desc">${esc(p.descricao)}</p>
    <p class="plan-price">${priceHTML(p.preco)}<span class="plan-unit">${esc(p.periodo)}</span></p>
    <ul>${items}</ul>
    <a class="btn ${feat ? "btn-dark" : "btn-ghost"}" href="${waLink("Oi! Tenho interesse no plano " + p.plano + " da Clika.")}" target="_blank" rel="noopener">Quero o ${esc(p.plano)} ${ICON("arrow-right")}</a>
  </article>`;
}
async function loadPlans() {
  const boxes = document.querySelectorAll("[data-plans]");
  if (!boxes.length) return;
  for (const url of [CONFIG.planilhaCSV, "/planos.csv"].filter(Boolean)) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(res.status);
      const plans = parseCSV(await res.text()).filter((p) => p.plano && p.preco);
      if (!plans.length) throw new Error("vazio");
      boxes.forEach((box) => {
        box.querySelectorAll("[data-tipo]").forEach((grid) => {
          const items = plans.filter((p) => p.tipo === grid.dataset.tipo);
          if (items.length) grid.innerHTML = items.map(planHTML).join("");
        });
      });
      return;
    } catch (e) {}
  }
  // Se tudo falhar, a cópia fixa do HTML continua na tela
}
loadPlans();

/* Vitrine de exemplos: troca o protótipo mostrado no celular ou no computador */
(function showroom() {
  const root = document.getElementById("vitrine");
  if (!root) return;
  const stage = root.querySelector(".stage");
  const view = root.querySelector(".view");
  const frames = [...root.querySelectorAll("iframe")];
  const url = root.querySelector(".browser-url span");
  const openLink = root.querySelector("[data-open]");
  const hint = root.querySelector("[data-hint]");
  const choices = [...root.querySelectorAll(".choice")];
  const HINTS = {
    essencial: "Página única com rolagem: preços, horários, localização e WhatsApp.",
    completo: "Até 4 páginas com menu: início, catálogo, equipe ou história, e contato com formulário."
  };
  const params = new URLSearchParams(location.search);
  const state = {
    ramo: choices.some((c) => c.dataset.ramo === params.get("ramo")) ? params.get("ramo") : choices[0].dataset.ramo,
    plano: params.get("plano") === "completo" ? "completo" : "essencial",
    tela: "celular"
  };
  if (matchMedia("(min-width: 768px)").matches) state.tela = "computador";

  const src = () => {
    const c = choices.find((x) => x.dataset.ramo === state.ramo);
    return c.dataset.path + (state.plano === "completo" ? "completo/" : "");
  };
  function placeMarkers() {
    root.querySelectorAll(".seg").forEach((seg) => {
      const btns = [...seg.querySelectorAll("button")];
      const on = btns.find((b) => b.getAttribute("aria-pressed") === "true");
      const m = seg.querySelector(".seg-marker");
      if (on && m) { m.style.left = on.offsetLeft + "px"; m.style.width = on.offsetWidth + "px"; }
    });
  }
  function paint(animate) {
    choices.forEach((c) => c.setAttribute("aria-pressed", c.dataset.ramo === state.ramo));
    root.querySelectorAll("[data-plano]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.plano === state.plano));
    root.querySelectorAll("[data-tela]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.tela === state.tela));
    placeMarkers();
    hint.textContent = HINTS[state.plano];
    const c = choices.find((x) => x.dataset.ramo === state.ramo);
    url.textContent = c.dataset.domain;
    openLink.href = src();
    const go = () => {
      stage.dataset.device = state.tela;
      frames.forEach((f) => { if (f.getAttribute("src") !== src()) f.setAttribute("src", src()); });
      view.classList.remove("leaving");
      if (animate && !reduced) { view.classList.remove("arriving"); void view.offsetWidth; view.classList.add("arriving"); }
    };
    if (animate && !reduced) { view.classList.add("leaving"); setTimeout(go, 180); } else go();
    const q = new URLSearchParams({ ramo: state.ramo, plano: state.plano });
    history.replaceState(null, "", "?" + q);
  }
  choices.forEach((c) => c.addEventListener("click", (e) => { e.preventDefault(); if (state.ramo !== c.dataset.ramo) { state.ramo = c.dataset.ramo; paint(true); } }));
  root.querySelectorAll("[data-plano]").forEach((b) => b.addEventListener("click", () => { if (state.plano !== b.dataset.plano) { state.plano = b.dataset.plano; paint(true); } }));
  root.querySelectorAll("[data-tela]").forEach((b) => b.addEventListener("click", () => { if (state.tela !== b.dataset.tela) { state.tela = b.dataset.tela; paint(true); } }));
  root.querySelector(".reload").addEventListener("click", () => frames.forEach((f) => f.setAttribute("src", src())));
  addEventListener("resize", placeMarkers);
  document.fonts && document.fonts.ready.then(placeMarkers);
  paint(false);
})();

/* Formulário de contato: monta a mensagem e abre o WhatsApp */
(function contactForm() {
  const form = document.getElementById("form-contato");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const msg = `${CONFIG.mensagemWhatsapp} Sou ${d.get("nome")}. Meu negócio: ${d.get("negocio")}. ${d.get("mensagem")}`;
    window.open(waLink(msg), "_blank", "noopener");
  });
})();
