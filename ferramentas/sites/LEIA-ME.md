# Gerador de sites

O `gerar.py` monta o site de um negócio nos planos Essencial (uma página) e Completo (várias páginas, em `completo/`) a partir de um `config.json` e de um `dados.csv`. O HTML sai pronto, e o Google lê tudo sem depender de JavaScript. É com ele que são feitos os protótipos do portfólio e os sites de clientes.

> **Este repositório é público.** Dados, fotos e pastas de clientes nunca entram aqui. Eles ficam em repositórios privados, um por cliente. Aqui só ficam o gerador e os negócios fictícios do portfólio.

## Pastas

- `base/`: `site.css` e `site.js`, iguais para todos os sites. O gerador copia os dois para a pasta de saída.
- `fotos-base/`: uma foto grande por nicho (`barbearia.jpg`, ...). Nos protótipos, o gerador recorta dela `capa.webp`, `galeria-N.webp` e `destaque-N.webp`. Quando o config não tem `fotos.base`, ele não recorta nada e usa as fotos que já estão em `fotos/` na pasta de saída.
- `negocios/<nicho>/`: `config.json` (textos, cores, WhatsApp, endereço, fotos e blocos de cada página) e `dados.csv` (colunas `tipo,categoria,nome,descricao,preco,unidade,tag,disponivel`). O LEIA-ME de cada protótipo, em `portfolio/<pasta>/`, explica os tipos de linha daquele nicho.

## Como gerar

Rode a partir da raiz do repositório. Precisa de Python com Pillow (`pip install pillow`).

```bash
python ferramentas/sites/gerar.py barbearia
```

```bash
python ferramentas/sites/gerar.py todos
```

```bash
python ferramentas/sites/gerar.py barbearia --saida ../site-cliente
```

- Sem `--saida`, escreve em `portfolio/<pasta>/` (o campo `pasta` do config).
- Com `--saida`, escreve na pasta indicada. É assim que se gera o site de um cliente no repositório dele.
- A geração sobrescreve `index.html`, `site.css`, `site.js`, `dados.csv` e `fotos/` e apaga as páginas antigas de `completo/`. Nunca edite esses arquivos à mão.
- O preço da faixa "Modelo da Clika" dos protótipos vem do `planos.csv` da raiz. Com `"demo": false` no config, a faixa e o `noindex` saem e entram as tags de prévia do link (`og:`), com o `dominio` do config.

Para cliente real, siga o manual **"13 Como fazer um site"**, na pasta Manuais De Operação do Google Drive da Clika.
