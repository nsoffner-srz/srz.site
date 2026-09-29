# Site da Sensoriz (srz.site)

Instruções para quem trabalha neste repositório com o Claude (VS Code ou claude.ai). Leia antes de mudar qualquer página.

## O que é

Site institucional da Sensoriz (sensoriz.com.br), substituindo o site atual feito em Framer.
Feito em **Astro**, com saída estática (HTML pronto por página), publicado na **Cloudflare Pages**.
A escolha foi por SEO e busca por IA (AEO): cada página sai como HTML sem depender de JavaScript,
com dados estruturados (schema.org), sitemap, RSS, `robots.txt` e `llms.txt`.

Responsável pelo site: Nicole Soffner (CMO). Tecnologia: Leonardo Rissi (CTO).

## Comandos

```bash
npm install        # uma vez
npm run dev        # site local em http://localhost:4321
npm run build      # gera a pasta dist/ (é o que vai para a Cloudflare)
npm run preview    # abre o build localmente
```

Node 22.12 ou mais recente.

## Estrutura

```
src/
  content/
    setores/*.md        uma página por setor (modelo de 7 blocos, só frontmatter)
    conteudo/*.md       artigos da seção Conteúdo; _modelo.md é o molde (não publica)
  content.config.ts     campos obrigatórios e listas fechadas de TEMAS e SETORES
  data/site.ts          menu, rótulos de temas e setores, links (login CORE, WhatsApp)
  data/solucoes.ts      conteúdo das páginas de solução
  layouts/Base.astro    SEO, Open Graph, JSON-LD da organização, cabeçalho e rodapé
  components/           Header, Footer, Logo, LeituraAoVivo, Perguntas, Trilha...
  pages/                rotas: /, /setores, /solucoes, /conteudo, /cases, /empresa, /diagnostico
  styles/tokens.css     tokens do design system (não editar sem mudar o design system)
  styles/global.css     classes base (display-xl, card, botao, chip, prosa...)
public/
  marca/                logotipos e símbolo oficiais (SVG com a cor dentro do arquivo)
  _redirects            301 das URLs do Framer para as novas
  _headers, robots.txt, llms.txt
functions/api/diagnostico.ts   Cloudflare Pages Function: formulário vira lead no Notion
```

## Mapa do site

- **Setores:** Logística e Cadeia Fria · Farmácias e Clínicas · Saúde · Indústria e Inventário
- **Soluções:** Sensoriz CORE · Monitoramento ambiental · Dispositivos · Serviço de compliance · Integrações
- **Cases** · **Conteúdo** (temas + tags de setor) · **Empresa**
- Em toda página: Solicitar diagnóstico · Entrar na Sensoriz CORE · Ouvidoria · Privacidade

Para criar um setor novo: adicione o id em `SETORES` (content.config.ts), o rótulo em `SETORES_ROTULO`
(data/site.ts) e o arquivo `src/content/setores/<id>.md` copiando um existente.

## Seção Conteúdo

Cada artigo tem **1 tema** e **1 ou mais setores**. Listas fechadas, para não surgirem variações:

- Temas: `normas-e-fiscalizacao`, `perdas-e-custos`, `gestao-da-operacao`, `tecnologia-e-dados`, `cases-e-depoimentos`
- Setores: `logistica-e-cadeia-fria`, `farmacias-e-clinicas`, `saude`, `industria-e-inventario`
- Série opcional: `norma-em-dia` (conteúdo regulatório)

Para escrever para busca e IA: o primeiro parágrafo responde à pergunta do título em até 3 frases;
subtítulos em forma de pergunta; números sempre com unidade; `perguntas` no frontmatter (vira FAQ e dado estruturado).
Use `rascunho: true` enquanto o texto não estiver aprovado.

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
- **Logo:** use só os arquivos de `public/marca` pelo componente `Logo.astro`. Nunca escrever "Sensoriz" em
  Archivo Black como logo. Largura mínima 140px. Sobre fundo azul, só a versão mono branca.
- Sem clichês de IA: nada de gradiente azul-roxo, cards com emoji ou borda lateral colorida.

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

- **Não usar logo nem nome de cliente** sem autorização por escrito. Clientes aparecem pelo segmento
  ("rede de farmácias", "hospital em São Paulo").
- Prova social permitida hoje: logos da **WOW Aceleradora** e do **Sebrae for Startups**, e depoimentos autorizados.
- Números de resultado (75% menos perdas, 36 mil ativos, R$ 300 mil por carga) estão marcados como
  "a confirmar" na home. Só retirar a marcação depois da aprovação dos sócios.
- Normas citadas (RDC 430, 653, 67) devem ser revisadas por quem conhece a regulação antes de publicar.
- A classe `.pendente` marca o que ainda falta. **O site não vai ao ar com nenhum `.pendente` visível.**
  Para listar: `grep -rn "pendente" src`.

## Publicação (Cloudflare Pages)

- Projeto conectado a este repositório no GitHub. Build: `npm run build` · pasta de saída: `dist`.
- Variáveis de ambiente (Settings > Variables, nunca no código): `NOTION_TOKEN`, `NOTION_DATA_SOURCE_ID`
  (padrão: Pipeline Sensoriz). A integração do Notion precisa de acesso ao banco Pipeline Sensoriz.
- Cada branch gera um link de prévia para revisão antes do merge na `main`.
- Antes de apontar o domínio: conferir a lista completa de URLs do Framer em `public/_redirects`
  (incluindo cada post do blog antigo) e só então cancelar o Framer.
