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
    resumo: 'Temperatura e umidade de alimentos e medicamentos em tempo real, no caminhão, na câmara e no estoque, com o registro que a norma pede.',
    tituloHero: 'Alimentos e medicamentos na temperatura certa, do estoque à entrega',
    subtituloHero:
      'Congelados, refrigerados, hortifrútis, cogumelos e medicamentos monitorados em tempo real no caminhão, na câmara fria e no estoque. A equipe só é chamada quando algo sai da faixa, e o registro para a fiscalização sai pronto.',
    publico: 'Indústrias e distribuidoras de alimentos, produtores de alimentos frescos, distribuidoras de medicamentos, operadores logísticos e transportadoras de carga refrigerada.',
    dor: {
      titulo: 'A excursão de temperatura só aparece quando a carga já chegou',
      texto:
        'Com termômetro lido no fim do turno ou datalogger baixado no destino, o problema é descoberto depois que aconteceu. Um congelado que descongela na rota, uma câmara que perde a umidade à noite ou um baú aberto fora do previsto viram descarte, devolução ou disputa com a transportadora.',
      custo: 'Uma única carga de medicamentos descartada pode custar R$ 300 mil. Em alimentos, a perda vem somada à devolução e ao risco para o consumidor.',
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
      ver: 'Temperatura e umidade de cada volume, câmara e estoque em tempo real, com a hora e o estado de cada leitura.',
      agir: 'Aviso por WhatsApp, e-mail ou SMS quando a carga sai da faixa ou o baú é aberto fora do previsto, a tempo de corrigir a rota ou a câmara.',
      provar: 'Relatório imutável por carga e por ambiente, e QR Code que mostra os últimos 30 dias ao fiscal sem dar acesso ao sistema.',
    },
    configuracao: [
      { item: 'Hub recarregável ou descartável', detalhe: 'Vai no baú ou junto da carga. Mede temperatura, umidade, luminosidade e localização e envia tudo para a nuvem.' },
      { item: 'Tags de temperatura e umidade', detalhe: 'Uma por palete, caixa ou ponto da câmara. Enviam as leituras pelo hub.' },
      { item: 'Hub na tomada', detalhe: 'Para câmaras frias e estoques fixos. Avisa também quando a energia cai.' },
      { item: 'Lacre inteligente', detalhe: 'Na porta do caminhão ou do baú. Registra e avisa qualquer abertura fora do previsto.' },
      { item: 'Sensoriz CORE', detalhe: 'Painel, alertas por exceção e relatórios por carga e por ambiente.' },
    ],
    ambientes: ['Caminhão e baú refrigerado', 'Câmara fria e túnel de congelamento', 'Estoque de alimentos frescos', 'Doca de expedição e recebimento'],
    perguntas: [
      { pergunta: 'Qual a diferença entre a Sensoriz e um datalogger?', resposta: 'O datalogger guarda os dados e só é lido depois, no destino. A Sensoriz envia cada leitura em tempo real e avisa durante o trajeto, quando ainda dá para salvar a carga.' },
      { pergunta: 'Serve para alimentos congelados e frescos?', resposta: 'Sim. Cada câmara, baú ou estoque tem a sua faixa de temperatura e umidade: congelados, resfriados, hortifrútis e produtos frescos como cogumelos.' },
      { pergunta: 'A Sensoriz atende a RDC 430?', resposta: 'A Sensoriz faz o monitoramento contínuo de temperatura e umidade e gera o registro das leituras e das excursões por carga e por ambiente, que servem de evidência nas auditorias baseadas na RDC 430.' },
      { pergunta: 'Dá para saber se o baú foi aberto no caminho?', resposta: 'Sim. O lacre inteligente registra a abertura da porta, e o hub mede a entrada de luz na carga. A equipe é avisada na hora.' },
      { pergunta: 'Por onde a equipe recebe os alertas?', resposta: 'Por WhatsApp, e-mail, SMS, Telegram ou Google Chat, escolhidos por pessoa e por tipo de alerta. O aviso só sai quando algo sai do padrão.' },
    ],
    caseId: 'goldpao',
  },
  {
    id: 'farmacias-e-clinicas',
    nome: 'Farmácias e Clínicas',
    ordem: 2,
    resumo: 'Geladeiras, salas de armazenamento e laboratórios de farmácias de manipulação, drogarias e salas de vacina monitorados o dia inteiro, com registro para a vigilância sanitária.',
    tituloHero: 'A sua geladeira avisa antes de o produto perder a validade',
    subtituloHero: 'Temperatura e umidade de geladeiras, salas e laboratórios medidas o dia inteiro, inclusive à noite e no fim de semana. Quando algo sai da faixa ou a energia cai, o responsável técnico é avisado na hora.',
    publico: 'Farmácias de manipulação, drogarias, farmácias e clínicas com sala de vacina, clínicas de estética e laboratórios.',
    dor: {
      titulo: 'O problema acontece quando a farmácia está fechada',
      texto: 'Queda de energia na madrugada, porta de geladeira mal fechada, ar-condicionado desligado no fim de semana. A planilha de temperatura preenchida à mão não mostra o que aconteceu entre uma anotação e outra.',
      custo: 'Insumos, fórmulas e vacinas perdidos, além do risco de autuação na visita da vigilância sanitária.',
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
      ver: 'Temperatura e umidade de cada geladeira e sala no celular, com a hora da última leitura.',
      agir: 'Aviso imediato ao responsável técnico quando a leitura sai da faixa ou a energia cai, a qualquer hora.',
      provar: 'Máxima e mínima de cada dia registradas sem anotação manual, e QR Code na porta da geladeira para o fiscal consultar os últimos 30 dias.',
    },
    configuracao: [
      { item: 'Hub na tomada', detalhe: 'Um por unidade. Mede o ambiente, avisa quando a energia cai e recebe as leituras das tags.' },
      { item: 'Tags de temperatura e umidade', detalhe: 'Uma por geladeira, freezer, sala de armazenamento ou laboratório.' },
      { item: 'Sensoriz CORE', detalhe: 'Painel no celular e no computador, alertas e relatórios por equipamento.' },
    ],
    ambientes: ['Geladeira e freezer de insumos e vacinas', 'Sala de armazenamento de matérias-primas', 'Laboratório de manipulação', 'Área de dispensação'],
    perguntas: [
      { pergunta: 'Preciso continuar preenchendo a planilha de temperatura?', resposta: 'Não. A Sensoriz registra a temperatura e a umidade automaticamente, de forma contínua, com a máxima e a mínima de cada dia.' },
      { pergunta: 'O que acontece se a energia cair à noite?', resposta: 'O hub ligado na tomada detecta a queda e o responsável técnico recebe um aviso na hora, pelo canal que escolher.' },
      { pergunta: 'Como mostro os registros na visita da vigilância sanitária?', resposta: 'Cada equipamento pode ter um QR Code que abre os registros dos últimos 30 dias, sem senha e sem expor o restante do sistema.' },
      { pergunta: 'Qual norma vale para a minha farmácia?', resposta: 'A RDC 67 vale só para farmácias de manipulação. A RDC 44 vale para farmácias e drogarias. A RDC 197 vale para quem aplica vacinas. Uma mesma farmácia pode estar sujeita a mais de uma.' },
      { pergunta: 'A instalação exige obra?', resposta: 'Não. As tags são sem fio e o hub vai na tomada.' },
    ],
  },
  {
    id: 'saude',
    nome: 'Saúde',
    ordem: 3,
    resumo: 'Localização de equipamentos e kits cirúrgicos e monitoramento térmico de vacinas e imunobiológicos em hospitais e redes públicas.',
    tituloHero: 'Cada equipamento e cada kit no lugar certo, na hora certa',
    subtituloHero: 'Localize equipamentos móveis e kits cirúrgicos dentro do hospital e acompanhe a temperatura de vacinas e imunobiológicos, com alertas por exceção e registro para auditoria.',
    publico: 'Hospitais, laboratórios, engenharia clínica, empresas de locação de equipamentos e secretarias de saúde.',
    dor: {
      titulo: 'Equipamento que some e kit que volta sem registro',
      texto: 'Equipamentos móveis circulam entre setores sem controle, e o hospital compra ou aluga de novo o que já tem. Kits cirúrgicos voltam sem o registro do que foi consumido, e a conta vira glosa do convênio.',
      custo: 'Equipamentos parados, perdidos ou alugados em duplicidade, e glosas que não se recuperam.',
    },
    normas: [],
    comoResolve: {
      ver: 'Localização de cada equipamento e kit por setor, e a temperatura de cada geladeira de vacina.',
      agir: 'Aviso quando um equipamento sai da área permitida, quando um kit fica parado ou quando a geladeira sai da faixa ou perde energia.',
      provar: 'Histórico de movimentação por ativo e relatório térmico por equipamento para auditoria e convênios.',
    },
    configuracao: [
      { item: 'Tags de localização', detalhe: 'Presas a equipamentos, leitos e caixas de kits cirúrgicos. Medem também temperatura e umidade.' },
      { item: 'Hubs', detalhe: 'Distribuídos por andar e setor. Recebem as leituras das tags e enviam para a nuvem.' },
      { item: 'Sensoriz CORE', detalhe: 'Mapa de ativos, alertas e relatórios para engenharia clínica e qualidade.' },
    ],
    ambientes: ['Centro cirúrgico e central de material', 'Unidades de internação', 'Farmácia hospitalar e laboratório', 'Salas de vacina e postos de saúde'],
    perguntas: [
      { pergunta: 'A Sensoriz localiza equipamentos dentro do hospital?', resposta: 'Sim. Cada equipamento recebe uma tag e a Sensoriz CORE mostra em que setor ele está e por onde passou.' },
      { pergunta: 'Funciona em áreas com parede blindada ou no subsolo?', resposta: 'Sim. A cobertura é planejada com hubs por andar e setor, incluindo áreas onde a comunicação costuma falhar.' },
      { pergunta: 'Serve para a rede de frio de uma prefeitura?', resposta: 'Sim. As geladeiras de vacinas dos postos de saúde são monitoradas de forma centralizada, com alerta de temperatura e de queda de energia.' },
      { pergunta: 'Como começa um projeto em hospital?', resposta: 'Com o diagnóstico gratuito, que mapeia os setores, os ativos prioritários e a cobertura necessária.' },
    ],
  },
  {
    id: 'industria-e-inventario',
    nome: 'Indústria e Inventário',
    ordem: 4,
    resumo: 'Localização e integridade de equipamentos de alto valor em estoques complexos, com muito metal: onde está, se sofreu impacto, se tombou.',
    tituloHero: 'Saiba onde está e em que estado está cada equipamento de alto valor',
    subtituloHero: 'Localização, impacto, vibração e orientação de equipamentos e peças de alto valor em estoques complexos, galpões e pátios, inclusive entre estruturas metálicas. A equipe é avisada quando um ativo se move, sofre impacto ou tomba.',
    publico: 'Indústrias, fabricantes de equipamentos, centros de distribuição e operações com estoques complexos e ativos de alto valor.',
    dor: {
      titulo: 'O equipamento chega danificado e ninguém sabe onde foi',
      texto: 'Em estoques com estruturas metálicas e muitos itens parecidos, localizar um equipamento leva tempo e a contagem manual erra. No manuseio e no transporte, uma queda ou um tombamento só aparece quando o equipamento é aberto no cliente, e a responsabilidade vira discussão.',
      custo: 'Equipamentos danificados sem responsável definido, horas procurando ativos e compras em duplicidade.',
    },
    normas: [],
    comoResolve: {
      ver: 'Onde está cada equipamento e em que estado: impacto, vibração, orientação, temperatura e umidade.',
      agir: 'Aviso quando um ativo sofre impacto acima do limite, tomba, sai da zona permitida ou fica parado além do previsto.',
      provar: 'Laudo de cada impacto com força em G, data, hora e local, para responsabilização contratual e seguro, e histórico de movimentação por ativo.',
    },
    configuracao: [
      { item: 'Hub no equipamento', detalhe: 'Mede impacto, vibração e orientação nos eixos X, Y e Z, além de localização e ambiente. Versão de bateria de até 5 anos para ativos de longa permanência.' },
      { item: 'Tags de localização', detalhe: 'Em peças e itens de estoque. Enviam localização, temperatura e umidade pelo hub mais próximo.' },
      { item: 'Sensoriz CORE', detalhe: 'Mapa de ativos, zonas de controle, alertas de impacto e laudos.' },
    ],
    ambientes: ['Estoque com estruturas metálicas', 'Galpão e centro de distribuição', 'Pátio fabril', 'Transporte e transbordo de equipamentos'],
    perguntas: [
      { pergunta: 'Funciona em estoque com muito metal?', resposta: 'Sim. A cobertura é planejada para ambientes com estruturas metálicas, onde a comunicação sem fio costuma falhar.' },
      { pergunta: 'Como a Sensoriz mede impacto?', resposta: 'O hub mede a força de cada impacto em G e a orientação nos eixos X, Y e Z. Cada evento acima do limite fica registrado com data, hora e local.' },
      { pergunta: 'Dá para saber se o equipamento tombou?', resposta: 'Sim. A mudança de orientação é registrada e gera aviso para a equipe responsável.' },
      { pergunta: 'O que são zonas de controle?', resposta: 'Áreas desenhadas na plataforma. Quando um ativo sai da zona permitida, a equipe responsável é avisada.' },
      { pergunta: 'A Sensoriz se integra ao ERP?', resposta: 'Os dados podem ser enviados a outros sistemas por integração. O formato é definido no projeto.' },
    ],
    caseId: 'fabricante-climatizacao',
  },
];

export const setorPorId = (id: string) => SETORES.find((s) => s.id === id);
