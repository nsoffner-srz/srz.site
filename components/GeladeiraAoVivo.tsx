'use client';
// Visual vivo da página de Farmácias (feedback do Rodrigo, out/2026): a geladeira durante a madrugada.
// A energia cai às 02:14, o hub na tomada avisa na hora, a temperatura começa a subir e o responsável
// técnico age antes de ela passar do gatilho. Mesma linguagem do gráfico da home. Valores ilustrativos.
import { useEffect, useState } from 'react';

const W = 320, H = 96;
const MIN = 0, MAX = 12;
const FAIXA: [number, number] = [2, 8];
const PASSO_MS = 260;

// 40 leituras, uma a cada 12 min, das 22:00 às 05:48.
const SERIE = [
  4.6, 4.7, 4.5, 4.6, 4.8, 4.7, 4.6, 4.5, 4.7, 4.6, 4.8, 4.7, 4.6,
  4.9, 5.4, 5.9, 6.4, 6.9, 7.3, 7.5, // energia caiu (passo 13)
  7.2, 6.6, 6.0, 5.5, 5.1, 4.9, 4.8, // energia voltou / equipe agiu (passo 20)
  4.7, 4.6, 4.7, 4.8, 4.6, 4.5, 4.7, 4.6, 4.7, 4.6, 4.5, 4.6, 4.7,
];
const N = SERIE.length;
const QUEDA = 13;
const VOLTA = 20;
const QUADRO_PARADO = 17;
const PAUSA_FINAL = 8;

const y = (v: number) => H - ((v - MIN) / (MAX - MIN)) * H;
const x = (i: number) => (i / (N - 1)) * W;
const hora = (i: number) => {
  const m = 22 * 60 + i * 12;
  return `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};
const fmt = (v: number) => v.toFixed(1).replace('.', ',');

export default function GeladeiraAoVivo() {
  const [passo, setPasso] = useState(QUADRO_PARADO);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPasso((p) => p); return; }
    setPasso(0);
    const t = setInterval(() => setPasso((p) => (p + 1) % (N + PAUSA_FINAL)), PASSO_MS);
    return () => clearInterval(t);
  }, [pausado]);

  const i = Math.min(passo, N - 1);
  const semEnergia = i >= QUEDA && i < VOLTA;
  const avisado = i >= QUEDA;
  const resolvido = i >= VOLTA;
  const linha = SERIE.slice(0, i + 1).map((v, k) => `${k ? 'L' : 'M'}${x(k).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');

  return (
    <figure className="leitura rota" aria-label="Exemplo de geladeira de farmácia monitorada durante a madrugada">
      <div className="leitura__topo">
        <div>
          <p className="leitura__parametro">Estoque parado</p>
          <p className="leitura__ativo">Geladeira de insumos 01</p>
          <p className="apoio">Farmácia fechada · gatilho em {FAIXA[0]} e {FAIXA[1]} °C</p>
        </div>
        <span className={`chip chip--${semEnergia ? 'atencao' : 'normal'}`}>{semEnergia ? 'Atenção' : 'Normal'}</span>
      </div>
      <div className="leitura__valores">
        <p className="leitura__valor"><span className="dado">{fmt(SERIE[i])}</span><span className="leitura__unidade">°C</span></p>
        <dl className="leitura__meta">
          <div><dt className="rotulo">Energia</dt><dd>{semEnergia ? 'Desligada' : 'Ligada'}</dd></div>
          <div><dt className="rotulo">Leitura</dt><dd><span className="dado">{hora(i)}</span></dd></div>
        </dl>
      </div>
      <svg className="leitura__grafico grafico-gatilho" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
        <rect x="0" y={y(FAIXA[1])} width={W} height={y(FAIXA[0]) - y(FAIXA[1])} fill="var(--grafico-faixa)" />
        <line x1="0" x2={W} y1={y(FAIXA[1])} y2={y(FAIXA[1])} stroke="var(--estado-atencao)" strokeWidth="1.5" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
        <line x1="0" x2={W} y1={y(FAIXA[0])} y2={y(FAIXA[0])} stroke="var(--tinta-suave)" strokeWidth="1" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
        {/* Faixa do período sem energia */}
        {avisado && <rect x={x(QUEDA)} y="0" width={x(Math.min(i, VOLTA)) - x(QUEDA)} height={H} fill="var(--estado-atencao-fundo)" opacity=".8" />}
        <path d={linha} fill="none" stroke="var(--grafico-serie-1)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        {avisado && <line x1={x(QUEDA)} x2={x(QUEDA)} y1="0" y2={H} stroke="var(--estado-atencao)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className={semEnergia ? 'grafico-gatilho__pulso' : undefined} />}
      </svg>
      <figcaption className={`apoio${semEnergia ? ' leitura__alerta' : ''}`}>
        {resolvido
          ? `Energia de volta às ${hora(VOLTA)}. A temperatura não passou do gatilho e tudo ficou registrado`
          : avisado
            ? `Queda de energia às ${hora(QUEDA)}: responsável técnico avisado na hora, antes de o produto sair da faixa`
            : 'Farmácia fechada, geladeira dentro da faixa'}
        {' · exemplo ilustrativo'}
      </figcaption>
      <button type="button" className="leituras__pausa" onClick={() => setPausado((v) => !v)}>{pausado ? 'Retomar' : 'Pausar'}</button>
    </figure>
  );
}
