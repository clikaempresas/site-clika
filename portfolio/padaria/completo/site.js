// ===== Dados do negócio: troque aqui para cada cliente =====
const CONFIG = {
  nome: "Padaria Fornalha",
  // 55 + DDD + número, só dígitos. No modelo está o número da Clika, para quem testar falar com a gente.
  whatsapp: "5514991337516",
  mensagemWhatsapp: "Olá, Padaria Fornalha! Vi o site e quero fazer uma encomenda.",
  instagram: "https://www.instagram.com/",
  mapa: "https://www.google.com/maps/search/?api=1&query=Pra%C3%A7a+da+S%C3%A9+S%C3%A3o+Paulo",
  // Perfil da Empresa no Google: link do perfil e link direto para avaliar
  google: "https://www.google.com/maps/search/?api=1&query=Pra%C3%A7a+da+S%C3%A9+S%C3%A3o+Paulo",
  googleAvaliar: "https://www.google.com/maps/search/?api=1&query=Pra%C3%A7a+da+S%C3%A9+S%C3%A3o+Paulo",
  fornadas: [6, 10, 16],
  // dia da semana: 0 = domingo ... 6 = sábado
  horarios: [
    { dias: "Segunda a sexta", de: [1, 2, 3, 4, 5], texto: "6h às 20h" },
    { dias: "Sábado", de: [6], texto: "6h às 19h" },
    { dias: "Domingo e feriados", de: [0], texto: "6h às 13h" }
  ],
  cardapio: [
    { categoria: "Pães", desc: "Saem nas fornadas das 6h, 10h e 16h.", itens: [
      { nome: "Pão francês", desc: "Casquinha crocante", preco: 18.90, unidade: "kg", pedido: "100 g (2 pães)", precoPedido: 1.89 },
      { nome: "Pão de queijo", desc: "Com queijo meia cura", preco: 4.50, unidade: "un" },
      { nome: "Pão de leite", desc: "Macio, pacote com 10", preco: 14.90 },
      { nome: "Pão italiano", desc: "Fermentação natural, 600 g", preco: 22.00 },
      { nome: "Pão de forma integral", desc: "Feito aqui, sem conservante", preco: 16.50 }
    ]},
    { categoria: "Salgados", desc: "Assados e fritos durante o dia.", itens: [
      { nome: "Coxinha de frango", desc: "Massa de batata", preco: 8.00, unidade: "un" },
      { nome: "Esfiha de carne", desc: "Massa fina, aberta", preco: 7.00, unidade: "un" },
      { nome: "Enroladinho de salsicha", desc: "Massa folhada", preco: 6.50, unidade: "un" },
      { nome: "Misto quente", desc: "No pão de forma da casa", preco: 11.00 }
    ]},
    { categoria: "Doces", desc: "Recheios feitos na nossa cozinha.", itens: [
      { nome: "Sonho de creme", desc: "Creme de baunilha", preco: 7.90, unidade: "un" },
      { nome: "Bomba de chocolate", desc: "Ganache meio amargo", preco: 9.50, unidade: "un" },
      { nome: "Pudim de leite", desc: "Fatia", preco: 10.00, unidade: "fatia" },
      { nome: "Brigadeiro gourmet", desc: "Caixa com 6", preco: 21.00 }
    ]},
    { categoria: "Bolos", desc: "Inteiros com 1 dia de antecedência.", itens: [
      { nome: "Bolo de fubá", desc: "Com erva-doce, fatia", preco: 6.50, unidade: "fatia" },
      { nome: "Bolo de cenoura inteiro", desc: "Cobertura de chocolate", preco: 39.90 },
      { nome: "Bolo de laranja inteiro", desc: "Com calda", preco: 36.90 },
      { nome: "Torta de aniversário 2 kg", desc: "Massa e recheio a escolher", preco: 149.00 }
    ]},
    { categoria: "Café", desc: "Grão torrado em Minas.", itens: [
      { nome: "Café expresso", desc: "Curto ou longo", preco: 5.50 },
      { nome: "Pingado", desc: "Café com leite na média", preco: 6.00 },
      { nome: "Pão na chapa + pingado", desc: "O café da manhã da casa", preco: 12.00 },
      { nome: "Suco de laranja", desc: "Natural, 400 ml", preco: 9.00 }
    ]}
  ]
};
// ===========================================================

