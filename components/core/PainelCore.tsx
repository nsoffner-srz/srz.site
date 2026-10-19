'use client';
// Réplica da tela inicial da Sensoriz CORE (core.sensoriz.com.br/home), recriada a partir da estrutura
// real da plataforma (out/2026) com dados fictícios: "Distribuidora Exemplo". Nenhum dado de cliente.
// A cada poucos segundos chega um alerta novo: a lista atualiza, o card do dispositivo fica em "Atenção",
// o Sensoriz Score cai e, depois que a equipe age, tudo volta ao normal.
// Com "menos movimento" ou pausado, mostra o quadro parado.
import { useEffect, useRef, useState } from 'react';

type Disp = { nome: string; id: string; temp: number; umid?: number; bateria: number };
type Alerta = { disp: string; param: string; hora: string };

const DISPOSITIVOS: Disp[] = [
  { nome: 'Câmara fria 01', id: 'SRZ-01061', temp: 4.6, umid: 78, bateria: 100 },
  { nome: 'Caminhão 12 · baú', id: 'SRZ-01089', temp: 3.9, umid: 74, bateria: 90 },
  { nome: 'Geladeira de vacinas', id: 'SRZ-01082', temp: 4.2, bateria: 80 },
  { nome: 'Câmara de congelados', id: 'SRZ-01075', temp: -18.4, bateria: 100 },
];

// Fila de alertas que chegam durante a animação (parâmetros com os nomes usados na CORE).
const FILA: { disp: number; param: string; valor?: number }[] = [
  { disp: 1, param: 'Temperatura', valor: 8.6 },
  { disp: 2, param: 'Potência Externa' },
  { disp: 0, param: 'Nível da Luz' },
  { disp: 3, param: 'Temperatura', valor: -14.9 },
];

const HISTORICO: Alerta[] = [
  { disp: 'Câmara fria 02', param: 'Temperatura', hora: '19/10 06:35' },
  { disp: 'Caminhão 07 · baú', param: 'Impacto', hora: '18/10 18:01' },
  { disp: 'Geladeira de insumos', param: 'Potência Externa', hora: '18/10 07:28' },
  { disp: 'Câmara fria 02', param: 'Nível da Luz', hora: '17/10 17:53' },
  { disp: 'Caminhão 15 · baú', param: 'Temperatura', hora: '17/10 07:20' },
];

const BATERIA = [
  { nome: 'Caminhão 15 · baú', valor: 12 },
  { nome: 'Estoque de frutas', valor: 15 },
  { nome: 'Câmara resfriada 01', valor: 15 },
  { nome: 'Expedição', valor: 18 },
];

const TOTAL = 36;
const CICLO_MS = 6500; // um alerta novo a cada ciclo
const ACAO_MS = 3800; // tempo até a equipe agir e o dispositivo voltar ao normal

const fmt = (v: number) => v.toFixed(1).replace('.', ',');
const hora = (min: number) => `19/10 ${String(11 + Math.floor((40 + min) / 60)).padStart(2, '0')}:${String((40 + min) % 60).padStart(2, '0')}`;

