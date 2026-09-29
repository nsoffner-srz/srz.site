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
  depoimento?: { texto: string; autor: string } | null; // null = depoimento ainda não recebido
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
    depoimento: null,
  },
  {
    id: 'goldpao',
    cliente: 'GoldPão',
    segmento: 'Pães congelados',
    setor: 'logistica-e-cadeia-fria',
    titulo: 'Pão congelado na temperatura certa até a entrega',
    cenario: 'A temperatura dos caminhões era conferida à mão.',
    solucao: 'Hoje cada caminhão é monitorado em tempo real, com aviso se a temperatura sair da faixa.',
    depoimento: null,
  },
  {
    id: 'fungo-de-quintal',
    cliente: 'Fungo de Quintal',
    segmento: 'Produção de cogumelos',
    setor: 'logistica-e-cadeia-fria',
    titulo: 'Cogumelos frescos por mais tempo',
    cenario: 'Pouca variação de temperatura e umidade já encurta a vida do cogumelo.',
    solucao: 'O estoque é monitorado o tempo todo, com aviso se algo sair da faixa.',
    depoimento: null,
  },
];

export const casesDoSetor = (setor: string) => CASES.filter((c) => c.setor === setor);
