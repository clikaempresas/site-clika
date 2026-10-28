"""Gera o site de um negócio (planos Essencial e Completo) a partir de
negocios/<nome>/config.json e negocios/<nome>/dados.csv.

Uso:
    python ferramentas/sites/gerar.py barbearia            -> escreve em portfolio/barbearia/
    python ferramentas/sites/gerar.py barbearia --saida X  -> escreve na pasta X
    python ferramentas/sites/gerar.py todos                -> todos os negócios

O HTML sai pronto (o Google lê tudo sem depender de JavaScript). O script do site
só dá vida: aberto agora, abas, agenda, grade de aulas, mapa e WhatsApp.
"""
import csv, html, json, re, shutil, sys, unicodedata, urllib.parse
from pathlib import Path

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parent.parent  # raiz do site da Clika
E = lambda s: html.escape(str(s if s is not None else ""), quote=True)

# ----------------------------------------------------------------- utilidades
def sem_acento(t):
    return "".join(c for c in unicodedata.normalize("NFD", str(t)) if unicodedata.category(c) != "Mn").lower().strip()

DIA_N = {"dom": 0, "seg": 1, "ter": 2, "qua": 3, "qui": 4, "sex": 5, "sab": 6}

def dias_de(texto):
    """'Terça a sexta' -> [2,3,4,5]; 'Sáb e dom' -> [6,0]; 'Feriados' -> []"""
    t = sem_acento(texto)
    achados = [(m.start(), DIA_N[m.group(1)]) for m in re.finditer(r"(dom|seg|ter|qua|qui|sex|sab)", t)]
    if not achados:
        return []
    if len(achados) >= 2 and re.search(r"\sa\s", t[achados[0][0]:achados[1][0]]):
        a, b = achados[0][1], achados[1][1]
        out, d = [], a
        while True:
            out.append(d)
            if d == b: break
            d = (d + 1) % 7
        return out
    return [d for _, d in achados]

def faixa_de(texto):
    """'9h às 20h' -> (540, 1200); '18:00 às 01:00' -> (1080, 1500); 'Fechado' -> None"""
    t = sem_acento(texto)
    if "fechad" in t or not t:
        return None
    hs = re.findall(r"(\d{1,2})(?:[:h](\d{2}))?\s*h?", t)
    if len(hs) < 2:
        return None
    a = int(hs[0][0]) * 60 + int(hs[0][1] or 0)
    f = int(hs[1][0]) * 60 + int(hs[1][1] or 0)
    if f <= a:
        f += 1440
    return a, f

def preco_txt(v):
    v = str(v or "").strip()
    if not v:
        return ""
    try:
        n = float(v.replace(",", "."))
    except ValueError:
        return v
    if n == 0:
        return "Grátis"
    return "R$ " + (str(int(n)) if n == int(n) else f"{n:.2f}".replace(".", ","))

def wa(numero, msg):
    return f"https://wa.me/{numero}?text=" + urllib.parse.quote(msg, safe="")

def logo_html(logo):
    """'Barbearia [do Zé]' -> Barbearia <span>do Zé</span>"""
    return re.sub(r"\[(.+?)\]", r"<span>\1</span>", E(logo))

# ----------------------------------------------------------------- ícones
SPRITE = """<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<symbol id="i-wa" viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.5-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></symbol>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></symbol>
<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
<symbol id="i-star" viewBox="0 0 24 24"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></symbol>
<symbol id="i-route" viewBox="0 0 24 24"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></symbol>
<symbol id="i-ig" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></symbol>
<symbol id="i-ext" viewBox="0 0 24 24"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></symbol>
<symbol id="i-coffee" viewBox="0 0 24 24"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v2M10 2v2M14 2v2"/></symbol>
<symbol id="i-card" viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/></symbol>
<symbol id="i-moto" viewBox="0 0 24 24"><circle cx="5.5" cy="16.5" r="3"/><circle cx="18.5" cy="16.5" r="3"/><path d="M8.5 16.5h5l3-6h-4M15 6h3l.5 4.5"/></symbol>
<symbol id="i-fire" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.3.3 1.6 1.3 2.8 2.5 2.8z"/></symbol>
<symbol id="i-car" viewBox="0 0 24 24"><path d="M19 17h2v-4l-2-5H5L3 13v4h2"/><circle cx="7.5" cy="17.5" r="2"/><circle cx="16.5" cy="17.5" r="2"/></symbol>
<symbol id="i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></symbol>
<symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></symbol>
<symbol id="i-bolt" viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></symbol>
<symbol id="i-heart" viewBox="0 0 24 24"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/></symbol>
<symbol id="i-bread" viewBox="0 0 24 24"><path d="M5 11a4 4 0 1 1 3-7.2A5 5 0 0 1 12 2a5 5 0 0 1 4 1.8A4 4 0 1 1 19 11v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></symbol>
</svg>"""

