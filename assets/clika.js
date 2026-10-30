/* =========================================================
   Clika — comportamento compartilhado por todas as páginas
   ========================================================= */

/* ============ CONFIGURAÇÃO — edite só aqui ============ */
const CONFIG = {
  // WhatsApp do negócio: 55 + DDD + número, só dígitos
  whatsapp: "5514991337516",
  mensagemWhatsapp: "Oi! Vi o site da Clika e quero saber mais sobre um site para o meu negócio.",
  // Link completo do perfil. Vazio = o link do Instagram some do site
  instagram: "https://www.instagram.com/somosclika/"
  // (Os preços dos planos ficam direto no HTML; não há mais planilha)
};
/* ====================================================== */

window.__clika = true; // avisa o <head> que o script carregou (senão ele mostra tudo sem animação)

const waLink = (msg) => "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg || CONFIG.mensagemWhatsapp);
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

/* Barra do topo: pílula que desliza até o item clicado e troca de página em duas fases
   (a página atual sobe e some, depois a nova chega). Igual ao comportamento do Lovable,
   mas em páginas separadas: a posição de onde a pílula saiu vai junto para a próxima página. */
(function topNav() {
  const KEY = "clika-nav";
  const EXIT_MS = 240;
  const nav = document.querySelector(".nav");
  const main = document.querySelector("main");
  const root = document.documentElement;
  let from = null; // posição exata da pílula no momento em que a página anterior saiu
  try { from = JSON.parse(sessionStorage.getItem(KEY) || "null"); sessionStorage.removeItem(KEY); } catch (e) {}
  // A chegada animada só dura o tempo dela; depois a classe sai para não interferir
  if (root.classList.contains("nav-in")) setTimeout(() => root.classList.remove("nav-in"), 700);

  let pill = null;
  let arriving = false; // true enquanto a pílula desliza vinda da página anterior
  const place = (a, animate) => {
    if (!pill || !a) return;
    pill.classList.toggle("glide", !!animate);
    const nr = nav.getBoundingClientRect(), ar = a.getBoundingClientRect();
    pill.style.setProperty("--nav-x", ar.left - nr.left + "px");
    pill.style.setProperty("--nav-y", ar.top - nr.top + "px");
    pill.style.setProperty("--nav-w", ar.width + "px");
    pill.style.setProperty("--nav-h", ar.height + "px");
  };
  const active = () => nav && nav.querySelector('[aria-current="page"]');
  if (nav) {
    pill = document.createElement("span");
    pill.className = "nav-pill";
    pill.setAttribute("aria-hidden", "true");
    nav.prepend(pill);
    if (active()) {
      if (from && from.w && !reduced) {
        // Começa onde a pílula parou na página anterior e termina o deslize aqui
        pill.style.setProperty("--nav-x", from.x + "px");
        pill.style.setProperty("--nav-y", from.y + "px");
        pill.style.setProperty("--nav-w", from.w + "px");
        pill.style.setProperty("--nav-h", from.h + "px");
        pill.classList.add("ready");
        arriving = true;
        setTimeout(() => { arriving = false; }, 700);
        requestAnimationFrame(() => requestAnimationFrame(() => place(active(), true)));
      } else {
        place(active(), false);
        pill.classList.add("ready");
      }
    }
    // Reajusta quando a fonte carrega ou a tela muda, sem cortar um deslize em andamento
    const settle = () => { if (!arriving) place(active(), false); };
    addEventListener("resize", settle);
    document.fonts && document.fonts.ready.then(settle);
  }

  // Duas fases ao clicar em qualquer link interno para outra página
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest("a");
    if (!a || a.target || a.hasAttribute("download")) return;
    const href = a.getAttribute("href");
    if (!href || !href.startsWith("/") || href.startsWith("//")) return;
    const url = new URL(href, location.href);
    if (url.pathname === location.pathname) return; // âncora na mesma página: rolagem normal
    if (reduced || !main) return;
    e.preventDefault();
    // Como no Lovable: primeiro a página atual sai (240 ms) com a pílula parada;
    // o deslize da pílula acontece na página nova, junto com a chegada dela.
    main.classList.add("page-exit");
    setTimeout(() => {
      try {
        let pos = null;
        if (pill && nav && getComputedStyle(nav).display !== "none" && pill.classList.contains("ready")) {
          const nr = nav.getBoundingClientRect(), pr = pill.getBoundingClientRect();
          pos = { x: pr.left - nr.left, y: pr.top - nr.top, w: pr.width, h: pr.height };
        }
        sessionStorage.setItem(KEY, JSON.stringify(pos || { w: 0 }));
      } catch (err) {}
      location.href = url.href;
    }, EXIT_MS);
  });
  // Voltar pelo navegador (a página volta do cache): desfaz a saída
  addEventListener("pageshow", (e) => {
    if (!e.persisted) return;
    main && main.classList.remove("page-exit");
    place(active(), false);
  });
})();

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

/* Os preços ficam fixos no HTML (index.html e planos/index.html). A planilha não é mais lida:
   ela trocava os valores e os textos dos cartões depois que a página abria. */

/* Vitrine de exemplos (início): no toque é só deslizar; as setas ajudam quem usa mouse */
(function shelf() {
  const track = document.querySelector(".shelf-track");
  if (!track) return;
  const prev = document.querySelector('[data-shelf="-1"]');
  const next = document.querySelector('[data-shelf="1"]');
  const step = () => {
    const item = track.querySelector(".show");
    return item ? item.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : 300;
  };
  const update = () => {
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  };
  prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: reduced ? "auto" : "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: reduced ? "auto" : "smooth" }));
  track.addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();
})();

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
