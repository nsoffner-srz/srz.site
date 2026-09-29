// Conteúdo das páginas de solução. Cada item vira /solucoes/<slug>.
export interface Solucao {
  slug: string;
  nome: string;
  titulo: string;
  resumo: string;
  blocos: { titulo: string; texto: string }[];
  setores: string[];
  perguntas: { pergunta: string; resposta: string }[];
}

export const SOLUCOES_DETALHE: Solucao[] = [
  {
    slug: 'sensoriz-core',
    nome: 'Sensoriz CORE',
    titulo: 'A plataforma que mostra, avisa e prova',
    resumo: 'A Sensoriz CORE reúne as leituras de todos os sensores, avisa só na exceção e gera os relatórios de conformidade.',
    blocos: [
      { titulo: 'Painel do seu jeito', texto: 'Tela inicial montada por módulos, com os indicadores que a sua equipe precisa ver primeiro, no celular e no computador.' },
      { titulo: 'Gestão por exceção', texto: 'A plataforma trabalha o tempo todo em segundo plano e só chama a equipe quando uma leitura sai do padrão, por WhatsApp, e-mail, SMS, Telegram ou Google Chat.' },
      { titulo: 'Relatórios em poucos cliques', texto: 'Histórico por ativo, por ambiente e por carga, com registros imutáveis para auditoria.' },
      { titulo: 'QR Code para fiscalização', texto: 'O fiscal consulta os últimos 30 dias de um equipamento pelo QR Code, sem senha e sem acesso ao resto do sistema.' },
      { titulo: 'Módulos por operação', texto: 'Cadeia fria, inventário e pátio são habilitados conforme a necessidade de cada cliente.' },
      { titulo: 'Segurança e LGPD', texto: 'Dados criptografados, backups em nuvem e termos de uso com aceite na conta.' },
    ],
    setores: ['logistica-e-cadeia-fria', 'farmacias-e-clinicas', 'saude', 'industria-e-inventario'],
    perguntas: [
      { pergunta: 'Preciso instalar algum programa?', resposta: 'Não. A Sensoriz CORE funciona no navegador, no computador e no celular.' },
      { pergunta: 'Quem recebe os alertas?', resposta: 'Cada pessoa escolhe os alertas e os canais que recebe, conforme a sua função na operação.' },
    ],
  },
  {
    slug: 'monitoramento-ambiental',
    nome: 'Monitoramento ambiental',
    titulo: 'Temperatura e umidade de qualquer ambiente, o dia inteiro',
    resumo: 'Geladeiras, freezers, salas de armazenamento, câmaras frias e laboratórios monitorados de forma contínua, em qualquer setor.',
    blocos: [
      { titulo: 'Onde se aplica', texto: 'Geladeiras e freezers de vacinas e insumos, salas de armazenamento, câmaras frias, laboratórios, farmácias e almoxarifados.' },
      { titulo: 'O que é medido', texto: 'Temperatura e umidade de cada ambiente, com a faixa permitida definida por equipamento.' },
      { titulo: 'Quando avisa', texto: 'Quando a leitura sai da faixa, quando o sensor para de comunicar e quando a energia cai.' },
      { titulo: 'O que substitui', texto: 'A planilha preenchida à mão e o termômetro lido duas vezes por dia, que não mostram o que acontece à noite e no fim de semana.' },
    ],
    setores: ['farmacias-e-clinicas', 'saude', 'logistica-e-cadeia-fria', 'industria-e-inventario'],
    perguntas: [
      { pergunta: 'Posso definir uma faixa diferente para cada equipamento?', resposta: 'Sim. Cada geladeira, sala ou câmara tem a sua faixa de temperatura e umidade.' },
      { pergunta: 'O que acontece se o sensor parar de comunicar?', resposta: 'A plataforma mostra o estado "Sem sinal" e avisa a equipe, para que a falta de dado nunca seja confundida com leitura normal.' },
    ],
  },
  {
    slug: 'dispositivos',
    nome: 'Dispositivos',
    titulo: 'Sensores que funcionam onde outros não funcionam',
    resumo: 'Tags ativas de longa duração e hubs de longo alcance, projetados para câmara fria, subsolo, hospital e carga em trânsito.',
    blocos: [
      { titulo: 'Tags ativas', texto: 'Medem temperatura, umidade, impacto ou presença e enviam as leituras sozinhas. Bateria de longa duração.' },
      { titulo: 'Hubs de longo alcance', texto: 'Recebem as leituras das tags a até 80 m e enviam para a Sensoriz CORE.' },
      { titulo: 'Sensor de impacto em 3 eixos', texto: 'Mede a força em G de quedas e batidas e registra quando e onde aconteceram.' },
      { titulo: 'Tecnologia própria', texto: 'Hardware e plataforma desenvolvidos pela Sensoriz, com time técnico que adapta a solução à operação.' },
    ],
    setores: ['logistica-e-cadeia-fria', 'saude', 'industria-e-inventario'],
    perguntas: [
      { pergunta: 'Qual a duração da bateria das tags?', resposta: 'Depende do intervalo de leitura configurado. As tags são de longa duração, sem troca frequente.' },
      { pergunta: 'Os dispositivos são calibrados?', resposta: 'Especificações e certificados de calibração são apresentados no diagnóstico.' },
    ],
  },
  {
    slug: 'servico-de-compliance',
    nome: 'Serviço de compliance',
    titulo: 'A prova pronta quando o auditor chegar',
    resumo: 'Registros contínuos, relatórios imutáveis e acesso de fiscalização por QR Code para normas como a RDC 430, a RDC 653 e a RDC 67.',
    blocos: [
      { titulo: 'Registro contínuo', texto: 'Cada leitura fica guardada com data, hora, unidade e estado, sem anotação manual.' },
      { titulo: 'Relatório imutável', texto: 'O histórico não pode ser editado depois, o que dá valor de evidência ao relatório.' },
      { titulo: 'Excursões documentadas', texto: 'Toda excursão de temperatura aparece com o início, o fim, a duração e quem foi avisado.' },
      { titulo: 'Fiscalização por QR Code', texto: 'O fiscal acessa os últimos 30 dias do equipamento sem senha e sem acesso ao sistema.' },
    ],
    setores: ['logistica-e-cadeia-fria', 'farmacias-e-clinicas', 'saude'],
    perguntas: [
      { pergunta: 'A Sensoriz substitui o responsável técnico?', resposta: 'Não. A Sensoriz dá ao responsável técnico o registro contínuo e os avisos de que ele precisa para responder pela conformidade.' },
      { pergunta: 'Por quanto tempo os dados ficam guardados?', resposta: 'O prazo de retenção é definido em contrato, conforme a exigência de cada norma.' },
    ],
  },
  {
    slug: 'integracoes',
    nome: 'Integrações',
    titulo: 'Os dados da Sensoriz nos sistemas que você já usa',
    resumo: 'Leituras, alertas e inventário enviados para ERP, sistemas de gestão e canais de comunicação da equipe.',
    blocos: [
      { titulo: 'Canais de alerta', texto: 'WhatsApp, e-mail, SMS, Telegram e Google Chat.' },
      { titulo: 'Sistemas de gestão', texto: 'Envio de dados para ERP e outros sistemas, com o formato definido no projeto.' },
    ],
    setores: ['logistica-e-cadeia-fria', 'saude', 'industria-e-inventario'],
    perguntas: [
      { pergunta: 'A integração tem custo extra?', resposta: 'Depende do sistema e do volume. O escopo é definido no diagnóstico.' },
    ],
  },
];
