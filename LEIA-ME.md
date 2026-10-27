# Site da Clika — como publicar

Arquivos:
- `index.html` — o site inteiro (textos, visual e código)
- `planos.csv` — cópia de reserva dos preços (o site usa se a planilha falhar ou se `planilhaCSV` estiver vazio)
- `robots.txt` e `sitemap.xml` — dizem ao Google o que indexar (só a página inicial; os protótipos têm `noindex`)

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

Colunas da planilha: `tipo` (criacao ou mensal), `plano`, `preco` (só o número), `periodo`, `descricao`, `itens` (separados por ponto e vírgula) e `destaque` (sim ou nao).

## Mudar textos, fotos ou o visual

1. Edite o `index.html`. As configurações (WhatsApp, Instagram, link da planilha) ficam no bloco `CONFIGURAÇÃO`, perto do final do arquivo.
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

Cada protótipo fica em `portfolio/<nicho>/` (ex.: `portfolio/barbearia/`), com o próprio LEIA-ME. Para ele aparecer na seção "Veja um site pronto" da página inicial, copie um item da lista `portfolio` no bloco `CONFIGURAÇÃO` do `index.html` e troque nicho, nome, link, descrição e cores.

## Domínio próprio

O site está em https://clika.com.br. Se o domínio mudar um dia, troque o endereço em `og:url`, `og:image`, `canonical` e no bloco JSON-LD do `index.html`, e também no `robots.txt` e no `sitemap.xml`.

O endereço antigo (site-clika.pages.dev) é mandado para o domínio por um script no topo de cada página e, de forma definitiva, por um Bulk Redirect no painel da Cloudflare.
