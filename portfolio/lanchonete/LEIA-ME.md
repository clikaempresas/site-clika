# Modelo de site — Lanchonete / hamburgueria

Protótipo demonstrativo da Clika para o nicho de lanchonetes. Negócio fictício: **Chapa da Esquina**.

Link do portfólio: https://clika.com.br/portfolio/lanchonete/

Arquivos:
- `index.html` — o site inteiro (textos, visual e código)
- `dados.csv` — cardápio, promoções, horários e bairros de entrega
- `fotos/` — as fotos do site (com nomes fixos)

---

## Como transformar este modelo no site de um cliente

### 1. Copiar a pasta

Para o portfólio continuar intacto, **copie** a pasta `lanchonete` inteira para o lugar do site novo (outro repositório, ou outra pasta). Nunca edite a original para um cliente.

### 2. Preencher a CONFIGURAÇÃO

Abra o `index.html` e procure o bloco `CONFIGURAÇÃO` (fica logo no começo do `<script>`). Troque:

| Campo | O que colocar |
|---|---|
| `nome` | Nome da lanchonete |
| `nomeDestaque` | Parte do nome que fica colorida no logo (ou `""`) |
| `slogan` | Frase curta |
| `cores` | Cores do cliente. Se só quiser mudar a cor principal, troque `destaque` |
| `whatsapp` | 55 + DDD + número, só números. Ex.: `5511987654321` |
| `mensagemWhatsapp` | Mensagem que já vem escrita quando o cliente clica |
| `ifood` | Link da loja no iFood (ou `""` para esconder o botão) |
| `instagram` / `instagramUsuario` | Link e @ do Instagram (ou `""` para esconder) |
| `endereco` | Endereço completo (é o que aparece no mapa) |
| `linkMaps` | Link do Google Maps do estabelecimento (opcional, para o botão "Como chegar" abrir a ficha certa) |
| `planilhaCSV` | Link da planilha publicada (passo 4) |
| `topo` | O lanche mais vendido: `item` precisa ter **o mesmo nome** que está no cardápio, para o preço aparecer |
| `textos` | Títulos, tempo de entrega, formas de pagamento etc. |
| `mostrarEsgotados` | `true` = item esgotado aparece apagado; `false` = some do site |
| `modoDemonstrativo` | **Troque para `false`** — tira o aviso da Clika do rodapé |

**No topo do `index.html`, apague a linha `<meta name="robots" content="noindex">` e o script do endereço antigo (`site-clika.pages.dev`).** O noindex esconde o site do Google (certo para a demo, errado para o cliente).

### 3. Prévia do link no WhatsApp

No topo do `index.html` (dentro do `<head>`) existem linhas `og:title`, `og:description` e `og:image`, além do `<title>` e da `description`. Troque o nome do negócio e a descrição.

Em `og:image`, coloque o endereço **completo** do site novo + `/fotos/compartilhar.jpg`. Esse é o único lugar que precisa do link completo. O WhatsApp não entende caminho curto.

### 4. Cardápio na planilha do Google (o dono atualiza sozinho)

1. No Google Sheets da conta do cliente: **Arquivo > Importar > Fazer upload** e envie o `dados.csv`.
2. **Arquivo > Compartilhar > Publicar na Web**. Escolha a aba e o formato **CSV**. Copie o link.
3. Cole o link em `planilhaCSV` na configuração.
4. Teste: mude um preço na planilha. Em alguns minutos o site mostra o novo valor (o Google demora um pouco para atualizar).

Se a planilha sair do ar, o site usa sozinho o `dados.csv` da pasta. Por isso, de vez em quando, baixe a planilha como CSV e substitua o `dados.csv`.

**Como a planilha funciona** (colunas: `tipo, categoria, item, descricao, preco, foto, disponivel`):

| tipo | categoria | item | descricao | preco | foto | disponivel |
|---|---|---|---|---|---|---|
| `cardapio` | Lanches, Combos, Porções... | Nome do item | Ingredientes | `32.90` | `smash-duplo.jpg` | `sim` ou `nao` |
| `promocao` | Dia da semana (`Terça`) ou `Todos` | Nome da promoção | Texto | Preço (ou `0` para não mostrar) | foto | `sim` / `nao` |
| `horario` | `Salão` ou `Entrega` | Dia (`Segunda`) | `18:00 às 23:30` ou `Fechado` | | | |
| `area` | `Entrega` | Bairro | Tempo (`30 a 40 min`) | Taxa (`0` = Grátis) | | |

