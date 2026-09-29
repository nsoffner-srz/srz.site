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
    titulo: 'Tudo o que importa em um só painel',
    resumo: 'A plataforma da Sensoriz. Mostra cada leitura, avisa quando algo sai do padrão e gera o relatório.',
    blocos: [
      { titulo: 'Painel do seu jeito', texto: 'Monte a tela inicial com o que sua equipe precisa ver primeiro.' },
      { titulo: 'Gestão por exceção', texto: 'Você só é chamado quando algo sai do padrão. Por WhatsApp, e-mail ou SMS.' },
      { titulo: 'Relatórios em poucos cliques', texto: 'Relatório por carga ou equipamento, pronto para auditoria.' },
      { titulo: 'QR Code para fiscalização', texto: 'O fiscal vê os últimos 30 dias pelo QR Code, sem senha.' },
      { titulo: 'Módulos por operação', texto: 'Você usa só os módulos que a sua operação precisa.' },
      { titulo: 'Segurança e LGPD', texto: 'Dados criptografados e com cópia de segurança.' },
    ],
    setores: ['logistica-e-cadeia-fria', 'farmacias-e-clinicas', 'saude', 'industria-e-inventario'],
    perguntas: [
      { pergunta: 'Preciso instalar algum programa?', resposta: 'Não. A CORE abre no navegador do computador e do celular.' },
      { pergunta: 'Quem recebe os alertas?', resposta: 'Cada pessoa escolhe os alertas e o canal.' },
    ],
  },
  {
    slug: 'monitoramento-ambiental',
    nome: 'Monitoramento ambiental',
    titulo: 'Temperatura e umidade sob controle, dia e noite',
    resumo: 'Geladeiras, câmaras frias, estoques e salas monitorados o tempo todo, em qualquer setor.',
    blocos: [
      { titulo: 'Onde se aplica', texto: 'Câmaras frias, estoques, geladeiras, freezers, salas e laboratórios.' },
      { titulo: 'O que é medido', texto: 'Temperatura e umidade, com a faixa certa para cada ambiente.' },
      { titulo: 'Quando avisa', texto: 'Quando sai da faixa, quando a energia cai ou quando o sensor para.' },
      { titulo: 'O que substitui', texto: 'A planilha à mão, que não mostra a noite nem o fim de semana.' },
    ],
    setores: ['logistica-e-cadeia-fria', 'farmacias-e-clinicas', 'saude', 'industria-e-inventario'],
    perguntas: [
      { pergunta: 'Posso definir uma faixa diferente para cada equipamento?', resposta: 'Sim. Cada ambiente tem a sua faixa.' },
      { pergunta: 'O que acontece se o dispositivo parar de comunicar?', resposta: 'A CORE mostra "Sem sinal" e avisa a equipe.' },
    ],
  },
  {
    slug: 'dispositivos',
    nome: 'Dispositivos',
    titulo: 'O dispositivo certo para cada operação',
    resumo: 'Hubs, tags e lacre inteligente de parceiros internacionais. A Sensoriz escolhe, configura e instala.',
    blocos: [],
    setores: ['logistica-e-cadeia-fria', 'farmacias-e-clinicas', 'saude', 'industria-e-inventario'],
    perguntas: [
      { pergunta: 'Qual a diferença entre hub e tag?', resposta: 'O hub mede 8 parâmetros e fala com a nuvem. A tag é menor, mede 3 e envia pelo hub.' },
      { pergunta: 'Quanto dura a bateria?', resposta: 'Depende do modelo. O de longa duração chega a 5 anos.' },
      { pergunta: 'Os dispositivos são fabricados pela Sensoriz?', resposta: 'Não. Vêm de parceiros internacionais. A Sensoriz desenvolve a plataforma CORE.' },
    ],
  },
  {
    slug: 'servico-de-compliance',
    nome: 'Serviço de compliance',
    titulo: 'O registro pronto quando o fiscal chegar',
    resumo: 'Registro automático e relatório que não pode ser alterado, para as normas da Anvisa.',
    blocos: [
      { titulo: 'Registro contínuo', texto: 'Cada leitura fica guardada, sem anotação à mão.' },
      { titulo: 'Relatório imutável', texto: 'Ninguém edita o histórico. Por isso ele vale como prova.' },
      { titulo: 'Excursões documentadas', texto: 'Cada saída da faixa com início, fim e quem foi avisado.' },
      { titulo: 'Fiscalização por QR Code', texto: 'O fiscal vê os últimos 30 dias, sem senha.' },
    ],
    setores: ['logistica-e-cadeia-fria', 'farmacias-e-clinicas'],
    perguntas: [
      { pergunta: 'A Sensoriz substitui o responsável técnico?', resposta: 'Não. Ela dá ao responsável técnico o registro e os avisos de que ele precisa.' },
      { pergunta: 'Por quanto tempo os dados ficam guardados?', resposta: 'O prazo é definido em contrato, conforme a norma.' },
    ],
  },
  {
    slug: 'integracoes',
    nome: 'Integrações',
    titulo: 'Os dados da Sensoriz nos sistemas que você já usa',
    resumo: 'Leituras e alertas no ERP e nos canais que sua equipe já usa.',
    blocos: [
      { titulo: 'Canais de alerta', texto: 'WhatsApp, e-mail, SMS, Telegram e Google Chat.' },
      { titulo: 'Sistemas de gestão', texto: 'ERP e outros sistemas, com o formato definido no projeto.' },
    ],
    setores: ['logistica-e-cadeia-fria', 'saude', 'industria-e-inventario'],
    perguntas: [{ pergunta: 'A integração tem custo extra?', resposta: 'Depende do sistema. Definimos no diagnóstico.' }],
  },
];