def ic(nome, fill=False):
    return f'<svg class="i{" i-fill" if fill else ""}" aria-hidden="true"><use href="#i-{nome}"/></svg>'

# ----------------------------------------------------------------- fotos
def preparar_fotos(cfg, saida):
    from PIL import Image
    f = cfg.get("fotos", {})
    pasta = saida / "fotos"
    pasta.mkdir(parents=True, exist_ok=True)
    if not f.get("base"):
        return  # cliente com fotos próprias: os arquivos já estão em fotos/
    im = Image.open(AQUI / "fotos-base" / f["base"]).convert("RGB")
    W, H = im.size
    x0, y0, x1, y1 = f.get("capa", {}).get("corte", [0, 0, 1, 1])
    capa = im.crop((int(x0 * W), int(y0 * H), int(x1 * W), int(y1 * H)))
    capa.thumbnail((1600, 1600))
    capa.save(pasta / "capa.webp", quality=80, method=6)

    def recorte(cx, cy, h, ratio, size, nome):
        ch = h * H
        cw = ch * ratio
        if cw > W:
            cw = W; ch = cw / ratio
        left = min(max(cx * W - cw / 2, 0), W - cw)
        top = min(max(cy * H - ch / 2, 0), H - ch)
        r = im.crop((int(left), int(top), int(left + cw), int(top + ch))).resize(size, Image.LANCZOS)
        r.save(pasta / nome, quality=78, method=6)

    for i, g in enumerate(f.get("galeria", []), 1):
        recorte(*g["c"], 4 / 5, (720, 900), f"galeria-{i}.webp")
    for i, t in enumerate(f.get("tops", []), 1):
        recorte(*t, 4 / 3, (800, 600), f"destaque-{i}.webp")

# ----------------------------------------------------------------- dados
def ler_dados(pasta):
    linhas = list(csv.DictReader(open(pasta / "dados.csv", encoding="utf-8")))
    itens = [l for l in linhas if l["tipo"] == "item"]
    cats = []
    for l in itens:
        if l["categoria"] not in cats:
            cats.append(l["categoria"])
    grupos = []
    for l in linhas:
        if l["tipo"] != "horario":
            continue
        g = l["categoria"] or ""
        if not grupos or grupos[-1]["nome"] != g:
            grupos.append({"nome": g, "linhas": []})
        fx = faixa_de(l["descricao"])
        grupos[-1]["linhas"].append({
            "rotulo": l["nome"], "texto": l["descricao"], "dias": dias_de(l["nome"]),
            "abre": fx[0] if fx else None, "fecha": fx[1] if fx else None,
        })
    aulas = [{"dia": l["categoria"], "nome": l["nome"], "info": l["descricao"], "hora": l["unidade"]} for l in linhas if l["tipo"] == "aula"]
    promos = [l for l in linhas if l["tipo"] == "promo"]
    areas = [l for l in linhas if l["tipo"] == "area"]
    return {"itens": itens, "cats": cats, "horarios": grupos, "aulas": aulas, "promos": promos, "areas": areas}

def precos_clika():
    """Preço dos planos Essencial e Completo, do planos.csv do site da Clika."""
    out = {}
    try:
        for l in csv.DictReader(open(RAIZ / "planos.csv", encoding="utf-8")):
            out[l["plano"].lower()] = preco_txt(l["preco"])
    except FileNotFoundError:
        pass
    return out

