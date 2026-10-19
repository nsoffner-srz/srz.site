// Produtos da Sensoriz (menu "Produtos"): o que a Sensoriz entrega.
// Três grupos, como no menu: dispositivos, plataforma e serviços. Cada produto vira /produtos/<slug>.
// Itens menores (Hub, Tag, Alertas, Implantação...) são seções da página do produto, com âncora (#id).
import type { SetorId } from './site';

export type GrupoProduto = 'dispositivos' | 'plataforma' | 'servicos';

export interface Produto {
  slug: string;
  grupo: GrupoProduto;
  nome: string;
  titulo: string;
  resumo: string;
  // Seções da página. "id" vira âncora e pode ser linkado pelo menu.
  secoes: { id?: string; titulo: string; texto: string; vitrine?: 'painel' }[]; // vitrine: réplica da tela da CORE
  setores: SetorId[];
  perguntas: { pergunta: string; resposta: string }[];
  // Argumentos comerciais em destaque logo abaixo do título (CORE, feedback do Rodrigo out/2026)
  argumentos?: { titulo: string; texto: string }[];
  // Seção de alertas detalhada (CORE)
  alertas?: { titulo: string; itens: { titulo: string; texto: string }[] };
}

export const GRUPOS_PRODUTO: Record<GrupoProduto, string> = {
  dispositivos: 'Dispositivos',
  plataforma: 'Plataforma',
  servicos: 'Serviços',
};

export const PRODUTOS: Produto[] = [
  {
    slug: 'dispositivos',
    grupo: 'dispositivos',
    nome: 'Dispositivos',
    titulo: 'O dispositivo certo para cada operação',
    resumo: 'Hub, tag e lacre inteligente de parceiros internacionais. A Sensoriz escolhe, configura e instala.',
    secoes: [], // a página de dispositivos usa lib/hardware.ts
    setores: ['logistica-e-cadeia-fria', 'farmacias-e-clinicas', 'saude', 'ativos-de-alto-valor'],
    perguntas: [
      { pergunta: 'Qual a diferença entre hub e tag?', resposta: 'O hub fala com a nuvem e mede vários parâmetros. A tag é menor, mede temperatura e umidade e envia pelo hub. Juntos, cobrem todos os parâmetros.' },
      { pergunta: 'Quanto dura a bateria?', resposta: 'Depende do modelo. O de longa duração chega a 5 anos.' },
      { pergunta: 'Os dispositivos são fabricados pela Sensoriz?', resposta: 'Não. Vêm de parceiros internacionais. A Sensoriz desenvolve a plataforma CORE.' },
    ],
  },
  {
    slug: 'sensoriz-core',
    grupo: 'plataforma',
    nome: 'Sensoriz CORE',
    titulo: 'Tudo o que importa em um só painel',
    resumo: 'A plataforma da Sensoriz. Mostra cada leitura, avisa quando algo sai do padrão e gera o relatório.',
    secoes: [
      { titulo: 'Tela inicial do seu jeito', texto: 'Monte a tela inicial com o que sua equipe precisa ver primeiro: quantos dispositivos estão ativos, os alertas do dia, o Sensoriz Score e as baterias que pedem atenção.', vitrine: 'painel' },
      { id: 'relatorios', titulo: 'Relatórios e auditoria', texto: 'Relatório por carga ou equipamento, pronto para auditoria. O fiscal vê os últimos 30 dias pelo QR Code, sem senha.' },
      { id: 'integracoes', titulo: 'Integrações', texto: 'Alertas no WhatsApp, e-mail, SMS, Telegram, Google Chat e Microsoft Teams. Dados no ERP e em outros sistemas, no formato definido no projeto.' },
      { titulo: 'Módulos por operação', texto: 'Você usa só os módulos que a sua operação precisa.' },
      { titulo: 'Segurança e LGPD', texto: 'Dados criptografados e com cópia de segurança.' },
    ],
    setores: ['logistica-e-cadeia-fria', 'farmacias-e-clinicas', 'saude', 'ativos-de-alto-valor'],
    argumentos: [
      { titulo: 'Padrões Anvisa', texto: 'Relatórios prontos para RDC 430, 67, 44 e 197.' },
      { titulo: 'Acesso em qualquer lugar', texto: 'No navegador do computador e do celular.' },
      { titulo: 'Sem limite de usuários', texto: 'Toda a equipe usa, sem pagar por pessoa.' },
      { titulo: 'Tudo em um só valor', texto: 'Instalação, configuração, treinamento e plataforma. Sem custo surpresa.' },
    ],
    alertas: {
      titulo: 'Alertar quem tem que ser alertado, no dia a dia e nos horários críticos',
      itens: [
        { titulo: 'O que é uma exceção', texto: 'Temperatura fora da faixa, queda de energia, impacto, porta aberta ou dispositivo sem sinal. Fora isso, silêncio.' },
        { titulo: 'Grupos', texto: 'Cada alerta vai para o grupo certo: qualidade, logística ou responsável técnico.' },
        { titulo: 'Canais', texto: 'WhatsApp, e-mail, SMS, Telegram, Google Chat e Microsoft Teams.' },
        { titulo: 'Grade de horário', texto: 'Quem recebe em horário comercial e quem recebe à noite e no fim de semana.' },
      ],
    },
    perguntas: [
      { pergunta: 'Preciso instalar algum programa?', resposta: 'Não. A CORE abre no navegador do computador e do celular.' },
      { pergunta: 'Quem recebe os alertas?', resposta: 'Cada pessoa escolhe os alertas e o canal.' },
      { pergunta: 'A integração com outros sistemas tem custo extra?', resposta: 'Depende do sistema. Definimos no diagnóstico.' },
    ],
  },
  {
    slug: 'servicos',
    grupo: 'servicos',
    nome: 'Serviços',
    titulo: 'Da instalação ao relatório para o fiscal',
    resumo: 'A Sensoriz instala, acompanha os dispositivos e entrega o registro pronto para a fiscalização.',
    secoes: [
      { id: 'implantacao', titulo: 'Implantação e instalação', texto: 'A Sensoriz instala os dispositivos, configura a CORE e treina sua equipe. Sem fio e sem obra.' },
      { id: 'compliance', titulo: 'Serviço de compliance', texto: 'Registro contínuo, excursões documentadas com início, fim e quem foi avisado, e relatório que ninguém edita. Vale como prova para as normas da Anvisa.' },
      { id: 'suporte', titulo: 'Suporte e gestão dos dispositivos', texto: 'Acompanhamos bateria, sinal e calibração de cada dispositivo. Se um parar de comunicar, a CORE mostra "Sem sinal" e avisa.' },
    ],
    setores: ['logistica-e-cadeia-fria', 'farmacias-e-clinicas', 'saude'],
    perguntas: [
      { pergunta: 'A Sensoriz substitui o responsável técnico?', resposta: 'Não. Ela dá ao responsável técnico o registro e os avisos de que ele precisa.' },
      { pergunta: 'Por quanto tempo os dados ficam guardados?', resposta: 'O prazo é definido em contrato, conforme a norma.' },
    ],
  },
];

export const produtoPorSlug = (slug: string) => PRODUTOS.find((p) => p.slug === slug);
