# Protótipo: Lanchonete ("Chapa da Esquina")

Site-modelo da Clika, com negócio fictício, nos planos Essencial (`index.html`) e Completo (`completo/`).
No ar: https://clika.com.br/portfolio/lanchonete/

> **Não edite esta pasta à mão.** `index.html`, `completo/`, `site.css`, `site.js`, `dados.csv` e `fotos/` são gerados pelo `ferramentas/sites/gerar.py`. A próxima geração sobrescreve esses arquivos e apaga as páginas antigas de `completo/`. Só este LEIA-ME não é tocado.

## De onde vem

- `ferramentas/sites/negocios/lanchonete/config.json`: textos, cores, WhatsApp, endereço, depoimentos, entrega, fotos e quais blocos entram em cada página
- `ferramentas/sites/negocios/lanchonete/dados.csv`: cardápio, horários, promoções e bairros de entrega

Depois de mudar um dos dois, gere de novo a partir da raiz do repositório (precisa de Python com Pillow):

```bash
python ferramentas/sites/gerar.py lanchonete
```

Páginas do Completo: `index.html` (Início), `cardapio.html`, `promocoes.html` (Promoções e entrega) e `contato.html`.

## dados.csv

Colunas: `tipo,categoria,nome,descricao,preco,unidade,tag,disponivel`. Tipos usados aqui:

| tipo | categoria | nome | descricao | preco | unidade | tag | disponivel |
|---|---|---|---|---|---|---|---|
| `item` | Grupo (`Lanches`, `Combos`, `Porções`...) | Item | Ingredientes (com `;` vira lista) | Só o número (`32.90`); `0` = Grátis | Opcional | Etiqueta opcional (`Mais pedido`) | `sim`, ou `nao`/`esgotado` para aparecer apagado |
| `horario` | `Salão` ou `Entrega` | Dias (`Terça a quinta`) | `18h às 23h30` ou `Fechado` | | | | |
| `promo` | Dia da semana (`Terça`) | Nome da promoção | Texto | Preço | | | |
| `area` | vazio | Bairro | Tempo (`25 a 35 min`) | Taxa (`0` = grátis) | | | |

A ordem das linhas é a ordem no site.

## Fotos

Na pasta `fotos/`, em `.webp`. No protótipo, o gerador recorta todas de `ferramentas/sites/fotos-base/lanchonete.jpg`.

- `capa.webp`: topo do site
- `galeria-1.webp` a `galeria-6.webp`: galeria (as legendas vêm de `fotos.galeria` no config)
- `destaque-1.webp` a `destaque-3.webp`: cartões de destaque, na ordem de `tops.itens` do config

## Site de cliente real

Não copie esta pasta. O passo a passo completo está no manual **"13 Como fazer um site"**, na pasta Manuais De Operação do Google Drive da Clika. Dados e fotos de cliente nunca entram neste repositório, que é público.