const $ = id => document.getElementById(id);
const brl = v => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const wa = texto => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;

document.querySelectorAll(".js-wa").forEach(a => a.href = wa(a.dataset.msg || CONFIG.mensagemWhatsapp));
document.querySelectorAll(".js-ig").forEach(a => CONFIG.instagram ? a.href = CONFIG.instagram : a.remove());
document.querySelectorAll(".js-mapa").forEach(a => a.href = CONFIG.mapa);
document.querySelectorAll(".js-google").forEach(a => a.href = CONFIG.google);
document.querySelectorAll(".js-avaliar").forEach(a => a.href = CONFIG.googleAvaliar);

// Menu no celular
const menuBtn = $("menu-btn"), nav = $("nav");
if (menuBtn) menuBtn.onclick = () => {
  const aberto = nav.classList.toggle("aberto");
  menuBtn.setAttribute("aria-expanded", aberto);
};

const agora = new Date();

// Horários (destaca o dia de hoje)
if ($("tabela-horarios")) {
  const dia = agora.getDay();
  $("tabela-horarios").innerHTML = CONFIG.horarios.map(h => {
    const hoje = h.de.includes(dia);
    return `<tr class="${hoje ? "hoje" : ""}"><td>${esc(h.dias)}${hoje ? " (hoje)" : ""}</td><td>${esc(h.texto)}</td></tr>`;
  }).join("");
}

// Próxima fornada, pela hora de quem está vendo
if ($("horas")) {
  const hora = agora.getHours() + agora.getMinutes() / 60;
  const prox = CONFIG.fornadas.find(f => f > hora);
  $("horas").innerHTML = CONFIG.fornadas.map(f => `<span class="${f === prox ? "prox" : ""}">${f}h</span>`).join("");
  if (prox !== undefined) {
    const falta = Math.round((prox - hora) * 60);
    $("fornada-titulo").textContent = `Próxima fornada às ${prox}h`;
    $("fornada-texto").textContent = falta <= 60 ? `Faltam ${falta} minutos. Dá tempo de encomendar.` : "Encomende agora e retire quentinho.";
  } else {
    $("fornada-titulo").textContent = `Amanhã a primeira fornada sai às ${CONFIG.fornadas[0]}h`;
    $("fornada-texto").textContent = "Deixe seu pedido do café da manhã reservado pelo WhatsApp.";
  }
}

