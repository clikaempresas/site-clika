# Site da Clika — como publicar

Arquivos:
- `index.html` — página inicial (tem tudo resumido: comparação, exemplos, planos, oferta, sobre e dúvidas)
- `planos/`, `exemplos/` e `sobre/` — páginas extras, cada uma com o próprio `index.html`
- `assets/clika.css` — o visual de todas as páginas (cores, fontes, animações)
- `assets/clika.js` — o comportamento de todas as páginas. As configurações (WhatsApp, Instagram, link da planilha) ficam no bloco `CONFIGURAÇÃO`, no começo do arquivo
- `assets/img/` — fotos dos exemplos, em `.webp`
- `planos.csv` — cópia de reserva dos preços (o site usa se a planilha falhar ou se `planilhaCSV` estiver vazio)
- `robots.txt` e `sitemap.xml` — dizem ao Google o que indexar (início, planos, exemplos e sobre; os protótipos têm `noindex`)
- `404.html` — página de "não encontrado". Sem ela, a Cloudflare devolve a página inicial para qualquer endereço errado
- `_headers` — tira do Google o endereço antigo (.pages.dev) e os arquivos `.md` e `.csv`

Onde está tudo:
- Site no ar: https://clika.com.br (o endereço antigo, site-clika.pages.dev, redireciona para cá)
- Código no GitHub: https://github.com/clikaempresas/site-clika (conta `clikaempresas`)
- Preços: planilha "Preços Clika" no Google Sheets da conta do negócio

## Mudar um preço (sem Git)

1. Edite a planilha "Preços Clika" no Google Sheets. Ela salva sozinha.
2. Em até uns 5 minutos o site mostra o valor novo. Não precisa publicar nada.

Cuidados:
- Na coluna `preco`, escreva só o número, com vírgula nos centavos: `449,99`, não `R$ 449,99` nem `1.000`.
- Não mude os nomes das colunas na primeira linha.
- Se a planilha for despublicada ou apagada, o site mostra os preços do arquivo `planos.csv`. Sempre que mudar a planilha, atualize também o `planos.csv` (Arquivo > Fazer download > CSV) e faça commit e push.
- O `index.html` e o `planos/index.html` trazem uma cópia fixa dos planos (dentro do `<div data-plans>`), que é o que o Google lê. Ao mudar preço, nome ou itens de um plano, atualize essa cópia nas duas páginas.

Colunas da planilha: `tipo` (criacao ou mensal), `plano`, `preco` (só o número), `periodo`, `descricao`, `itens` (separados por ponto e vírgula) e `destaque` (sim ou nao).

## Mudar textos, fotos ou o visual

1. Edite a página (`index.html`, `planos/index.html`, `exemplos/index.html` ou `sobre/index.html`). O visual fica em `assets/clika.css` e as configurações (WhatsApp, Instagram, link da planilha) no bloco `CONFIGURAÇÃO` do `assets/clika.js`.
2. Abra o terminal na pasta `clika-site` e rode, um de cada vez:

```
git add .
git commit -m "Descreva aqui o que mudou"
git push
```

3. O Cloudflare publica a versão nova sozinho, em mais ou menos 1 minuto.

Se o terminal não reconhecer `git`, feche e abra o terminal de novo (ou reinicie o computador).

Nunca coloque senhas, tokens ou chaves dentro dos arquivos do site: o repositório é público.

## Como foi montado (para repetir com clientes)

1. **Configuração:** preencher o bloco `CONFIGURAÇÃO` do `index.html` (WhatsApp com 55 + DDD + número, só dígitos; Instagram vazio se não tiver) e trocar os textos de exemplo, como a cidade.
2. **Teste local:** abrir o site por um servidor local (por exemplo `http://localhost:8080`), não com dois cliques no arquivo, senão o navegador bloqueia a leitura dos preços.
3. **GitHub:** com Git e GitHub CLI instalados (`winget install --id Git.Git -e` e `winget install --id GitHub.cli -e`):
   - `gh auth login --hostname github.com --git-protocol https --web` (o login é feito no navegador)
   - `git init -b main`, configurar nome e o e-mail privado (noreply) do GitHub com `git config user.name` / `git config user.email`
   - `git add .` e `git commit -m "Primeira versão"`
   - `gh repo create NOME-DO-REPO --public --source . --push`
4. **Cloudflare Pages:** em **Workers & Pages > Create > Pages > Connect to Git**, autorizar só o repositório do site, e configurar: branch `main`, framework `None`, comando de build vazio, pasta de saída `/`. O link fica `NOME-DO-PROJETO.pages.dev`.
5. **Planilha:** no Google Sheets, **Arquivo > Importar** o `planos.csv`; depois **Arquivo > Compartilhar > Publicar na Web**, escolher a aba e o formato **CSV**, copiar o link, colar em `planilhaCSV` e fazer commit e push. Testar mudando um preço (o Google leva alguns minutos para atualizar).

## Exemplos (protótipos do portfólio)

Cada protótipo fica em `portfolio/<nicho>/` (ex.: `portfolio/barbearia/`), com o próprio LEIA-ME. Para ele aparecer na seção "Veja um site pronto" da página inicial, copie um bloco `<article class="work">` dentro de `<div id="portfolio">` no `index.html` e troque ramo, nome, links, descrição e foto. Para aparecer também na vitrine de `exemplos/index.html`, copie um `<a class="choice">` e preencha `data-ramo`, `data-path` e `data-domain`. Todo protótipo novo precisa de `<meta name="robots" content="noindex">`, porque são negócios fictícios.

## Domínio próprio

O site está em https://clika.com.br. Se o domínio mudar um dia, troque o endereço em `og:url`, `og:image`, `canonical` e no bloco JSON-LD de cada página (`index.html`, `planos/`, `exemplos/`, `sobre/`), e também no `robots.txt` e no `sitemap.xml`.

O endereço antigo (site-clika.pages.dev) é mandado para o domínio por um script no topo de cada página e, de forma definitiva, por um Bulk Redirect no painel da Cloudflare. O `www.clika.com.br` também é mandado para `clika.com.br` pelo script da página inicial; o ideal é criar também um Redirect Rule (301) no painel da Cloudflare para ele.

## Oferta de lançamento e depoimentos

- A oferta "20% off para os 3 primeiros negócios" aparece em três lugares: o selo no topo da página inicial (`class="offer-badge"`), a seção `id="lancamento"` da página inicial e o selo no topo de `planos/index.html`. Quando as vagas acabarem, apague os três.
- Os depoimentos já têm lugar pronto, comentado dentro da seção `lancamento`. Quando chegarem, tire o comentário (`<!--` e `-->`), repita um `<figure class="testimonial">` por cliente e troque o título da seção para algo como "Quem já está no ar".
