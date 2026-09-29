// Clientes ativos (set 2026). Formato: cenário, impacto, solução, resultado.
// Nomes: GoldPão e Fungo de Quintal podem aparecer (confirmar autorização por escrito antes de publicar).
// Midea Carrier aparece SEM o nome da empresa, só pelo segmento.
import type { SetorId } from './site';

export interface Case {
  id: string;
  cliente: string;
  segmento: string;
  setor: SetorId;
  titulo: string;
  resultado?: string;
  cenario: string;
  solucao: string;
  depoimentos: { texto: string; autor: string }[]; // vazio = depoimento ainda não recebido
}

export const CASES: Case[] = [
  {
    id: 'fabricante-climatizacao',
    cliente: 'Fabricante multinacional de climatização',
    segmento: 'Indústria',
    setor: 'industria-e-inventario',
    titulo: 'Onde os equipamentos sofriam impacto',
    resultado: 'Impactos de 14 a 17 G achados',
    cenario: 'Equipamentos de ar-condicionado chegavam danificados, sem saber onde.',
    solucao: 'Os hubs mostraram que os impactos aconteciam no manuseio e no transbordo. Cada um virou laudo para o seguro.',
    depoimentos: [
      { texto: 'A gente trabalha muito com fatos e dados, então onde não conseguíamos comprovar, ficava difícil tomar uma ação. Com o equipamento, conseguimos comprovar exatamente onde estavam acontecendo os problemas no transporte.', autor: 'Gestor de Qualidade · Indústria Multinacional' },
      { texto: 'O equipamento tem servido como uma forma de retroalimentação para o nosso produto. Viramos essa parte do monitoramento em uma rotina para os nossos novos desenvolvimentos.', autor: 'Gestor de Qualidade · Indústria Multinacional' },
      { texto: 'Tem funcionado muito bem. A gente passa uma demanda específica e tem retorno num tempo bem breve.', autor: 'Gestor de Qualidade · Indústria Multinacional' },
    ],
  },
  {
    id: 'goldpao',
    cliente: 'GoldPão',
    segmento: 'Pães congelados',
    setor: 'logistica-e-cadeia-fria',
    titulo: 'Pão congelado na temperatura certa até a entrega',
    cenario: 'A temperatura dos caminhões era conferida à mão.',
    solucao: 'Hoje cada caminhão é monitorado em tempo real, com aviso se a temperatura sair da faixa.',
    depoimentos: [],
  },
  {
    id: 'fungo-de-quintal',
    cliente: 'Fungo de Quintal',
    segmento: 'Produção de cogumelos',
    setor: 'logistica-e-cadeia-fria',
    titulo: 'Cogumelos frescos por mais tempo',
    cenario: 'Pouca variação de temperatura e umidade já encurta a vida do cogumelo.',
    solucao: 'O estoque é monitorado o tempo todo, com aviso se algo sair da faixa.',
    depoimentos: [],
  },
];

export const casesDoSetor = (setor: string) => CASES.filter((c) => c.setor === setor);
