// Gráfico de temperatura com os três limites (out/2026): faixa normal (alerta, tracejado amarelo),
// especificação (linha cheia vermelha) e, no limite de ação, a tendência projetada até a especificação.
// Usado pela home e pela página de Farmácias. Valores ilustrativos.
import { ALERTA, ESPEC } from '@/lib/limites';

const W = 320, H = 96;

type Props = {
  serie: number[];
  i: number; // última leitura mostrada
  escala?: [number, number];
  marcas?: { indice: number; tipo: 'alerta' | 'acao' | 'especificacao' | 'evento'; pulsa?: boolean }[];
  projetar?: boolean; // mostra a tendência a partir da leitura atual
  periodo?: [number, number]; // trecho destacado (ex.: sem energia)
  id: string; // prefixo único para os clipPath
};

export default function GraficoLimites({ serie, i, escala = [0, 12], marcas = [], projetar = false, periodo, id }: Props) {
  const N = serie.length;
  const y = (v: number) => H - ((v - escala[0]) / (escala[1] - escala[0])) * H;
  const x = (k: number) => (k / (N - 1)) * W;
  const linha = serie.slice(0, i + 1).map((v, k) => `${k ? 'L' : 'M'}${x(k).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');

  // Tendência: mesma inclinação das duas últimas leituras, até a linha de especificação.
  let projecao: { x2: number; y2: number } | null = null;
  if (projetar && i >= 2) {
    const ritmo = (serie[i] - serie[i - 2]) / 2;
    if (ritmo > 0) {
      const passos = (ESPEC[1] - serie[i]) / ritmo;
      projecao = { x2: x(i + passos), y2: y(ESPEC[1]) };
    }
  }
  const cor = (t: string) => (t === 'especificacao' ? 'var(--estado-critico)' : 'var(--estado-atencao)');

  return (
    <svg className="leitura__grafico grafico-gatilho" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <clipPath id={`${id}-acima-alerta`}><rect x="0" y="0" width={W} height={y(ALERTA[1])} /></clipPath>
        <clipPath id={`${id}-acima-espec`}><rect x="0" y="0" width={W} height={y(ESPEC[1])} /></clipPath>
      </defs>
      {/* Faixa normal de operação (entre os limites de alerta) */}
      <rect x="0" y={y(ALERTA[1])} width={W} height={y(ALERTA[0]) - y(ALERTA[1])} fill="var(--grafico-faixa)" />
      {periodo && i >= periodo[0] && (
        <rect x={x(periodo[0])} y="0" width={x(Math.min(i, periodo[1])) - x(periodo[0])} height={H} fill="var(--estado-atencao-fundo)" opacity=".8" />
      )}
      {/* Limites de alerta: tracejado */}
      {ALERTA.map((v) => <line key={`a${v}`} x1="0" x2={W} y1={y(v)} y2={y(v)} stroke="var(--estado-atencao)" strokeWidth="1.25" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />)}
      {/* Limites de especificação: linha cheia */}
      {ESPEC.map((v) => <line key={`e${v}`} x1="0" x2={W} y1={y(v)} y2={y(v)} stroke="var(--estado-critico)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />)}
      <path d={linha} fill="none" stroke="var(--grafico-serie-1)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      <path d={linha} fill="none" stroke="var(--estado-atencao)" strokeWidth="2.5" clipPath={`url(#${id}-acima-alerta)`} vectorEffect="non-scaling-stroke" />
      <path d={linha} fill="none" stroke="var(--estado-critico)" strokeWidth="2.5" clipPath={`url(#${id}-acima-espec)`} vectorEffect="non-scaling-stroke" />
      {projecao && (
        <line x1={x(i)} y1={y(serie[i])} x2={projecao.x2} y2={projecao.y2} stroke="var(--estado-atencao)" strokeWidth="2" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
      )}
      {marcas.filter((m) => i >= m.indice).map((m) => (
        <line key={`${m.tipo}${m.indice}`} x1={x(m.indice)} x2={x(m.indice)} y1="0" y2={H} stroke={cor(m.tipo)} strokeWidth="1.5" vectorEffect="non-scaling-stroke" className={m.pulsa ? 'grafico-gatilho__pulso' : undefined} />
      ))}
    </svg>
  );
}