export default function PainelCore() {
  const ref = useRef<HTMLElement>(null);
  const [pausado, setPausado] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const [passo, setPasso] = useState(0); // quantos alertas da fila já chegaram
  const [emAtencao, setEmAtencao] = useState<number | null>(null);
  const [tique, setTique] = useState(0); // pequena variação das leituras

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setVisivel(true); return; }
    const o = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.25 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pausado || !visivel || menosMovimento) return;
    const ciclo = setInterval(() => setPasso((p) => (p >= FILA.length ? 0 : p + 1)), CICLO_MS); // depois do último, recomeça
    const leituras = setInterval(() => setTique((t) => t + 1), 2000);
    return () => { clearInterval(ciclo); clearInterval(leituras); };
  }, [pausado, visivel]);

  // Cada alerta novo deixa o dispositivo em "Atenção" até a equipe agir.
  useEffect(() => {
    if (passo === 0) { setEmAtencao(null); return; }
    setEmAtencao(FILA[passo - 1].disp);
    const t = setTimeout(() => setEmAtencao(null), ACAO_MS);
    return () => clearTimeout(t);
  }, [passo]);

  const novos: Alerta[] = FILA.slice(0, passo).map((a, k) => ({ disp: DISPOSITIVOS[a.disp].nome, param: a.param, hora: hora(k * 7 + 2) })).reverse();
  const ultimos = [...novos, ...HISTORICO].slice(0, 5);
  const alertasHoje = 1 + passo;
  const score = emAtencao === null ? 97 : 94;
  const excecoes = emAtencao === null ? 1 : 2;
  const atual = emAtencao === null ? null : FILA[passo - 1];

  return (
    <figure className="core-janela" ref={ref} aria-label="Exemplo da tela inicial da Sensoriz CORE com dados ilustrativos">
      <div className="core-janela__barra">
        <span className="core-janela__marca" aria-hidden="true" />
        <span className="core-janela__empresa">Distribuidora Exemplo</span>
        <button type="button" className="leituras__pausa core-janela__pausa" onClick={() => setPausado((v) => !v)}>{pausado ? 'Retomar' : 'Pausar'}</button>
      </div>
      <div className="core-janela__corpo">
        <nav className="core-menu" aria-hidden="true">
          <span className="core-menu__item core-menu__item--ativo">Home</span>
          <span className="core-menu__item">Relatórios</span>
          <span className="core-menu__item">Dispositivos</span>
          <span className="core-menu__item">Administração</span>
        </nav>
        <div className="core-painel">
          <p className="core-aba">Dashboard inicial</p>
          <div className="core-kpis">
            <Kpi rotulo="Dispositivos ativos" valor={TOTAL} />
            <Kpi rotulo="Alertas hoje" valor={alertasHoje} destaque />
            <Kpi rotulo="Total semanal" valor={10 + alertasHoje} />
          </div>
          <div className="core-widgets">
            <section className="core-card core-score">
              <h3 className="core-card__titulo">Sensoriz Score</h3>
              <div className="core-segmento" aria-hidden="true"><span className="core-segmento__ativo">Dia</span><span>Semana</span><span>Mensal</span></div>
              <p className="core-suave">19 de outubro</p>
              <p className={`core-score__anel${emAtencao !== null ? ' core-score__anel--atencao' : ''}`}><span className="dado">{score}</span><span className="core-suave">/100</span></p>
              <p className={`core-score__estado${emAtencao !== null ? ' core-score__estado--atencao' : ''}`}>{emAtencao === null ? 'Saudável' : 'Atenção'}</p>
              <p className="core-suave">{excecoes} de {TOTAL} dispositivos com exceção</p>
              <span className={`core-barra${emAtencao !== null ? ' core-barra--atencao' : ''}`}><span style={{ width: `${score}%` }} /></span>
            </section>
            <section className="core-card">
              <h3 className="core-card__titulo">Últimos alertas</h3>
              <ul className="core-lista">
                {ultimos.map((a, k) => (
                  <li key={`${a.disp}-${a.hora}`} className={k === 0 && passo > 0 ? 'core-lista__novo' : undefined}>
                    <span className="core-ponto core-ponto--critico" aria-hidden="true" />
                    <span className="core-lista__texto"><strong>{a.disp}</strong><span className="core-suave">{a.param}</span></span>
                    <span className="core-suave dado">{a.hora}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="core-card core-ocultar-movel">
              <h3 className="core-card__titulo">Bateria crítica</h3>
              <ul className="core-lista">
                {BATERIA.map((b) => (
                  <li key={b.nome}>
                    <span className="core-ponto core-ponto--critico" aria-hidden="true" />
                    <span className="core-lista__texto"><strong>{b.nome}</strong><span className="core-suave">Bateria em <span className="dado">{b.valor}%</span></span></span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="core-dispositivos">
            {DISPOSITIVOS.map((d, k) => {
              const alerta = emAtencao === k;
              const valor = alerta && atual?.valor !== undefined ? atual.valor : d.temp + (((tique + k) % 3) - 1) * 0.1;
              return (
                <div className={`core-card core-disp${k > 1 ? ' core-ocultar-movel' : ''}`} key={d.id}>
                  <p className="core-disp__nome">{d.nome}</p>
                  <p className="core-suave dado">{d.id}</p>
                  <div className="core-disp__leitura">
                    <span className="core-card__titulo">Temperatura</span>
                    <span className={`dado core-disp__valor${alerta && atual?.valor !== undefined ? ' core-disp__valor--atencao' : ''}`}>{fmt(valor)}<span className="core-disp__unidade">°C</span></span>
                  </div>
                  <div className="core-disp__rodape">
                    <span className="core-suave">Umidade <span className="dado">{d.umid ? `${d.umid}%` : '-'}</span></span>
                    <span className={`chip chip--${alerta ? 'atencao' : 'normal'}`}>{alerta ? 'Atenção' : 'Normal'}</span>
                    <span className="core-suave">Bateria <span className="dado">{d.bateria}%</span></span>
                    <span className="core-suave dado">{hora(passo * 7 + k)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <figcaption className="apoio core-janela__nota">Tela inicial da Sensoriz CORE · dados ilustrativos</figcaption>
    </figure>
  );
}

function Kpi({ rotulo, valor, destaque }: { rotulo: string; valor: number; destaque?: boolean }) {
  return (
    <div className="core-card core-kpi">
      <span className={`core-kpi__icone${destaque ? ' core-kpi__icone--destaque' : ''}`} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 20 20"><path d={destaque ? 'M10 3a5 5 0 0 0-5 5v3l-1.5 3h13L15 11V8a5 5 0 0 0-5-5zM8 16a2 2 0 0 0 4 0' : 'M5 5h10v10H5zM8 2v3M12 2v3M8 15v3M12 15v3M2 8h3M2 12h3M15 8h3M15 12h3'} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" /></svg>
      </span>
      <span><span className="core-card__titulo">{rotulo}</span><span className="core-kpi__valor dado">{valor}</span></span>
    </div>
  );
}
