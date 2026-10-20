'use client';
// Visual vivo da página de Logística: um ponto (a carga) percorre a rota origem → transbordo → destino,
// com a temperatura do trecho e os três limites (out/2026). No transbordo a porta fica aberta: a temperatura
// passa do limite de alerta, a tendência dispara o limite de ação e ela sai da especificação. A excursão
// fica registrada com início, fim e quem foi avisado. Valores ilustrativos.
import { useEffect, useRef, useState } from 'react';
import { ALERTA, CHIP, ESPEC, fmt, type Nivel } from '@/lib/limites';

const PARADAS = [
  { nome: 'Centro de distribuição', t: 0 },
  { nome: 'Transbordo', t: 0.5 },
  { nome: 'Cliente', t: 1 },
];
const DURACAO = 12000; // ms por viagem
const ROTA = 'M 20 120 C 80 30, 150 30, 210 95 S 340 160, 400 70';

// Temperatura ao longo da rota (0 a 1): estável, sobe no transbordo, volta depois que a porta fecha.
function temperaturaEm(p: number) {
  const pico = Math.exp(-Math.pow((p - 0.53) / 0.06, 2)) * 5.2; // porta aberta no transbordo
  return 4.8 + pico + Math.sin(p * 18) * 0.15;
}
const primeiro = (de: number, cond: (t: number) => boolean) => { for (let q = de; q <= 1; q += 0.002) if (cond(temperaturaEm(q))) return q; return de; };
const P_ALERTA = primeiro(0, (t) => t > ALERTA[1]);
const P_ACAO = primeiro(P_ALERTA, (t) => t >= 7.6);
const P_ESPEC = primeiro(P_ACAO, (t) => t > ESPEC[1]);
const P_DENTRO = primeiro(P_ESPEC, (t) => t <= ESPEC[1]); // fim da excursão
const P_NORMAL = primeiro(P_DENTRO, (t) => t <= ALERTA[1]);

// Linha do tempo: a carga para em cada aviso (tempo de ler), anda devagar durante o evento e segue.
const PARADAS_TEMPO: [number, number][] = [[P_ALERTA, 3000], [P_ACAO, 3000], [P_ESPEC, 3500], [P_DENTRO, 2500], [P_NORMAL, 2500]];
const LENTO = 2.5, PAUSA_FIM = 1500;
const TRECHOS = (() => {
  const t: { de: number; ate: number; ms: number; segura?: boolean }[] = [];
  let anterior = 0;
  for (const [pos, ms] of PARADAS_TEMPO) {
    const lento = anterior >= P_ALERTA && anterior < P_NORMAL;
    t.push({ de: anterior, ate: pos, ms: DURACAO * (pos - anterior) * (lento ? LENTO : 1) });
    t.push({ de: pos, ate: pos, ms, segura: true });
    anterior = pos;
  }
  t.push({ de: anterior, ate: 1, ms: DURACAO * (1 - anterior) });
  t.push({ de: 1, ate: 1, ms: PAUSA_FIM, segura: true });
  return t;
})();
const CICLO = TRECHOS.reduce((a, b) => a + b.ms, 0);
function posicaoNoTempo(ms: number) {
  for (const t of TRECHOS) {
    if (ms < t.ms) return t.segura ? t.de : t.de + (t.ate - t.de) * (ms / t.ms);
    ms -= t.ms;
  }
  return 1;
}
const minutos = (p: number) => Math.round(p * 300); // viagem ilustrativa de 5 h
const DURACAO_EXCURSAO = minutos(P_DENTRO) - minutos(P_ESPEC);

