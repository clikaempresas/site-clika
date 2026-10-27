# Modelo de site para academia — "Força Total"

Protótipo demonstrativo da Clika (negócio fictício). Serve de portfólio e de modelo para clientes do nicho de academia.

No ar: https://clika.com.br/portfolio/academia/

Arquivos:
- `index.html` — o site inteiro. Tudo que muda de cliente para cliente fica no bloco `CONFIGURAÇÃO`, no começo do `<script>`.
- `dados.csv` — preços dos planos e grade de aulas (cópia de reserva da planilha).
- `fotos/` — as fotos, sempre com os mesmos nomes (lista abaixo).

## Transformar no site de um cliente real

### 1. Copiar a pasta

Copie a pasta `portfolio/academia` inteira para a raiz de um repositório novo, só do cliente (por exemplo `site-academia-cliente`). Os arquivos `index.html`, `dados.csv` e a pasta `fotos/` ficam na raiz.

Não edite a pasta `portfolio/academia` original: ela é o portfólio da Clika.

### 2. Preencher o bloco CONFIGURAÇÃO

Abra o `index.html` e edite só o que está entre `CONFIGURAÇÃO — edite só aqui` e a linha de `=====` logo abaixo:

| Campo | O que colocar |
|---|---|
| `nome`, `tipo`, `slogan` | Nome da academia, a palavra que vem antes ("Academia", "Studio", "CT") e uma frase curta |
| `cores` | Três cores em hexadecimal: `destaque` (botões), `escura` (textos e faixas) e `fundo` (página). Pegue da logo do cliente; se ficar sem contraste, mantenha o azul e mude só o `destaque` |
| `whatsapp` | 55 + DDD + número, só dígitos. Ex.: `5514991234567` |
| `mensagemWhatsapp` | A mensagem que já vem escrita quando o aluno clica |
| `instagram` | Só o usuário, sem @. Vazio = os botões do Instagram somem |
| `endereco` | Endereço como aparece no site |
| `mapaBusca` | Deixe vazio para o mapa procurar o endereço. Se o Google achar o lugar errado, escreva o nome da academia como está no Google Maps |
| `mapaLink` | Opcional. No Google Maps: Compartilhar > Copiar link |
| `horarios` | Uma linha por grupo de dias: `["Segunda a sexta", "5h às 23h"]` |
| `planilhaCSV` | Link da planilha publicada (passo 4). Vazio = usa o `dados.csv` |
| `textos` | Chamadas e títulos de cada seção. Mude à vontade, mas mantenha frases curtas |
| `modalidades` | Nome, texto curto e uma etiqueta (duração ou nível). Pode ter mais ou menos de 6 |
| `professores` | Nome, função, registro (CREF ou faixa) e o nome do arquivo da foto |
| `estrutura` | Legenda e nome do arquivo de cada foto. O primeiro item aparece grande |
| `depoimentos` | Nome, resultado, texto e foto. `foto: ""` = depoimento só com texto |
| `avisoDemo` | **Mude para `false`.** Isso tira o aviso "Projeto demonstrativo" do rodapé |

Cuidado ao editar: mantenha as aspas `"` e as vírgulas do fim de cada linha. Se o site ficar em branco, quase sempre é uma vírgula ou aspa faltando.

### 3. Trocar as linhas do topo do arquivo

Logo no começo do `index.html` (antes do bloco CONFIGURAÇÃO):
- Troque `<title>`, `description`, `og:title` e `og:description` pelo nome e pela cidade do cliente. É isso que aparece na prévia do link no WhatsApp e no Google.
- **Apague a linha `<meta name="robots" content="noindex">`.** Ela esconde o site do Google (certo para a demo, errado para o cliente). Apague também o script do endereço antigo (`site-clika.pages.dev`), logo acima dela.
- Troque a cor em `theme-color` pela cor `escura` do cliente.

### 4. Preços e grade de aulas

O `dados.csv` tem duas tabelas, uma embaixo da outra, separadas por uma linha vazia:

