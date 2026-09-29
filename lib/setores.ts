// Conteúdo das páginas de setor (modelo de 7 blocos). Cada item vira /setores/<id>.
// "normas" só aparece quando existe norma que exige monitoramento para aquele setor.
// Resumos de norma revisados em 29 set 2026 a partir do texto das resoluções e de fontes do setor;
// validar com especialista em regulação antes de publicar.
import type { SetorId } from './site';

export interface Norma {
  nome: string;
  valePara: string; // a quem a norma se aplica
  exige: string[]; // o que ela exige, super resumido
}

export interface Setor {
  id: SetorId;
  nome: string;
  ordem: number;
  resumo: string;
  tituloHero: string;
  subtituloHero: string;
  publico: string;
  dor: { titulo: string; texto: string; custo: string };
  normas: Norma[];
  comoResolve: { ver: string; agir: string; provar: string };
  configuracao: { item: string; detalhe: string }[];
  ambientes: string[];
  perguntas: { pergunta: string; resposta: string }[];
  caseId?: string;
}

export const SETORES: Setor[] = [
  {
    id: 'logistica-e-cadeia-fria',
    nome: 'Logística e Cadeia Fria',
    ordem: 1,
    resumo: 'Alimentos e medicamentos na temperatura certa, do estoque à entrega.',
    tituloHero: 'Sua carga na temperatura certa, do estoque à entrega',
    subtituloHero: 'Monitore alimentos e medicamentos no caminhão, na câmara fria e no estoque. Receba um aviso quando a temperatura sair da faixa.',
    publico: 'Indústrias e distribuidoras de alimentos e medicamentos, produtores de frescos e transportadoras de carga refrigerada.',
    dor: {
      titulo: 'O problema aparece quando a carga já chegou',
      texto: 'Termômetro e datalogger mostram o que aconteceu depois. Aí o congelado já descongelou e a carga virou descarte.',
      custo: 'Uma carga de medicamentos descartada pode custar R$ 300 mil.',
    },
    normas: [
      {
        nome: 'RDC 430/2020 (Anvisa)',
        valePara: 'Distribuição, armazenagem e transporte de medicamentos',
        exige: [
          'Monitorar temperatura e umidade de forma contínua no armazém e no transporte, com instrumentos calibrados',
          'Qualificar termicamente áreas, veículos e embalagens e mapear as rotas',
          'Registrar as leituras, as excursões de temperatura e as ações tomadas',
        ],
      },
      {
        nome: 'RDC 653/2022 (Anvisa)',
        valePara: 'Quem está sujeito à RDC 430',
        exige: [
          'Alterou os prazos da RDC 430: estudos de rota e qualificação térmica até março de 2023',
          'Soluções de controle de temperatura implantadas e qualificadas até março de 2024. Os prazos já venceram',
        ],
      },
      {
        nome: 'RDC 216/2004 (Anvisa)',
        valePara: 'Serviços de alimentação',
        exige: [
          'Conservar alimentos refrigerados a 5 °C ou menos, ou na temperatura indicada pelo fabricante',
          'Verificar a temperatura no recebimento e durante o armazenamento',
        ],
      },
      {
        nome: 'Portaria SVS/MS 326/1997',
        valePara: 'Fabricação, armazenamento e transporte de alimentos',
        exige: [
          'Transportar e armazenar o alimento em condições que evitem a sua deterioração',
          'Manter a temperatura adequada em veículos e câmaras de produtos refrigerados e congelados',
        ],
      },
    ],
    comoResolve: {
      ver: 'Temperatura e umidade de cada carga e câmara, no celular.',
      agir: 'Aviso no WhatsApp quando a temperatura sai da faixa ou o baú é aberto.',
      provar: 'Relatório por carga pronto para o fiscal, sem planilha.',
    },
    configuracao: [
      { item: 'Hub recarregável ou descartável', detalhe: 'Vai no baú ou junto da carga e envia as leituras para a CORE.' },
      { item: 'Tags de temperatura e umidade', detalhe: 'Uma por palete, caixa ou ponto da câmara.' },
      { item: 'Hub na tomada', detalhe: 'Para câmaras e estoques. Avisa também se a energia cair.' },
      { item: 'Lacre inteligente', detalhe: 'Na porta do caminhão. Avisa se o baú for aberto fora do previsto.' },
      { item: 'Sensoriz CORE', detalhe: 'Painel, alertas e relatórios.' },
    ],
    ambientes: ['Caminhão e baú refrigerado', 'Câmara fria e túnel de congelamento', 'Estoque de alimentos frescos', 'Doca de expedição e recebimento'],
    perguntas: [
      { pergunta: 'Qual a diferença entre a Sensoriz e um datalogger?', resposta: 'O datalogger só é lido no destino. A Sensoriz avisa durante a viagem, quando ainda dá para salvar a carga.' },
      { pergunta: 'Serve para alimentos congelados e frescos?', resposta: 'Sim. Cada câmara, baú ou estoque tem a sua faixa: congelados, resfriados e frescos.' },
      { pergunta: 'A Sensoriz atende a RDC 430?', resposta: 'A Sensoriz registra temperatura e umidade o tempo todo e gera o relatório que a RDC 430 pede.' },
      { pergunta: 'Dá para saber se o baú foi aberto no caminho?', resposta: 'Sim. O lacre inteligente e o sensor de luz avisam a equipe na hora.' },
      { pergunta: 'Por onde a equipe recebe os alertas?', resposta: 'Por WhatsApp, e-mail ou SMS. Cada pessoa escolhe o que quer receber.' },
    ],
    caseId: 'goldpao',
  },
  {
    id: 'farmacias-e-clinicas',
    nome: 'Farmácias e Clínicas',
    ordem: 2,
    resumo: 'Geladeiras e salas monitoradas dia e noite, com registro para a vigilância sanitária.',
    tituloHero: 'A sua geladeira avisa antes de o produto perder a validade',
    subtituloHero: 'Temperatura e umidade medidas dia e noite. Se algo sair da faixa ou a energia cair, você é avisado na hora.',
    publico: 'Farmácias de manipulação, drogarias, salas de vacina, clínicas e laboratórios.',
    dor: {
      titulo: 'O problema acontece quando a farmácia está fechada',
      texto: 'Queda de energia de madrugada ou porta mal fechada no fim de semana. A planilha à mão não mostra isso.',
      custo: 'Insumos e vacinas perdidos, e risco de autuação.',
    },
    normas: [
      {
        nome: 'RDC 67/2007 (Anvisa)',
        valePara: 'Somente farmácias de manipulação',
        exige: [
          'Definir, monitorar e registrar a temperatura e a umidade da área de armazenamento',
          'Fazer o mesmo nas salas de manipulação',
          'Manter registros que comprovem a temperatura das matérias-primas que exigem condições especiais',
        ],
      },
      {
        nome: 'RDC 44/2009 (Anvisa)',
        valePara: 'Farmácias e drogarias',
        exige: [
          'Medir e registrar a temperatura do local diariamente, no horário de maior temperatura e umidade do dia',
          'Guardar os medicamentos refrigerados na temperatura indicada na embalagem',
          'Ter procedimento para quando o armazenamento sair das condições adequadas',
        ],
      },
      {
        nome: 'RDC 197/2017 (Anvisa)',
        valePara: 'Serviços de vacinação, inclusive em farmácias e clínicas',
        exige: [
          'Usar equipamento de refrigeração exclusivo para vacinas, regularizado na Anvisa',
          'Registrar todos os dias as temperaturas máxima e mínima de cada equipamento',
          'Garantir a conservação das vacinas mesmo se faltar energia',
        ],
      },
    ],
    comoResolve: {
      ver: 'Cada geladeira e sala no celular.',
      agir: 'Aviso imediato ao responsável técnico, a qualquer hora.',
      provar: 'Máxima e mínima do dia registradas sozinhas. O fiscal consulta pelo QR Code.',
    },
    configuracao: [
      { item: 'Hub na tomada', detalhe: 'Um por unidade. Avisa também se a energia cair.' },
      { item: 'Tags de temperatura e umidade', detalhe: 'Uma por geladeira, freezer ou sala.' },
      { item: 'Sensoriz CORE', detalhe: 'Painel, alertas e relatórios.' },
    ],
    ambientes: ['Geladeira e freezer de insumos e vacinas', 'Sala de armazenamento de matérias-primas', 'Laboratório de manipulação', 'Área de dispensação'],
    perguntas: [
      { pergunta: 'Preciso continuar preenchendo a planilha de temperatura?', resposta: 'Não. O registro é automático, com a máxima e a mínima de cada dia.' },
      { pergunta: 'O que acontece se a energia cair à noite?', resposta: 'O responsável técnico recebe um aviso na hora.' },
      { pergunta: 'Como mostro os registros na visita da vigilância sanitária?', resposta: 'Pelo QR Code na geladeira. Ele mostra os últimos 30 dias, sem senha.' },
      { pergunta: 'Qual norma vale para a minha farmácia?', resposta: 'RDC 67: manipulação. RDC 44: farmácias e drogarias. RDC 197: quem aplica vacinas. Uma farmácia pode seguir mais de uma.' },
      { pergunta: 'A instalação exige obra?', resposta: 'Não. Tudo é sem fio e o hub vai na tomada.' },
    ],
  },
  {
    id: 'saude',
    nome: 'Saúde',
    ordem: 3,
    resumo: 'Equipamentos e kits localizados, e vacinas na temperatura certa.',
    tituloHero: 'Cada equipamento e cada kit no lugar certo, na hora certa',
    subtituloHero: 'Saiba onde está cada equipamento do hospital e acompanhe a temperatura das vacinas.',
    publico: 'Hospitais, laboratórios, engenharia clínica e secretarias de saúde.',
    dor: {
      titulo: 'Equipamento que some e kit que volta sem registro',
      texto: 'Equipamentos circulam sem controle e o hospital aluga de novo o que já tem. Kits voltam sem registro e viram glosa.',
      custo: 'Equipamentos alugados em dobro e glosas que não voltam.',
    },
    normas: [],
    comoResolve: {
      ver: 'Onde está cada equipamento e kit.',
      agir: 'Aviso quando um equipamento sai da área ou a geladeira sai da faixa.',
      provar: 'Histórico de cada ativo para auditoria e convênios.',
    },
    configuracao: [
      { item: 'Tags de localização', detalhe: 'Em equipamentos, leitos e caixas de kits.' },
      { item: 'Hubs', detalhe: 'Um por andar ou setor.' },
      { item: 'Sensoriz CORE', detalhe: 'Mapa de ativos, alertas e relatórios.' },
    ],
    ambientes: ['Centro cirúrgico e central de material', 'Unidades de internação', 'Farmácia hospitalar e laboratório', 'Salas de vacina e postos de saúde'],
    perguntas: [
      { pergunta: 'A Sensoriz localiza equipamentos dentro do hospital?', resposta: 'Sim. A CORE mostra em que setor cada equipamento está.' },
      { pergunta: 'Funciona em áreas com parede blindada ou no subsolo?', resposta: 'Sim. A cobertura é planejada para esses ambientes.' },
      { pergunta: 'Serve para a rede de frio de uma prefeitura?', resposta: 'Sim. Todas as geladeiras dos postos ficam em um só painel.' },
      { pergunta: 'Como começa um projeto em hospital?', resposta: 'Com o diagnóstico gratuito.' },
    ],
  },
  {
    id: 'industria-e-inventario',
    nome: 'Indústria e Inventário',
    ordem: 4,
    resumo: 'Onde está cada equipamento de alto valor e se ele sofreu impacto.',
    tituloHero: 'Saiba onde está e como está cada equipamento',
    subtituloHero: 'Localize equipamentos de alto valor, mesmo em estoques com muito metal. Saiba na hora se algum sofreu impacto ou tombou.',
    publico: 'Indústrias, fabricantes de equipamentos e centros de distribuição.',
    dor: {
      titulo: 'O dano só aparece no cliente',
      texto: 'Achar um equipamento no estoque leva tempo. E a queda no transporte só aparece quando o cliente abre a caixa.',
      custo: 'Equipamento danificado sem responsável e horas perdidas procurando.',
    },
    normas: [],
    comoResolve: {
      ver: 'Onde está cada equipamento e em que estado.',
      agir: 'Aviso quando um equipamento sofre impacto, tomba ou sai da área.',
      provar: 'Laudo de cada impacto, com força, data e local, para o seguro.',
    },
    configuracao: [
      { item: 'Hub no equipamento', detalhe: 'Mede impacto, vibração, posição e localização. Bateria de até 5 anos.' },
      { item: 'Tags de localização', detalhe: 'Em peças e itens de estoque.' },
      { item: 'Sensoriz CORE', detalhe: 'Mapa, alertas de impacto e laudos.' },
    ],
    ambientes: ['Estoque com estruturas metálicas', 'Galpão e centro de distribuição', 'Pátio fabril', 'Transporte e transbordo de equipamentos'],
    perguntas: [
      { pergunta: 'Funciona em estoque com muito metal?', resposta: 'Sim. A cobertura é planejada para estruturas metálicas.' },
      { pergunta: 'Como a Sensoriz mede impacto?', resposta: 'O hub mede a força de cada impacto e registra data, hora e local.' },
      { pergunta: 'Dá para saber se o equipamento tombou?', resposta: 'Sim. A equipe é avisada na hora.' },
      { pergunta: 'O que são zonas de controle?', resposta: 'Áreas desenhadas na CORE. Se um equipamento sair, a equipe é avisada.' },
      { pergunta: 'A Sensoriz se integra ao ERP?', resposta: 'Sim, por integração definida no projeto.' },
    ],
    caseId: 'fabricante-climatizacao',
  },
];

export const setorPorId = (id: string) => SETORES.find((s) => s.id === id);
