// Dados gerais do site: navegação, contato e rótulos. Edite aqui para mudar em todas as páginas.

export const SITE = {
  nome: 'Sensoriz',
  url: 'https://www.sensoriz.com.br',
  descricao:
    'A Sensoriz monitora cargas, salas, geladeiras e ativos sensíveis em tempo real, avisa só quando algo sai do padrão e gera a prova para auditoria.',
  loginCore: 'https://core.sensoriz.com.br/login',
  whatsapp: 'https://wa.me/5511937140742?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Sensoriz',
  ouvidoria: 'mailto:ouvidoria@sensoriz.com.br',
  redes: {
    linkedin: 'https://www.linkedin.com/company/sensoriz/',
    instagram: 'https://www.instagram.com/sensorizbr/',
  },
};

export const TEMAS_ROTULO: Record<string, string> = {
  'normas-e-fiscalizacao': 'Normas e fiscalização',
  'perdas-e-custos': 'Perdas e custos',
  'gestao-da-operacao': 'Gestão da operação',
  'tecnologia-e-dados': 'Tecnologia e dados',
  'cases-e-depoimentos': 'Cases e depoimentos',
};

export const SETORES_ROTULO: Record<string, string> = {
  'logistica-e-cadeia-fria': 'Logística e Cadeia Fria',
  'farmacias-e-clinicas': 'Farmácias e Clínicas',
  saude: 'Saúde',
  'industria-e-inventario': 'Indústria e Inventário',
};

import { SOLUCOES_DETALHE as SOLUCOES } from './solucoes';

export const NAV: { rotulo: string; href: string; filhos?: { rotulo: string; href: string }[] }[] = [
  { rotulo: 'Setores', href: '/setores', filhos: Object.entries(SETORES_ROTULO).map(([slug, nome]) => ({ rotulo: nome, href: `/setores/${slug}` })) },
  { rotulo: 'Soluções', href: '/solucoes', filhos: SOLUCOES.map((s) => ({ rotulo: s.nome, href: `/solucoes/${s.slug}` })) },
  { rotulo: 'Cases', href: '/cases' },
  { rotulo: 'Conteúdo', href: '/conteudo' },
  { rotulo: 'Empresa', href: '/empresa' },
];
