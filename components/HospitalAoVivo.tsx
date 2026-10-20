'use client';
// Visual vivo do setor Saúde: o caminho de um kit cirúrgico na planta do hospital, no padrão da CORE
// (pino no setor em que o kit está e histórico de passagens). O kit sai da central de material, vai ao
// centro cirúrgico, fica fora do fluxo previsto (aviso à enfermagem) e volta. No fim, o histórico vira
// evidência para o convênio. A localização é por setor, como na página. Valores ilustrativos.
import { useEffect, useState } from 'react';

type Sala = 'central' | 'cirurgico' | 'internacao' | 'farmacia';
const SALAS: { id: Sala; nome: string }[] = [
  { id: 'central', nome: 'Central de material' },
  { id: 'cirurgico', nome: 'Centro cirúrgico' },
  { id: 'internacao', nome: 'Internação · 3º andar' },
  { id: 'farmacia', nome: 'Farmácia hospitalar' },
];
// Centro de cada sala na planta (em % da largura e da altura), para posicionar o pino.
const CENTRO: Record<Sala, { x: number; y: number }> = {
  central: { x: 25, y: 28 }, cirurgico: { x: 75, y: 28 }, internacao: { x: 25, y: 76 }, farmacia: { x: 75, y: 76 },
};

type Passo = { sala: Sala; hora: string; registro?: string; alerta?: boolean; fim?: boolean; legenda: string; ms: number };
const PASSOS: Passo[] = [
  { sala: 'central', hora: '07:40', registro: 'Pronto na central de material', legenda: 'Kit esterilizado e pronto na central de material', ms: 2600 },
  { sala: 'cirurgico', hora: '07:58', registro: 'Entrou no centro cirúrgico', legenda: 'O kit chega ao centro cirúrgico e a passagem fica registrada', ms: 2800 },
  { sala: 'cirurgico', hora: '10:40', registro: 'Saiu do centro cirúrgico', legenda: 'Cirurgia encerrada. O kit deve voltar à central de material', ms: 2200 },
  { sala: 'internacao', hora: '10:46', registro: 'Entrou na internação', legenda: 'O kit foi para a internação, fora do fluxo previsto', ms: 2400 },
  { sala: 'internacao', hora: '11:06', registro: 'Fora do fluxo há 20 min · enfermagem avisada', alerta: true, legenda: 'Kit fora do fluxo há 20 minutos: enfermagem avisada às 11:06', ms: 4200 },
  { sala: 'central', hora: '11:14', registro: 'Voltou à central de material', legenda: 'Kit de volta à central de material', ms: 2600 },
  { sala: 'central', hora: '11:14', fim: true, legenda: 'Saída, uso e retorno registrados: evidência pronta para o convênio', ms: 4200 },
];
const QUADRO_PARADO = 4;

export default function HospitalAoVivo() {
  const [passo, setPasso] = useState(QUADRO_PARADO);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let atual = 0;
    setPasso(0);
    let t: ReturnType<typeof setTimeout>;
    const avanca = () => { t = setTimeout(() => { atual = (atual + 1) % PASSOS.length; setPasso(atual); avanca(); }, PASSOS[atual].ms); };
    avanca();
    return () => clearTimeout(t);
  }, [pausado]);

  const p = PASSOS[passo];
  const historico = PASSOS.slice(0, passo + 1).filter((x) => x.registro).slice(-4).reverse();
  const pos = CENTRO[p.sala];

  return (
    <figure className="leitura rota hospital" aria-label="Exemplo do caminho de um kit cirúrgico dentro do hospital">
      <div className="leitura__topo">
        <div>
          <p className="leitura__parametro">Rastreabilidade de kits</p>
          <p className="leitura__ativo">Kit cirúrgico 14 · Ortopedia</p>
          <p className="apoio">Última passagem às <span className="dado">{p.hora}</span></p>
        </div>
        <span className={`chip chip--${p.alerta ? 'atencao' : 'normal'}`}>{p.alerta ? 'Atenção' : 'Normal'}</span>
      </div>
      <div className="hospital__planta">
        {SALAS.map((s) => (
          <div key={s.id} className={`hospital__sala${p.sala === s.id ? ' hospital__sala--ativa' : ''}${p.sala === s.id && p.alerta ? ' hospital__sala--atencao' : ''}`}>
            {s.nome}
          </div>
        ))}
        <span className={`hospital__pino${p.alerta ? ' hospital__pino--atencao' : ''}`} style={{ left: `${pos.x}%`, top: `${pos.y}%` }} aria-hidden="true" />
      </div>
      {/* Sempre no layout (só aparece no fim), para o card não mudar de altura */}
      <p className={`hospital__evidencia${p.fim ? '' : ' hospital__evidencia--oculta'}`} aria-hidden={!p.fim}>Histórico completo · pronto para o convênio</p>
      <ol className="hospital__historico" aria-label="Histórico de passagens do kit">
        {historico.map((h) => (
          <li key={h.hora + h.registro} className={h.alerta ? 'hospital__registro--atencao' : undefined}>
            <span className="dado">{h.hora}</span> {h.registro}
          </li>
        ))}
      </ol>
      <figcaption className={`apoio${p.alerta ? ' leitura__alerta' : ''}`}>{p.legenda} · exemplo ilustrativo</figcaption>
      <button type="button" className="leituras__pausa" onClick={() => setPausado((v) => !v)}>{pausado ? 'Retomar' : 'Pausar'}</button>
    </figure>
  );
}
