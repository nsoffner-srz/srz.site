'use client';
// Esquema animado dos alertas da Sensoriz CORE: exceção → grupo certo → canal certo, no horário certo.
// Regra de risco (out/2026): mostra o resultado, nunca a configuração nem a lógica que decide o alerta.
// Dois cenários se alternam: um de dia (vai para a qualidade) e um de madrugada (vai para o plantão).
import { useEffect, useState } from 'react';

const CANAIS = ['WhatsApp', 'E-mail', 'SMS', 'Telegram', 'Google Chat', 'Microsoft Teams'];
const GRADE = ['Horário comercial', 'Noite e fim de semana'];

const CENARIOS = [
  {
    hora: '14:20', ativo: 'Câmara fria 02', excecao: 'Temperatura acima de 8 °C',
    grade: 0, grupo: 'Qualidade', canais: ['WhatsApp', 'E-mail'],
    resultado: 'Equipe de qualidade avisada às 14:20',
  },
  {
    hora: '02:14', ativo: 'Geladeira de vacinas', excecao: 'Queda de energia',
    grade: 1, grupo: 'Plantão', canais: ['WhatsApp', 'SMS'],
    resultado: 'Responsável de plantão avisado às 02:14',
  },
];
// Passos de cada cenário: 0 exceção, 1 grade/grupo, 2 canais, 3 resultado.
const ESPERA = [1600, 1800, 1800, 3800];

export default function EsquemaAlertas() {
  const [cena, setCena] = useState(0);
  const [passo, setPasso] = useState(3);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let c = 0, p = 0;
    setCena(0); setPasso(0);
    let t: ReturnType<typeof setTimeout>;
    const avanca = () => {
      t = setTimeout(() => {
        p += 1;
        if (p > 3) { p = 0; c = (c + 1) % CENARIOS.length; setCena(c); }
        setPasso(p);
        avanca();
      }, ESPERA[p]);
    };
    avanca();
    return () => clearTimeout(t);
  }, [pausado]);

  const s = CENARIOS[cena];
  return (
    <figure className="alertas" aria-label="Exemplo de como a Sensoriz CORE escolhe quem recebe cada alerta">
      <ol className="alertas__fluxo">
        <li className="alertas__etapa alertas__etapa--ativa">
          <p className="rotulo">1 · Exceção</p>
          <p className="alertas__destaque">{s.ativo}</p>
          <p className="alertas__excecao"><span className="chip chip--atencao">Atenção</span> {s.excecao}</p>
          <p className="apoio">Leitura das <span className="dado">{s.hora}</span></p>
        </li>
        <li className={`alertas__etapa${passo >= 1 ? ' alertas__etapa--ativa' : ''}`}>
          <p className="rotulo">2 · Quem recebe</p>
          <ul className="alertas__grade">
            {GRADE.map((g, k) => <li key={g} className={passo >= 1 && k === s.grade ? 'alertas__opcao--sim' : undefined}>{g}</li>)}
          </ul>
          <p className="alertas__grupo">Grupo <strong>{passo >= 1 ? s.grupo : '—'}</strong></p>
        </li>
        <li className={`alertas__etapa${passo >= 2 ? ' alertas__etapa--ativa' : ''}`}>
          <p className="rotulo">3 · Por onde</p>
          <ul className="alertas__canais">
            {CANAIS.map((c) => <li key={c} className={passo >= 2 && s.canais.includes(c) ? 'alertas__opcao--sim' : undefined}>{c}</li>)}
          </ul>
        </li>
      </ol>
      <figcaption className={`alertas__resultado${passo >= 3 ? ' alertas__resultado--ok' : ''}`}>
        <span>{passo >= 3 ? s.resultado : 'Escolhendo quem precisa saber…'}</span>
        <span className="apoio">Fora das exceções, ninguém é chamado · exemplo ilustrativo</span>
      </figcaption>
      <button type="button" className="leituras__pausa alertas__pausa" onClick={() => setPausado((v) => !v)}>{pausado ? 'Retomar' : 'Pausar'}</button>
    </figure>
  );
}
