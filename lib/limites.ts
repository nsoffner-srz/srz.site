// Esquema de limites das animações de temperatura (out/2026), igual ao da página da CORE:
// - Limite de alerta: saiu da faixa normal de operação (3 a 7 °C). Estado "Atenção".
// - Limite de ação: a tendência mostra que vai passar da especificação. Estado "Atenção".
// - Limite de especificação: saiu da faixa do produto (2 a 8 °C). Estado "Crítico", vira excursão.
// Regra de risco: mostrar o efeito, nunca a lógica de cálculo. Valores ilustrativos.

export const ESPEC: [number, number] = [2, 8];
export const ALERTA: [number, number] = [3, 7];

export type Nivel = 'normal' | 'alerta' | 'acao' | 'especificacao';

export const CHIP: Record<Nivel, { classe: string; texto: string }> = {
  normal: { classe: 'normal', texto: 'Normal' },
  alerta: { classe: 'atencao', texto: 'Atenção' },
  acao: { classe: 'atencao', texto: 'Atenção' },
  especificacao: { classe: 'critico', texto: 'Crítico' },
};

export const NOME_LIMITE: Record<Exclude<Nivel, 'normal'>, string> = {
  alerta: 'Limite de alerta',
  acao: 'Limite de ação',
  especificacao: 'Fora da especificação',
};

export const fmt = (v: number) => v.toFixed(1).replace('.', ',').replace('-', '−');

// Minutos até passar da especificação no ritmo atual (para a frase do limite de ação).
export function minutosAteEspec(serie: number[], i: number, minPorLeitura: number) {
  const ritmo = (serie[i] - serie[Math.max(0, i - 2)]) / 2; // °C por leitura
  if (ritmo <= 0) return null;
  return Math.max(1, Math.round(((ESPEC[1] - serie[i]) / ritmo) * minPorLeitura));
}

export const LEGENDA_LIMITES = `Especificação ${ESPEC[0]} a ${ESPEC[1]} °C · alerta ${ALERTA[0]} a ${ALERTA[1]} °C`;
