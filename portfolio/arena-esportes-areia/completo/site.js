// ===== Dados do negócio: troque aqui para cada cliente =====
// WhatsApp: 55 + DDD + número, só dígitos. No modelo está o número da Clika, para quem testar falar com a gente.
// Horários: "de" são os dias da semana (0 = domingo ... 6 = sábado).
const CONFIG = {
  "nome": "Arena Pé na Areia",
  "mensagemWhatsapp": "Oi! Quero reservar uma quadra.",
  "whatsapp": "5514991337516",
  "instagram": "https://www.instagram.com/",
  "linkMaps": "https://maps.google.com/?q=S%C3%A3o+Paulo,+SP",
  "google": {
    "perfil": "https://maps.google.com/?q=S%C3%A3o+Paulo,+SP",
    "avaliar": "https://maps.google.com/?q=S%C3%A3o+Paulo,+SP"
  },
  "horarios": [
    {
      "dias": "Segunda a sexta",
      "de": [
        1,
        2,
        3,
        4,
        5
      ],
      "abre": "06:00",
      "fecha": "23:00"
    },
    {
      "dias": "Sábado",
      "de": [
        6
      ],
      "abre": "07:00",
      "fecha": "20:00"
    },
    {
      "dias": "Domingo",
      "de": [
        0
      ],
      "abre": "07:00",
      "fecha": "18:00"
    }
  ],
  "tarifas": [
    {
      "grupo": "Segunda a sexta",
      "de": [
        1,
        2,
        3,
        4,
        5
      ],
      "nome": "Horário normal",
      "inicio": "06:00",
      "fim": "17:00",
      "valor": 80
    },
    {
      "grupo": "Segunda a sexta",
      "de": [
        1,
        2,
        3,
        4,
        5
      ],
      "nome": "Horário de pico",
      "inicio": "17:00",
      "fim": "23:00",
      "valor": 120
    },
    {
      "grupo": "Sábado, domingo e feriado",
      "de": [
        6,
        0
      ],
      "nome": "Horário normal",
      "inicio": "07:00",
      "fim": "13:00",
      "valor": 100
    },
    {
      "grupo": "Sábado, domingo e feriado",
      "de": [
        6,
        0
      ],
      "nome": "Horário de pico",
      "inicio": "13:00",
      "fim": "20:00",
      "valor": 140
    }
  ],
  "obsPrecos": "Valor por quadra, não por pessoa. Cancelamento grátis até 12h antes. Raquetes e bolas para alugar na recepção.",
  "modalidades": [
    "Beach Tennis",
    "Futevôlei",
    "Vôlei de Praia"
  ],
  "grade": [
    {
      "dia": "Segunda",
      "horario": "07:00",
      "modalidade": "Beach Tennis",
      "nivel": "Iniciante",
      "professor": "Lari Souza"
    },
    {
      "dia": "Segunda",
      "horario": "18:00",
      "modalidade": "Futevôlei",
      "nivel": "Intermediário",
      "professor": "Dudu Ramos"
    },
    {
      "dia": "Segunda",
      "horario": "19:00",
      "modalidade": "Beach Tennis",
      "nivel": "Intermediário",
      "professor": "Lari Souza"
    },
    {
      "dia": "Segunda",
      "horario": "20:00",
      "modalidade": "Vôlei de Praia",
      "nivel": "Iniciante",
      "professor": "Bia Costa"
    },
    {
      "dia": "Terça",
      "horario": "07:00",
      "modalidade": "Futevôlei",
      "nivel": "Iniciante",
      "professor": "Dudu Ramos"
    },
    {
      "dia": "Terça",
      "horario": "18:00",
      "modalidade": "Beach Tennis",
      "nivel": "Avançado",
      "professor": "Rafa Lima"
    },
    {
      "dia": "Terça",
      "horario": "19:00",
      "modalidade": "Vôlei de Praia",
      "nivel": "Intermediário",
      "professor": "Bia Costa"
    },
    {
      "dia": "Terça",
      "horario": "20:00",
      "modalidade": "Beach Tennis",
      "nivel": "Iniciante",
      "professor": "Rafa Lima"
    },
    {
      "dia": "Quarta",
      "horario": "07:00",
      "modalidade": "Beach Tennis",
      "nivel": "Iniciante",
      "professor": "Lari Souza"
    },
    {
      "dia": "Quarta",
      "horario": "18:00",
      "modalidade": "Futevôlei",
      "nivel": "Avançado",
      "professor": "Dudu Ramos"
    },
    {
      "dia": "Quarta",
      "horario": "19:00",
      "modalidade": "Beach Tennis",
      "nivel": "Intermediário",
      "professor": "Lari Souza"
    },
    {
      "dia": "Quarta",
      "horario": "20:00",
      "modalidade": "Vôlei de Praia",
      "nivel": "Avançado",
      "professor": "Bia Costa"
    },
    {
      "dia": "Quinta",
      "horario": "07:00",
      "modalidade": "Futevôlei",
      "nivel": "Iniciante",
      "professor": "Dudu Ramos"
    },
    {
      "dia": "Quinta",
      "horario": "18:00",
      "modalidade": "Beach Tennis",
      "nivel": "Avançado",
      "professor": "Rafa Lima"
    },
    {
      "dia": "Quinta",
      "horario": "19:00",
      "modalidade": "Vôlei de Praia",
      "nivel": "Intermediário",
      "professor": "Bia Costa"
    },
    {
      "dia": "Quinta",
      "horario": "20:00",
      "modalidade": "Beach Tennis",
      "nivel": "Iniciante",
      "professor": "Rafa Lima"
    },
    {
      "dia": "Sexta",
      "horario": "07:00",
      "modalidade": "Beach Tennis",
      "nivel": "Iniciante",
      "professor": "Lari Souza"
    },
    {
      "dia": "Sexta",
      "horario": "18:00",
      "modalidade": "Futevôlei",
      "nivel": "Intermediário",
      "professor": "Dudu Ramos"
    },
    {
      "dia": "Sexta",
      "horario": "19:00",
      "modalidade": "Beach Tennis",
      "nivel": "Kids",
      "professor": "Rafa Lima"
    },
    {
      "dia": "Sábado",
      "horario": "08:00",
      "modalidade": "Beach Tennis",
      "nivel": "Kids",
      "professor": "Lari Souza"
    },
    {
      "dia": "Sábado",
      "horario": "09:00",
      "modalidade": "Futevôlei",
      "nivel": "Iniciante",
      "professor": "Dudu Ramos"
    },
    {
      "dia": "Sábado",
      "horario": "10:00",
      "modalidade": "Vôlei de Praia",
      "nivel": "Iniciante",
      "professor": "Bia Costa"
    }
  ],
  "niveis": {
    "Iniciante": "#2BA84A",
    "Intermediário": "#1E6FD9",
    "Avançado": "#E8452C",
    "Kids": "#C98A00"
  }
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

// ----- Tabela de preços e reserva de quadra -----
if ($("tarifas")) {
  const grupos = [...new Set(CONFIG.tarifas.map(t => t.grupo))];
  $("tarifas").innerHTML = grupos.map(g => `
    <div class="cartao tarifa"><h3>${esc(g)}</h3>
      <table class="tabela">${CONFIG.tarifas.filter(t => t.grupo === g).map(t => `<tr><td><b>${esc(t.nome)}</b><br><span class="suave">${hora(t.inicio)} às ${hora(t.fim)}</span></td><td>${brl(t.valor)}<small class="suave"> /hora</small></td></tr>`).join("")}</table>
    </div>`).join("");
}

if ($("form-reserva")) {
  const form = $("form-reserva");
  const dias = proximosDias(CONFIG.horarios, 7);
  const duracoes = [{ rotulo: "1h", min: 60 }, { rotulo: "1h30", min: 90 }, { rotulo: "2h", min: 120 }];
  const pessoas = ["2", "4", "6 ou mais"];
  opcoes($("op-modalidade"), "modalidade", CONFIG.modalidades.map(m => ({ rotulo: esc(m) })));
  opcoes($("op-dia"), "dia", dias.map(d => ({ rotulo: d.rotulo, sub: d.sub })));
  opcoes($("op-duracao"), "duracao", duracoes);
  opcoes($("op-pessoas"), "pessoas", pessoas.map(p => ({ rotulo: p })), 1);

  const fmt = m => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  const tarifa = (dia, m) => CONFIG.tarifas.find(t => t.de.includes(dia) && m >= minutos(t.inicio) && m < minutos(t.fim));
  const custo = (dia, inicio, dur) => { let v = 0; for (let m = inicio; m < inicio + dur; m += 30) { const t = tarifa(dia, m); v += t ? t.valor / 2 : 0; } return v; };

  const desenharHorarios = () => {
    const d = dias[escolhido(form, "dia")];
    const dur = duracoes[escolhido(form, "duracao")].min;
    const agora = new Date().getHours() * 60 + new Date().getMinutes();
    const ini = minutos(d.horario.abre), fim = minutos(d.horario.fecha);
    const itens = [];
    for (let m = ini; m + dur <= fim; m += 60) {
      if (d.hoje && m <= agora) continue; // horários que já passaram nem aparecem
      const t = tarifa(d.dia, m);
      itens.push({ rotulo: hora(fmt(m)), sub: t && t.nome === "Horário de pico" ? "pico" : "normal", min: m });
    }
    const atual = form.querySelector('input[name="hora"]:checked');
    let marcado = atual ? Number(atual.value) : 0;
    if (!itens[marcado] || itens[marcado].desativado) marcado = Math.max(0, itens.findIndex(i => !i.desativado));
    opcoes($("op-hora"), "hora", itens, marcado);
    $("op-hora").dataset.itens = JSON.stringify(itens.map(i => i.min));
    $("sem-horario").hidden = itens.length > 0;
  };

  const atualizar = () => {
    const mod = CONFIG.modalidades[escolhido(form, "modalidade")];
    const d = dias[escolhido(form, "dia")];
    const dur = duracoes[escolhido(form, "duracao")];
    const lista = JSON.parse($("op-hora").dataset.itens || "[]");
    const inicio = lista[escolhido(form, "hora")];
    const livre = $("sem-horario").hidden && inicio !== undefined;
    const valor = livre ? custo(d.dia, inicio, dur.min) : 0;
    const p = pessoas[escolhido(form, "pessoas")];
    const texto = [
      `Oi, ${CONFIG.nome}! Quero reservar uma quadra:`,
      `• ${mod}`,
      `• Dia: ${d.texto}`,
      livre ? `• Horário: ${hora(fmt(inicio))} às ${hora(fmt(inicio + dur.min))} (${dur.rotulo})` : "",
      `• Pessoas: ${p}`,
      livre ? `• Valor pela tabela do site: ${brl(valor)}` : "",
      "Esse horário está livre?"
    ].filter(Boolean).join("\n");
    $("valor-reserva").textContent = livre ? brl(valor) : "—";
    $("por-pessoa").textContent = livre ? `cerca de ${brl(valor / (parseInt(p) || 2))} por pessoa` : "Escolha outro dia";
    $("previa").textContent = texto;
    $("enviar").href = wa(texto);
  };
  form.addEventListener("change", e => { if (e.target.name === "dia" || e.target.name === "duracao") desenharHorarios(); atualizar(); });
  desenharHorarios(); atualizar();
}

// ----- Grade de aulas -----
if ($("grade")) {
  const dias = [...new Set(CONFIG.grade.map(a => a.dia))];
  const mods = ["Todas", ...CONFIG.modalidades];
  let dia = dias[0], mod = 0;
  opcoes($("filtro-mod"), "mod", mods.map(m => ({ rotulo: esc(m) })));
  const desenhar = () => {
    const ehHoje = dia === DIAS_NOME[new Date().getDay()];
    const agora = new Date().getHours() * 60 + new Date().getMinutes();
    const aulas = CONFIG.grade.filter(a => a.dia === dia && (mod === 0 || a.modalidade === mods[mod]));
    $("grade").innerHTML = aulas.length ? aulas.map(a => {
      const passou = ehHoje && minutos(a.horario) < agora;
      return `<div class="aula${passou ? " passou" : ""}">
        <span class="h">${hora(a.horario)}</span>
        <div><b>${esc(a.modalidade)}</b><small><span class="nivel" style="--cor-n:${CONFIG.niveis[a.nivel] || "#999"}">${esc(a.nivel)}</span> · ${esc(a.professor)}${passou ? " · já começou" : ""}</small></div>
        ${passou ? "" : `<a class="btn btn-cartao btn-peq js-wa" href="#" target="_blank" rel="noopener" data-msg="Oi! Quero fazer a aula experimental de ${esc(a.modalidade)} (${esc(a.nivel.toLowerCase())}) de ${esc(a.dia.toLowerCase())} às ${hora(a.horario)}.">Aula experimental</a>`}
      </div>`;
    }).join("") : `<p class="suave" style="padding:16px 0">Sem aula de ${esc(mods[mod])} nesse dia. As quadras ficam livres para reserva.</p>`;
    ligarLinks($("grade"));
  };
  abasDias($("abas"), dias, d => { dia = d; desenhar(); });
  $("filtro-mod").addEventListener("change", e => { mod = Number(e.target.value); desenhar(); });
}
