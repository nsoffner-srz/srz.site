'use client';
// Hero da home: cards de leitura no estilo da Sensoriz CORE que se alternam entre os parâmetros medidos.
// Valores ilustrativos, não são de um cliente real. Troca a cada 6 s; para ao passar o mouse, ao focar,
// ao tocar em um parâmetro ou quando a pessoa prefere menos movimento.
import { useEffect, useState } from 'react';
import GraficoGatilho, { useCicloGatilho, GATILHO } from './GraficoGatilho';

type Estado = 'normal' | 'atencao';

interface Leitura {
  parametro: string;
  aba?: string; // nome curto na aba, quando o nome completo não cabe
  ativo: string;
  local: string;
  valor: string;
  unidade: string;
  estado: Estado;
  meta: { rotulo: string; valor: string; unidade?: string }[];
  serie: number[];
  faixa?: [number, number]; // banda de conformidade
  escala: [number, number];
  legenda: string;
}

const LEITURAS: Leitura[] = [
  {
    parametro: 'Temperatura',
    ativo: 'Geladeira de vacinas 02',
    local: 'Sala de imunização, 1º andar',
    valor: '4,6', unidade: '°C', estado: 'normal',
    meta: [{ rotulo: 'Faixa', valor: '2 a 8', unidade: '°C' }, { rotulo: 'Energia', valor: 'Ligada' }, { rotulo: 'Leitura', valor: '14:32' }],
    serie: [4.9, 5.1, 5.0, 4.7, 4.5, 4.8, 5.2, 5.4, 5.1, 4.8, 4.6, 4.4, 4.6, 4.9, 4.7, 4.6],
    faixa: [2, 8], escala: [0, 10],
    legenda: 'Últimas 8 horas dentro da faixa',
  },
  {
    parametro: 'Umidade',
    ativo: 'Estoque de cogumelos frescos',
    local: 'Câmara 1, centro de distribuição',
    valor: '91', unidade: '%UR', estado: 'normal',
    meta: [{ rotulo: 'Faixa', valor: '85 a 95', unidade: '%UR' }, { rotulo: 'Temperatura', valor: '3,1', unidade: '°C' }, { rotulo: 'Leitura', valor: '14:31' }],
    serie: [90, 91, 92, 91, 90, 89, 90, 91, 92, 92, 91, 90, 91, 92, 91, 91],
    faixa: [85, 95], escala: [75, 100],
    legenda: 'Últimas 8 horas dentro da faixa',
  },
  {
    parametro: 'Pressão atmosférica',
    aba: 'Pressão (hPa)',
    ativo: 'Carga refrigerada 118',
    local: 'Em trânsito, descida da serra',
    valor: '1.004', unidade: 'hPa', estado: 'normal',
    meta: [{ rotulo: 'Variação na rota', valor: '+82', unidade: 'hPa' }, { rotulo: 'Temperatura', valor: '-18,4', unidade: '°C' }, { rotulo: 'Leitura', valor: '14:30' }],
    serie: [922, 924, 925, 930, 938, 947, 956, 966, 975, 983, 990, 996, 1000, 1002, 1003, 1004],
    escala: [900, 1020],
    legenda: 'Pressão ao longo da rota, das 12:30 às 14:30',
  },
  {
    parametro: 'Luminosidade',
    ativo: 'Baú 07, rota de distribuição',
    local: 'Em trânsito, a 12 km da próxima entrega',
    valor: '320', unidade: 'lux', estado: 'atencao',
    meta: [{ rotulo: 'Esperado', valor: '0', unidade: 'lux' }, { rotulo: 'Lacre', valor: 'Aberto' }, { rotulo: 'Desde', valor: '14:26' }],
    serie: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 280, 330, 320],
    escala: [0, 400],
    legenda: 'Baú aberto fora da doca: equipe avisada às 14:26',
  },
  {
    parametro: 'Impacto',
    ativo: 'Central de climatização 14',
    local: 'Transbordo, centro de distribuição',
    valor: '3,2', unidade: 'G', estado: 'normal',
    meta: [{ rotulo: 'Limite', valor: '10', unidade: 'G' }, { rotulo: 'Orientação', valor: 'Em pé' }, { rotulo: 'Leitura', valor: '14:29' }],
    serie: [0.4, 0.6, 0.5, 1.2, 0.8, 0.5, 2.1, 0.7, 0.6, 3.2, 0.9, 0.5, 0.6, 0.4, 0.5, 0.6],
    faixa: [0, 10], escala: [0, 12],
    legenda: 'Maior impacto do dia abaixo do limite',
  },
];