export default function RotaAoVivo() {
  const caminho = useRef<SVGPathElement>(null);
  const [p, setP] = useState(P_ESPEC + 0.004); // quadro parado: fora da especificação
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
  // Depois da excursão, ainda acima de 7 °C, volta a ser só limite de alerta.
  const nivel: Nivel = temp > ESPEC[1] ? 'especificacao' : p >= P_NORMAL || p < P_ALERTA ? 'normal' : p >= P_ACAO && p < P_ESPEC ? 'acao' : 'alerta';
  const chip = CHIP[nivel];
  const cor = nivel === 'especificacao' ? 'var(--estado-critico)' : nivel === 'normal' ? 'var(--acao)' : 'var(--estado-atencao)';
  const excursaoRegistrada = p >= P_DENTRO;
  const comprimento = caminho.current?.getTotalLength() ?? 1;

  const legenda = p >= P_NORMAL
    ? 'Porta fechada e temperatura de volta à faixa normal. Excursão registrada no relatório'
    : excursaoRegistrada
      ? `De volta abaixo de ${ESPEC[1]} °C. A excursão de ${DURACAO_EXCURSAO} min fica registrada`
      : nivel === 'especificacao'
        ? `Fora da especificação: acima de ${ESPEC[1]} °C. Início da excursão registrado, equipe avisada`
        : nivel === 'acao'
          ? `Limite de ação: a tendência passa de ${ESPEC[1]} °C. Equipe chamada a agir`
          : nivel === 'alerta'
            ? `Limite de alerta: porta aberta no transbordo, acima de ${ALERTA[1]} °C. Equipe avisada`
            : 'Temperatura na faixa normal. A equipe só é chamada se algo sair do previsto';

  return (
    <figure className="leitura rota" aria-label="Exemplo de carga refrigerada monitorada em rota">
      <div className="leitura__topo">
        <div>
          <p className="leitura__parametro">Estoque em movimento</p>
          <p className="leitura__ativo">Carga refrigerada 118</p>
          <p className="apoio">Especificação {ESPEC[0]} a {ESPEC[1]} °C · alerta {ALERTA[0]} a {ALERTA[1]} °C</p>
        </div>
        <span className={`chip chip--${chip.classe}`}>{chip.texto}</span>
      </div>
      <p className="leitura__valor"><span className="dado">{fmt(temp)}</span><span className="leitura__unidade">°C</span></p>
      <svg className="rota__mapa" viewBox="0 0 420 190" aria-hidden="true">
        <path ref={caminho} d={ROTA} fill="none" stroke="var(--borda)" strokeWidth="6" strokeLinecap="round" />
        <path d={ROTA} fill="none" stroke="var(--grafico-serie-1)" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={`${comprimento * p} ${comprimento}`} />
        {PARADAS.map((s) => <ParadaMarca key={s.nome} caminho={caminho} t={s.t} />)}
        {p >= P_ALERTA && <ParadaMarca caminho={caminho} t={P_ALERTA} alerta />}
        {p >= P_ESPEC && <ParadaMarca caminho={caminho} t={P_ESPEC} critico />}
        <circle cx={ponto.x} cy={ponto.y} r="11" fill={cor} opacity=".25" />
        <circle cx={ponto.x} cy={ponto.y} r="6" fill={cor} />
      </svg>
      <ol className="rota__paradas">
        {PARADAS.map((s) => <li key={s.nome}>{s.nome}</li>)}
      </ol>
      {p >= P_ESPEC && (
        <p className="rota__ocorrencia">
          <span className="rota__ocorrencia-marca rota__ocorrencia-marca--critico" aria-hidden="true" />
          {excursaoRegistrada
            ? `Excursão no transbordo: ${DURACAO_EXCURSAO} min acima de ${ESPEC[1]} °C, com início, fim e quem foi avisado`
            : `Excursão em curso no transbordo: acima de ${ESPEC[1]} °C`}
        </p>
      )}
      <figcaption className={`apoio${nivel !== 'normal' ? ' leitura__alerta' : ''}`}>
        {legenda}{' · exemplo ilustrativo'}
      </figcaption>
      <button type="button" className="leituras__pausa" onClick={() => setPausado((v) => !v)}>{pausado ? 'Retomar' : 'Pausar'}</button>
    </figure>
  );
}

function ParadaMarca({ caminho, t, alerta = false, critico = false }: { caminho: React.RefObject<SVGPathElement | null>; t: number; alerta?: boolean; critico?: boolean }) {
  const [pt, setPt] = useState<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const el = caminho.current;
    if (el) { const q = el.getPointAtLength(el.getTotalLength() * t); setPt({ x: q.x, y: q.y }); }
  }, [caminho, t]);
  if (!pt) return null;
  if (critico) return <circle cx={pt.x} cy={pt.y} r="7" fill="var(--estado-critico)" stroke="var(--superficie)" strokeWidth="2" />;
  if (alerta) return <circle cx={pt.x} cy={pt.y} r="7" fill="var(--estado-atencao)" stroke="var(--superficie)" strokeWidth="2" />;
  return <circle cx={pt.x} cy={pt.y} r="7" fill="var(--superficie)" stroke="var(--tinta-suave)" strokeWidth="2" />;
}