# ----------------------------------------------------------------- blocos
class Site:
    def __init__(self, cfg, dados, plano, raiz_rel):
        self.c, self.d, self.plano, self.rr = cfg, dados, plano, raiz_rel  # rr: caminho até a pasta do Essencial ("" ou "../")
        self.n = cfg["whatsapp"]

    def wa_item(self, nome):
        return wa(self.n, self.c["msgItem"].replace("{item}", nome))

    def foto(self, nome):
        return f"{self.rr}fotos/{nome}"

    # --- topo com foto
    def hero(self, alto=False):
        c = self.c
        selos = "".join(f"<span>{s}</span>" for s in c.get("selos", []))
        foco = c.get("fotos", {}).get("capa", {}).get("foco", "50% 50%")
        prox = '<span class="live open" data-next></span>' if c.get("proximos") else ""
        return f"""
<section class="hero{' tall' if alto else ''}">
  <div class="hero-img" style="--focus:{E(foco)}"><img src="{self.foto('capa.webp')}" alt="{E(c.get('altCapa', 'Foto do ' + c['nome']))}" fetchpriority="high" decoding="async"></div>
  <div class="hero-body wrap">
    <span class="kicker enter">{E(c['kicker'])}</span>
    <h1 class="enter e2">{E(c['titulo'])}</h1>
    <p class="tagline enter e3">{E(c['slogan'])}</p>
    <div class="hero-actions enter e4">
      <a class="btn btn-accent" data-wa href="{E(wa(self.n, c['msgGeral']))}" target="_blank" rel="noopener">{ic('wa', True)} {E(c['cta'])}</a>
      <span class="live" data-live></span>{prox}
    </div>
    {f'<div class="selos enter e4">{selos}</div>' if selos else ''}
  </div>
</section>"""

    # --- catálogo
    def item(self, l):
        desc = l["descricao"]
        if ";" in desc:
            desc_html = "<ul>" + "".join(f"<li>{E(x.strip())}</li>" for x in desc.split(";") if x.strip()) + "</ul>"
        else:
            desc_html = E(desc)
        tag = f'<span class="tag">{E(l["tag"])}</span>' if l.get("tag") else ""
        off = sem_acento(l.get("disponivel", "sim")) in ("nao", "esgotado")
        un = f"<small>{E(l['unidade'])}</small>" if l.get("unidade") else ""
        return f"""<a class="item card{' off' if off else ''}" data-wa data-item="{E(l['nome'])}" href="{E(self.wa_item(l['nome']))}" target="_blank" rel="noopener">
          <div class="item-main"><div class="item-name">{E(l['nome'])}{tag}</div>{f'<div class="item-desc">{desc_html}</div>' if desc else ''}</div>
          <div class="item-price">{E(preco_txt(l['preco']))}{un}</div>
          <span class="item-go" aria-hidden="true">{ic('wa', True)}</span>
        </a>"""

    def catalogo(self, completo=False):
        c, cat = self.c, self.c["catalogo"]
        blocos = []
        for nome in self.d["cats"]:
            its = "\n        ".join(self.item(l) for l in self.d["itens"] if l["categoria"] == nome)
            blocos.append(f'<div class="cat" data-cat="{E(nome)}"><h3 class="cat-title">{E(nome)}</h3><div class="items">\n        {its}\n      </div></div>')
        head = "" if completo else f"""<div class="sec-head rv"><span class="kicker">{E(cat['kicker'])}</span><h2>{E(cat['titulo'])}</h2>{f"<p>{E(cat['texto'])}</p>" if cat.get('texto') else ''}</div>"""
        return f"""
<section class="sec" id="{E(cat['id'])}">
  <div class="wrap">
    {head}
    <div class="rv{'' if completo else ' tabbed'}">
      {''.join(blocos)}
    </div>
  </div>
</section>"""

    # --- horários + mapa
    def horarios_html(self):
        out = []
        for g in self.d["horarios"]:
            rows = "".join(
                f'<div class="hours-row" data-dias="{",".join(map(str, l["dias"]))}"><span>{E(l["rotulo"])}</span>'
                + (f'<b>{E(l["texto"])}</b>' if l["abre"] is not None else f'<span class="closed">{E(l["texto"])}</span>') + "</div>"
                for l in g["linhas"])
            label = f'<div class="hours-label">{E(g["nome"])}</div>' if g["nome"] and len(self.d["horarios"]) > 1 else ""
            out.append(f'<div class="hours-group">{label}{rows}</div>')
        return f'<div class="hours card">{"".join(out)}</div>'

    def mapa_svg(self):
        return """<svg viewBox="0 0 400 190" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect class="ground" width="400" height="190"/>
          <rect class="street" x="0" y="30" width="400" height="11"/><rect class="street" x="0" y="96" width="400" height="11"/><rect class="street" x="0" y="152" width="400" height="11"/>
          <rect class="street" x="58" y="0" width="11" height="190"/><rect class="street" x="168" y="0" width="11" height="190"/><rect class="street" x="288" y="0" width="11" height="190"/><rect class="street" x="356" y="0" width="11" height="190"/>
          <rect class="block" x="190" y="112" width="86" height="32" rx="5"/>
          <path class="route" d="M 22 175 L 63 175 L 63 101 L 173 101 L 173 58 L 252 58"/>
          <circle class="you" cx="22" cy="175" r="6"/>
          <g transform="translate(252 58)"><circle class="pin-ping" r="16"/><path class="pin" d="M0 -24 C 12 -24 16 -14 12 -6 L 0 10 L -12 -6 C -16 -14 -12 -24 0 -24 Z"/><circle class="pin-dot" cy="-13" r="4.5"/></g>
        </svg>"""

    def link_maps(self):
        return "https://www.google.com/maps/search/?api=1&query=" + urllib.parse.quote(self.c.get("mapaBusca") or self.c["endereco"])

    def local(self):
        c = self.c
        return f"""
<section class="sec" id="horarios">
  <div class="wrap">
    <div class="sec-head rv"><span class="kicker">Horários e localização</span><h2>{E(c.get('tituloLocal', 'Quando estamos abertos'))}</h2></div>
    <div class="local">
      <div class="rv">{self.horarios_html()}</div>
      <div class="map card rv d1" id="local">
        {self.mapa_svg()}
        <div class="map-foot">
          <p class="map-addr">{ic('pin')}<span>{E(c['endereco'])}{f"<small>{E(c['referencia'])}</small>" if c.get('referencia') else ''}</span></p>
          <div class="map-btns"><button class="btn btn-line btn-sm" type="button" data-route>{ic('route')}<span> Traçar rota</span></button><a class="btn btn-accent btn-sm" href="{E(self.link_maps())}" target="_blank" rel="noopener">Abrir no Maps</a></div>
        </div>
      </div>
    </div>
  </div>
</section>"""

    def cta(self):
        f = self.c["chamadaFinal"]
        return f"""
<section class="sec">
  <div class="wrap">
    <div class="cta-box rv">
      <div><h2>{E(f['titulo'])}</h2><p>{E(f['texto'])}</p></div>
      <a class="btn btn-inv" data-wa href="{E(wa(self.n, self.c['msgGeral']))}" target="_blank" rel="noopener">{ic('wa', True)} {E(self.c['cta'])}</a>
    </div>
  </div>
</section>"""

    # --- Completo
    def feats(self):
        its = "".join(f'<div class="feat card rv{" d" + str(i) if i else ""}">{ic(d["icone"])}{E(d["texto"])}</div>' for i, d in enumerate(self.c["destaques"]))
        return f'<section class="sec" style="padding-top:28px"><div class="wrap"><div class="feats">{its}</div></div></section>'

    def tops(self):
        t = self.c["tops"]
        pag = self.pagina_do("catalogo-completo")
        por_nome = {l["nome"]: l for l in self.d["itens"]}
        cards = []
        for i, nome in enumerate(t["itens"], 1):
            l = por_nome.get(nome)
            if not l:
                continue
            cards.append(f"""<a class="top card rv{' d' + str(i - 1) if i > 1 else ''}" data-wa href="{E(self.wa_item(nome))}" target="_blank" rel="noopener">
        <div class="top-img"><img src="{self.foto(f'destaque-{i}.webp')}" alt="" loading="lazy" decoding="async"></div>
        <div class="top-body"><div><b>{E(nome)}</b><small>{E(preco_txt(l['preco']))}{(' · ' + E(l['unidade'])) if l.get('unidade') else ''}</small></div>{ic('arrow')}</div>
      </a>""")
        mais = f'<a class="link-arrow" href="{pag}">Ver {E(self.c["catalogo"]["menu"].lower())} completo {ic("arrow")}</a>' if pag else ""
        return f"""
<section class="sec">
  <div class="wrap">
    <div class="sec-head-row"><div class="sec-head rv"><span class="kicker">Destaques</span><h2>{E(t['titulo'])}</h2></div>{mais}</div>
    <div class="tops">{''.join(cards)}</div>
  </div>
</section>"""

    def avaliacoes(self):
        n, deps = self.c["notaGoogle"], self.c["depoimentos"]
        estrelas = '<div class="stars">' + ic("star", True) * 5 + "</div>"
        revs = "".join(f"""<figure class="review card rv d{min(i + 1, 3)}">{estrelas}<blockquote>“{E(d['texto'])}”</blockquote><figcaption><b>{E(d['nome'])}</b> · {E(d['info'])}</figcaption></figure>""" for i, d in enumerate(deps))
        return f"""
<section class="sec">
  <div class="wrap">
    <div class="sec-head rv"><span class="kicker">Clientes</span><h2>{E(self.c.get('tituloAvaliacoes', 'Quem vem, volta'))}</h2></div>
    <div class="reviews">
      <div class="score card rv"><strong>{E(n['nota'])}</strong>{estrelas}<p>{E(n['texto'])}</p></div>
      {revs}
    </div>
  </div>
</section>"""

    def equipe(self):
        q = self.c["equipe"]
        ps = "".join(f"""<div class="person card rv{' d' + str(i) if i else ''}"><span class="avatar">{E(p['nome'][0])}</span><div><b>{E(p['nome'])}</b><small>{E(p['cargo'])}</small>{f"<small>{E(p['texto'])}</small>" if p.get('texto') else ''}</div></div>""" for i, p in enumerate(q["pessoas"]))
        return f"""
<section class="sec">
  <div class="wrap">
    <div class="sec-head rv"><span class="kicker">{E(q['kicker'])}</span><h2>{E(q['titulo'])}</h2>{f"<p>{E(q['texto'])}</p>" if q.get('texto') else ''}</div>
    <div class="team">{ps}</div>
  </div>
</section>"""

    def galeria(self):
        g = self.c["galeria"]
        figs = "".join(f"""<figure class="rv{' d' + str(min(i, 3)) if i else ''}"><img src="{self.foto(f'galeria-{i + 1}.webp')}" alt="{E(x['legenda'])}" loading="lazy" decoding="async"><figcaption>{E(x['legenda'])}</figcaption></figure>""" for i, x in enumerate(self.c["fotos"]["galeria"]))
        return f"""
<section class="sec">
  <div class="wrap">
    <div class="sec-head rv"><span class="kicker">{E(g['kicker'])}</span><h2>{E(g['titulo'])}</h2></div>
    <div class="gallery">{figs}</div>
  </div>
</section>"""

    def extras(self):
        x = self.c["extras"]
        return f"""
<section class="sec">
  <div class="wrap">
    <div class="sec-head rv"><span class="kicker">{E(x['kicker'])}</span><h2>{E(x['titulo'])}</h2></div>
    <div class="pills rv">{''.join(f'<span>{E(i)}</span>' for i in x['itens'])}</div>
  </div>
</section>"""

    def historia(self):
        h = self.c["historia"]
        paras = "".join(f"<p>{p}</p>" for p in h["paragrafos"])
        return f"""
<section class="sec">
  <div class="wrap split">
    <div class="rv"><span class="kicker">{E(h['kicker'])}</span><h2 style="margin:8px 0 18px;font-size:clamp(1.75rem,5vw,2.6rem)">{E(h['titulo'])}</h2><div class="prose">{paras}</div></div>
    <div class="split-img rv d1"><img src="{self.foto('galeria-1.webp')}" alt="{E(self.c['fotos']['galeria'][0]['legenda'])}" loading="lazy"></div>
  </div>
</section>"""

    def promos(self):
        p = self.c["promos"]
        dia_n = lambda t: (dias_de(t) or [None])[0]
        cards = "".join(f"""<a class="promo card rv" data-wa data-dia-semana="{dia_n(l['categoria'])}" href="{E(wa(self.n, 'Oi! Quero aproveitar a promoção ' + l['nome'] + '.'))}" target="_blank" rel="noopener"><span class="day">{E(l['categoria'])}</span><b>{E(l['nome'])}</b><p>{E(l['descricao'])}</p></a>""" for l in self.d["promos"])
        return f"""
<section class="sec">
  <div class="wrap">
    <div class="sec-head rv"><span class="kicker">{E(p['kicker'])}</span><h2>{E(p['titulo'])}</h2>{f"<p>{E(p['texto'])}</p>" if p.get('texto') else ''}</div>
    <div class="promos">{cards}</div>
  </div>
</section>"""

    def entrega(self):
        e = self.c["entrega"]
        areas = "".join(f'<div class="area"><span>{E(a["nome"])}</span><small>{E(a["descricao"])} · {"grátis" if preco_txt(a["preco"]) == "Grátis" else "taxa " + E(preco_txt(a["preco"]))}</small></div>' for a in self.d["areas"])
        facts = "".join(f'<div class="fact card"><b>{E(f[0])}</b>{E(f[1])}</div>' for f in e.get("fatos", []))
        return f"""
<section class="sec">
  <div class="wrap split" style="align-items:start">
    <div class="rv"><span class="kicker">{E(e['kicker'])}</span><h2 style="margin:8px 0 12px;font-size:clamp(1.75rem,5vw,2.6rem)">{E(e['titulo'])}</h2><p style="color:var(--muted)">{E(e['texto'])}</p><div class="facts">{facts}</div></div>
    <div class="areas card rv d1">{areas}</div>
  </div>
</section>"""

    def grade(self):
        g = self.c["grade"]
        return f"""
<section class="sec">
  <div class="wrap">
    <div class="sec-head rv"><span class="kicker">{E(g['kicker'])}</span><h2>{E(g['titulo'])}</h2>{f"<p>{E(g['texto'])}</p>" if g.get('texto') else ''}</div>
    <div data-grade class="rv"><div class="chips"></div><div class="grade-list">{self.grade_estatica()}</div></div>
  </div>
</section>"""

    def grade_estatica(self):
        # Sem script: a semana inteira em lista (o script troca pelas abas de dia)
        return "".join(f'<p class="aula card"><time>{E(a["hora"])}</time><span><b>{E(a["dia"])} · {E(a["nome"])}</b> <small>{E(a["info"])}</small></span></p>' for a in self.d["aulas"])

    def agenda(self):
        a = self.c["agenda"]
        itens = [l for l in self.d["itens"] if sem_acento(l.get("disponivel", "sim")) not in ("nao", "esgotado")]
        if a.get("itens"):
            itens = [{"nome": n, "preco": "", "unidade": ""} for n in a["itens"]]
        def op(i, l):
            preco = f"<small>{E(preco_txt(l['preco']))}</small>" if l.get("preco") else ""
            marcado = " checked" if i == 0 else ""
            return f'<label><input type="radio" name="item" value="{E(l["nome"])}"{marcado}><span>{E(l["nome"])}{preco}</span></label>'
        op_it = "".join(op(i, l) for i, l in enumerate(itens))
        pessoas = ""
        if a.get("rotuloPessoa"):
            nomes = ["Tanto faz"] + [p["nome"] for p in self.c["equipe"]["pessoas"]]
            pessoas = f"""<div class="step"><p class="step-label"><span>4</span>{E(a['rotuloPessoa'])}</p><div class="opts">{''.join(f'<label><input type="radio" name="pessoa" value="{E(n)}"{" checked" if i == 0 else ""}><span>{E(n)}</span></label>' for i, n in enumerate(nomes))}</div></div>"""
        per = "".join(f'<label><input type="radio" name="periodo" value="{E(p.lower())}"{" checked" if i == 0 else ""}><span>{E(p)}</span></label>' for i, p in enumerate(a["periodos"]))
        return f"""
<section class="sec" id="agendar">
  <div class="wrap">
    <div class="sec-head rv"><span class="kicker">{E(a['kicker'])}</span><h2>{E(a['titulo'])}</h2><p>{E(a['texto'])}</p></div>
    <form class="agenda card rv" data-agenda onsubmit="return false">
      <div class="step"><p class="step-label"><span>1</span>{E(a['rotuloItem'])}</p><div class="opts">{op_it}</div></div>
      <div class="step"><p class="step-label"><span>2</span>Dia</p><div class="opts" data-dias-livres><label><input type="radio" name="dia" value="o próximo dia livre" checked><span>Próximo dia livre</span></label></div></div>
      <div class="step"><p class="step-label"><span>3</span>Período</p><div class="opts">{per}</div></div>
      {pessoas}
      <div class="agenda-out"><p data-agenda-msg></p><a class="btn btn-accent" data-wa data-agenda-go href="{E(wa(self.n, self.c['msgGeral']))}" target="_blank" rel="noopener">{ic('wa', True)} Enviar no WhatsApp</a></div>
    </form>
  </div>
</section>"""

    def contato(self):
        c = self.c
        opts = "".join(f"<option>{E(l['nome'])}</option>" for l in self.d["itens"]) or "<option>Informações</option>"
        ig = f'<a class="card" href="{E(c["instagram"])}" target="_blank" rel="noopener">{ic("ig")} Instagram {E(c.get("instagramUsuario", ""))}</a>' if c.get("instagram") else ""
        mapa = "https://maps.google.com/maps?q=" + urllib.parse.quote(c.get("mapaBusca") or c["endereco"]) + "&z=16&output=embed"
        return f"""
<section class="sec" style="padding-top:28px">
  <div class="wrap contact">
    <div class="rv">
      <form class="form card" data-contato>
        <label>Seu nome<input name="nome" autocomplete="name" placeholder="Como podemos te chamar?"></label>
        <label>{E(c['rotuloForm'])}<select name="sobre">{opts}</select></label>
        <label>Mensagem<textarea name="mensagem" rows="3" placeholder="Algum detalhe? (opcional)"></textarea></label>
        <button class="btn btn-accent btn-block" type="submit">{ic('wa', True)} Enviar pelo WhatsApp</button>
      </form>
      <div class="links" style="margin-top:12px">
        <a class="card" data-wa href="{E(wa(self.n, c['msgGeral']))}" target="_blank" rel="noopener">{ic('wa', True)} WhatsApp</a>
        {ig}
      </div>
    </div>
    <div class="rv d1" style="display:grid;gap:12px">
      {self.horarios_html()}
      <div class="map card">
        <iframe class="map-real" title="Mapa com a localização" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="{E(mapa)}"></iframe>
        <div class="map-foot"><p class="map-addr">{ic('pin')}<span>{E(c['endereco'])}{f"<small>{E(c['referencia'])}</small>" if c.get('referencia') else ''}</span></p><a class="btn btn-accent btn-sm" href="{E(self.link_maps())}" target="_blank" rel="noopener">Como chegar</a></div>
      </div>
    </div>
  </div>
</section>"""

    def pagina_do(self, bloco):
        for p in self.c["completo"]["paginas"]:
            if bloco in p["blocos"]:
                return p["arquivo"]
        return None

    def bloco(self, nome):
        return {
            "hero": lambda: self.hero(self.plano == "completo"),
            "catalogo": lambda: self.catalogo(False),
            "catalogo-completo": lambda: self.catalogo(True),
            "local": self.local, "cta": self.cta, "feats": self.feats, "tops": self.tops,
            "avaliacoes": self.avaliacoes, "equipe": self.equipe, "galeria": self.galeria,
            "extras": self.extras, "historia": self.historia, "promos": self.promos,
            "entrega": self.entrega, "grade": self.grade, "agenda": self.agenda, "contato": self.contato,
        }[nome]()

