// Conteúdo das páginas de solução. Cada item vira /solucoes/<slug>.
import type { SetorId } from './site';

export interface Solucao {
  slug: string;
  nome: string;
  titulo: string;
  resumo: string;
  blocos: { titulo: string; texto: string }[];
  setores: SetorId[];
  perguntas: { pergunta: string; resposta: string }[];
}

export const SOLUCOES: Solucao[] = [
  {
    slug: 'sensoriz-core',
    nome: 'Sensoriz CORE',
    titulo: 'A plataforma que mostra, avisa e prova',
    resumo: 'A Sensoriz CORE, plataforma desenvolvida pela Sensoriz, reúne as leituras de todos os dispositivos, avisa só na exceção e gera os relatórios de conformidade.',
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
    resumo: 'Geladeiras, freezers, câmaras frias, estoques de alimentos, salas de armazenamento e laboratórios monitorados de forma contínua, em qualquer setor.',
    blocos: [
      { titulo: 'Onde se aplica', texto: 'Câmaras frias e estoques de alimentos, geladeiras e freezers de vacinas e insumos, salas de armazenamento, laboratórios e almoxarifados.' },
      { titulo: 'O que é medido', texto: 'Temperatura e umidade de cada ambiente, com a faixa permitida definida por equipamento. O hub mede também luminosidade e pressão atmosférica.' },
      { titulo: 'Quando avisa', texto: 'Quando a leitura sai da faixa, quando o dispositivo para de comunicar e quando a energia cai.' },
      { titulo: 'O que substitui', texto: 'A planilha preenchida à mão e o termômetro lido duas vezes por dia, que não mostram o que acontece à noite e no fim de semana.' },
    ],
    setores: ['logistica-e-cadeia-fria', 'farmacias-e-clinicas', 'saude', 'industria-e-inventario'],
    perguntas: [
      { pergunta: 'Posso definir uma faixa diferente para cada equipamento?', resposta: 'Sim. Cada geladeira, sala, câmara ou estoque tem a sua faixa de temperatura e umidade.' },
      { pergunta: 'O que acontece se o dispositivo parar de comunicar?', resposta: 'A plataforma mostra o estado "Sem sinal" e avisa a equipe, para que a falta de dado nunca seja confundida com leitura normal.' },
    ],
  },
  {
    slug: 'dispositivos',
    nome: 'Dispositivos',
    titulo: 'Hubs, tags e lacre inteligente para cada operação',
    resumo: 'Hardware de parceiros internacionais, escolhido e configurado pela Sensoriz para cada aplicação: do caminhão refrigerado à geladeira de vacinas e ao equipamento de alto valor.',
    blocos: [],
    setores: ['logistica-e-cadeia-fria', 'farmacias-e-clinicas', 'saude', 'industria-e-inventario'],
    perguntas: [
      { pergunta: 'Qual a diferença entre hub e tag?', resposta: 'O hub mede 8 parâmetros e se comunica direto com a nuvem. A tag é menor, mede temperatura, umidade e localização e envia as leituras pelo hub mais próximo.' },
      { pergunta: 'Quanto dura a bateria?', resposta: 'Depende do modelo e do intervalo de leitura. Há hub recarregável, hub na tomada, hub descartável de longa duração e hub com bateria de até 5 anos.' },
      { pergunta: 'Os dispositivos são fabricados pela Sensoriz?', resposta: 'Não. O hardware vem de parceiros internacionais. A Sensoriz escolhe, configura e instala os dispositivos e desenvolve a plataforma Sensoriz CORE.' },
    ],
  },
  {
    slug: 'servico-de-compliance',
    nome: 'Serviço de compliance',
    titulo: 'A prova pronta quando o fiscal chegar',
    resumo: 'Registros contínuos, relatórios imutáveis e acesso de fiscalização por QR Code para normas como a RDC 430, a RDC 44, a RDC 67 e a RDC 197.',
    blocos: [
      { titulo: 'Registro contínuo', texto: 'Cada leitura fica guardada com data, hora, unidade e estado, sem anotação manual.' },
      { titulo: 'Relatório imutável', texto: 'O histórico não pode ser editado depois, o que dá valor de evidência ao relatório.' },
      { titulo: 'Excursões documentadas', texto: 'Toda excursão de temperatura aparece com o início, o fim, a duração e quem foi avisado.' },
      { titulo: 'Fiscalização por QR Code', texto: 'O fiscal acessa os últimos 30 dias do equipamento sem senha e sem acesso ao sistema.' },
    ],
    setores: ['logistica-e-cadeia-fria', 'farmacias-e-clinicas'],
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
    perguntas: [{ pergunta: 'A integração tem custo extra?', resposta: 'Depende do sistema e do volume. O escopo é definido no diagnóstico.' }],
  },
];
