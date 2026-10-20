'use client';
// Visual vivo da página de Logística (feedback do Rodrigo, out/2026): um ponto (a carga) percorre a rota
// origem → transbordo → destino, com a temperatura do trecho. No transbordo a porta fica aberta,
// a temperatura cruza o gatilho e o alerta é enviado. Valores ilustrativos.
import { useEffect, useRef, useState } from 'react';

const PARADAS = [
  { nome: 'Centro de distribuição', t: 0 },
  { nome: 'Transbordo', t: 0.5 },
  { nome: 'Cliente', t: 1 },
];
const GATILHO = 8; // °C
const DURACAO = 12000; // ms por viagem
const ROTA = 'M 20 120 C 80 30, 150 30, 210 95 S 340 160, 400 70';

// Temperatura ao longo da rota (0 a 1): estável, sobe no transbordo, volta depois do alerta.
function temperaturaEm(p: number) {
  const pico = Math.exp(-Math.pow((p - 0.53) / 0.06, 2)) * 5.2; // porta aberta no transbordo
  return 4.8 + pico + Math.sin(p * 18) * 0.15;
}
const fmt = (v: number) => v.toFixed(1).replace('.', ',');
// Ponto da rota em que a temperatura cruza o gatilho (onde o alerta é enviado).
const P_ALERTA = (() => { for (let q = 0; q <= 1; q += 0.002) if (temperaturaEm(q) > GATILHO) return q; return 0.5; })();
// Ponto em que a temperatura volta para baixo do gatilho.
const P_NORMAL = (() => { for (let q = P_ALERTA; q <= 1; q += 0.002) if (temperaturaEm(q) <= GATILHO) return q; return 0.6; })();
// Linha do tempo: a carga para no alerta (tempo de ler), anda devagar enquanto está acima do gatilho,
// segura de novo quando normaliza e segue. Devolve a posição na rota (0 a 1) para cada instante.
const SEGURA_ALERTA = 3500, SEGURA_NORMAL = 2500, LENTO = 2.5, PAUSA_FIM = 1500;
const T1 = DURACAO * P_ALERTA;
const T2 = T1 + SEGURA_ALERTA;
const T3 = T2 + DURACAO * (P_NORMAL - P_ALERTA) * LENTO;
const T4 = T3 + SEGURA_NORMAL;
const T5 = T4 + DURACAO * (1 - P_NORMAL);
const CICLO = T5 + PAUSA_FIM;
function posicaoNoTempo(ms: number) {
  if (ms < T1) return ms / DURACAO;
  if (ms < T2) return P_ALERTA;
  if (ms < T3) return P_ALERTA + (ms - T2) / (DURACAO * LENTO);
  if (ms < T4) return P_NORMAL;
  if (ms < T5) return P_NORMAL + (ms - T4) / DURACAO;
  return 1;
}

export default function RotaAoVivo() {
  const caminho = useRef<SVGPathElement>(null);
  const [p, setP] = useState(0.62); // quadro parado: logo depois do alerta
  const [ponto, setPonto] = useState({ x: 0, y: 0 });
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let inicio = performance.now();
    let id = 0;
    const quadro = (agora: number) => {
      setP(Math.min(posicaoNoTempo((agora - inicio) % CICLO), 1));
      id = requestAnimationFrame(quadro);
    };
    inicio = performance.now();
    id = requestAnimationFrame(quadro);
    return () => cancelAnimationFrame(id);
  }, [pausado]);

  useEffect(() => {
    const el = caminho.current;
    if (!el) return;
    const pt = el.getPointAtLength(el.getTotalLength() * p);
    setPonto({ x: pt.x, y: pt.y });
  }, [p]);

  const temp = temperaturaEm(p);
  const acima = temp > GATILHO;
  const normalizado = !acima && p >= P_NORMAL;
  const estado = acima ? 'atencao' : 'normal';
  const comprimento = caminho.current?.getTotalLength() ?? 1;

  return (
    <figure className="leitura rota" aria-label="Exemplo de carga refrigerada monitorada em rota">
      <div className="leitura__topo">
        <div>
          <p className="leitura__parametro">Estoque em movimento</p>
          <p className="leitura__ativo">Carga refrigerada 118</p>
          <p className="apoio">Gatilho em {GATILHO} °C</p>
        </div>
        <span className={`chip chip--${estado}`}>{acima ? 'Atenção' : 'Normal'}</span>
      </div>
      <p className="leitura__valor"><span className="dado">{fmt(temp)}</span><span className="leitura__unidade">°C</span></p>
      <svg className="rota__mapa" viewBox="0 0 420 190" aria-hidden="true">
        <path ref={caminho} d={ROTA} fill="none" stroke="var(--borda)" strokeWidth="6" strokeLinecap="round" />
        <path d={ROTA} fill="none" stroke="var(--grafico-serie-1)" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={`${comprimento * p} ${comprimento}`} />
        {PARADAS.map((s) => <ParadaMarca key={s.nome} caminho={caminho} t={s.t} />)}
        {p >= P_ALERTA && <ParadaMarca caminho={caminho} t={P_ALERTA} alerta />}
        <circle cx={ponto.x} cy={ponto.y} r="11" fill={acima ? 'var(--estado-atencao)' : 'var(--acao)'} opacity=".25" />
        <circle cx={ponto.x} cy={ponto.y} r="6" fill={acima ? 'var(--estado-atencao)' : 'var(--acao)'} />
      </svg>
      <ol className="rota__paradas">
        {PARADAS.map((s) => <li key={s.nome}>{s.nome}</li>)}
      </ol>
      {p >= P_ALERTA && <p className="rota__ocorrencia"><span className="rota__ocorrencia-marca" aria-hidden="true" /> Alerta no transbordo: porta aberta e temperatura acima de {GATILHO} °C</p>}
      <figcaption className={`apoio${acima ? ' leitura__alerta' : ''}`}>
        {acima
          ? 'Porta aberta no transbordo: temperatura acima do gatilho, equipe avisada na hora'
          : normalizado
            ? 'Porta fechada e temperatura de volta à faixa. Ocorrência registrada no relatório'
            : 'Temperatura dentro da faixa. A equipe só é chamada se cruzar o gatilho'}
        {' · exemplo ilustrativo'}
      </figcaption>
      <button type="button" className="leituras__pausa" onClick={() => setPausado((v) => !v)}>{pausado ? 'Retomar' : 'Pausar'}</button>
    </figure>
  );
}

function ParadaMarca({ caminho, t, alerta = false }: { caminho: React.RefObject<SVGPathElement | null>; t: number; alerta?: boolean }) {
  const [pt, setPt] = useState<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const el = caminho.current;
    if (el) { const q = el.getPointAtLength(el.getTotalLength() * t); setPt({ x: q.x, y: q.y }); }
  }, [caminho, t]);
  if (!pt) return null;
  if (alerta) return <circle cx={pt.x} cy={pt.y} r="7" fill="var(--estado-atencao)" stroke="var(--superficie)" strokeWidth="2" />;
  return <circle cx={pt.x} cy={pt.y} r="7" fill="var(--superficie)" stroke="var(--tinta-suave)" strokeWidth="2" />;
}
