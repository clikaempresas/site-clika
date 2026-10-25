# Site da Clika — como publicar

Arquivos:
- `index.html` — o site inteiro (textos, visual e código)
- `planos.csv` — os preços dos planos, que o site lê sozinho

## 1. Antes de publicar, edite no `index.html`

Procure o bloco `CONFIGURAÇÃO` perto do final do arquivo e troque:
- `whatsapp`: o número do WhatsApp Business de vocês (55 + DDD + número, só dígitos)
- `instagram`: o link do @ de vocês. Enquanto não tiverem Instagram, deixe vazio ("") que o link some do site
- No texto, troque `[sua cidade]` pela cidade de vocês

## 2. Subir no GitHub

1. Crie um repositório chamado `site-clika` na conta do GitHub do negócio.
2. Clique em **Add file > Upload files**, arraste `index.html` e `planos.csv` e clique em **Commit changes**.

## 3. Publicar no Cloudflare Pages

1. No painel do Cloudflare, vá em **Workers & Pages** e crie um projeto Pages conectado ao repositório `site-clika`.
2. Em configuração de build, deixe o comando vazio e a pasta de saída como `/` (é um site estático, não precisa de build).
3. Em instantes o site estará em `site-clika.pages.dev`. Cada alteração enviada ao GitHub publica uma nova versão.

## 4. Testar a planilha de preços (o modelo do Plano Autônomo)

1. Crie uma planilha no Google Sheets e importe o `planos.csv` (Arquivo > Importar).
2. Vá em **Arquivo > Compartilhar > Publicar na Web**, escolha a aba e o formato **CSV** e copie o link.
3. Cole o link em `planilhaCSV` no bloco de configuração do `index.html` e envie ao GitHub.
4. Agora mude um preço na planilha e recarregue o site: o valor novo aparece sem nenhuma publicação nova. O Google pode levar alguns minutos para atualizar o CSV publicado.

Colunas da planilha: `tipo` (criacao ou mensal), `plano`, `preco` (só o número), `periodo`, `descricao`, `itens` (separados por ponto e vírgula) e `destaque` (sim ou nao).

## 5. Domínio próprio (quando tiverem)

No projeto Pages, vá em **Custom domains** e siga o passo 3 do Manual de operação.
