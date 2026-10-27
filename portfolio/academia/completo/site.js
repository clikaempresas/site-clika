// ===== Dados do negócio: troque aqui para cada cliente =====
// WhatsApp: 55 + DDD + número, só dígitos. No modelo está o número da Clika, para quem testar falar com a gente.
// Horários: "de" são os dias da semana (0 = domingo ... 6 = sábado).
const CONFIG = {
  "nome": "Força Total",
  "mensagemWhatsapp": "Oi! Vi o site e quero agendar minha aula experimental grátis.",
  "whatsapp": "5514991337516",
  "instagram": "https://www.instagram.com/somosclika/",
  "linkMaps": "https://maps.google.com/?q=Vila+Mariana,+S%C3%A3o+Paulo+-+SP",
  "google": {
    "perfil": "https://maps.google.com/?q=Vila+Mariana,+S%C3%A3o+Paulo+-+SP",
    "avaliar": "https://maps.google.com/?q=Vila+Mariana,+S%C3%A3o+Paulo+-+SP"
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
      "abre": "05:00",
      "fecha": "23:00"
    },
    {
      "dias": "Sábado",
      "de": [
        6
      ],
      "abre": "08:00",
      "fecha": "16:00"
    },
    {
      "dias": "Domingo e feriados",
      "de": [
        0
      ],
      "abre": "09:00",
      "fecha": "13:00"
    }
  ],
  "planos": [
    {
      "plano": "Mensal",
      "preco": 129,
      "meses": 1,
      "beneficios": [
        "Musculação livre",
        "Aulas coletivas",
        "Avaliação física",
        "Sem fidelidade"
      ],
      "destaque": false
    },
    {
      "plano": "Trimestral",
      "preco": 119,
      "meses": 3,
      "beneficios": [
        "Tudo do Mensal",
        "Treino revisado todo mês",
        "1 aula grátis para um amigo"
      ],
      "destaque": false
    },
    {
      "plano": "Semestral",
      "preco": 109,
      "meses": 6,
      "beneficios": [
        "Tudo do Trimestral",
        "Reavaliação física a cada 3 meses",
        "Camiseta da academia"
      ],
      "destaque": true
    },
    {
      "plano": "Anual",
      "preco": 97,
      "meses": 12,
      "beneficios": [
        "Tudo do Semestral",
        "Congelamento de até 30 dias",
        "2 consultas com nutricionista"
      ],
      "destaque": false
    }
  ],
  "grade": [
    {
      "dia": "Segunda",
      "horario": "06:30",
      "modalidade": "Funcional",
      "professor": "Camila"
    },
    {
      "dia": "Segunda",
      "horario": "07:30",
      "modalidade": "Spinning",
      "professor": "Camila"
    },
    {
      "dia": "Segunda",
      "horario": "12:15",
      "modalidade": "Alongamento",
      "professor": "Rafael"
    },
    {
      "dia": "Segunda",
      "horario": "18:30",
      "modalidade": "Spinning",
      "professor": "Camila"
    },
    {
      "dia": "Segunda",
      "horario": "19:30",
      "modalidade": "Muay Thai",
      "professor": "Diego"
    },
    {
      "dia": "Terça",
      "horario": "06:30",
      "modalidade": "Spinning",
      "professor": "Camila"
    },
    {
      "dia": "Terça",
      "horario": "18:00",
      "modalidade": "Funcional",
      "professor": "Camila"
    },
    {
      "dia": "Terça",
      "horario": "19:00",
      "modalidade": "Jiu-jítsu",
      "professor": "Diego"
    },
    {
      "dia": "Terça",
      "horario": "20:30",
      "modalidade": "Muay Thai",
      "professor": "Diego"
    },
    {
      "dia": "Quarta",
      "horario": "06:30",
      "modalidade": "Funcional",
      "professor": "Camila"
    },
    {
      "dia": "Quarta",
      "horario": "07:30",
      "modalidade": "Spinning",
      "professor": "Camila"
    },
    {
      "dia": "Quarta",
      "horario": "12:15",
      "modalidade": "Alongamento",
      "professor": "Rafael"
    },
    {
      "dia": "Quarta",
      "horario": "18:30",
      "modalidade": "Spinning",
      "professor": "Camila"
    },
    {
      "dia": "Quarta",
      "horario": "19:30",
      "modalidade": "Muay Thai",
      "professor": "Diego"
    },
    {
      "dia": "Quinta",
      "horario": "06:30",
      "modalidade": "Spinning",
      "professor": "Camila"
    },
    {
      "dia": "Quinta",
      "horario": "18:00",
      "modalidade": "Funcional",
      "professor": "Camila"
    },
    {
      "dia": "Quinta",
      "horario": "19:00",
      "modalidade": "Jiu-jítsu",
      "professor": "Diego"
    },
    {
      "dia": "Quinta",
      "horario": "20:30",
      "modalidade": "Muay Thai",
      "professor": "Diego"
    },
    {
      "dia": "Sexta",
      "horario": "06:30",
      "modalidade": "Funcional",
      "professor": "Camila"
    },
    {
      "dia": "Sexta",
      "horario": "07:30",
      "modalidade": "Spinning",
      "professor": "Camila"
    },
    {
      "dia": "Sexta",
      "horario": "18:30",
      "modalidade": "Funcional",
      "professor": "Camila"
    },
    {
      "dia": "Sábado",
      "horario": "09:00",
      "modalidade": "Spinning",
      "professor": "Camila"
    },
    {
      "dia": "Sábado",
      "horario": "10:00",
      "modalidade": "Funcional",
      "professor": "Camila"
    },
    {
      "dia": "Sábado",
      "horario": "10:30",
      "modalidade": "Jiu-jítsu kids",
      "professor": "Diego"
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

// ----- Planos -----
if ($("planos")) {
  $("planos").innerHTML = CONFIG.planos.map(p => `
    <article class="cartao plano${p.destaque ? " destaque" : ""}">
      ${p.destaque ? '<span class="tag">Recomendado</span>' : ""}
      <h3>${esc(p.plano)}</h3>
      <span class="valor">${brl(p.preco).replace(",00", "")}<small> /mês</small></span>
      <p>${p.meses === 1 ? "Sem fidelidade, cancela quando quiser." : `Compromisso de ${p.meses} meses.`}</p>
      <ul>${p.beneficios.map(b => `<li>${esc(b)}</li>`).join("")}</ul>
      <a class="btn ${p.destaque ? "btn-cta" : "btn-cartao"} js-wa" href="#" target="_blank" rel="noopener" data-msg="Oi! Vi no site o plano ${esc(p.plano)} de ${brl(p.preco)} por mês e quero saber como assinar.">Quero o ${esc(p.plano)}</a>
    </article>`).join("");
  ligarLinks($("planos"));
}
if ($("barras")) {
  const anos = CONFIG.planos.map(p => ({ ...p, ano: p.preco * 12 }));
  const maior = Math.max(...anos.map(a => a.ano));
  const menor = Math.min(...anos.map(a => a.ano));
  $("barras").innerHTML = anos.map(a => `
    <div class="barra${a.ano === menor ? " melhor" : ""}">
      <b>${esc(a.plano)}</b>
      <div class="trilho"><div class="cheio" style="width:${(a.ano / maior * 100).toFixed(1)}%"></div></div>
      <span><b>${brl(a.ano)}</b>${a.ano < maior ? `<span class="eco">economiza ${brl(maior - a.ano)}</span>` : `<span class="eco" style="color:var(--faixa-suave)">valor cheio</span>`}</span>
    </div>`).join("");
}

// ----- Grade de aulas -----
if ($("grade")) {
  const dias = [...new Set(CONFIG.grade.map(a => a.dia))];
  const mods = ["Todas", ...new Set(CONFIG.grade.map(a => a.modalidade))];
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
        <div><b>${esc(a.modalidade)}</b><span class="prof">com ${esc(a.professor)}${passou ? " · já começou" : ""}</span></div>
        ${passou ? "" : `<a class="btn btn-cartao btn-peq js-wa" href="#" target="_blank" rel="noopener" data-msg="Oi! Quero reservar uma vaga na aula de ${esc(a.modalidade)} de ${esc(a.dia.toLowerCase())} às ${hora(a.horario)}.">Reservar vaga</a>`}
      </div>`;
    }).join("") : `<p class="suave" style="padding:16px 0">Sem aula de ${esc(mods[mod])} nesse dia. A musculação fica liberada o dia todo.</p>`;
    ligarLinks($("grade"));
  };
  abasDias($("abas"), dias, d => { dia = d; desenhar(); });
  $("filtro-mod").addEventListener("change", e => { mod = Number(e.target.value); desenhar(); });
}
