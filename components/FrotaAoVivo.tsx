'use client';
// Visual vivo da solução Estoque em movimento: a frota inteira num quadro.
// Três caminhões em rota; um faz uma parada fora do previsto com a porta aberta, a temperatura cruza o
// gatilho, a equipe é avisada, a porta fecha e o caminhão segue. Os outros continuam normais.
// A animação segura nos momentos de alerta e de volta ao normal, para dar tempo de ler. Valores ilustrativos.
import { useEffect, useState } from 'react';

const N = 32;
const PAUSA_FINAL = 6;
const GATILHO = 8;
const PARA = 8; // parada fora do previsto (porta aberta)
const SEGUE = 17; // porta fechada, caminhão segue

// Temperatura do caminhão 12: estável, sobe com a porta aberta, volta depois que fecha.
const TEMP_12 = [
  4.6, 4.7, 4.5, 4.6, 4.8, 4.7, 4.6, 4.7, 5.2, 5.9, 6.6, 7.3, 7.9, 8.4, 8.8, 9.0, 8.9,
  8.3, 7.5, 6.7, 6.0, 5.4, 5.0, 4.8, 4.7, 4.6, 4.7, 4.6, 4.5, 4.6, 4.7, 4.6,
];
const CRUZA = TEMP_12.findIndex((v) => v > GATILHO);
const VOLTA = TEMP_12.findIndex((v, i) => i > CRUZA && v <= GATILHO);
const QUADRO_PARADO = CRUZA + 2;

const espera = (p: number) =>
  p === CRUZA ? 3500 : p === VOLTA ? 2800 : p === PARA ? 1800 : p > CRUZA && p < VOLTA ? 650 : 420;
const hora = (i: number) => { const m = 14 * 60 + i * 2; return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`; };
const fmt = (v: number) => v.toFixed(1).replace('.', ',').replace('-', '−');

// Avanço na rota (0 a 1) de cada caminhão em cada passo. O 12 fica parado entre PARA e SEGUE.
const avanco12 = (i: number) => 0.18 + 0.022 * (Math.min(i, PARA) + Math.max(0, i - SEGUE));

export default function FrotaAoVivo() {
  const [passo, setPasso] = useState(QUADRO_PARADO);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let atual = 0;
    setPasso(0);
    let t: ReturnType<typeof setTimeout>;
    const avanca = () => { t = setTimeout(() => { atual = (atual + 1) % (N + PAUSA_FINAL); setPasso(atual); avanca(); }, espera(atual)); };
    avanca();
    return () => clearTimeout(t);
  }, [pausado]);

  const i = Math.min(passo, N - 1);
  const parado = i >= PARA && i < SEGUE;
  const emAlerta = i >= CRUZA && i < VOLTA;
  const resolvido = i >= VOLTA;
  const oscila = (k: number) => ((i + k) % 3 - 1) * 0.1;

  const caminhoes = [
    { nome: 'Caminhão 07', carga: 'Resfriados', avanco: 0.08 + 0.026 * i, temp: 4.4 + oscila(1), situacao: 'Em rota', alerta: false },
    { nome: 'Caminhão 12', carga: 'Medicamentos', avanco: avanco12(i), temp: TEMP_12[i], situacao: parado ? 'Parado fora da rota · porta aberta' : 'Em rota', alerta: emAlerta },
    { nome: 'Caminhão 15', carga: 'Congelados', avanco: 0.3 + 0.019 * i, temp: -18.6 + oscila(2), situacao: 'Em rota', alerta: false },
  ];

  const legenda = resolvido
    ? `Porta fechada e caminhão 12 de volta à rota. Temperatura na faixa às ${hora(VOLTA)}, ocorrência registrada`
    : emAlerta
      ? `Caminhão 12 acima de ${GATILHO} °C: equipe de logística avisada às ${hora(CRUZA)}`
      : parado
        ? `Caminhão 12 parou fora do previsto às ${hora(PARA)}, com a porta aberta`
        : 'Três caminhões em rota, todos dentro da faixa';

  return (
    <figure className="leitura rota frota" aria-label="Exemplo de frota refrigerada monitorada em rota">
      <div className="leitura__topo">
        <div>
          <p className="leitura__parametro">Estoque em movimento</p>
          <p className="leitura__ativo">Frota de distribuição · 3 caminhões</p>
          <p className="apoio">Leitura das <span className="dado">{hora(i)}</span></p>
        </div>
        <span className={`chip chip--${emAlerta ? 'atencao' : 'normal'}`}>{emAlerta ? 'Atenção' : 'Normal'}</span>
      </div>
      <ul className="frota__lista">
        {caminhoes.map((c) => (
          <li key={c.nome} className={`frota__item${c.alerta ? ' frota__item--atencao' : ''}`}>
            <div className="frota__linha">
              <span className="frota__nome">{c.nome} <span className="frota__carga">· {c.carga}</span></span>
              <span className="frota__temp"><span className="dado">{fmt(c.temp)}</span> °C</span>
            </div>
            <span className="frota__trilho" aria-hidden="true">
              <span className="frota__percorrido" style={{ width: `${Math.min(c.avanco, 1) * 100}%` }} />
              <span className="frota__ponto" style={{ left: `${Math.min(c.avanco, 1) * 100}%` }} />
            </span>
            <span className={`frota__situacao${c.alerta || c.situacao !== 'Em rota' ? ' frota__situacao--aviso' : ''}`}>{c.alerta ? 'Atenção · ' : ''}{c.situacao}</span>
          </li>
        ))}
      </ul>
      <figcaption className={`apoio${emAlerta ? ' leitura__alerta' : ''}`}>{legenda} · exemplo ilustrativo</figcaption>
      <button type="button" className="leituras__pausa" onClick={() => setPausado((v) => !v)}>{pausado ? 'Retomar' : 'Pausar'}</button>
    </figure>
  );
}