**Planos**, com cabeçalho `plano,preco,periodo,beneficios,destaque`:
- `preco`: valor **por mês**, só o número (`97` ou `97,90`)
- `periodo`: `1 mês`, `3 meses`, `6 meses`, `12 meses`. O site usa esse número para calcular o total e a economia
- `beneficios`: separados por ponto e vírgula
- `destaque`: `sim` no plano que deve aparecer em azul com a etiqueta "Recomendado" (só um)

A economia mostrada ("Você economiza R$ 384 por ano") é calculada sozinha, comparando com o plano mais caro por mês.

**Grade de aulas**, com cabeçalho `dia,horario,modalidade,professor`:
- `dia`: Segunda, Terça, Quarta, Quinta, Sexta, Sábado ou Domingo
- `horario`: `07:00` ou `18:30`
- Dias sem aula não aparecem. O site abre no dia de hoje

Para o próprio cliente atualizar sem mexer no código:
1. No Google Sheets da conta do cliente: **Arquivo > Importar** o `dados.csv`.
2. **Arquivo > Compartilhar > Publicar na Web**, escolha a aba e o formato **CSV** e copie o link.
3. Cole o link em `planilhaCSV`.
4. Se a planilha sair do ar, o site usa o `dados.csv` sozinho. Lembre de atualizar o `dados.csv` de vez em quando com os preços da planilha.

### 5. Fotos

Coloque na pasta `fotos/` com exatamente estes nomes (minúsculos, `.jpg`):

| Arquivo | Tamanho | Conteúdo |
|---|---|---|
| `capa.jpg` | 1200 × 1500 (vertical) | Foto principal do topo: alunos treinando, com energia |
| `estrutura-1.jpg` | 1600 × 1200 | Foto mais bonita do espaço (aparece grande) |
| `estrutura-2.jpg` a `estrutura-5.jpg` | 1000 × 750 | Outras áreas: spinning, tatame, funcional, vestiário |
| `professor-1.jpg` a `professor-3.jpg` | 800 × 1000 (vertical) | Um professor por foto, rosto no terço de cima |
| `antes-depois-1.jpg`, `antes-depois-2.jpg` | 1200 × 900 | Uma imagem só: antes na metade esquerda, depois na direita |

- Deixe cada foto com menos de 300 KB (https://squoosh.app, formato JPG, qualidade 75–80). Isso deixa o site rápido no celular.
- Foto que faltar mostra um fundo azul com um anel laranja, sem quebrar o layout.
- Para mais ou menos professores ou fotos da estrutura, acrescente ou apague itens no CONFIGURAÇÃO e use os nomes seguintes (`professor-4.jpg`...).
- **Antes e depois e depoimentos têm que ser reais, com autorização por escrito do aluno.** Se o cliente não tiver, deixe só depoimentos em texto (`foto: ""`).

### 6. Testar no computador

Abra o site por um servidor local (por exemplo `http://localhost:8080`), não com dois cliques no arquivo, senão o navegador bloqueia a leitura do `dados.csv`. Confira:
- Botões de WhatsApp abrem a conversa certa, com a mensagem
- Instagram abre o perfil certo
- Mapa mostra o lugar certo
- Planos e grade de aulas aparecem
- No celular (ou com o navegador estreito), o botão verde do WhatsApp fica no canto

### 7. Publicar

Igual ao site da Clika (veja o `LEIA-ME.md` da raiz do repositório): repositório no GitHub, depois Cloudflare Pages com branch `main`, sem comando de build e pasta de saída `/`.

## Fotos ligadas e desligadas

No protótipo, `temFotos: false` no CONFIGURAÇÃO faz o site não procurar nenhuma foto, porque a pasta `fotos/` ainda está vazia (assim não aparecem erros 404). Quando as fotos estiverem na pasta, mude para `temFotos: true` e tire o comentário (`<!-- ... -->`) da foto `capa.jpg` no HTML.
