// Dados gerais do site: navegação, contato e rótulos. Edite aqui para mudar em todas as páginas.

export const SITE = {
  nome: 'Sensoriz',
  url: 'https://www.sensoriz.com.br',
  descricao:
    'A Sensoriz monitora cargas, estoques e equipamentos em tempo real e avisa antes que o problema vire prejuízo.',
  loginCore: 'https://core.sensoriz.com.br/login',
  whatsapp: 'https://wa.me/5511937140742?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Sensoriz',
  ouvidoria: 'mailto:ouvidoria@sensoriz.com.br',
  redes: {
    linkedin: 'https://www.linkedin.com/company/sensoriz/',
    instagram: 'https://www.instagram.com/sensorizbr/',
  },
};

// Listas fechadas. Para criar um tema ou setor novo, adicione aqui primeiro.
export const TEMAS = {
  'normas-e-fiscalizacao': 'Normas e fiscalização',
  'perdas-e-custos': 'Perdas e custos',
  'gestao-da-operacao': 'Gestão da operação',
  'tecnologia-e-dados': 'Tecnologia e dados',
  'cases-e-depoimentos': 'Cases e depoimentos',
} as const;
export type Tema = keyof typeof TEMAS;

export const SETORES_ROTULO = {
  'logistica-e-cadeia-fria': 'Logística e Cadeia Fria',
  'farmacias-e-clinicas': 'Farmácias e Clínicas',
  saude: 'Saúde',
  'ativos-de-alto-valor': 'Ativos de Alto Valor',
} as const;
export type SetorId = keyof typeof SETORES_ROTULO;

// Menu principal, no modelo da Controlant: Produtos (o que entregamos) e Soluções (para quem).
// Cada coluna do menu vira um grupo. Âncoras (#hub, #alertas...) apontam para seções das páginas de produto.
export type LinkMenu = { rotulo: string; href: string };
export type ItemMenu = {
  rotulo: string;
  href: string;
  colunas?: { titulo: string; itens: LinkMenu[] }[];
  chamada?: { titulo: string; texto: string; href: string };
  verTodos?: string; // texto do link para a página que lista tudo
};

export const NAV: ItemMenu[] = [
  {
    rotulo: 'Produtos',
    href: '/produtos',
    verTodos: 'Ver todos os produtos',
    colunas: [
      { titulo: 'Dispositivos', itens: [
        { rotulo: 'Hub', href: '/produtos/dispositivos#hub' },
        { rotulo: 'Tag', href: '/produtos/dispositivos#tag' },
        { rotulo: 'Lacre inteligente', href: '/produtos/dispositivos#lacre' },
      ] },
      { titulo: 'Plataforma', itens: [
        { rotulo: 'Sensoriz CORE', href: '/produtos/sensoriz-core' },
        { rotulo: 'Alertas e gestão por exceção', href: '/produtos/sensoriz-core#alertas' },
        { rotulo: 'Relatórios e auditoria', href: '/produtos/sensoriz-core#relatorios' },
        { rotulo: 'Integrações', href: '/produtos/sensoriz-core#integracoes' },
      ] },
      { titulo: 'Serviços', itens: [
        { rotulo: 'Implantação e instalação', href: '/produtos/servicos#implantacao' },
        { rotulo: 'Serviço de compliance', href: '/produtos/servicos#compliance' },
        { rotulo: 'Suporte e gestão dos dispositivos', href: '/produtos/servicos#suporte' },
      ] },
    ],
  },
  {
    rotulo: 'Soluções',
    href: '/solucoes',
    verTodos: 'Ver todas as soluções',
    colunas: [
      { titulo: 'Por setor', itens: Object.entries(SETORES_ROTULO).map(([id, nome]) => ({ rotulo: nome, href: `/solucoes/${id}` })) },
      { titulo: 'Por caso de uso', itens: [
        { rotulo: 'Estoque parado', href: '/solucoes/estoque-parado' },
        { rotulo: 'Estoque em movimento', href: '/solucoes/estoque-em-movimento' },
      ] },
    ],
    chamada: { titulo: 'Calcule seu ROI', texto: 'Veja o retorno na sua operação, com o nosso time.', href: '/diagnostico?objetivo=roi' },
  },
  { rotulo: 'Cases', href: '/cases' },
  { rotulo: 'Conteúdo', href: '/conteudo' },
  { rotulo: 'Empresa', href: '/empresa' },
];

// Programas de aceleração (prova social permitida hoje). Sem logo de cliente.
// A faixa é sempre branca (os logos coloridos foram feitos para fundo claro). "exibir" = altura na tela, em px.
export const PARCEIROS = [
  {
    nome: 'WOW Aceleradora de Startups',
    // Selo "Acelerada por WOW" guardado no armazenamento de marketing da Sensoriz.
    logo: '/marca/parceiros/wow-acelerada.png',
    largura: 2066, altura: 307, exibir: 40,
  },
  { nome: 'Sebrae for Startups', logo: '/marca/parceiros/sebrae-for-startups.png', largura: 477, altura: 154, exibir: 56 },
  // Logo do Google + "for Startups" em Google Sans, convertido em curvas (feedback do Rodrigo, out/2026).
  { nome: 'Google for Startups', logo: '/marca/parceiros/google-for-startups-cinza.svg', largura: 210, altura: 32, exibir: 34 },
] as const;
