# srz.site

Site institucional da [Sensoriz](https://www.sensoriz.com.br), em Astro, publicado na Cloudflare Pages.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:4321.

## Publicar um artigo na seção Conteúdo

1. Copie `src/content/conteudo/_modelo.md` e renomeie. O nome do arquivo vira o endereço
   (ex.: `rdc-430-o-que-muda.md` → `/conteudo/rdc-430-o-que-muda`).
2. Preencha o cabeçalho: título, descrição, data, **um tema** e **os setores**.
3. Escreva o texto em Markdown. Mantenha `rascunho: true` até a aprovação.
4. Abra um pull request. A Cloudflare gera um link de prévia para revisar.
5. Com `rascunho: false` e o merge na `main`, o artigo vai ao ar.

## O que falta antes do lançamento

Busque por `pendente` no código (`grep -rn pendente src`). Resumo:

- Logos da WOW Aceleradora e do Sebrae for Startups
- Depoimentos e cases autorizados
- Aprovação dos números de resultado
- Fotos de dispositivos, instalações e do time
- Política de privacidade (LGPD)
- Lista completa de URLs antigas para `public/_redirects`
- Token do Notion na Cloudflare para o formulário de diagnóstico

Instruções detalhadas de marca, vocabulário e estrutura: [CLAUDE.md](./CLAUDE.md).
