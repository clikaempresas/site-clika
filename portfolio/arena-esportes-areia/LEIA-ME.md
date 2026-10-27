# Modelo: Arena de esportes de areia

Protótipo demonstrativo da Clika (negócio fictício "Arena Pé na Areia").
Link: https://clika.com.br/portfolio/arena-esportes-areia/

Arquivos:
- `index.html`: o site inteiro. Tudo o que muda de um cliente para outro fica no bloco `CONFIGURAÇÃO`, no começo do `<script>` (perto do final do arquivo).
- `precos.csv`: preços de locação de quadra, aulas e day use.
- `aulas.csv`: grade de aulas (dia, horário, modalidade, nível, professor).
- `fotos/`: as fotos do site. A lista de nomes e tamanhos está em `fotos/LISTA-DE-FOTOS.txt`.

## Transformar no site de um cliente, passo a passo

1. **Copiar o modelo.** Copie a pasta inteira `arena-esportes-areia` para o lugar do novo site (repositório novo do cliente, ou outra pasta).
2. **Preencher a configuração.** Abra o `index.html`, procure por `CONFIGURAÇÃO` e troque:
   - `nome`, `nomeCurto`, `slogan`, os textos do topo (`tituloTopo`, `tituloDestaque`, `textoTopo`) e o `placar` (3 números de destaque).
   - `cores`, se o cliente tiver cores próprias (formato `#RRGGBB`).
   - `whatsapp` (55 + DDD + número, só dígitos) e as `mensagens` que já chegam escritas.
   - `instagram` (link completo) e `instagramArroba`. Deixe `instagram: ""` para esconder os botões.
   - `endereco`, `cidade` e `mapaBusca` (escreva o endereço completo ou o nome do lugar como aparece no Google Maps; teste se o pino cai no lugar certo).
   - `horarios` de funcionamento. Em `dias` use `seg`, `ter`, `qua`, `qui`, `sex`, `sab`, `dom`, com hífen para intervalo (`seg-sex`) e vírgula para dias soltos (`sab,dom`). O selo "Aberto agora" do topo usa esses horários.
   - `modalidades`, `niveis`, `eventos` e `estrutura`. Para tirar um item, apague o bloco `{ ... },` inteiro.
   - `fotosGaleria`: quantas fotos de galeria o cliente mandou.
3. **Tirar o aviso de demonstração.** Mude `avisoDemo: true` para `avisoDemo: false`. Isso some com a frase do rodapé e com o "(Teste do site demonstrativo)" das mensagens de WhatsApp.
4. **Trocar as 4 linhas do topo do arquivo.** Logo no começo do `index.html`, edite `<title>`, `description`, `og:title` e `og:description`. São elas que aparecem no Google e na prévia do link no WhatsApp. Apague também a linha `<meta name="robots" content="noindex">` (ela esconde o site do Google, certo só para a demo) e o script do endereço antigo (`site-clika.pages.dev`).
5. **Colocar as fotos** na pasta `fotos/` com os nomes exatos da lista. Foto que faltar vira um fundo cor de areia, sem quebrar nada.
6. **Preencher os preços e as aulas** em `precos.csv` e `aulas.csv` (ou na planilha do Google, passo 7).
7. **Planilha do Google (opcional, para o cliente editar sozinho):**
   - Crie uma planilha e importe `precos.csv` numa aba e `aulas.csv` em outra (**Arquivo > Importar > Inserir nova(s) página(s)**).
   - **Arquivo > Compartilhar > Publicar na Web**: escolha a aba de preços e o formato **CSV**, copie o link e cole em `planilhaCSV.precos`. Repita com a aba de aulas e cole em `planilhaCSV.aulas`.
   - Se a planilha sair do ar, o site usa sozinho os arquivos `precos.csv` e `aulas.csv`. Então mantenha os CSV atualizados de vez em quando.
8. **Testar localmente** com um servidor local (por exemplo `http://localhost:8080`), não com dois cliques no arquivo, senão o navegador bloqueia a leitura dos CSV. Confira no celular: botão de WhatsApp, grade de aulas, mapa.
9. **Publicar** (git add, commit e push), como no LEIA-ME principal da Clika.

## Como preencher os CSV

`precos.csv`, colunas:
- `categoria`: `locacao` (tabela de preços da quadra), `aulas` (planos de aula) ou `dayuse`.
- `quando`: para locação, é o título do quadro (ex.: `Segunda a sexta`). Cada valor diferente vira um quadro.
- `nome`: ex.: `Horário normal`, `Horário de pico`. Se tiver a palavra "pico", ganha a etiqueta vermelha.
- `horario`: texto livre (ex.: `17h às 23h`).
- `valor`: só o número (`120` ou `120,50`), sem `R$`.
- `unidade`: ex.: `por hora`, `por pessoa`, `por mês`.

`aulas.csv`, colunas:
- `dia`: `Segunda`, `Terça`, `Quarta`, `Quinta`, `Sexta`, `Sábado` ou `Domingo`.
- `horario`: `07:00`, `18:30`...
- `modalidade`: igual ao nome na configuração (`Beach Tennis`, `Futevôlei`, `Vôlei de Praia`), para pegar a cor certa.
- `nivel`: igual aos níveis da configuração (`Iniciante`, `Intermediário`, `Avançado`, `Kids`).
- `professor`: nome do professor (pode ficar vazio).

Cuidados: não mude os nomes das colunas na primeira linha. Se um texto tiver vírgula, coloque entre aspas (`"Sábado, domingo e feriado"`); no Google Sheets isso é automático.

## Fotos ligadas e desligadas

No protótipo, `temFotos: false` no CONFIGURAÇÃO faz o site não procurar nenhuma foto, porque a pasta `fotos/` ainda está vazia (assim não aparecem erros 404). Quando as fotos estiverem na pasta, mude para `temFotos: true` e tire o comentário (`<!-- ... -->`) da foto `capa.jpg` e `dayuse.jpg` no HTML.
