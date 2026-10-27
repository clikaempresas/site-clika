// ===== Dados do negócio: troque aqui para cada cliente =====
// WhatsApp: 55 + DDD + número, só dígitos. No modelo está o número da Clika, para quem testar falar com a gente.
// Horários: "de" são os dias da semana (0 = domingo ... 6 = sábado).
const CONFIG = {
  "nome": "Barbearia do Zé",
  "mensagemWhatsapp": "Olá, Barbearia do Zé! Vi o site e quero agendar um horário.",
  "whatsapp": "5514991337516",
  "instagram": "https://www.instagram.com/",
  "linkMaps": "https://maps.google.com/?q=Pra%C3%A7a+da+S%C3%A9,+S%C3%A3o+Paulo",
  "google": {
    "perfil": "https://maps.google.com/?q=Pra%C3%A7a+da+S%C3%A9,+S%C3%A3o+Paulo",
    "avaliar": "https://maps.google.com/?q=Pra%C3%A7a+da+S%C3%A9,+S%C3%A3o+Paulo"
  },
  "horarios": [
    {
      "dias": "Segunda",
      "de": [
        1
      ],
      "fechado": true
    },
    {
      "dias": "Terça a sexta",
      "de": [
        2,
        3,
        4,
        5
      ],
      "abre": "09:00",
      "fecha": "20:00"
    },
    {
      "dias": "Sábado",
      "de": [
        6
      ],
      "abre": "08:00",
      "fecha": "18:00"
    },
    {
      "dias": "Domingo",
      "de": [
        0
      ],
      "fechado": true
    }
  ],
  "servicos": [
    {
      "servico": "Corte",
      "preco": 45,
      "duracao": "40 min",
      "descricao": "Máquina e tesoura, do social ao degradê na régua. Lavagem e finalização inclusas.",
      "destaque": false
    },
    {
      "servico": "Barba",
      "preco": 35,
      "duracao": "30 min",
      "descricao": "Toalha quente, navalha e balm. Contorno alinhado e pele sem irritação.",
      "destaque": false
    },
    {
      "servico": "Combo corte + barba",
      "preco": 70,
      "duracao": "1h10",
      "descricao": "O pacote completo com desconto. O mais pedido da casa.",
      "destaque": true
    },
    {
      "servico": "Sobrancelha",
      "preco": 15,
      "duracao": "10 min",
      "descricao": "Limpeza e alinhamento na navalha ou na pinça.",
      "destaque": false
    },
    {
      "servico": "Pigmentação",
      "preco": 40,
      "duracao": "30 min",
      "descricao": "Preenche falhas da barba ou do corte e deixa o desenho mais marcado.",
      "destaque": false
    },
    {
      "servico": "Corte infantil",
      "preco": 35,
      "duracao": "30 min",
      "descricao": "Até 12 anos. Paciência e capricho para a primeira visita.",
      "destaque": false
    }
  ],
  "equipe": [
    {
      "nome": "Zé",
      "cargo": "Fundador",
      "especialidade": "Corte social, tesoura e barba clássica na navalha.",
      "desde": "Na cadeira desde 2009"
    },
    {
      "nome": "Rafa",
      "cargo": "Barbeiro",
      "especialidade": "Degradê, navalhado e desenhos na máquina.",
      "desde": "Na casa desde 2017"
    },
    {
      "nome": "Dudu",
      "cargo": "Barbeiro",
      "especialidade": "Barboterapia, pigmentação e sobrancelha.",
      "desde": "Na casa desde 2020"
    }
  ],
  "galeria": [
    "Degradê navalhado",
    "Barba desenhada",
    "Social na tesoura",
    "Pigmentação",
    "Corte infantil",
    "Toalha quente",
    "Risco na máquina"
  ],
  "periodos": [
    "Manhã",
    "Tarde",
    "Noite"
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

// ----- Serviços: cartões da página inicial e lista com agendamento -----
if ($("destaques-servicos")) {
  $("destaques-servicos").innerHTML = CONFIG.servicos.slice(0, 3).map(s => `
    <article class="cartao servico-card">
      ${s.destaque ? '<span class="tag">Mais pedido</span>' : ""}
      <div class="topo-s"><h3>${esc(s.servico)}</h3><span class="preco">${brl(s.preco)}</span></div>
      <p>${esc(s.descricao)}</p>
      <span class="dur">${esc(s.duracao)}</span>
    </article>`).join("");
}

if ($("form-agendar")) {
  $("lista-servicos").innerHTML = CONFIG.servicos.map((s, i) => `
    <div class="linha-item">
      <div><h3>${esc(s.servico)}${s.destaque ? ' <span class="tag">Mais pedido</span>' : ""}</h3><p>${esc(s.descricao)} · ${esc(s.duracao)}</p></div>
      <div class="lado"><span class="preco">${brl(s.preco)}</span><button type="button" class="btn btn-borda btn-peq" data-servico="${i}">Escolher</button></div>
    </div>`).join("");

  const form = $("form-agendar");
  const dias = proximosDias(CONFIG.horarios, 6);
  const barbeiros = [{ rotulo: "Tanto faz", nome: "" }, ...CONFIG.equipe.map(b => ({ rotulo: esc(b.nome), sub: esc(b.cargo), nome: b.nome }))];
  const pegaBarbeiro = new URLSearchParams(location.search).get("barbeiro");
  const marcadoBarbeiro = Math.max(0, barbeiros.findIndex(b => b.nome === pegaBarbeiro));

  opcoes($("op-servico"), "servico", CONFIG.servicos.map(s => ({ rotulo: esc(s.servico), sub: brl(s.preco) })), CONFIG.servicos.findIndex(s => s.destaque));
  opcoes($("op-barbeiro"), "barbeiro", barbeiros, marcadoBarbeiro);
  opcoes($("op-dia"), "dia", dias.map(d => ({ rotulo: d.rotulo, sub: d.sub })));

  const desenharPeriodos = () => {
    const d = dias[escolhido(form, "dia")];
    const agora = new Date().getHours();
    const fim = minutos(d.horario.fecha) / 60;
    const itens = CONFIG.periodos.map(p => {
      const [ini, fimP] = { "Manhã": [0, 12], "Tarde": [12, 18], "Noite": [18, 24] }[p] || [0, 24];
      const passou = d.hoje && agora >= fimP;
      const fechado = minutos(d.horario.abre) / 60 >= fimP || fim <= ini;
      return { rotulo: p, desativado: passou || fechado };
    });
    const atual = form.querySelector('input[name="periodo"]:checked');
    let marcado = atual ? Number(atual.value) : 0;
    if (itens[marcado].desativado) marcado = Math.max(0, itens.findIndex(i => !i.desativado));
    opcoes($("op-periodo"), "periodo", itens, marcado);
  };

  const atualizar = () => {
    const s = CONFIG.servicos[escolhido(form, "servico")];
    const b = barbeiros[escolhido(form, "barbeiro")];
    const d = dias[escolhido(form, "dia")];
    const p = CONFIG.periodos[escolhido(form, "periodo")];
    const texto = [
      `Olá, ${CONFIG.nome}! Quero agendar:`,
      `• Serviço: ${s.servico} (${brl(s.preco)})`,
      b.nome && `• Barbeiro: ${b.nome}`,
      `• Dia: ${d.texto}`,
      `• Período: ${p.toLowerCase()}`,
      "Tem horário?"
    ].filter(Boolean).join("\n");
    $("previa").textContent = texto;
    $("total").textContent = brl(s.preco);
    $("duracao").textContent = s.duracao;
    $("enviar").href = wa(texto);
  };
  form.addEventListener("change", e => { if (e.target.name === "dia") desenharPeriodos(); atualizar(); });
  $("lista-servicos").onclick = e => {
    const b = e.target.closest("[data-servico]"); if (!b) return;
    form.querySelector(`input[name="servico"][value="${b.dataset.servico}"]`).checked = true;
    atualizar();
    $("agendar").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  desenharPeriodos(); atualizar();
}

// ----- Equipe e galeria -----
if ($("equipe")) {
  $("equipe").innerHTML = CONFIG.equipe.map(b => `
    <article class="cartao barbeiro">
      <div class="foto"><span>Foto do ${esc(b.nome)}</span></div>
      <span class="cargo">${esc(b.cargo)}</span>
      <h3>${esc(b.nome)}</h3>
      <p>${esc(b.especialidade)}</p>
      <p>${esc(b.desde)}</p>
      <a class="btn btn-cta btn-peq" href="servicos.html?barbeiro=${encodeURIComponent(b.nome)}#agendar">Agendar com ${esc(b.nome)}</a>
    </article>`).join("");
}
if ($("galeria")) $("galeria").innerHTML = CONFIG.galeria.map(l => `<div class="foto"><span>${esc(l)}</span></div>`).join("");
