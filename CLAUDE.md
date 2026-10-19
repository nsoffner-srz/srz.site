# Site da Sensoriz (srz.site)

Instruções para quem trabalha neste repositório com o Claude (VS Code ou claude.ai). Leia antes de mudar qualquer página.

## O que é

Site institucional da Sensoriz (sensoriz.com.br), substituindo o site atual feito em Framer.
Feito em **React com Next.js** (App Router), por indicação do TI, com **exportação estática**
(`output: 'export'`): cada página sai como HTML pronto, o que mantém o SEO e a busca por IA (AEO).
Publicado na **Cloudflare Pages**. Dados estruturados (schema.org), sitemap, RSS, `robots.txt` e `llms.txt`.
Não usar recursos que exigem servidor Node (rotas dinâmicas sem `generateStaticParams`, `cookies()`,
middleware, API routes do Next): o que precisar de servidor vai em `functions/` (Cloudflare Pages Functions).

Responsável pelo site: Nicole Soffner (CMO). Tecnologia: Leonardo Rissi (CTO).

## Comandos

```bash
npm install        # uma vez
npm run dev        # site local em http://localhost:3000
npm run build      # gera a pasta out/ (é o que vai para a Cloudflare)
npm run start      # serve a pasta out/ localmente
```

Node 20.9 ou mais recente.

## Estrutura

```
app/                       rotas (cada pasta com page.tsx vira uma página)
  page.tsx                 home
  produtos/[slug]/         dispositivos, sensoriz-core, servicos
  solucoes/[slug]/         setores e casos de uso (estoque parado, estoque em movimento)
  conteudo/                lista, artigo, filtros por tema e setor, rss.xml
  cases/ empresa/ diagnostico/ politicas/
  layout.tsx               fontes, SEO padrão, JSON-LD da organização, cabeçalho e rodapé
  sitemap.ts               /sitemap.xml
components/                Header, Footer, Logo, LeiturasAoVivo (hero), CaseCard, FormDiagnostico...
lib/
  site.ts                  menu, rótulos, listas fechadas de TEMAS e SETORES, links
  setores.ts               conteúdo das 4 páginas de setor (normas, perguntas, visual vivo, fotos)
  produtos.ts              conteúdo das páginas de produto
  casos-de-uso.ts          estoque parado e estoque em movimento
  hardware.ts              hubs, tags, lacre e os 8 parâmetros
  cases.ts                 clientes ativos
  conteudo.ts              leitura e validação dos artigos em Markdown
  seo.ts                   metadados e dados estruturados
content/conteudo/*.md      artigos da seção Conteúdo; _modelo.md é o molde (não publica)
styles/tokens.css          tokens do design system (não editar sem mudar o design system)
styles/global.css          classes base (display-xl, card, botao, chip, prosa...)
styles/site.css            componentes e páginas
public/marca/              logotipos e símbolo oficiais
public/_redirects          301 das URLs do Framer para as novas
functions/api/diagnostico.ts   Cloudflare Pages Function: formulário vira lead no Notion
```

## Mapa do site

- **Produtos:** Dispositivos (hub, tag, lacre) · Sensoriz CORE · Serviços (implantação, compliance, suporte)
- **Soluções:** por setor (Logística e Cadeia Fria · Farmácias e Clínicas · Saúde · Ativos de Alto Valor)
  e por caso de uso (Estoque parado · Estoque em movimento). Chamada "Calcule seu ROI" no menu.
