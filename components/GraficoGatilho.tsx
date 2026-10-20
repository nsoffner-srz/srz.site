'use client';
// Gráfico "vivo" de temperatura da home, com os três limites (out/2026).
// História do problema evitado: a porta fica aberta, a temperatura passa do limite de alerta (equipe avisada),
// a tendência dispara o limite de ação, a equipe age e a temperatura volta sem sair da especificação.
// A animação segura em cada aviso para dar tempo de ler. Valores ilustrativos.
// Com "menos movimento" ou pausado, mostra o quadro parado no limite de ação.
import { useEffect, useState } from 'react';
import GraficoLimites from './GraficoLimites';
import { ALERTA, ESPEC, fmt, minutosAteEspec, type Nivel } from '@/lib/limites';

const PASSO_MS = 250;

// 40 leituras, uma por minuto a partir das 14:20.
const SERIE = [
  4.8, 4.9, 5.0, 4.8, 4.7, 4.9, 5.1, 5.0, 4.8, 4.7, 4.9, 5.0, 4.9, 4.8, 4.9, 5.0,
  5.5, 6.0, 6.5, 6.9, 7.2, 7.4, 7.6, 7.7, 7.7, 7.6, 7.4, 7.1, 6.8,
  6.3, 5.9, 5.5, 5.2, 5.0, 4.9, 4.8, 4.9, 5.0, 4.9, 4.8,
];
const N = SERIE.length;
const I_ALERTA = SERIE.findIndex((v) => v > ALERTA[1]);
const I_ACAO = SERIE.findIndex((v, k) => k > I_ALERTA && v >= 7.6); // a tendência aponta para a especificação
const I_NORMAL = SERIE.findIndex((v, k) => k > I_ACAO && v <= ALERTA[1]);
const QUADRO_PARADO = I_ACAO;
const PAUSA_FINAL = 8;
const MIN_ACAO = minutosAteEspec(SERIE, I_ACAO, 1);

const hora = (i: number) => {
  const m = 20 + i;
  return `${14 + Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
};

const espera = (p: number) =>
  p === I_ALERTA || p === I_ACAO ? 3500 : p === I_NORMAL ? 3000 : p > I_ALERTA && p < I_NORMAL ? 550 : PASSO_MS;
const DURACAO_MS = Array.from({ length: N + PAUSA_FINAL }, (_, p) => espera(p)).reduce((a, b) => a + b, 0);

export function useCicloGatilho(parado: boolean) {
  const [passo, setPasso] = useState(parado ? QUADRO_PARADO : 0);
  useEffect(() => {
    const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (parado || menosMovimento) { setPasso(QUADRO_PARADO); return; }
    setPasso(0); // recomeça o ciclo sempre que o card volta a aparecer
    let atual = 0;
    let t: ReturnType<typeof setTimeout>;
    const avanca = () => {
      t = setTimeout(() => { atual = (atual + 1) % (N + PAUSA_FINAL); setPasso(atual); avanca(); }, espera(atual));
    };
    avanca();
    return () => clearTimeout(t);
  }, [parado]);
  const i = Math.min(passo, N - 1);
  const nivel: Nivel = i >= I_NORMAL || i < I_ALERTA ? 'normal' : i >= I_ACAO ? 'acao' : 'alerta';
  const legenda = i >= I_NORMAL
    ? `Equipe agiu e a temperatura voltou à faixa às ${hora(I_NORMAL)}. Nenhuma excursão: o produto não saiu da especificação`
    : i >= I_ACAO
      ? `Limite de ação: no ritmo atual, passa de ${ESPEC[1]} °C em ${MIN_ACAO} min. Hora de agir`
      : i >= I_ALERTA
        ? `Limite de alerta: acima de ${ALERTA[1]} °C às ${hora(I_ALERTA)}. Equipe de qualidade avisada`
        : 'Dentro da faixa normal. A equipe só é chamada se algo sair do previsto';
  return { i, valor: SERIE[i], nivel, legenda, destaque: nivel !== 'normal' };
}

export default function GraficoGatilho({ i }: { i: number }) {
  return (
    <GraficoLimites
      id="home"
      serie={SERIE}
      i={i}
      projetar={i >= I_ACAO && i <= I_ACAO + 1}
      marcas={[
        { indice: I_ALERTA, tipo: 'alerta', pulsa: i >= I_ALERTA && i < I_ACAO },
        { indice: I_ACAO, tipo: 'acao', pulsa: i >= I_ACAO && i < I_NORMAL },
      ]}
    />
  );
}

export const GATILHO = { espec: ESPEC, alerta: ALERTA, hora, fmt, duracaoMs: DURACAO_MS };
