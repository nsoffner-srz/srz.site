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
    titulo: 'Impacto no transporte de centrais de ar-condicionado',
    resultado: 'Impactos de 14 a 17 G localizados',
    cenario: 'Centrais de ar-condicionado de alto valor chegavam danificadas ao cliente, sem clareza sobre onde o dano acontecia.',
    solucao: 'Hubs nos equipamentos mediram impacto e orientação em todo o trajeto. Os impactos críticos se concentravam no manuseio e no transbordo, na origem e no destino, e cada evento gerou um laudo para responsabilização e seguro.',
    depoimento: null,
  },
  {
    id: 'goldpao',
    cliente: 'GoldPão',
    segmento: 'Pães congelados',
    setor: 'logistica-e-cadeia-fria',
    titulo: 'Frota de distribuição de pão congelado monitorada',
    cenario: 'O pão congelado precisa chegar congelado a cada ponto de entrega, e o controle da temperatura nos caminhões dependia de conferência manual.',
    solucao: 'Os caminhões de distribuição são monitorados em tempo real pela Sensoriz CORE, com aviso por exceção quando a temperatura sai da faixa.',
    depoimento: null,
  },
  {
    id: 'fungo-de-quintal',
    cliente: 'Fungo de Quintal',
    segmento: 'Produção de cogumelos',
    setor: 'logistica-e-cadeia-fria',
    titulo: 'Estoque de cogumelos frescos sob controle',
    cenario: 'Cogumelos frescos são sensíveis a temperatura e umidade, e uma variação no estoque reduz a vida útil do produto.',
    solucao: 'O estoque é monitorado de forma contínua, com aviso quando a temperatura ou a umidade saem da faixa definida.',
    depoimento: null,
  },
];

export const casesDoSetor = (setor: string) => CASES.filter((c) => c.setor === setor);