// Cardápio com pedido pelo WhatsApp
if ($("cardapio")) {
  const pedido = new Map();
  const todos = [];
  CONFIG.cardapio.forEach((c, ci) => c.itens.forEach((it, ii) => todos.push({ ...it, id: `${ci}-${ii}` })));
  const porId = id => todos.find(t => t.id === id);

  $("filtros").innerHTML = ["Tudo", ...CONFIG.cardapio.map(c => c.categoria)]
    .map((n, i) => `<button type="button" data-cat="${i - 1}" aria-pressed="${i === 0}">${esc(n)}</button>`).join("");

  $("cardapio").innerHTML = CONFIG.cardapio.map((c, ci) => `
    <div class="categoria" data-cat="${ci}">
      <h2>${esc(c.categoria)}</h2>
      <p>${esc(c.desc)}</p>
      <div class="itens">
        ${c.itens.map((it, ii) => `
          <div class="item">
            <div class="nome"><h3>${esc(it.nome)}</h3><p>${esc(it.desc)}${it.pedido ? ` · pedido por ${esc(it.pedido)}` : ""}</p></div>
            <span class="preco">${brl(it.preco)}${it.unidade ? ` <small>/${esc(it.unidade)}</small>` : ""}</span>
            <div class="qtd" data-id="${ci}-${ii}">
              <button type="button" class="menos-um" aria-label="Tirar ${esc(it.nome)}" hidden>−</button>
              <span aria-live="polite"></span>
              <button type="button" class="mais-um" aria-label="Adicionar ${esc(it.nome)}">+</button>
            </div>
          </div>`).join("")}
      </div>
    </div>`).join("");

  $("filtros").onclick = e => {
    const b = e.target.closest("button"); if (!b) return;
    $("filtros").querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
    document.querySelectorAll(".categoria").forEach(c => c.hidden = b.dataset.cat !== "-1" && c.dataset.cat !== b.dataset.cat);
  };

  const atualizar = () => {
    let total = 0, qtd = 0;
    const linhas = [];
    pedido.forEach((n, id) => {
      const it = porId(id);
      const unit = it.precoPedido ?? it.preco;
      total += unit * n; qtd += n;
      linhas.push(`• ${n}x ${it.nome}${it.pedido ? ` (${it.pedido})` : ""}`);
    });
    document.querySelectorAll(".qtd").forEach(q => {
      const n = pedido.get(q.dataset.id) || 0;
      q.querySelector("span").textContent = n || "";
      q.querySelector(".menos-um").hidden = !n;
    });
    $("sacola").classList.toggle("aberta", qtd > 0);
    document.body.classList.toggle("com-sacola", qtd > 0);
    $("sacola-qtd").textContent = `${qtd} ${qtd === 1 ? "item" : "itens"} · ${brl(total)}`;
    const texto = [`Olá, ${CONFIG.nome}! Quero encomendar:`, ...linhas, `Total aproximado: ${brl(total)}`, "Passo para retirar às __h."].join("\n");
    $("sacola-enviar").href = wa(texto);
  };

  $("cardapio").onclick = e => {
    const b = e.target.closest("button"); if (!b) return;
    const id = b.closest(".qtd").dataset.id;
    const n = (pedido.get(id) || 0) + (b.classList.contains("mais-um") ? 1 : -1);
    n > 0 ? pedido.set(id, n) : pedido.delete(id);
    atualizar();
  };
  $("sacola-limpar").onclick = () => { pedido.clear(); atualizar(); };
  atualizar();
}

// Formulário de contato: monta a mensagem e abre no WhatsApp
if ($("form-contato")) {
  const form = $("form-contato");
  const campos = ["nome", "telefone", "assunto", "data", "mensagem"];
  const texto = () => {
    const v = id => $(id).value.trim();
    return [
      `Olá, ${CONFIG.nome}! Mensagem enviada pelo site:`,
      `• Nome: ${v("nome") || "—"}`,
      v("telefone") && `• Telefone: ${v("telefone")}`,
      `• Assunto: ${v("assunto")}`,
      v("data") && `• Para o dia: ${new Date(v("data") + "T12:00").toLocaleDateString("pt-BR")}`,
      v("mensagem") && `• ${v("mensagem")}`
    ].filter(Boolean).join("\n");
  };
  const previa = () => { $("previa-texto").textContent = texto(); };
  campos.forEach(c => $(c).addEventListener("input", previa));
  $("assunto").addEventListener("change", () => {
    $("campo-data").hidden = !["Encomenda de bolo ou torta", "Salgados para festa"].includes($("assunto").value);
    previa();
  });
  form.addEventListener("submit", e => {
    e.preventDefault();
    const ok = $("nome").value.trim().length > 1;
    $("erro-nome").hidden = ok;
    if (!ok) { $("nome").focus(); return; }
    $("enviar-wa").href = wa(texto());
    $("enviar-wa").hidden = false;
    $("form-ok").hidden = false;
    $("enviar-wa").focus();
  });
  previa();
}