const W = 320, H = 96;

function Grafico({ l }: { l: Leitura }) {
  const [min, max] = l.escala;
  const y = (v: number) => H - ((v - min) / (max - min)) * H;
  const x = (i: number) => (i / (l.serie.length - 1)) * W;
  const linha = l.serie.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const cor = l.estado === 'atencao' ? 'var(--estado-atencao)' : 'var(--grafico-serie-1)';
  return (
    <svg className="leitura__grafico" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      {l.faixa && <rect x="0" y={y(l.faixa[1])} width={W} height={y(l.faixa[0]) - y(l.faixa[1])} fill="var(--grafico-faixa)" />}
      <path d={linha} fill="none" stroke={cor} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function LeiturasAoVivo() {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [emFoco, setEmFoco] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPausado(true);
  }, []);

  // O card de temperatura fica o tempo de um ciclo completo do gráfico com gatilho; os outros, 6 s.
  useEffect(() => {
    if (pausado || emFoco) return;
    const espera = LEITURAS[indice].parametro === 'Temperatura' ? GATILHO.duracaoMs : 6000;
    const t = setTimeout(() => setIndice((i) => (i + 1) % LEITURAS.length), espera);
    return () => clearTimeout(t);
  }, [pausado, emFoco, indice]);

  const base = LEITURAS[indice];
  const vivo = base.parametro === 'Temperatura';
  const ciclo = useCicloGatilho(pausado || !vivo);
  // No card de temperatura, valor, estado, hora e legenda acompanham o gráfico ao vivo.
  const l: Leitura = vivo
    ? {
        ...base,
        valor: GATILHO.fmt(ciclo.valor),
        estado: ciclo.nivel === 'normal' ? 'normal' : 'atencao',
        meta: [
          { rotulo: 'Especificação', valor: `${GATILHO.espec[0]} a ${GATILHO.espec[1]}`, unidade: '°C' },
          { rotulo: 'Alerta', valor: `${GATILHO.alerta[0]} a ${GATILHO.alerta[1]}`, unidade: '°C' },
          { rotulo: 'Leitura', valor: GATILHO.hora(ciclo.i) },
        ],
        legenda: ciclo.legenda,
      }
    : base;
  return (
    <div
      className="leituras"
      onMouseEnter={() => setEmFoco(true)}
      onMouseLeave={() => setEmFoco(false)}
      onFocus={() => setEmFoco(true)}
      onBlur={() => setEmFoco(false)}
    >
      <figure key={indice} className="leitura leitura__entra" aria-live={pausado ? 'polite' : 'off'}>
        <div className="leitura__topo">
          <div>
            <p className="leitura__parametro">{l.parametro}</p>
            <p className="leitura__ativo">{l.ativo}</p>
            <p className="apoio">{l.local}</p>
          </div>
          <span className={`chip chip--${l.estado}`}>{l.estado === 'normal' ? 'Normal' : 'Atenção'}</span>
        </div>
        <div className="leitura__valores">
          <p className="leitura__valor"><span className="dado">{l.valor}</span><span className="leitura__unidade">{l.unidade}</span></p>
          <dl className="leitura__meta">
            {l.meta.map((m) => (
              <div key={m.rotulo}>
                <dt className="rotulo">{m.rotulo}</dt>
                <dd><span className="dado">{m.valor}</span>{m.unidade && ` ${m.unidade}`}</dd>
              </div>
            ))}
          </dl>
        </div>
        {vivo ? <GraficoGatilho i={ciclo.i} /> : <Grafico l={l} />}
        <figcaption className={`apoio${vivo && ciclo.destaque ? ' leitura__alerta' : ''}`}>{l.legenda} · exemplo ilustrativo</figcaption>
      </figure>

      <div className="leituras__controles">
        <div className="leituras__abas" role="group" aria-label="Parâmetros medidos">
        {LEITURAS.map((x, i) => (
          <button key={x.parametro} type="button" className="leituras__aba" aria-label={x.parametro} aria-pressed={i === indice} onClick={() => { setIndice(i); setPausado(true); }}>
            {x.aba ?? x.parametro}
          </button>
        ))}
        </div>
        <button type="button" className="leituras__pausa" onClick={() => setPausado((p) => !p)}>
          {pausado ? 'Retomar' : 'Pausar'}
        </button>
      </div>
    </div>
  );
}
