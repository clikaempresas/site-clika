# Protótipo: Arena de esportes de areia ("Arena Pé na Areia")

Site-modelo da Clika, com negócio fictício, nos planos Essencial (`index.html`) e Completo (`completo/`).
No ar: https://clika.com.br/portfolio/arena-esportes-areia/

> **Não edite esta pasta à mão.** `index.html`, `completo/`, `site.css`, `site.js`, `dados.csv` e `fotos/` são gerados pelo `ferramentas/sites/gerar.py`. A próxima geração sobrescreve esses arquivos e apaga as páginas antigas de `completo/`. Só este LEIA-ME não é tocado.

## De onde vem

No gerador, este nicho se chama `arena`. O campo `pasta` do config é que manda a saída para `portfolio/arena-esportes-areia/`.

- `ferramentas/sites/negocios/arena/config.json`: textos, cores, WhatsApp, endereço, equipe, depoimentos, fotos e quais blocos entram em cada página
- `ferramentas/sites/negocios/arena/dados.csv`: preços de quadra, aulas e day use, horários e grade de aulas

Depois de mudar um dos dois, gere de novo a partir da raiz do repositório (precisa de Python com Pillow):

```bash
python ferramentas/sites/gerar.py arena
```

Páginas do Completo: `index.html` (Início), `reservas.html` (Preços e reservas), `aulas.html` e `contato.html`.

## dados.csv

Colunas: `tipo,categoria,nome,descricao,preco,unidade,tag,disponivel`. Tipos usados aqui:

| tipo | categoria | nome | descricao | preco | unidade | tag | disponivel |
|---|---|---|---|---|---|---|---|
| `item` | Grupo (`Quadras`, `Aulas`, `Day use`) | Nome | Texto (com `;` vira lista) | Só o número (`120`); `0` = Grátis | `por hora`, `por mês`, `por pessoa` | Etiqueta opcional (`Concorrido`) | `sim`, ou `nao` para aparecer apagado |
| `horario` | vazio | Dias (`Segunda a sexta`) | `6h às 23h` ou `Fechado` | | | | |
| `aula` | Dia (`Segunda`) | Modalidade | Nível e professor (`Iniciante · com Lari Souza`) | | Hora (`18h`) | | |

## Fotos

Na pasta `fotos/`, em `.webp`. No protótipo, o gerador recorta todas de `ferramentas/sites/fotos-base/arena.jpg`.

- `capa.webp`: topo do site
- `galeria-1.webp` a `galeria-6.webp`: galeria (as legendas vêm de `fotos.galeria` no config)
- `destaque-1.webp` a `destaque-3.webp`: cartões de destaque, na ordem de `tops.itens` do config

## Site de cliente real

Não copie esta pasta. O passo a passo completo está no manual **"13 Como fazer um site"**, na pasta Manuais De Operação do Google Drive da Clika. Dados e fotos de cliente nunca entram neste repositório, que é público.
