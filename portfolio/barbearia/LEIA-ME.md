# Protótipo: Barbearia ("Barbearia do Zé")

Site-modelo da Clika, com negócio fictício, nos planos Essencial (`index.html`) e Completo (`completo/`).
No ar: https://clika.com.br/portfolio/barbearia/

> **Não edite esta pasta à mão.** `index.html`, `completo/`, `site.css`, `site.js`, `dados.csv` e `fotos/` são gerados pelo `ferramentas/sites/gerar.py`. A próxima geração sobrescreve esses arquivos e apaga as páginas antigas de `completo/`. Só este LEIA-ME não é tocado.

## De onde vem

- `ferramentas/sites/negocios/barbearia/config.json`: textos, cores, WhatsApp, endereço, equipe, depoimentos, fotos e quais blocos entram em cada página
- `ferramentas/sites/negocios/barbearia/dados.csv`: serviços, preços e horários

Depois de mudar um dos dois, gere de novo a partir da raiz do repositório (precisa de Python com Pillow):

```bash
python ferramentas/sites/gerar.py barbearia
```

Páginas do Completo: `index.html` (Início), `servicos.html` (Serviços e agenda), `equipe.html` e `contato.html`.

## dados.csv

Colunas: `tipo,categoria,nome,descricao,preco,unidade,tag,disponivel`. Tipos usados aqui:

| tipo | categoria | nome | descricao | preco | unidade | tag | disponivel |
|---|---|---|---|---|---|---|---|
| `item` | Grupo (`Cabelo`, `Barba`, `Outros`) | Serviço | Texto curto (com `;` vira lista) | Só o número (`45`); `0` = Grátis | Duração (`40 min`) | Etiqueta opcional (`Mais pedido`) | `sim`, ou `nao` para aparecer apagado |
| `horario` | vazio | Dias (`Terça a sexta`) | `9h às 20h` ou `Fechado` | | | | |

## Fotos

Na pasta `fotos/`, em `.webp`. No protótipo, o gerador recorta todas de `ferramentas/sites/fotos-base/barbearia.jpg`.

- `capa.webp`: topo do site
- `galeria-1.webp` a `galeria-6.webp`: galeria (as legendas vêm de `fotos.galeria` no config)
- `destaque-1.webp` a `destaque-3.webp`: cartões de destaque, na ordem de `tops.itens` do config

## Site de cliente real

Não copie esta pasta. O passo a passo completo está no manual **"13 Como fazer um site"**, na pasta Manuais De Operação do Google Drive da Clika. Dados e fotos de cliente nunca entram neste repositório, que é público.
