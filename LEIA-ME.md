# Site da Clika — como publicar

> **Atenção: este repositório é público.** Nunca coloque aqui dados, fotos ou pastas de clientes. Eles ficam em repositórios privados, um por cliente. Aqui ficam só o site da Clika, o gerador e os protótipos fictícios do portfólio.

Arquivos:
- `index.html` — página inicial (tem tudo resumido: comparação, exemplos, planos, oferta, sobre e dúvidas)
- `planos/`, `exemplos/`, `sobre/` e `privacidade/` — páginas extras, cada uma com o próprio `index.html`
- `assets/clika.css` — o visual de todas as páginas (cores, fonte Inter, escala de tamanhos, espaçamento entre seções e animações; tudo começa pelas variáveis do `:root`)
- `assets/clika.js` — o comportamento de todas as páginas. As configurações (WhatsApp e Instagram) ficam no bloco `CONFIGURAÇÃO`, no começo do arquivo
- `assets/img/` — fotos e capturas dos exemplos no celular (`NICHO-celular.webp`), em `.webp`
- `planos.csv` — registro dos planos e preços. O site não lê este arquivo; só o gerador dos sites-modelo (`ferramentas/sites/gerar.py`) usa o preço daqui na faixa do topo de cada exemplo
- `robots.txt` e `sitemap.xml` — dizem ao Google o que indexar (início, planos, exemplos, sobre e privacidade; os protótipos têm `noindex`)
- `404.html` — página de "não encontrado". Sem ela, a Cloudflare devolve a página inicial para qualquer endereço errado
- `_headers` — tira do Google o endereço antigo (.pages.dev) e os arquivos `.md` e `.csv`

Onde está tudo:
- Site no ar: https://clika.com.br (o endereço antigo, site-clika.pages.dev, redireciona para cá)
- Código no GitHub: https://github.com/clikaempresas/site-clika (conta `clikaempresas`)

## Mudar um preço ou um plano

Os preços ficam escritos direto no HTML (a planilha "Preços Clika" do Google Sheets não é mais lida pelo site). Para mudar:

1. Em `index.html` e em `planos/index.html`, mude o cartão do plano (dentro do comentário "Planos e preços fixos"): o número em `<span class="int">`, os itens, a linha "Custo no 1º ano" (criação) ou "ou R$ ... por ano" (mensais), a faixa Sob medida e a linha do plano Hospedagem. As duas páginas precisam ficar iguais. Em `planos/index.html`, atualize também a tabela comparativa (`class="plans-table"`) e, se mudar alguma resposta do FAQ, o bloco JSON-LD no topo da página.
2. Em `planos/index.html`, ajuste também a `description` e a `og:description` se o menor preço mudar ("a partir de R$ ...").
3. Atualize o `planos.csv` e a faixa de preço dos sites-modelo (`<span class="demo-price">` nos arquivos de `portfolio/`).
4. Faça commit e push (veja abaixo).

## Mudar textos, fotos ou o visual

1. Edite a página (`index.html`, `planos/index.html`, `exemplos/index.html`, `sobre/index.html` ou `privacidade/index.html`). O visual fica em `assets/clika.css` e as configurações (WhatsApp e Instagram) no bloco `CONFIGURAÇÃO` do `assets/clika.js`.
2. Abra o terminal na pasta `site-clika` e rode, um de cada vez:

```
git add .
git commit -m "Descreva aqui o que mudou"
git push
```

3. O Cloudflare publica a versão nova sozinho, em mais ou menos 1 minuto.

Se o terminal não reconhecer `git`, feche e abra o terminal de novo (ou reinicie o computador).

Nunca coloque senhas, tokens ou chaves dentro dos arquivos do site: o repositório é público.

## Como foi montado (para repetir com clientes)

Sites de clientes não são copiados deste repositório: são feitos com o gerador (`ferramentas/sites/gerar.py`, veja o `LEIA-ME.md` da pasta `ferramentas/sites/`) e seguem o manual "13 Como fazer um site", na pasta Manuais De Operação do Google Drive da Clika. O antigo passo 5, de ligar uma planilha do Google aos preços, não vale mais para o site da Clika: os preços ficam escritos no HTML (veja "Mudar um preço ou um plano").

## Exemplos (protótipos do portfólio)

Cada protótipo fica em `portfolio/<nicho>/` (ex.: `portfolio/barbearia/`), com o próprio LEIA-ME. Para ele aparecer na seção "Veja um site pronto" da página inicial, copie um `<li class="show">` dentro de `<div id="portfolio">` no `index.html` e troque ramo, descrição, link e imagem. A imagem é uma captura do site-modelo no celular (390 px de largura), salva como `assets/img/NICHO-celular.webp`. Para aparecer também na vitrine de `exemplos/index.html`, copie um `<a class="choice">` e preencha `data-ramo`, `data-path` e `data-domain`. Todo protótipo novo precisa de `<meta name="robots" content="noindex">`, porque são negócios fictícios.

## Domínio próprio

O site está em https://clika.com.br. Se o domínio mudar um dia, troque o endereço em `og:url`, `og:image`, `canonical` e no bloco JSON-LD de cada página (`index.html`, `planos/`, `exemplos/`, `sobre/`, `privacidade/`), e também no `robots.txt` e no `sitemap.xml`.

O endereço antigo (site-clika.pages.dev) é mandado para o domínio por um script no topo de cada página e, de forma definitiva, por um Bulk Redirect no painel da Cloudflare. O `www.clika.com.br` também é mandado para `clika.com.br` pelo script da página inicial; o ideal é criar também um Redirect Rule (301) no painel da Cloudflare para ele.

## Oferta de lançamento e depoimentos

- A oferta "20% off para os 3 primeiros negócios" aparece em três lugares: o selo no topo da página inicial (`class="offer-badge"`), a seção `id="lancamento"` da página inicial e o selo no topo de `planos/index.html`. Quando as vagas acabarem, apague os três.
- Os depoimentos já têm lugar pronto: a seção `id="depoimentos"` da página inicial, escondida pelo atributo `hidden`. Quando chegarem depoimentos de verdade, apague o `hidden`, tire o comentário do modelo e repita um `<figure class="testimonial">` por cliente (frase, nome do negócio, ramo e link do site).



## Privacidade

A página `privacidade/` explica o que a Clika faz com os dados do formulário, do WhatsApp e do e-mail. Ela tem link no rodapé de todas as páginas e embaixo do botão do formulário em `sobre/`. Ela cita o Cloudflare Web Analytics (estatística de visitas sem cookies, ligado no painel da Cloudflare). Se a Clika passar a usar alguma ferramenta nova que recebe dados (outra estatística de visita, CRM, formulário que guarda dados), atualize a página e a data no topo.
