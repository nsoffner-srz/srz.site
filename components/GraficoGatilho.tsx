'use client';
// Gráfico "vivo" de temperatura com linhas de gatilho (feedback do Rodrigo, out/2026).
// A curva avança, cruza o gatilho de 8 °C, o estado vira "Atenção" e o alerta é enviado.
// Depois a equipe age e a temperatura volta para a faixa. Valores ilustrativos.
// Com "menos movimento" ou pausado, mostra o quadro parado no momento do alerta.
import { useEffect, useState } from 'react';

const W = 320, H = 96;
const MIN = 0, MAX = 12; // escala do eixo
const FAIXA: [number, number] = [2, 8]; // gatilhos inferior e superior
const PASSO_MS = 250;

// 40 leituras: estável, sobe (porta aberta), alerta, equipe age, volta ao normal.
const SERIE = [
  4.8, 4.9, 5.0, 4.8, 4.7, 4.9, 5.1, 5.0, 4.8, 4.7, 4.9, 5.0, 4.9, 4.8, 4.9, 5.0,
  5.6, 6.3, 7.1, 7.8, 8.4, 9.0, 9.4, 9.6, 9.5, 9.2,
  8.6, 7.9, 7.1, 6.4, 5.9, 5.5, 5.2, 5.0, 4.9, 4.8, 4.9, 5.0, 4.9, 4.8,
];
const N = SERIE.length;
const CRUZA = SERIE.findIndex((v) => v > FAIXA[1]); // primeira leitura acima do gatilho
const VOLTA = SERIE.findIndex((v, i) => i > CRUZA && v <= FAIXA[1]); // de volta à faixa
const QUADRO_PARADO = CRUZA + 3;
const PAUSA_FINAL = 8; // passos parado no fim antes de recomeçar

const y = (v: number) => H - ((v - MIN) / (MAX - MIN)) * H;
const x = (i: number) => (i / (N - 1)) * W;
const hora = (i: number) => {
  const m = 20 + i; // 14:20 + 1 min por leitura
  return `${14 + Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
};
const fmt = (v: number) => v.toFixed(1).replace('.', ',');

// Ritmo: passos rápidos fora do evento; no momento do alerta o quadro segura para dar tempo de ler.
const SEGURA_ALERTA_MS = 3500; // parado no cruzamento do gatilho
const PASSO_ALERTA_MS = 550; // passos mais lentos enquanto está acima do gatilho
const SEGURA_NORMAL_MS = 2500; // parado quando volta à faixa
const espera = (p: number) =>
  p === CRUZA ? SEGURA_ALERTA_MS : p === VOLTA ? SEGURA_NORMAL_MS : p > CRUZA && p < VOLTA ? PASSO_ALERTA_MS : PASSO_MS;
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
  const emAlerta = i >= CRUZA && i < VOLTA;
  const alertaEnviado = i >= CRUZA;
  const normalizado = i >= VOLTA;
  return { i, valor: SERIE[i], emAlerta, alertaEnviado, normalizado };
}

export default function GraficoGatilho({ i, emAlerta }: { i: number; emAlerta: boolean }) {
  const pontos = SERIE.slice(0, i + 1);
  const linha = pontos.map((v, k) => `${k ? 'L' : 'M'}${x(k).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const yMax = y(FAIXA[1]), yMin = y(FAIXA[0]);
  return (
    <svg className="leitura__grafico grafico-gatilho" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        {/* Parte da curva acima do gatilho ganha a cor de atenção */}
        <clipPath id="acima-gatilho"><rect x="0" y="0" width={W} height={yMax} /></clipPath>
      </defs>
      <rect x="0" y={yMax} width={W} height={yMin - yMax} fill="var(--grafico-faixa)" />
      <line x1="0" x2={W} y1={yMax} y2={yMax} stroke="var(--estado-atencao)" strokeWidth="1.5" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
      <line x1="0" x2={W} y1={yMin} y2={yMin} stroke="var(--tinta-suave)" strokeWidth="1" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
      <path d={linha} fill="none" stroke="var(--grafico-serie-1)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      <path d={linha} fill="none" stroke="var(--estado-atencao)" strokeWidth="2.5" clipPath="url(#acima-gatilho)" vectorEffect="non-scaling-stroke" />
      {/* Marca vertical no momento em que a curva cruza o gatilho (o alerta sai aqui) */}
      {i >= CRUZA && (
        <line x1={x(CRUZA)} x2={x(CRUZA)} y1="0" y2={H} stroke="var(--estado-atencao)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className={emAlerta ? 'grafico-gatilho__pulso' : undefined} />
      )}
    </svg>
  );
}

export const GATILHO = { faixa: FAIXA, horaAlerta: hora(CRUZA), horaNormal: hora(VOLTA), hora, fmt, duracaoMs: DURACAO_MS };