# ----------------------------------------------------------------- página
def pagina(site, titulo, descricao, corpo, nav_html, tabs_html, precos):
    c, t = site.c, site.c["tema"]
    rr = site.rr
    dados = {
        "whatsapp": c["whatsapp"], "demo": bool(c.get("demo")), "nome": c["nome"], "inicial": c["inicial"],
        "resposta": c.get("resposta", "Oi! Já te respondo 😊"), "horarios": site.d["horarios"],
        "aulas": site.d["aulas"], "msgAula": c.get("msgAula", "Oi! Quero fazer a aula de {aula} de {dia} às {hora}."),
        "msgAgenda": c.get("agenda", {}).get("mensagem", ""), "rotuloForm": c.get("rotuloForm", "Assunto"),
        "proximos": c.get("proximos"), "planilha": c.get("planilhaCSV", ""),
    }
    if c.get("demo"):
        if site.plano == "essencial":
            faixa = f'<div class="demo-bar"><span><span class="dl">Modelo </span><b>Essencial</b><span class="dl"> da Clika</span> · negócio fictício<span class="demo-price"> · {E(precos.get("essencial", ""))}</span></span><a href="completo/"><span class="dl">Ver no plano </span>Completo →</a></div>'
        else:
            faixa = f'<div class="demo-bar"><span><span class="dl">Modelo </span><b>Completo</b><span class="dl"> da Clika</span> · negócio fictício<span class="demo-price"> · {E(precos.get("completo", ""))}</span></span><a href="{rr}index.html"><span class="dl">Ver no plano </span>Essencial →</a></div>'
        robots = '<meta name="robots" content="noindex">'
        assinatura = '<a href="https://clika.com.br/" target="_blank" rel="noopener">Site feito pela Clika</a>'
        og = ""
    else:
        faixa, robots = "", ""
        assinatura = '<a href="https://clika.com.br/" target="_blank" rel="noopener">Site feito pela Clika</a>'
        og = f"""<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:title" content="{E(titulo)}"><meta property="og:description" content="{E(descricao)}"><meta property="og:image" content="https://{E(c['dominio'])}/fotos/capa.webp">"""
    estilo = f""":root {{ --bg: {t['fundo']}; --fg: {t['texto']}; --muted: {t['suave']}; --card: {t['cartao']}; --line: {t['linha']}; --accent: {t['destaque']}; --accent-fg: {t['textoNoDestaque']};
  --font-d: "{t['fonteTitulo']}", system-ui, sans-serif; --font-b: "{t['fonteTexto']}", system-ui, sans-serif; --wd: {t.get('pesoTitulo', 800)}; --ls-d: {t.get('espacoTitulo', '-0.03em')}; --tt-d: {t.get('caixaTitulo', 'none')}; --fs-d: {t.get('estiloTitulo', 'normal')}; color-scheme: {t.get('esquema', 'dark')}; }}"""
    return f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.classList.add("js")</script>
