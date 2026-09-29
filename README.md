# srz.site

Site institucional da [Sensoriz](https://www.sensoriz.com.br), em React (Next.js, exportação estática), publicado na Cloudflare Pages.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Publicar um artigo na seção Conteúdo

1. Copie `content/conteudo/_modelo.md` e renomeie. O nome do arquivo vira o endereço
   (ex.: `rdc-430-o-que-muda.md` → `/conteudo/rdc-430-o-que-muda`).
2. Preencha o cabeçalho: título, descrição, data, **um tema** e **os setores**.
3. Escreva o texto em Markdown. Mantenha `rascunho: true` até a aprovação.
4. Abra um pull request. A Cloudflare gera um link de prévia para revisar.
5. Com `rascunho: false` e o merge na `main`, o artigo vai ao ar.

## O que falta antes do lançamento

Busque por `pendente` no código (`grep -rn pendente app components lib`). Resumo:

- Logos da WOW Aceleradora e do Sebrae for Startups
- Depoimentos e resultados dos 3 clientes, com autorização de uso do nome
- Aprovação dos números de resultado
- Fotos de dispositivos, instalações e do time
- Texto das políticas (copiar de sensoriz.com.br/politicas)
- Lista completa de URLs antigas para `public/_redirects`
- Token do Notion na Cloudflare para o formulário de diagnóstico

Instruções detalhadas de marca, vocabulário e estrutura: [CLAUDE.md](./CLAUDE.md).
