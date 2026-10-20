'use client';
// Visual vivo da página de Farmácias: a geladeira durante a madrugada, com os três limites (out/2026).
// A energia cai às 00:36 e o hub na tomada avisa na hora. A temperatura passa do limite de alerta,
// a tendência dispara o limite de ação, a energia volta e a temperatura retorna sem sair da especificação.
// Mesma linguagem do gráfico da home. Valores ilustrativos.
import { useEffect, useState } from 'react';
import GraficoLimites from './GraficoLimites';
import { ALERTA, CHIP, ESPEC, fmt, minutosAteEspec, type Nivel } from '@/lib/limites';

const PASSO_MS = 260;
const MIN_POR_LEITURA = 12;

// 40 leituras, uma a cada 12 min, das 22:00 às 05:48.
const SERIE = [
  4.6, 4.7, 4.5, 4.6, 4.8, 4.7, 4.6, 4.5, 4.7, 4.6, 4.8, 4.7, 4.6,
  4.9, 5.4, 5.9, 6.4, 6.8, 7.2, 7.5, 7.7, // energia caiu (passo 13)
  7.6, 7.3, 6.8, 6.2, 5.6, 5.1, 4.9, // energia voltou (passo 21)
  4.7, 4.6, 4.7, 4.8, 4.6, 4.5, 4.7, 4.6, 4.7, 4.6, 4.5, 4.6,
];
const N = SERIE.length;
const QUEDA = 13;
const I_ALERTA = SERIE.findIndex((v) => v > ALERTA[1]);
const I_ACAO = SERIE.findIndex((v, k) => k > I_ALERTA && v >= 7.5);
const VOLTA_ENERGIA = 21;
const I_NORMAL = SERIE.findIndex((v, k) => k > VOLTA_ENERGIA && v <= ALERTA[1]);
const QUADRO_PARADO = I_ACAO;
const PAUSA_FINAL = 8;
const MIN_ACAO = minutosAteEspec(SERIE, I_ACAO, MIN_POR_LEITURA);

const hora = (i: number) => {
  const m = 22 * 60 + i * MIN_POR_LEITURA;
  return `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};
// Segura nos avisos (queda, alerta, ação) e na volta ao normal, para dar tempo de ler.
const espera = (p: number) =>
  p === QUEDA || p === I_ALERTA || p === I_ACAO ? 3500 : p === I_NORMAL ? 3000 : p === VOLTA_ENERGIA ? 2500 : p > QUEDA && p < I_NORMAL ? 550 : PASSO_MS;

export default function GeladeiraAoVivo() {
  const [passo, setPasso] = useState(QUADRO_PARADO);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setPasso(0);
    let atual = 0;
    let t: ReturnType<typeof setTimeout>;
    const avanca = () => { t = setTimeout(() => { atual = (atual + 1) % (N + PAUSA_FINAL); setPasso(atual); avanca(); }, espera(atual)); };
    avanca();
    return () => clearTimeout(t);
  }, [pausado]);

  const i = Math.min(passo, N - 1);
  const semEnergia = i >= QUEDA && i < VOLTA_ENERGIA;
  const nivel: Nivel = i >= I_NORMAL || i < I_ALERTA ? 'normal' : i >= I_ACAO ? 'acao' : 'alerta';
  // Antes do limite de alerta, a queda de energia já é um aviso (Atenção).
  const chip = nivel === 'normal' && semEnergia ? CHIP.alerta : CHIP[nivel];

  const legenda = i >= I_NORMAL
    ? `Energia de volta e temperatura na faixa às ${hora(I_NORMAL)}. Nenhuma excursão: o produto não saiu da especificação`
    : i >= VOLTA_ENERGIA
      ? `Energia de volta às ${hora(VOLTA_ENERGIA)}. A temperatura começa a cair`
      : i >= I_ACAO
        ? `Limite de ação: no ritmo atual, passa de ${ESPEC[1]} °C em cerca de ${MIN_ACAO} min. Responsável técnico age`
        : i >= I_ALERTA
          ? `Limite de alerta: acima de ${ALERTA[1]} °C às ${hora(I_ALERTA)}. Responsável técnico avisado`
          : i >= QUEDA
            ? `Queda de energia às ${hora(QUEDA)}: responsável técnico avisado na hora`
            : 'Farmácia fechada, geladeira dentro da faixa normal';

  return (
    <figure className="leitura rota" aria-label="Exemplo de geladeira de farmácia monitorada durante a madrugada">
      <div className="leitura__topo">
        <div>
          <p className="leitura__parametro">Estoque parado</p>
          <p className="leitura__ativo">Geladeira de insumos 01</p>
          <p className="apoio">Farmácia fechada · especificação {ESPEC[0]} a {ESPEC[1]} °C</p>
        </div>
        <span className={`chip chip--${chip.classe}`}>{chip.texto}</span>
      </div>
      <div className="leitura__valores">
        <p className="leitura__valor"><span className="dado">{fmt(SERIE[i])}</span><span className="leitura__unidade">°C</span></p>
        <dl className="leitura__meta">
          <div><dt className="rotulo">Alerta</dt><dd><span className="dado">{ALERTA[0]} a {ALERTA[1]}</span> °C</dd></div>
          <div><dt className="rotulo">Energia</dt><dd>{semEnergia ? 'Desligada' : 'Ligada'}</dd></div>
          <div><dt className="rotulo">Leitura</dt><dd><span className="dado">{hora(i)}</span></dd></div>
        </dl>
      </div>
      <GraficoLimites
        id="geladeira"
        serie={SERIE}
        i={i}
        periodo={[QUEDA, VOLTA_ENERGIA]}
        projetar={i >= I_ACAO && i < VOLTA_ENERGIA}
        marcas={[
          { indice: QUEDA, tipo: 'evento', pulsa: i >= QUEDA && i < I_ALERTA },
          { indice: I_ALERTA, tipo: 'alerta', pulsa: i >= I_ALERTA && i < I_ACAO },
          { indice: I_ACAO, tipo: 'acao', pulsa: i >= I_ACAO && i < I_NORMAL },
        ]}
      />
      <figcaption className={`apoio${i >= QUEDA && i < I_NORMAL ? ' leitura__alerta' : ''}`}>
        {legenda}{' · exemplo ilustrativo'}
      </figcaption>
      <button type="button" className="leituras__pausa" onClick={() => setPausado((v) => !v)}>{pausado ? 'Retomar' : 'Pausar'}</button>
    </figure>
  );
}