<title>{E(titulo)}</title>
<meta name="description" content="{E(descricao)}">
{robots}{og}
<meta name="theme-color" content="{E(t.get('corBarra', '#111'))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?{t['googleFonts']}&display=swap" rel="stylesheet">
<link rel="preload" as="image" href="{rr}fotos/capa.webp">
<link rel="stylesheet" href="{rr}site.css">
<style>{estilo}</style>
</head>
<body>
{SPRITE}
{faixa}
<header class="hd">
  <div class="wrap hd-row">
    <a class="brand" href="{'index.html'}"><span class="brand-mark">{E(c['inicial'])}</span><span class="brand-name">{logo_html(c['logo'])}</span></a>
    <nav class="hd-nav" aria-label="Menu">{nav_html}</nav>
    <a class="btn btn-accent btn-sm hd-cta" data-wa href="{E(wa(c['whatsapp'], c['msgGeral']))}" target="_blank" rel="noopener">{ic('wa', True)} WhatsApp</a>
  </div>
  {tabs_html}
</header>
<main>
{corpo}
</main>
<footer class="ft">
  <div class="wrap">
    {('<nav class="ft-nav" aria-label="Rodapé">' + nav_html + '</nav>') if site.plano == 'completo' else ''}
    <div class="ft-row"><span>© {E(c['nome'])} · {E(c['endereco'])}</span>{assinatura}</div>
  </div>
