// ===== Dados do negócio: troque aqui para cada cliente =====
// WhatsApp: 55 + DDD + número, só dígitos. No modelo está o número da Clika, para quem testar falar com a gente.
// Horários: "de" são os dias da semana (0 = domingo ... 6 = sábado).
const CONFIG = {
  "nome": "Chapa da Esquina",
  "mensagemWhatsapp": "Olá, Chapa da Esquina! Vi o site e quero fazer um pedido.",
  "whatsapp": "5514991337516",
  "instagram": "https://www.instagram.com/",
  "ifood": "https://www.ifood.com.br/",
  "linkMaps": "https://maps.google.com/?q=Pra%C3%A7a+da+S%C3%A9,+S%C3%A3o+Paulo",
  "google": {
    "perfil": "https://maps.google.com/?q=Pra%C3%A7a+da+S%C3%A9,+S%C3%A3o+Paulo",
    "avaliar": "https://maps.google.com/?q=Pra%C3%A7a+da+S%C3%A9,+S%C3%A3o+Paulo"
  },
  "maisPedido": "Smash Duplo",
  "horarios": [
    {
      "dias": "Segunda",
      "de": [
        1
      ],
      "fechado": true
    },
    {
      "dias": "Terça a quinta",
      "de": [
        2,
        3,
        4
      ],
      "abre": "18:00",
      "fecha": "23:30"
    },
    {
      "dias": "Sexta e sábado",
      "de": [
        5,
        6
      ],
      "abre": "18:00",
      "fecha": "01:00"
    },
    {
      "dias": "Domingo",
      "de": [
        0
      ],
      "abre": "18:00",
      "fecha": "23:00"
    }
  ],
  "horariosEntrega": [
    {
      "dias": "Segunda",
      "de": [
        1
      ],
      "fechado": true
    },
    {
      "dias": "Terça a quinta",
      "de": [
        2,
        3,
        4
      ],
      "abre": "18:30",
      "fecha": "23:00"
    },
    {
      "dias": "Sexta e sábado",
      "de": [
        5,
        6
      ],
      "abre": "18:30",
      "fecha": "00:30"
    },
    {
      "dias": "Domingo",
      "de": [
        0
      ],
      "abre": "18:30",
      "fecha": "22:30"
    }
  ],
  "areas": [
    {
      "bairro": "Centro",
      "tempo": "25 a 35 min",
      "taxa": 0
    },
    {
      "bairro": "Vila Nova",
      "tempo": "30 a 40 min",
      "taxa": 5
    },
    {
      "bairro": "Jardim América",
      "tempo": "30 a 45 min",
      "taxa": 6
    },
    {
      "bairro": "Bela Vista",
      "tempo": "35 a 45 min",
      "taxa": 7
    },
    {
      "bairro": "Santa Cruz",
      "tempo": "40 a 50 min",
      "taxa": 8
    },
    {
      "bairro": "Parque das Flores",
      "tempo": "45 a 60 min",
      "taxa": 10
    }
  ],
  "pagamentos": [
    "Pix",
    "Cartão na entrega",
    "Dinheiro"
  ],
  "promocoes": [
    {
      "dia": 2,
      "titulo": "Terça do Smash",
      "descricao": "Smash Clássico de R$ 24,90 por R$ 18,90 o dia todo."
    },
    {
      "dia": 3,
      "titulo": "Quarta da Batata",
      "descricao": "Na compra de qualquer lanche, a batata frita pequena sai de graça."
    },
    {
      "dia": 4,
      "titulo": "Quinta em Dobro",
      "descricao": "Dois Smash Duplos por R$ 54,90."
    },
    {
      "dia": 5,
      "titulo": "Sexta do Combo",
      "descricao": "Combo Duplo com milkshake no lugar do refrigerante, sem custo a mais."
    },
    {
      "dia": 6,
      "titulo": "Sábado da Galera",
      "descricao": "Combo Família com 2 milkshakes de brinde."
    },
    {
      "dia": 0,
      "titulo": "Domingo Kids",
      "descricao": "Na compra de um combo, o mini smash para criança sai por R$ 9,90."
    }
  ],
  "cardapio": [
    {
      "categoria": "Lanches",
      "item": "Smash Clássico",
      "descricao": "Blend de 90 g prensado na chapa, queijo prato, picles e molho da casa no pão brioche.",
      "preco": 24.9,
      "disponivel": true
    },
    {
      "categoria": "Lanches",
      "item": "Smash Duplo",
      "descricao": "Dois blends de 90 g, cheddar derretido e cebola caramelizada no pão brioche.",
      "preco": 32.9,
      "disponivel": true
    },
    {
      "categoria": "Lanches",
      "item": "Smash Bacon",
      "descricao": "Blend de 90 g, bacon crocante, cheddar e maionese defumada.",
      "preco": 34.9,
      "disponivel": true
    },
    {
      "categoria": "Lanches",
      "item": "X-Salada da Casa",
      "descricao": "Hambúrguer de 150 g, queijo, alface, tomate, cebola roxa e maionese verde.",
      "preco": 27.9,
      "disponivel": true
    },
    {
      "categoria": "Lanches",
      "item": "X-Tudo da Esquina",
      "descricao": "Hambúrguer de 150 g, ovo, bacon, presunto, queijo, salada e batata palha.",
      "preco": 38.9,
      "disponivel": true
    },
    {
      "categoria": "Lanches",
      "item": "Chicken Crispy",
      "descricao": "Sobrecoxa empanada e crocante, coleslaw e molho de mel com mostarda.",
      "preco": 29.9,
      "disponivel": true
    },
    {
      "categoria": "Lanches",
      "item": "Veggie de Grão-de-Bico",
      "descricao": "Hambúrguer de grão-de-bico, queijo coalho grelhado, rúcula e tomate seco.",
      "preco": 30.9,
      "disponivel": true
    },
    {
      "categoria": "Lanches",
      "item": "Cheddar Melt",
      "descricao": "Blend de 150 g mergulhado em cheddar cremoso, no pão australiano.",
      "preco": 36.9,
      "disponivel": false
    },
    {
      "categoria": "Combos",
      "item": "Combo Smash",
      "descricao": "Smash Clássico + batata frita pequena + refrigerante lata.",
      "preco": 39.9,
      "disponivel": true
    },
    {
      "categoria": "Combos",
      "item": "Combo Duplo",
      "descricao": "Smash Duplo + batata frita pequena + refrigerante lata.",
      "preco": 47.9,
      "disponivel": true
    },
    {
      "categoria": "Combos",
      "item": "Combo Família",
      "descricao": "4 Smash Clássicos + 2 batatas grandes + refrigerante 2 litros.",
      "preco": 129.9,
      "disponivel": true
    },
    {
      "categoria": "Porções",
      "item": "Batata Frita",
      "descricao": "Porção de 400 g, sequinha e crocante, com sal e alecrim.",
      "preco": 19.9,
      "disponivel": true
    },
    {
      "categoria": "Porções",
      "item": "Batata Cheddar e Bacon",
      "descricao": "Porção de 400 g coberta com cheddar cremoso e bacon em cubos.",
      "preco": 29.9,
      "disponivel": true
    },
    {
      "categoria": "Porções",
      "item": "Onion Rings",
      "descricao": "Anéis de cebola empanados, com molho barbecue para acompanhar.",
      "preco": 22.9,
      "disponivel": true
    },
    {
      "categoria": "Porções",
      "item": "Mandioca Frita",
      "descricao": "Mandioca cozida e frita, com maionese da casa.",
      "preco": 21.9,
      "disponivel": true
    },
    {
      "categoria": "Porções",
      "item": "Frango a Passarinho",
      "descricao": "500 g de frango temperado no alho, com limão.",
      "preco": 34.9,
      "disponivel": true
    },
    {
      "categoria": "Bebidas",
      "item": "Refrigerante Lata",
      "descricao": "Coca-Cola, Guaraná ou Sprite. 350 ml.",
      "preco": 7.0,
      "disponivel": true
    },
    {
      "categoria": "Bebidas",
      "item": "Refrigerante 2 Litros",
      "descricao": "Coca-Cola ou Guaraná.",
      "preco": 16.0,
      "disponivel": true
    },
    {
      "categoria": "Bebidas",
      "item": "Suco Natural",
      "descricao": "Laranja, limão ou maracujá. 400 ml.",
      "preco": 10.0,
      "disponivel": true
    },
    {
      "categoria": "Bebidas",
      "item": "Chá Gelado da Casa",
      "descricao": "Chá mate com limão e hortelã. 400 ml.",
      "preco": 9.0,
      "disponivel": true
    },
    {
      "categoria": "Bebidas",
      "item": "Cerveja Long Neck",
      "descricao": "Pergunte as marcas do dia. Venda para maiores de 18 anos.",
      "preco": 12.0,
      "disponivel": true
    },
    {
      "categoria": "Bebidas",
      "item": "Água Mineral",
      "descricao": "Com ou sem gás. 500 ml.",
      "preco": 4.0,
      "disponivel": true
    },
    {
      "categoria": "Sobremesas",
      "item": "Milkshake de Ovomaltine",
      "descricao": "Sorvete de creme batido com Ovomaltine crocante. 400 ml.",
      "preco": 19.9,
      "disponivel": true
    },
    {
      "categoria": "Sobremesas",
      "item": "Milkshake de Nutella",
      "descricao": "Sorvete de creme batido com Nutella e calda de chocolate. 400 ml.",
      "preco": 21.9,
      "disponivel": true
    },
    {
      "categoria": "Sobremesas",
      "item": "Brownie com Sorvete",
      "descricao": "Brownie quentinho de chocolate meio amargo com bola de sorvete.",
      "preco": 18.9,
      "disponivel": true
    },
    {
      "categoria": "Sobremesas",
      "item": "Churros de Doce de Leite",
      "descricao": "Três mini churros recheados, com açúcar e canela.",
      "preco": 14.9,
      "disponivel": true
    }
  ]
};

