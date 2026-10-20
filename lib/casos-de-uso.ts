// Soluções por caso de uso: estoque parado e estoque em movimento (feedback do Rodrigo, out/2026).
// Substituem a antiga página "Monitoramento ambiental". Cada item vira /solucoes/<slug>.
import type { SetorId } from './site';

export interface CasoDeUso {
  slug: string;
  visual?: 'armazem' | 'frota'; // animação ao lado do título
  nome: string;
  titulo: string;
  resumo: string;
  ondeSeAplica: string[];
  blocos: { titulo: string; texto: string }[];
  setores: SetorId[];
  perguntas: { pergunta: string; resposta: string }[];
}

export const CASOS_DE_USO: CasoDeUso[] = [
  {
    slug: 'estoque-parado',
    visual: 'armazem',
    nome: 'Estoque parado',
    titulo: 'Geladeiras, câmaras e salas sob controle, dia e noite',
    resumo: 'Produtos e ativos guardados: na geladeira, na câmara fria, na sala de estoque ou no armazém.',
    ondeSeAplica: ['Geladeiras e freezers', 'Câmaras frias', 'Salas de estoque e salas limpas', 'Armazéns e centros de distribuição'],
    blocos: [
      { titulo: 'O que é medido', texto: 'Temperatura e umidade de cada ambiente, com a faixa certa para cada um.' },
      { titulo: 'Quando avisa', texto: 'Quando sai da faixa, quando a energia cai ou quando um dispositivo para de comunicar.' },
      { titulo: 'Como é instalado', texto: 'Tags em cada ponto e um hub na tomada. Sem fio e sem obra.' },
      { titulo: 'O que substitui', texto: 'A planilha preenchida à mão, que não mostra a noite nem o fim de semana.' },
    ],
    setores: ['logistica-e-cadeia-fria', 'farmacias-e-clinicas', 'saude', 'ativos-de-alto-valor'],
    perguntas: [
      { pergunta: 'Posso definir uma faixa diferente para cada equipamento?', resposta: 'Sim. Cada ambiente tem a sua faixa.' },
      { pergunta: 'O que acontece se a energia cair?', resposta: 'O hub na tomada percebe a queda e avisa a equipe na hora.' },
    ],
  },
  {
    slug: 'estoque-em-movimento',
    visual: 'frota',
    nome: 'Estoque em movimento',
    titulo: 'Sua carga acompanhada do embarque à entrega',
    resumo: 'Cargas e ativos em trânsito: no caminhão, no baú da moto, no contêiner ou no transbordo.',
    ondeSeAplica: ['Caminhões refrigerados e secos', 'Baú de motoboy', 'Contêineres e transporte multimodal', 'Equipamentos em transporte'],
    blocos: [
      { titulo: 'O que é medido', texto: 'Localização, temperatura e umidade da carga, impacto, vibração e abertura de porta.' },
      { titulo: 'Quando avisa', texto: 'Quando a temperatura sai da faixa, a carga sofre impacto ou a porta abre fora do destino.' },
      { titulo: 'Como é instalado', texto: 'Hub no veículo ou na carga, tags nos paletes e lacre inteligente na porta. Sem ligar na elétrica do caminhão.' },
      { titulo: 'O que substitui', texto: 'O registrador que só mostra o problema quando a carga já chegou.' },
    ],
    setores: ['logistica-e-cadeia-fria', 'farmacias-e-clinicas', 'ativos-de-alto-valor'],
    perguntas: [
      { pergunta: 'Funciona onde o sinal é fraco?', resposta: 'Sim. Onde não há sinal, como no navio em navegação, o hub continua registrando e envia o histórico quando a rede volta.' },
      { pergunta: 'Preciso ligar o dispositivo na elétrica do caminhão?', resposta: 'Não. O hub tem bateria própria e é instalado sem mexer no veículo. Bom para frota de agregados.' },
    ],
  },
];

export const casoPorSlug = (slug: string) => CASOS_DE_USO.find((c) => c.slug === slug);
