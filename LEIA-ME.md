# Site da Clika — como publicar

Arquivos:
- `index.html` — o site inteiro (textos, visual e código)
- `planos.csv` — cópia de reserva dos preços (o site só usa se `planilhaCSV` estiver vazio)

Onde está tudo:
- Site no ar: https://site-clika.pages.dev
- Código no GitHub: https://github.com/clikaempresas/site-clika (conta `clikaempresas`)
- Preços: planilha "Preços Clika" no Google Sheets da conta do negócio

## Mudar um preço (sem Git)

1. Edite a planilha "Preços Clika" no Google Sheets. Ela salva sozinha.
2. Em até uns 5 minutos o site mostra o valor novo. Não precisa publicar nada.

Cuidados:
- Na coluna `preco`, escreva só o número: `1000`, não `1.000` nem `R$ 1000`.
- Não mude os nomes das colunas na primeira linha.
- Se a planilha for despublicada ou apagada, o site volta a mostrar os preços guardados dentro do `index.html`.

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

## Domínio próprio (quando tiverem)

No projeto Pages, vá em **Custom domains** e siga o passo 3 do Manual de operação.