- URLs antigas (/setores/*, /solucoes/sensoriz-core etc.) têm 301 em `public/_redirects`.
- **Cases** · **Conteúdo** (temas + tags de setor) · **Empresa**
- Em toda página: Solicitar diagnóstico · Entrar na Sensoriz CORE · Ouvidoria · Privacidade

Para criar um setor novo: adicione o id e o rótulo em `SETORES_ROTULO` (lib/site.ts) e o conteúdo em
`lib/setores.ts` copiando um existente. A seção "O que a norma exige" só aparece se `normas` tiver itens:
Saúde e Indústria não têm norma de monitoramento e ficam sem essa seção.

## Seção Conteúdo

Cada artigo tem **1 tema** e **1 ou mais setores**. Listas fechadas, para não surgirem variações:

- Temas: `normas-e-fiscalizacao`, `perdas-e-custos`, `gestao-da-operacao`, `tecnologia-e-dados`, `cases-e-depoimentos`
- Setores: `logistica-e-cadeia-fria`, `farmacias-e-clinicas`, `saude`, `ativos-de-alto-valor`
- Série opcional: `norma-em-dia` (conteúdo regulatório)

Para escrever para busca e IA: o primeiro parágrafo responde à pergunta do título em até 3 frases;
subtítulos em forma de pergunta; números sempre com unidade; `perguntas` no frontmatter (vira FAQ e dado estruturado).
Use `rascunho: true` enquanto o texto não estiver aprovado.

**Foto de capa:** salve a imagem em `public/conteudo/capas/<slug>.jpg` (ou `.webp`/`.png`), com o mesmo nome do
arquivo `.md`. Ela aparece sozinha no card, no topo do artigo e na prévia de compartilhamento. Formato 16:9,
1600 × 900px, até 300 KB. No frontmatter, `capaAlt` (descrição da foto) e `capaCredito` (ex.: "Foto: Nome / Pexels").
Só use foto com licença livre (Pexels, Unsplash) ou própria.

## Hardware (fonte: Nicole, 29 set 2026)

O hardware NÃO é produção própria nem nacional. Nunca escrever "hardware próprio" ou "tecnologia própria de hardware".
A plataforma Sensoriz CORE é desenvolvida pela Sensoriz.

- **Hubs** (parceiro internacional SystemLoco): comunicam com a nuvem e são sensores. Medem 8 parâmetros:
  temperatura, umidade, luminosidade, pressão atmosférica, impacto, vibração, localização e orientação (X, Y, Z).
  Modelos: recarregável · na tomada (mede queda de energia) · descartável com bateria de longa duração ·
  longa duração (bateria de até 5 anos).
- **Tags** (SystemLoco): não se conectam à nuvem; enviam pelo hub. Medem só temperatura, umidade e localização.
- **Lacre inteligente** (parceiro internacional TydenBrooks): lacre eletrônico de porta de caminhão.
- Os nomes dos parceiros não aparecem no site até a Nicole decidir citá-los.
- **Na home e no institucional, a solução é uma só: "8 parâmetros em uma só solução".** Hub e tag aparecem
  separados só nas páginas de hardware (o hub não mede umidade; quem mede é a tag).
- Dúvidas de hardware: confirmar com o Rodrigo (CEO).

## Clientes ativos (set 2026)

- **Fabricante multinacional de climatização** (Midea Carrier, SEM citar o nome): impacto no transporte de equipamentos. Depoimento de funcionário a receber.
- **GoldPão** (pão congelado): monitoramento dos caminhões de distribuição.
- **Fungo de Quintal** (fungos e cogumelos para consumo): monitoramento do estoque.
- Confirmar autorização por escrito para usar os nomes de GoldPão e Fungo de Quintal. Nenhum logo de cliente.

## Marca (resumo do Design System Sensoriz)

Fonte da verdade: artefato **Design System Sensoriz** (https://claude.ai/artifact/4iU263UfPAvhSkCVTrjEEF).
Se algo aqui divergir, o design system vence.

- **Princípios Ver, Agir, Provar.** Todo dado com unidade, hora da leitura e estado.
- **Cor nunca diz sozinha:** estado sempre com palavra ("Normal", "Atenção", "Crítico", "Sem sinal").
- **O dado ganha a cor, a interface fica quieta.** Azul `--acao` só em botão primário, link e série principal.
  Vermelho `--estado-critico` só em alerta ou gráfico, nunca decoração.
- **Fontes:** Archivo Black (títulos de marca, um peso só) · Questrial (texto) · Atkinson Hyperlegible Mono (números).
  A unidade ao lado do número (°C, %UR) fica em Questrial.
- **14px é o piso** (exceção: rótulo em caixa alta, 13px). Alvo de toque mínimo 44 × 44px. Nada depende de hover.
- **Celular e desktop têm o mesmo peso:** conferir toda página em 390px e 1280px, e nos temas claro e escuro.
- **Logo:** use só os arquivos de `public/marca` pelo componente `Logo.tsx`. Nunca escrever "Sensoriz" em
  Archivo Black como logo. Largura mínima 140px. Sobre fundo azul, só a versão mono branca.
- Sem clichês de IA: nada de gradiente azul-roxo, cards com emoji ou borda lateral colorida.

## Voz e linguagem (decisão da Nicole, 29 set 2026)

- **No site: tom estabelecido e linguagem simples.** A Sensoriz fala como empresa segura do que entrega,
  sem exagero e sem jargão. Quem lê é dono, diretor, responsável técnico ou gerente de operação.
- **Textos curtos.** Título com até 10 palavras. Subtítulo com uma frase, no máximo duas.
  Parágrafo com até 2 frases. Card com uma frase. Se dá para cortar, corte.
- **Uma ideia por frase.** Verbo no começo sempre que possível ("Monitore", "Saiba", "Receba").
- **Palavras do dia a dia do cliente:** "temperatura fora da faixa", "caminhão", "geladeira", "estoque".
  Nada de "telemetria", "acionável", "irrefutável", "redefinimos".
- **Termos técnicos ficam para o Conteúdo (blog).** Lá vale linguagem técnica, com norma, número e fonte.
  No site, a norma aparece pelo nome e pelo que exige, em poucas palavras.
- Sem exclamação, sem promessa absoluta ("nunca mais perca"), sem superlativo sem prova.

## Vocabulário

| Use | Não use |
| --- | --- |
| Operação | Campo (aproxima a marca de agro) |
| Ativos sensíveis | Ativos críticos |
| Excursão de temperatura | Desvio térmico, fora da faixa (em texto técnico) |
| Gestão por exceção | Alerta inteligente |
| Sensoriz CORE (1ª menção), depois CORE | Core, core, plataforma Core |
| Tecnologias inteligentes e conectadas | IoT (no texto de marketing) |

Datas e eventos sempre em português. Sem emojis.

## Regras de conteúdo

- **Não usar logo de cliente.** Nome só com autorização por escrito (ver Clientes ativos).
- Prova social permitida hoje: logos da **WOW Aceleradora**, **Sebrae for Startups** e **Google for Startups**
  (faixa branca logo abaixo do hero), e depoimentos autorizados.
- **Cases sempre sem nome de cliente**, só o segmento (formato antes · problema · como atuamos · resultado).
  Os dois logos são brancos e ficam sempre na faixa escura (`components/Parceiros.tsx`, lista em `PARCEIROS` de `lib/site.ts`).
  Depoimentos ficam em `lib/cases.ts` (campo `depoimentos`).
- Números da home estão marcados como "a confirmar". Só retirar a marcação depois da aprovação dos sócios.
- Normas citadas (RDC 430, 653, 216, 44, 67, 197 e Portaria 326) devem ser revisadas por quem conhece a
  regulação antes de publicar. RDC 67 vale só para farmácias de manipulação.
- Foco em alimentos sensíveis a temperatura e umidade (congelados, refrigerados, frescos), não só medicamentos.
- Indústria: prioridade para estoques complexos, com muito metal e equipamentos de alto valor
  (integridade por impacto, vibração e orientação, e localização).
- Políticas: texto oficial em `content/politicas/*.md` (copiado sem alteração do site em Framer em 29/09/2026).
  Cada arquivo vira `/politicas/<slug>`; a página `/politicas` lista todas. Não reescrever sem aprovação jurídica.
- A classe `.pendente` marca o que ainda falta. **O site não vai ao ar com nenhum `.pendente` visível.**
  Para listar: `grep -rn "pendente" app components lib`.

## Publicação (Cloudflare Pages)

- Projeto conectado a este repositório no GitHub. Build: `npm run build` · pasta de saída: `out`.
- Variáveis de ambiente (Settings > Variables, nunca no código): `NOTION_TOKEN`, `NOTION_DATA_SOURCE_ID`
  (padrão: Pipeline Sensoriz). A integração do Notion precisa de acesso ao banco Pipeline Sensoriz.
- Cada branch gera um link de prévia para revisão antes do merge na `main`.
- Antes de apontar o domínio: conferir a lista completa de URLs do Framer em `public/_redirects`
  (incluindo cada post do blog antigo) e só então cancelar o Framer.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