</footer>
<script id="dados-site" type="application/json">{json.dumps(dados, ensure_ascii=False)}</script>
<script src="{rr}site.js" defer></script>
</body>
</html>
"""

def gerar(nome, saida=None):
    pasta = AQUI / "negocios" / nome
    cfg = json.load(open(pasta / "config.json", encoding="utf-8"))
    dados = ld = ler_dados(pasta)
    saida = Path(saida) if saida else RAIZ / "portfolio" / cfg["pasta"]
    saida.mkdir(parents=True, exist_ok=True)
    preparar_fotos(cfg, saida)
    shutil.copy(AQUI / "base" / "site.css", saida / "site.css")
    shutil.copy(AQUI / "base" / "site.js", saida / "site.js")
    shutil.copy(pasta / "dados.csv", saida / "dados.csv")
    precos = precos_clika()
    escritos = []

    # Essencial: uma página
    s = Site(cfg, dados, "essencial", "")
    cat = cfg["catalogo"]
    nav = f'<a href="#{E(cat["id"])}">{E(cat["menu"])}</a><a href="#horarios">Horários</a><a href="#local">Localização</a>'
    corpo = "\n".join(s.bloco(b) for b in cfg["essencial"]["blocos"])
    (saida / "index.html").write_text(pagina(s, f"{cfg['nome']} · {cfg['kicker'].split('·')[0].strip()}", cfg["descricaoGoogle"], corpo, nav, "", precos), encoding="utf-8")
    escritos.append("index.html")

    # Completo: várias páginas
    comp = saida / "completo"
    comp.mkdir(exist_ok=True)
    for velho in comp.glob("*"):
        if velho.is_file():
            velho.unlink()  # páginas antigas do modelo anterior
    s = Site(cfg, dados, "completo", "../")
    pags = cfg["completo"]["paginas"]
    for p in pags:
        cur = lambda a: ' aria-current="page"' if a == p["arquivo"] else ""
        nav = "".join(f'<a href="{x["arquivo"]}"{cur(x["arquivo"])}>{E(x["menu"])}</a>' for x in pags)
        tabs = '<nav class="hd-tabs" aria-label="Páginas">' + nav + "</nav>"
        corpo = ""
        if p["arquivo"] != "index.html":
            corpo += f"""
<section class="page-head"><div class="wrap"><span class="kicker enter">{E(p['kicker'])}</span><h1 class="enter e2">{E(p['titulo'])}</h1><p class="enter e3">{E(p['texto'])}</p></div></section>"""
        corpo += "\n".join(s.bloco(b) for b in p["blocos"])
        titulo = f"{cfg['nome']} · {cfg['kicker'].split('·')[0].strip()}" if p["arquivo"] == "index.html" else f"{p['menu']} · {cfg['nome']}"
        desc = cfg["descricaoGoogle"] if p["arquivo"] == "index.html" else p["texto"]
        (comp / p["arquivo"]).write_text(pagina(s, titulo, desc, corpo, nav, tabs, precos), encoding="utf-8")
        escritos.append("completo/" + p["arquivo"])
    print(cfg["pasta"], "->", ", ".join(escritos))

if __name__ == "__main__":
    args = sys.argv[1:]
    saida = None
    if "--saida" in args:
        i = args.index("--saida"); saida = args[i + 1]; args = args[:i] + args[i + 2:]
    nomes = sorted(p.name for p in (AQUI / "negocios").iterdir() if p.is_dir()) if args == ["todos"] else args
    for n in nomes:
        gerar(n, saida)
