// Conteúdo das páginas de setor (modelo de 7 blocos). Cada item vira /solucoes/<id>.
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
  dor: { titulo: string; texto: string; custo: string; custoNota?: string };
  normas: Norma[];
  comoResolve: { ver: string; agir: string; provar: string };
  configuracao: { item: string; detalhe: string }[];
  ambientes: string[];
  perguntas: { pergunta: string; resposta: string }[];
  caseId?: string;
  fotos?: { src: string; alt: string; largura: number; altura: number }[]; // fotos reais da instalação
  visual?: 'rota' | 'geladeira'; // visual vivo ao lado do título (Logística: rota; Farmácias: geladeira na madrugada)
  // Quanto vale a carga em cada tipo de veículo (Logística). Dados do Rodrigo, out/2026: fonte a confirmar.
  valorCarga?: { titulo: string; texto: string; linhas: { veiculo: string; paletes: string; operacao: string; valor: string }[] }; // visual vivo ao lado do título (Logística: carga percorrendo a rota)
}

export const SETORES: Setor[] = [
  {
    id: 'logistica-e-cadeia-fria',
    nome: 'Logística e Cadeia Fria',
    ordem: 1,
    visual: 'rota',
    resumo: 'Alimentos e medicamentos na temperatura certa, do estoque à entrega.',
    tituloHero: 'Sua carga na temperatura certa, do estoque à entrega',
    subtituloHero: 'Monitore alimentos e medicamentos no caminhão, na câmara fria e no estoque. Receba um aviso quando a temperatura sair da faixa.',
    publico: 'Indústrias e distribuidoras de alimentos e medicamentos, produtores de frescos e transportadoras de carga refrigerada.',
    dor: {
      titulo: 'O cliente recusa a entrega',
      texto: 'Quando a carga chega fora da temperatura ou avariada, o cliente recusa. Vem a reentrega, o descarte e a marca arranhada. E o termômetro só mostra o que aconteceu quando já é tarde.',
      custo: 'Uma carga de medicamentos descartada pode custar mais de R$ 300 mil.',
    },
    valorCarga: {
      titulo: 'Quanto vale o que está no seu baú',
      texto: 'Em medicamentos refrigerados, um veículo pequeno pode levar mais valor que uma carreta de carga seca. A assinatura mensal de um hub custa menos de 0,05% do valor de uma carga em um caminhão 3/4.',
      linhas: [
        { veiculo: 'Utilitário leve', paletes: '1 a 2', operacao: 'Última milha, clínicas e hospitais', valor: 'R$ 150 mil a R$ 600 mil' },
        { veiculo: 'VUC', paletes: '4 a 6', operacao: 'Distribuição na região metropolitana', valor: 'R$ 500 mil a R$ 1,8 milhão' },
        { veiculo: '3/4', paletes: '6 a 8', operacao: 'Distribuição regional', valor: 'R$ 1,2 milhão a R$ 3,5 milhões' },
        { veiculo: 'Toco', paletes: '10 a 12', operacao: 'Transferência entre centros de distribuição', valor: 'R$ 2,5 milhões a R$ 6 milhões' },
        { veiculo: 'Truck', paletes: '14 a 16', operacao: 'Longa distância e grandes redes', valor: 'R$ 4,5 milhões a R$ 12 milhões' },
        { veiculo: 'Carreta frigorífica', paletes: '26 a 30', operacao: 'Da fábrica para o armazém', valor: 'R$ 8 milhões a R$ 25 milhões' },
      ],
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
        nome: 'Portaria CVS 3/2026 (São Paulo)',
        valePara: 'Comércio de alimentos e serviços de alimentação no estado de SP, incluindo o transporte. Substitui a CVS 5/2013 e vale a partir de 1º de fevereiro de 2027',
        exige: [
          'Registrar a temperatura dos equipamentos pelo menos 2 vezes ao dia',
          'Conferir e registrar a temperatura no recebimento. Congelados chegam a −12 °C ou menos',
          'Descartar o alimento que saiu da temperatura exigida, sem revalidar a validade',
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
    fotos: [
      { src: '/fotos/goldpao/instalacao-2.jpg', alt: 'Técnico da Sensoriz fixando o hub na parede do baú refrigerado', largura: 960, altura: 1280 },
      { src: '/fotos/goldpao/hub-bau-porta.jpg', alt: 'Hub instalado no baú, perto da porta, sem ligação na elétrica do caminhão', largura: 1280, altura: 960 },
      { src: '/fotos/goldpao/hub-frente.jpg', alt: 'Hub da Sensoriz instalado na parede interna do baú', largura: 960, altura: 1280 },
    ],
  },
  {
    id: 'farmacias-e-clinicas',
    nome: 'Farmácias e Clínicas',
    ordem: 2,
    visual: 'geladeira',
    resumo: 'Geladeiras e salas monitoradas dia e noite, com registro para a vigilância sanitária.',
    tituloHero: 'A sua geladeira avisa antes de o produto perder a integridade',
    subtituloHero: 'Temperatura e umidade medidas dia e noite. Se algo sair da faixa ou a energia cair, você é avisado na hora.',
    publico: 'Farmácias de manipulação, drogarias, salas de vacina, clínicas e laboratórios.',
    dor: {
      titulo: 'As grandes variações e quedas de energia acontecem quando a farmácia está fechada',
      texto: 'De madrugada ou no fim de semana, ninguém vê. A planilha à mão também não.',
      // Estimativa Sensoriz (out/2026): câmara de 280 L, 60% ocupada, caixas de ~0,5 L (336 caixas),
      // R$ 1.078 (Ozempic/Wegovy) a R$ 2.411 (Mounjaro 4 canetas) por caixa = R$ 362 mil a R$ 810 mil.
      // Volume da caixa a conferir medindo uma caixa real.
      custo: 'Uma geladeira de 280 litros cheia de canetas emagrecedoras pode guardar mais de R$ 350 mil em produto.',
      custoNota: 'Estimativa Sensoriz: câmara de 280 L com 60% de ocupação e preços de farmácia de 2026.',
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
      { item: 'Hub ou tag no baú do motoboy', detalhe: 'Para entregas de refrigerados. A temperatura fica registrada até a casa do cliente.' },
      { item: 'Sensoriz CORE', detalhe: 'Painel, alertas e relatórios.' },
    ],
    ambientes: ['Geladeira e freezer de insumos e vacinas', 'Sala de armazenamento de matérias-primas', 'Laboratório de manipulação', 'Área de dispensação', 'Baú de entrega'],
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
    tituloHero: 'Monitoramento contínuo e evidência contra glosas',
    subtituloHero: 'Saiba onde cada ativo e insumo crítico está no seu hospital, com histórico que comprova o uso para o convênio.',
    publico: 'Hospitais, laboratórios, engenharia clínica e secretarias de saúde.',
    dor: {
      titulo: 'Insumo usado sem registro vira glosa',
      texto: 'Kits e insumos voltam sem registro de consumo e o convênio recusa a cobrança. Enquanto isso, a equipe perde tempo procurando o equipamento de que precisa.',
      custo: 'Evidência imutável para comprovar o uso a terceiros, como o convênio.',
    },
    normas: [],
    comoResolve: {
      ver: 'Onde está cada equipamento e kit.',
      agir: 'Aviso quando um equipamento sai da área ou a geladeira sai da faixa.',
      provar: 'Histórico imutável de cada ativo e kit, para auditoria e convênio.',
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
    id: 'ativos-de-alto-valor',
    nome: 'Ativos de Alto Valor',
    ordem: 4,
    resumo: 'Integridade e localização de equipamentos de alto valor, parados ou em movimento.',
    tituloHero: 'Garantia de integridade para os seus ativos em toda a cadeia de suprimentos',
    subtituloHero: 'Identifique cada ocorrência: o que aconteceu, onde, em que condição e em que etapa. Com o ativo parado no estoque ou em movimento.',
    publico: 'Fabricantes e distribuidores de eletrônicos, data centers e equipamentos industriais e de climatização de alto valor.',
    dor: {
      titulo: 'O dano só aparece quando o cliente abre a caixa',
      texto: 'Queda no transbordo, manuseio errado ou equipamento tombado. Sem registro, ninguém sabe onde aconteceu nem quem responde.',
      custo: 'Equipamento perdido sem responsável e seguro sem laudo.',
    },
    normas: [],
    comoResolve: {
      ver: 'Onde está cada ativo e em que condição.',
      agir: 'Aviso quando o ativo sofre impacto, tomba ou sai da área.',
      provar: 'Laudo de cada ocorrência, com força, hora, local e etapa.',
    },
    configuracao: [
      { item: 'Hub no equipamento', detalhe: 'Mede impacto, vibração, orientação e localização. Bateria de até 5 anos.' },
      { item: 'Lacre inteligente', detalhe: 'Na porta do caminhão. Avisa se a carga for aberta fora do destino.' },
      { item: 'Sensoriz CORE', detalhe: 'Mapa, alertas de ocorrência e laudos.' },
    ],
    ambientes: ['Estoque e centro de distribuição', 'Data center', 'Transporte e transbordo', 'Instalação no cliente'],
    perguntas: [
      { pergunta: 'Como a Sensoriz mede impacto?', resposta: 'O hub mede a força de cada impacto e registra data, hora e local.' },
      { pergunta: 'Dá para saber se o equipamento tombou?', resposta: 'Sim. O hub mede a orientação nos eixos X, Y e Z e avisa a equipe na hora.' },
      { pergunta: 'Funciona com o equipamento parado no estoque e em transporte?', resposta: 'Sim. O mesmo hub acompanha o ativo no estoque, na viagem e na instalação.' },
      { pergunta: 'O laudo serve para o seguro?', resposta: 'Sim. Cada ocorrência fica registrada com força, data, hora e local, e ninguém altera o histórico.' },
      { pergunta: 'O que são zonas de controle?', resposta: 'Áreas desenhadas na CORE. Se um ativo sair, a equipe é avisada.' },
    ],
    caseId: 'fabricante-climatizacao',
  },
];

export const setorPorId = (id: string) => SETORES.find((s) => s.id === id);
