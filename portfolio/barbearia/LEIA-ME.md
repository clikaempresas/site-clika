# Modelo Barbearia — como transformar no site de um cliente

Protótipo no ar: https://clika.com.br/portfolio/barbearia/

Arquivos desta pasta:
- `index.html` — o site inteiro. Tudo que muda de cliente para cliente fica no bloco `CONFIGURAÇÃO`, no começo do `<script>` (perto do final do arquivo).
- `dados.csv` — serviços, preços e horários. É a cópia de reserva se a planilha do Google falhar.
- `fotos/` — as fotos, sempre com os nomes abaixo.

## Passo a passo para um cliente novo

1. **Copie a pasta.** Duplique `portfolio/barbearia` para a pasta do cliente (num repositório novo, se o site dele for separado). Não edite o protótipo original.
2. **Preencha o bloco `CONFIGURAÇÃO`** do `index.html`:
   - `nome`, `logo` (a parte entre `[ ]` fica colorida), `sobretitulo`, `titulo` (o nome gigante do topo), `slogan`, `descricao`, `selos`
   - `cores`: troque pelos tons do cliente (código como `#C8312B`). `destaque` é a cor dos botões e preços.
   - `whatsapp`: 55 + DDD + número, só dígitos (ex.: `5514999998888`). `mensagemWhatsapp`: a frase que já vem escrita.
   - `instagram`: link completo do perfil e `instagramUsuario` (ex.: `@barbeariadoze`). Vazio = os botões somem.
   - `endereco`, `referencia`, `mapaBusca` (o que o mapa procura: endereço completo ou nome do lugar no Google) e `linkMaps` (no Google Maps: **Compartilhar > Copiar link**).
   - `equipe`: um item por barbeiro (nome, cargo, especialidade, foto). Para 2 ou 4 barbeiros, apague ou copie um item.
   - `galeria`, `notaGoogle` e `depoimentos`: use avaliações reais do Google do cliente, com permissão.
   - `avisoDemo: false` — tira o aviso "Projeto demonstrativo" do rodapé. **Obrigatório no site de cliente.**
3. **Troque as fotos** na pasta `fotos/`, mantendo os nomes (tabela abaixo). Foto que não existe vira um fundo cinza neutro, sem quebrar o layout.
4. **Preços e horários:** edite o `dados.csv` (veja "A planilha" abaixo) e, se o cliente tiver o plano com planilha, publique e cole o link em `planilhaCSV`.
5. **Título da aba e prévia no WhatsApp:** no começo do arquivo, troque as linhas `<title>`, `description`, `og:title` e `og:description`. Apague também a linha `<meta name="robots" content="noindex">` (ela esconde o site do Google, certo só para a demo) e o script do endereço antigo (`site-clika.pages.dev`).
6. **Teste** (veja "Testar no computador") e publique com `git add .`, `git commit -m "Site da Barbearia X"` e `git push`.

## Fotos

| Arquivo | Onde aparece | Tamanho ideal |
|---|---|---|
| `capa.jpg` | Fundo do topo | 1920 × 1280 px (horizontal). Deixe o assunto no centro: no celular as laterais são cortadas. Foto escura funciona melhor com o texto claro. |
| `barbeiro-1.jpg`, `barbeiro-2.jpg`, `barbeiro-3.jpg` | Equipe | 800 × 1000 px (vertical, 4:5), da cintura para cima |
| `galeria-1.jpg` até `galeria-6.jpg` | Galeria de cortes | 800 × 1000 px (vertical, 4:5) |

Dicas: salve em JPG com qualidade por volta de 75% (a capa com até uns 300 KB, as outras com até 150 KB). Sites como squoosh.app comprimem de graça. Nomes em minúsculas, sem acento, exatamente como na tabela.

## A planilha (dados.csv)

Colunas: `tipo`, `servico`, `preco`, `duracao`, `descricao`, `destaque`.

- **Serviços:** `tipo` = `servico`. `preco` só com o número (`45`, não `R$ 45`); para algo como "a partir de 80", escreva o texto e ele aparece como está. `destaque` = `sim` coloca a etiqueta "Mais pedido" (use em um só).
- **Horários:** `tipo` = `horario`, o dia em `servico` (ex.: `Terça a sexta`) e o horário em `descricao` (ex.: `9h às 20h` ou `Fechado`). Deixe `preco` e `duracao` vazios.
- O site marca "Hoje" sozinho na linha do dia atual e tira do agendamento os dias que estão como `Fechado`. Para isso, escreva os dias por extenso ou abreviados (`Segunda`, `Ter a sex`, `Sábado`).
- Não mude os nomes das colunas da primeira linha.

Para usar planilha do Google: **Arquivo > Importar** o `dados.csv`, depois **Arquivo > Compartilhar > Publicar na Web**, aba certa, formato **CSV**, copie o link e cole em `planilhaCSV`. A ordem que o site tenta é: planilha → `dados.csv` → cópia guardada dentro do `index.html`. Se mudar os preços padrão do modelo, atualize também o bloco `FALLBACK` no `index.html`.

## Como funciona o agendamento

- Cada serviço tem um link "Agendar ..." que abre o WhatsApp com o serviço e o preço já escritos.
- A seção "Marque em 10 segundos" deixa escolher serviço, barbeiro, dia e período. A mensagem é montada na hora e aparece no balão antes de enviar. Os barbeiros vêm da `equipe` e os períodos de `periodos` na configuração.
- O botão verde fixo no canto e os botões do topo abrem o WhatsApp com a `mensagemWhatsapp`.

No protótipo, o WhatsApp é o da Clika (quem testar fala com a gente) e o Instagram aponta para a página inicial do Instagram. Troque os dois no site de cliente.

## Testar no computador

Abrir o `index.html` com dois cliques funciona, mas o navegador bloqueia a leitura do `dados.csv` e o site usa a cópia guardada. Para testar a planilha de verdade, abra por um servidor local (por exemplo, a extensão Live Server do VS Code) ou teste direto no link publicado.

Confira sempre no celular: botão verde no canto, mapa carregando, horário de hoje marcado e a mensagem do WhatsApp certinha.