// ===== A partir daqui é o funcionamento do site: não precisa mexer =====
const $ = id => document.getElementById(id);
const brl = v => Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const wa = t => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`;
const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const DIAS_CURTO = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DIAS_NOME = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const hora = s => { const [h, m] = s.split(":").map(Number); return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`; };
const minutos = s => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };
const iniciais = n => n.replace(/[^\p{L} ]/gu, "").split(" ").filter(Boolean).slice(0, 2).map(p => p[0]).join("").toUpperCase();

function ligarLinks(raiz = document) {
  raiz.querySelectorAll(".js-wa").forEach(a => a.href = wa(a.dataset.msg || CONFIG.mensagemWhatsapp));
  raiz.querySelectorAll(".js-ig").forEach(a => CONFIG.instagram ? a.href = CONFIG.instagram : a.remove());
  raiz.querySelectorAll(".js-mapa").forEach(a => a.href = CONFIG.linkMaps);
  raiz.querySelectorAll(".js-google").forEach(a => a.href = CONFIG.google.perfil);
  raiz.querySelectorAll(".js-avaliar").forEach(a => a.href = CONFIG.google.avaliar);
}
ligarLinks();

// Altura do cabeçalho (para barras que grudam embaixo dele)
const topo = document.querySelector("header");
const medirTopo = () => document.documentElement.style.setProperty("--topo-h", topo.offsetHeight + "px");
medirTopo(); addEventListener("resize", medirTopo);

