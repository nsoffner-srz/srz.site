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
  // Esquema de custódia (Ativos de Alto Valor): com quem está a carga em cada etapa e o que cada tecnologia cobre.
  custodia?: { titulo: string; texto: string; etapas: { nome: string; guarda: string; caminhao: boolean; hub: 'sim' | 'validar' }[]; nota: string };
  limites?: { titulo: string; texto: string; itens: string[] }; // o que precisa ser testado em cada rota
  ocultarCase?: boolean; // case aguardando aprovação do cliente
  visual?: 'rota' | 'geladeira'; // visual vivo ao lado do título (Logística: rota; Farmácias: geladeira na madrugada)
  // Capacidade em paletes por tipo de veículo (Logística). Só dados verificados (out/2026).
  valorCarga?: { titulo: string; texto: string; linhas: { veiculo: string; paletes: string; operacao: string }[] }; // visual vivo ao lado do título (Logística: carga percorrendo a rota)
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
    // Out/2026: valores por veículo e cortes de PGR enviados pelo Rodrigo ficaram de fora (sem documento que
    // os comprove). Fica só o que passou no fact check: capacidade em paletes PBR, conta feita pela medida do baú.
    valorCarga: {
      titulo: 'Quantos paletes cabem no seu baú',
      texto: 'O valor de uma carga é o número de paletes vezes o valor de cada palete. Em medicamentos, o preço de cada produto está na tabela oficial da CMED (Anvisa). No diagnóstico, fazemos essa conta com a sua frota.',
      linhas: [
        { veiculo: 'Utilitário leve', paletes: '1 a 2', operacao: 'Última milha, clínicas e hospitais' },
        { veiculo: 'VUC', paletes: '4 a 6', operacao: 'Distribuição na região metropolitana' },
        { veiculo: '3/4', paletes: '6 a 8', operacao: 'Distribuição regional' },
        { veiculo: 'Toco', paletes: '10 a 12', operacao: 'Transferência entre centros de distribuição' },
        { veiculo: 'Truck', paletes: '14 a 16', operacao: 'Longa distância e grandes redes' },
        { veiculo: 'Carreta frigorífica', paletes: '26 a 28', operacao: 'Da fábrica para o armazém' },
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
        nome: 'Lei 14.599/2023',
        valePara: 'Transportadoras de carga',
        exige: [
          'Seguros RCTR-C e RC-DC obrigatórios, numa só apólice',
          'As duas coberturas ligadas a um Plano de Gerenciamento de Risco (PGR) combinado entre a transportadora e a seguradora',
          'O embarcador pode pedir medidas de segurança além do PGR, arcando com o custo',
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
    // Out/2026: foco em data centers (expansão e construção no Brasil). Brief em CLAUDE.md e no projeto.
    // Não citar incidentes, clientes sem autorização, parceiros de hardware nem preços.
    // Limites do HGR4 ditos na página; voo e terminal dependem de teste por rota (confirmar com o Leonardo).
    nome: 'Ativos de Alto Valor',
    ordem: 4,
    resumo: 'Equipamentos de data center acompanhados do embarque à obra, com registro de cada etapa.',
    tituloHero: 'Monitoramento para data centers e cadeias de ativos de alto valor',
    subtituloHero: 'Saiba onde está cada pallet e com quem, do embarque à obra.',
    publico: 'Construtoras e operadoras de data centers, integradores e distribuidores de servidores, equipamentos de rede, baterias e sistemas de energia e refrigeração.',
    dor: {
      titulo: 'O equipamento atrasa ou chega avariado, e ninguém sabe em que etapa',
      texto: 'Entre a origem e a obra, a carga passa por várias mãos. O rastreador do caminhão mostra o caminhão, não o pallet, e só cobre a estrada. Quando a caixa chega danificada ou não chega, falta registro para saber onde aconteceu e com quem estava.',
      custo: 'Cronograma da obra parado e prejuízo sem responsável definido.',
    },
    custodia: {
      titulo: 'Do embarque à obra, com quem está a carga',
      texto: 'O hub vai no pallet e acompanha cada etapa. O rastreador do caminhão só enxerga a estrada.',
      etapas: [
        { nome: 'Embarque na origem', guarda: 'Exportador e agente de carga', caminhao: false, hub: 'sim' },
        { nome: 'Voo', guarda: 'Companhia aérea', caminhao: false, hub: 'validar' },
        { nome: 'Terminal e desembaraço', guarda: 'Terminal de cargas', caminhao: false, hub: 'validar' },
        { nome: 'Estrada', guarda: 'Transportadora', caminhao: true, hub: 'sim' },
        { nome: 'Chegada ao data center', guarda: 'Sua equipe e a obra', caminhao: false, hub: 'sim' },
      ],
      nota: 'Quem responde por cada etapa depende do contrato e da apólice. Validamos com o seu despachante e a sua seguradora.',
    },
    normas: [],
    comoResolve: {
      ver: 'Onde está cada pallet, em que etapa e em que condição.',
      agir: 'Aviso quando o pallet fica parado tempo demais, é aberto, tomba ou sofre impacto. Fora isso, silêncio.',
      provar: 'Registro de cada ocorrência com hora, local e etapa, que ninguém altera. Serve para o contrato e para o seguro.',
    },
    configuracao: [
      { item: 'Hub recarregável no pallet', detalhe: 'Localização por GPS, rede celular e Wi-Fi. Mede luz, movimento, impacto, queda e temperatura. Cerca de 40 dias de bateria por viagem e uso aprovado em 46 companhias aéreas.' },
      { item: 'Tags nas caixas', detalhe: 'Temperatura e umidade em cada caixa. Até 1.000 tags por hub e bateria de cerca de 5 anos.' },
      { item: 'Lacre inteligente', detalhe: 'Na porta do caminhão. Avisa se a carga for aberta antes da obra.' },
      { item: 'Sensoriz CORE', detalhe: 'Mapa da viagem, alertas por exceção e o histórico de cada pallet.' },
    ],
    ambientes: ['Embarque e voo', 'Terminal de cargas', 'Transporte rodoviário', 'Canteiro de obra e data center'],
    limites: {
      titulo: 'O que testamos na sua rota antes de começar',
      texto: 'Preferimos dizer os limites antes. Cada rota passa por um teste.',
      itens: [
        'O hub informa a posição em intervalos: a cada 1 hora parado e a cada 15 minutos em movimento. Não é um ponto contínuo no mapa.',
        'O sinal dentro de cada terminal alfandegado e a autorização de cada terminal são testados na sua rota.',
        'Os documentos e a responsabilidade de cada etapa são validados com o seu despachante e a sua seguradora.',
      ],
    },
    perguntas: [
      { pergunta: 'Qual a diferença para o rastreador do caminhão?', resposta: 'O rastreador fica no caminhão e só cobre a estrada. O hub da Sensoriz vai no pallet e acompanha a carga em todas as etapas.' },
      { pergunta: 'A Sensoriz mostra a posição em tempo real?', resposta: 'O hub informa a posição em intervalos: a cada 1 hora parado e a cada 15 minutos em movimento. Impactos, quedas e aberturas geram aviso na hora.' },
      { pergunta: 'Funciona no voo e no terminal de cargas?', resposta: 'O hub é aprovado para uso em 46 companhias aéreas. O sinal em cada terminal é testado na sua rota antes de começar.' },
      { pergunta: 'O registro serve para o seguro?', resposta: 'Cada ocorrência fica registrada com hora, local e etapa, e ninguém altera o histórico. Validamos o formato com a sua seguradora.' },
      { pergunta: 'Dá para saber se o equipamento tombou ou sofreu impacto?', resposta: 'Sim. O hub mede movimento, impacto e queda e avisa a equipe na hora.' },
    ],
    caseId: 'fabricante-climatizacao',
    ocultarCase: true, // aguardando aprovação do cliente (out/2026)
  },
];

export const setorPorId = (id: string) => SETORES.find((s) => s.id === id);
