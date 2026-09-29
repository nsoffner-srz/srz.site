// Dados gerais do site: navegação, contato e rótulos. Edite aqui para mudar em todas as páginas.

export const SITE = {
  nome: 'Sensoriz',
  url: 'https://www.sensoriz.com.br',
  descricao:
    'A Sensoriz monitora cargas, estoques, geladeiras e equipamentos de alto valor em tempo real, avisa só quando algo sai do padrão e gera a prova para auditoria.',
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
  'industria-e-inventario': 'Indústria e Inventário',
} as const;
export type SetorId = keyof typeof SETORES_ROTULO;

export const SOLUCOES_MENU = [
  { slug: 'sensoriz-core', nome: 'Sensoriz CORE' },
  { slug: 'monitoramento-ambiental', nome: 'Monitoramento ambiental' },
  { slug: 'dispositivos', nome: 'Dispositivos' },
  { slug: 'servico-de-compliance', nome: 'Serviço de compliance' },
  { slug: 'integracoes', nome: 'Integrações' },
];

export type ItemMenu = { rotulo: string; href: string; filhos?: { rotulo: string; href: string }[] };

export const NAV: ItemMenu[] = [
  { rotulo: 'Setores', href: '/setores', filhos: Object.entries(SETORES_ROTULO).map(([slug, nome]) => ({ rotulo: nome, href: `/setores/${slug}` })) },
  { rotulo: 'Soluções', href: '/solucoes', filhos: SOLUCOES_MENU.map((s) => ({ rotulo: s.nome, href: `/solucoes/${s.slug}` })) },
  { rotulo: 'Cases', href: '/cases' },
  { rotulo: 'Conteúdo', href: '/conteudo' },
  { rotulo: 'Empresa', href: '/empresa' },
];