Regras para o dono:
- **Esgotou?** Troque `disponivel` para `nao`. Voltou? `sim`.
- **Preço:** só o número, `32.90` ou `32,90`. Nada de `R$`.
- **Ordem do cardápio:** é a ordem das linhas. Para mudar a ordem das categorias ou dos itens, mova as linhas.
- **Categoria nova:** é só escrever outro nome na coluna `categoria`. Ela aparece sozinha na barra de categorias.
- O selo "Aberto agora / Fechado" usa os horários da **primeira** categoria de `horario` (no exemplo, `Salão`). Horário que passa da meia-noite funciona (`18:00 às 01:00`).
- Não mude os nomes das colunas na primeira linha.

### 5. Fotos

Coloque as fotos na pasta `fotos/`, com os nomes exatos. Enquanto uma foto não existir, aparece um fundo neutro no lugar. Nada quebra.

| Arquivo | Onde aparece | Tamanho ideal |
|---|---|---|
| `capa.jpg` | Topo do site (o lanche mais vendido) | 1600 × 1200 px, deitada. Deixe o lanche mais para a **direita**: o texto fica à esquerda e embaixo |
| `compartilhar.jpg` | Prévia do link no WhatsApp | 1200 × 630 px |
| Fotos do cardápio (coluna `foto`) | Cartão de cada item | 600 × 600 px, quadrada |
| Fotos das promoções (coluna `foto`) | Cartão da promoção do dia | 1200 × 800 px, deitada |

Fotos do cardápio de exemplo: `smash-classico.jpg`, `smash-duplo.jpg`, `smash-bacon.jpg`, `x-salada.jpg`, `x-tudo.jpg`, `chicken-crispy.jpg`, `veggie.jpg`, `cheddar-melt.jpg`, `combo-smash.jpg`, `combo-duplo.jpg`, `combo-familia.jpg`, `batata-frita.jpg`, `batata-cheddar.jpg`, `onion-rings.jpg`, `mandioca.jpg`, `frango-passarinho.jpg`, `refrigerante.jpg`, `refrigerante-2l.jpg`, `suco.jpg`, `cha-gelado.jpg`, `cerveja.jpg`, `agua.jpg`, `milkshake-ovomaltine.jpg`, `milkshake-nutella.jpg`, `brownie.jpg`, `churros.jpg`.

Promoções: `promo-terca.jpg`, `promo-quarta.jpg`, `promo-quinta.jpg`, `promo-sexta.jpg`, `promo-sabado.jpg`, `promo-domingo.jpg`.

Dicas:
- Salve em **JPG com qualidade ~75–80%**. Cada foto do cardápio deve ficar abaixo de 120 KB, e a capa abaixo de 350 KB (use https://squoosh.app para comprimir). Isso deixa o site rápido no 4G.
- Nomes em minúsculas, sem acento e sem espaço.
- A coluna `foto` também aceita um link completo (`https://...`), se a foto estiver em outro lugar.
- Se um item não tiver foto, deixe a coluna `foto` vazia: aparece o fundo neutro.

### 6. Testar no computador

Abra o site por um servidor local, não com dois cliques no arquivo (senão o navegador bloqueia a leitura do CSV). No terminal, dentro da pasta do site:

```
python -m http.server 8080
```

e acesse http://localhost:8080 . Confira no celular também (ou no modo celular do navegador: F12 e o ícone de celular).

### 7. Publicar

Igual ao site da Clika: `git add .`, `git commit -m "..."`, `git push`. O Cloudflare Pages publica sozinho em cerca de 1 minuto.

---

## Checklist antes de entregar ao cliente

- [ ] `modoDemonstrativo: false`
- [ ] Linha `robots noindex` e script do endereço antigo apagados do topo do `index.html`
- [ ] WhatsApp testado (clicar no botão abre a conversa certa)
- [ ] iFood e Instagram com os links do cliente (ou escondidos)
- [ ] Mapa mostra o lugar certo
- [ ] Planilha publicada, link em `planilhaCSV`, preço testado
- [ ] Todas as fotos colocadas e comprimidas
- [ ] `<title>`, `description` e `og:` trocados no `<head>`
- [ ] Testado no celular

## Fotos ligadas e desligadas

No protótipo, `temFotos: false` no CONFIGURAÇÃO faz o site não procurar nenhuma foto, porque a pasta `fotos/` ainda está vazia (assim não aparecem erros 404). Quando as fotos estiverem na pasta, mude para `temFotos: true` e tire o comentário (`<!-- ... -->`) da foto `capa.jpg` e a linha `og:image` do topo no HTML.