// Menu no celular
const menuBtn = $("menu-btn"), nav = $("nav");
if (menuBtn) menuBtn.onclick = () => { menuBtn.setAttribute("aria-expanded", nav.classList.toggle("aberto")); medirTopo(); };

// Horários
const textoHorario = h => h.fechado ? "Fechado" : `${hora(h.abre)} às ${hora(h.fecha)}`;
document.querySelectorAll("[data-horarios]").forEach(el => {
  const d = new Date().getDay();
  el.innerHTML = CONFIG[el.dataset.horarios].map(h => {
    const hoje = h.de.includes(d);
    return `<tr class="${hoje ? "hoje" : ""}"><td>${esc(h.dias)}${hoje ? " (hoje)" : ""}</td><td>${textoHorario(h)}</td></tr>`;
  }).join("");
});

// Aberto agora?
function situacao(lista) {
  const agora = new Date(), d = agora.getDay(), m = agora.getHours() * 60 + agora.getMinutes();
  const doDia = dia => lista.find(h => h.de.includes(dia) && !h.fechado);
  const ontem = doDia((d + 6) % 7);
  if (ontem && minutos(ontem.fecha) < minutos(ontem.abre) && m < minutos(ontem.fecha)) return { aberto: true, texto: `Aberto agora · fecha às ${hora(ontem.fecha)}` };
  const hoje = doDia(d);
  if (hoje) {
    const a = minutos(hoje.abre); let f = minutos(hoje.fecha); if (f <= a) f += 1440;
    if (m >= a && m < f) return { aberto: true, texto: `Aberto agora · fecha às ${hora(hoje.fecha)}` };
    if (m < a) return { aberto: false, texto: `Fechado agora · abre hoje às ${hora(hoje.abre)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const h = doDia((d + i) % 7);
    if (h) return { aberto: false, texto: `Fechado agora · abre ${i === 1 ? "amanhã" : DIAS[(d + i) % 7]} às ${hora(h.abre)}` };
  }
  return { aberto: false, texto: "Fechado" };
}
document.querySelectorAll("[data-status]").forEach(el => {
  const s = situacao(CONFIG[el.dataset.status]);
  el.textContent = s.texto;
  el.classList.add(s.aberto ? "aberto" : "fechado");
});

// Próximos dias com a casa aberta (para agendar ou reservar)
function proximosDias(lista, n = 6) {
  const out = [], hoje = new Date();
  for (let i = 0; out.length < n && i < 14; i++) {
    const dt = new Date(hoje); dt.setDate(hoje.getDate() + i);
    const h = lista.find(x => x.de.includes(dt.getDay()) && !x.fechado);
    if (!h) continue;
    const dm = `${dt.getDate()}/${dt.getMonth() + 1}`;
    out.push({
      rotulo: i === 0 ? "Hoje" : i === 1 ? "Amanhã" : DIAS_CURTO[dt.getDay()],
      sub: dm,
      texto: i === 0 ? `hoje (${dm})` : i === 1 ? `amanhã (${dm})` : `${DIAS[dt.getDay()]} (${dm})`,
      hoje: i === 0, dia: dt.getDay(), horario: h
    });
  }
  return out;
}

// Grupo de opções (chips)
function opcoes(el, nome, itens, marcado = 0) {
  el.innerHTML = itens.map((it, i) => `<label class="chip"><input type="radio" name="${nome}" value="${i}"${i === marcado ? " checked" : ""}${it.desativado ? " disabled" : ""}><span>${it.rotulo}${it.sub ? `<small>${it.sub}</small>` : ""}</span></label>`).join("");
}
const escolhido = (form, nome) => Number((form.querySelector(`input[name="${nome}"]:checked`) || {}).value || 0);

// Abas de dia da semana (grade de aulas)
function abasDias(el, dias, aoTrocar) {
  const hoje = DIAS_NOME[new Date().getDay()];
  let atual = dias.includes(hoje) ? hoje : dias[0];
  const desenhar = () => {
    el.innerHTML = dias.map(d => `<button type="button" aria-pressed="${d === atual}">${d === hoje ? "Hoje" : esc(d)}</button>`).join("");
    el.querySelectorAll("button").forEach((b, i) => b.onclick = () => { atual = dias[i]; desenhar(); aoTrocar(atual); });
  };
  desenhar(); aoTrocar(atual);
}

// Formulário de contato: monta a mensagem e abre no WhatsApp
if ($("form-contato")) {
  const form = $("form-contato");
  const campos = [...form.querySelectorAll("[data-rotulo]")];
  const condicionais = [...form.querySelectorAll("[data-se-assunto]")];
  const visivel = c => !c.closest("[hidden]");
  const valor = c => { let v = c.value.trim(); if (c.type === "date" && v) v = new Date(v + "T12:00").toLocaleDateString("pt-BR"); return v; };
  const texto = () => [
    `Olá, ${CONFIG.nome}! Mensagem enviada pelo site:`,
    ...campos.filter(visivel).map(c => [c.dataset.rotulo, valor(c)]).filter(([, v]) => v).map(([r, v]) => r === "Mensagem" ? v : `• ${r}: ${v}`)
  ].join("\n");
  const atualizar = () => {
    condicionais.forEach(w => w.hidden = !w.dataset.seAssunto.split("|").includes($("assunto").value));
    $("previa-texto").textContent = texto();
    $("enviar-wa").hidden = true; $("form-ok").hidden = true;
  };
  form.addEventListener("input", atualizar);
  form.addEventListener("change", atualizar);
  form.addEventListener("submit", e => {
    e.preventDefault();
    const ok = $("nome").value.trim().length > 1;
    $("erro-nome").hidden = ok;
    if (!ok) { $("nome").focus(); return; }
    $("enviar-wa").href = wa(texto());
    $("enviar-wa").hidden = false; $("form-ok").hidden = false;
    $("enviar-wa").focus();
  });
  atualizar();
}

document.querySelectorAll(".js-ifood").forEach(a => CONFIG.ifood ? a.href = CONFIG.ifood : a.remove());

// ----- Mais pedido e promoção de hoje -----
const mais = CONFIG.cardapio.find(i => i.item === CONFIG.maisPedido);
document.querySelectorAll("[data-mais-preco]").forEach(el => el.textContent = mais ? brl(mais.preco) : "");
const hojeIdx = new Date().getDay();
const promoHoje = CONFIG.promocoes.find(p => p.dia === hojeIdx);
if ($("promo-hoje")) {
  $("promo-hoje").innerHTML = promoHoje
    ? `<span class="dia">${DIAS_NOME[hojeIdx]}</span><div><h3>${esc(promoHoje.titulo)}</h3><p>${esc(promoHoje.descricao)}</p></div><a class="btn btn-cta" href="cardapio.html">Aproveitar</a>`
    : `<span class="dia">${DIAS_NOME[hojeIdx]}</span><div><h3>Hoje a chapa descansa</h3><p>Volta amanhã com a Terça do Smash: Smash Clássico por R$ 18,90.</p></div><a class="btn btn-cta" href="promocoes.html">Ver a semana</a>`;
}
if ($("semana")) {
  $("semana").innerHTML = CONFIG.promocoes.map(p => `
    <article class="cartao${p.dia === hojeIdx ? " hoje" : ""}">
      <span class="dia-s">${DIAS_NOME[p.dia]}${p.dia === hojeIdx ? " · hoje" : ""}</span>
      <h3>${esc(p.titulo)}</h3>
      <p>${esc(p.descricao)}</p>
    </article>`).join("");
}
if ($("combos")) {
  $("combos").innerHTML = CONFIG.cardapio.filter(i => i.categoria === "Combos").map(c => `
    <article class="cartao combo"><h3>${esc(c.item)}</h3><p>${esc(c.descricao)}</p><span class="preco">${brl(c.preco)}</span></article>`).join("");
}
if ($("areas")) {
  $("areas").innerHTML = `<tr><th>Bairro</th><th>Tempo</th><th>Taxa</th></tr>` + CONFIG.areas.map(a =>
    `<tr><td>${esc(a.bairro)}</td><td>${esc(a.tempo)}</td><td>${a.taxa ? brl(a.taxa) : "Grátis"}</td></tr>`).join("");
}

// ----- Cardápio com pedido -----
if ($("cardapio")) {
  const cats = [...new Set(CONFIG.cardapio.map(i => i.categoria))];
  const pedido = new Map();
  const itens = CONFIG.cardapio.map((it, id) => ({ ...it, id }));

  $("filtros").innerHTML = ["Tudo", ...cats].map((n, i) => `<button type="button" data-cat="${i - 1}" aria-pressed="${i === 0}">${esc(n)}</button>`).join("");
  $("cardapio").innerHTML = cats.map((c, ci) => `
    <div class="categoria" data-cat="${ci}">
      <h2>${esc(c)}</h2>
      <div class="lista">
        ${itens.filter(i => i.categoria === c).map(it => `
          <div class="linha-item${it.disponivel ? "" : " esgotado"}">
            <div><h3>${esc(it.item)}</h3><p>${esc(it.descricao)}</p></div>
            <div class="lado">
              <span class="preco">${brl(it.preco)}</span>
              <div class="qtd" data-id="${it.id}">${it.disponivel ? `
                <button type="button" class="menos-um" aria-label="Tirar ${esc(it.item)}" hidden>−</button>
                <span aria-live="polite"></span>
                <button type="button" class="mais-um" aria-label="Adicionar ${esc(it.item)}">+</button>` : ""}
              </div>
            </div>
          </div>`).join("")}
      </div>
    </div>`).join("");

  $("filtros").onclick = e => {
    const b = e.target.closest("button"); if (!b) return;
    $("filtros").querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
    document.querySelectorAll(".categoria").forEach(c => c.hidden = b.dataset.cat !== "-1" && c.dataset.cat !== b.dataset.cat);
  };

  const form = $("form-finalizar");
  opcoes($("op-tipo"), "tipo", [{ rotulo: "Entrega" }, { rotulo: "Retirar no balcão" }]);
  opcoes($("op-pagamento"), "pagamento", CONFIG.pagamentos.map(p => ({ rotulo: esc(p) })));
  $("bairro").innerHTML = CONFIG.areas.map((a, i) => `<option value="${i}">${esc(a.bairro)} · ${a.taxa ? brl(a.taxa) : "grátis"} · ${esc(a.tempo)}</option>`).join("");

  const atualizar = () => {
    const entrega = escolhido(form, "tipo") === 0;
    const pagamento = CONFIG.pagamentos[escolhido(form, "pagamento")];
    $("campos-entrega").hidden = !entrega;
    $("campo-troco").hidden = pagamento !== "Dinheiro";
    let subtotal = 0, qtd = 0;
    const linhas = [];
    pedido.forEach((n, id) => { const it = itens[id]; subtotal += it.preco * n; qtd += n; linhas.push([`${n}x ${it.item}`, it.preco * n]); });
    const area = CONFIG.areas[Number($("bairro").value || 0)];
    const taxa = entrega ? area.taxa : 0;
    const total = subtotal + taxa;

    document.querySelectorAll(".qtd[data-id]").forEach(q => {
      const n = pedido.get(Number(q.dataset.id)) || 0;
      const s = q.querySelector("span"); if (!s) return;
      s.textContent = n || "";
      q.querySelector(".menos-um").hidden = !n;
    });
    $("comanda-itens").innerHTML = linhas.length
      ? linhas.map(([t, v]) => `<li><span>${esc(t)}</span><span>${brl(v)}</span></li>`).join("")
      : `<li class="vazio">Toque no + do cardápio para começar.</li>`;
    $("comanda-sub").textContent = brl(subtotal);
    $("comanda-taxa").textContent = entrega ? (taxa ? brl(taxa) : "Grátis") : "Retirada";
    $("comanda-total").textContent = brl(total);
    $("sacola").classList.toggle("aberta", qtd > 0);
    document.body.classList.toggle("com-sacola", qtd > 0);
    $("sacola-qtd").textContent = `${qtd} ${qtd === 1 ? "item" : "itens"} · ${brl(subtotal)}`;

    const v = id => $(id).value.trim();
    const texto = [
      `Olá, ${CONFIG.nome}! Quero fazer um pedido:`,
      ...linhas.map(([t, val]) => `• ${t} (${brl(val)})`),
      "",
      entrega ? `Entrega em ${area.bairro}${v("endereco") ? `: ${v("endereco")}` : ""}` : "Vou retirar no balcão",
      entrega ? `Taxa: ${taxa ? brl(taxa) : "grátis"}` : "",
      `Total: ${brl(total)}`,
      `Pagamento: ${pagamento}${pagamento === "Dinheiro" && v("troco") ? ` (troco para ${v("troco")})` : ""}`,
      v("obs") && `Obs.: ${v("obs")}`,
      v("nome-pedido") && `Nome: ${v("nome-pedido")}`
    ].filter(l => l !== "" && l !== false).join("\n");
    $("comanda-enviar").href = qtd ? wa(texto) : "#";
    $("comanda-enviar").setAttribute("aria-disabled", qtd ? "false" : "true");
    $("comanda-tempo").textContent = entrega ? `Chega em ${area.tempo}` : "Fica pronto em cerca de 20 min";
  };

  $("cardapio").onclick = e => {
    const b = e.target.closest("button"); if (!b) return;
    const id = Number(b.closest(".qtd").dataset.id);
    const n = (pedido.get(id) || 0) + (b.classList.contains("mais-um") ? 1 : -1);
    n > 0 ? pedido.set(id, n) : pedido.delete(id);
    atualizar();
  };
  $("sacola-limpar").onclick = () => { pedido.clear(); atualizar(); };
  form.addEventListener("input", atualizar);
  form.addEventListener("change", atualizar);
  atualizar();
}
