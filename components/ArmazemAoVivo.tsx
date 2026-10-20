'use client';
// Visual vivo da solução Estoque parado: a planta de um armazém com 6 pontos monitorados.
// De madrugada a porta da doca abre e a câmara ao lado esquenta: passa do limite de alerta, a tendência
// dispara o limite de ação e ela sai da especificação (excursão registrada). A porta fecha e a câmara volta.
// Os outros pontos seguem normais (gestão por exceção). Três limites, como na CORE (out/2026).
// A animação segura nos momentos de alerta e de volta ao normal, para dar tempo de ler. Valores ilustrativos.
import { useEffect, useState } from 'react';
import { ALERTA, CHIP, ESPEC, type Nivel } from '@/lib/limites';

const N = 30;
const PORTA_ABRE = 6;
const PORTA_FECHA = 17;
const PAUSA_FINAL = 6;

// Câmara fria 01, ao lado da doca: estável, esquenta com a porta aberta, volta depois que fecha.
const CAMARA = [
  4.6, 4.7, 4.6, 4.5, 4.6, 4.7, 4.8, 5.3, 5.9, 6.5, 7.1, 7.6, 8.1, 8.5, 8.8, 8.9, 8.7,
  8.2, 7.4, 6.6, 5.9, 5.4, 5.0, 4.8, 4.7, 4.6, 4.7, 4.6, 4.5, 4.6,
];
const I_ALERTA = CAMARA.findIndex((v) => v > ALERTA[1]);
const I_ACAO = CAMARA.findIndex((v, i) => i > I_ALERTA && v >= 7.5);
const I_ESPEC = CAMARA.findIndex((v) => v > ESPEC[1]);
const I_DENTRO = CAMARA.findIndex((v, i) => i > I_ESPEC && v <= ESPEC[1]);
const I_NORMAL = CAMARA.findIndex((v, i) => i > I_DENTRO && v <= ALERTA[1]);
const QUADRO_PARADO = I_ESPEC + 1;

type Ponto = { nome: string; faixa: string; base: number; unidade: string; area: string };
const PONTOS: Ponto[] = [
  { nome: 'Câmara fria 01', faixa: '2 a 8 °C', base: 4.6, unidade: '°C', area: 'a' },
  { nome: 'Câmara de congelados', faixa: '−25 a −18 °C', base: -20.4, unidade: '°C', area: 'b' },
  { nome: 'Sala de estoque', faixa: '15 a 25 °C', base: 21.3, unidade: '°C', area: 'c' },
  { nome: 'Doca', faixa: 'Porta', base: 0, unidade: '', area: 'd' },
  { nome: 'Prateleira A', faixa: '15 a 25 °C', base: 22.1, unidade: '°C', area: 'e' },
  { nome: 'Prateleira B', faixa: '40 a 65 %UR', base: 54, unidade: '%UR', area: 'f' },
];

const espera = (p: number) =>
  p === I_ALERTA || p === I_ACAO || p === I_ESPEC ? 3500 : p === I_DENTRO || p === I_NORMAL ? 2800 : p === PORTA_ABRE ? 1800 : p > I_ALERTA && p < I_NORMAL ? 650 : 420;
const hora = (i: number) => `03:${String(i * 2).padStart(2, '0')}`;
const fmt = (v: number, casas = 1) => v.toFixed(casas).replace('.', ',').replace('-', '−');

export default function ArmazemAoVivo() {
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
  const portaAberta = i >= PORTA_ABRE && i < PORTA_FECHA;
  const v = CAMARA[i];
  const nivel: Nivel = v > ESPEC[1] ? 'especificacao' : i >= I_NORMAL || i < I_ALERTA ? 'normal' : i >= I_ACAO && i < I_ESPEC ? 'acao' : 'alerta';
  const chip = CHIP[nivel];
  const excursao = i >= I_DENTRO ? (I_DENTRO - I_ESPEC) * 2 : 0; // min (uma leitura a cada 2 min)
  const oscila = (k: number) => ((i + k) % 3 - 1) * 0.1;

  const legenda = i >= I_NORMAL
    ? `Porta fechada e câmara de volta à faixa normal às ${hora(I_NORMAL)}. Excursão de ${excursao} min registrada`
    : i >= I_DENTRO
      ? `Câmara fria 01 de volta abaixo de ${ESPEC[1]} °C às ${hora(I_DENTRO)}. Fim da excursão registrado`
      : nivel === 'especificacao'
        ? `Fora da especificação: câmara fria 01 acima de ${ESPEC[1]} °C às ${hora(I_ESPEC)}. Excursão registrada`
        : nivel === 'acao'
          ? `Limite de ação: a tendência da câmara fria 01 passa de ${ESPEC[1]} °C. Responsável chamado a agir`
          : nivel === 'alerta'
            ? `Limite de alerta: câmara fria 01 acima de ${ALERTA[1]} °C às ${hora(I_ALERTA)}. Responsável avisado`
            : portaAberta
        ? `Porta da doca aberta às ${hora(PORTA_ABRE)}. A câmara ao lado começa a esquentar`
        : 'Seis pontos dentro da faixa. Ninguém precisa ficar olhando o painel';

  return (
    <figure className="leitura rota armazem" aria-label="Exemplo de armazém com seis pontos monitorados durante a madrugada">
      <div className="leitura__topo">
        <div>
          <p className="leitura__parametro">Estoque parado</p>
          <p className="leitura__ativo">Armazém central · 6 pontos</p>
          <p className="apoio">Leitura das <span className="dado">{hora(i)}</span></p>
        </div>
        <span className={`chip chip--${chip.classe}`}>{chip.texto}</span>
      </div>
      <ul className="armazem__planta">
        {PONTOS.map((p, k) => {
          const camara = k === 0;
          const doca = p.area === 'd';
          const estadoPonto = camara ? chip : CHIP.normal;
          const alerta = camara && nivel !== 'normal';
          const valor = camara ? CAMARA[i] : p.base + oscila(k) * (p.unidade === '%UR' ? 10 : 1);
          return (
            <li key={p.nome} className={`armazem__ponto${alerta ? ` armazem__ponto--${estadoPonto.classe}` : ''}${doca && portaAberta ? ' armazem__ponto--aberta' : ''}`} style={{ gridArea: p.area }}>
              <span className="armazem__nome">{p.nome}</span>
              {doca ? (
                <span className="armazem__valor">{portaAberta ? 'Porta aberta' : 'Porta fechada'}</span>
              ) : (
                <span className="armazem__valor"><span className="dado">{fmt(valor, p.unidade === '%UR' ? 0 : 1)}</span> {p.unidade}</span>
              )}
              <span className="armazem__estado">{doca ? '' : estadoPonto.texto}</span>
            </li>
          );
        })}
      </ul>
      <figcaption className={`apoio${nivel !== 'normal' ? ' leitura__alerta' : ''}`}>{legenda} · exemplo ilustrativo</figcaption>
      <button type="button" className="leituras__pausa" onClick={() => setPausado((v) => !v)}>{pausado ? 'Retomar' : 'Pausar'}</button>
    </figure>
  );
}
