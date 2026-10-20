'use client';
// Visual vivo de Ativos de Alto Valor: um pallet de servidores passando pelas etapas, do embarque ao destino final,
// no padrão da CORE (estado em palavra e histórico). Mostra com quem está a carga em cada etapa.
// No voo o hub entra em modo avião, segue registrando e envia o histórico no pouso (sem status ao vivo). No descarregamento, um impacto vira ocorrência
// registrada com hora, local e etapa. Valores ilustrativos; nenhum caso real.
import { useEffect, useState } from 'react';

const ETAPAS = ['Origem', 'Voo', 'Terminal', 'Estrada', 'Destino'];

type Passo = { etapa: number; guarda: string; hora: string; registro?: string; alerta?: boolean; fim?: boolean; legenda: string; ms: number };
const PASSOS: Passo[] = [
  { etapa: 0, guarda: 'Exportador e agente de carga', hora: 'Seg 18:20', registro: 'Pallet embarcado na origem', legenda: 'Pallet com o hub embarcado na origem', ms: 2600 },
  { etapa: 1, guarda: 'Companhia aérea', hora: 'Seg 22:05', registro: 'Decolou · hub em modo avião', legenda: 'Em voo: o hub entra em modo avião sozinho e continua registrando', ms: 3200 },
  { etapa: 2, guarda: 'Terminal de cargas', hora: 'Ter 06:10', registro: 'Pousou · histórico do voo enviado', legenda: 'No pouso, o histórico completo do voo chega à CORE', ms: 3200 },
  { etapa: 2, guarda: 'Terminal de cargas', hora: 'Ter 07:05', registro: 'Chegou ao terminal de cargas', legenda: 'No terminal, aguardando o desembaraço', ms: 2400 },
  { etapa: 2, guarda: 'Terminal de cargas', hora: 'Qui 14:30', registro: 'Liberado e retirado do terminal', legenda: 'Carga liberada e retirada pela transportadora', ms: 2400 },
  { etapa: 3, guarda: 'Transportadora', hora: 'Qui 15:05', registro: 'Em trânsito para o destino final', legenda: 'Na estrada, a caminho do destino final', ms: 2600 },
  { etapa: 4, guarda: 'Transportadora e equipe do destino', hora: 'Qui 16:42', registro: 'Impacto de 9 G no descarregamento', alerta: true, legenda: 'Impacto no descarregamento: equipe do destino e transportadora avisadas às 16:42', ms: 4500 },
  { etapa: 4, guarda: 'Equipe do destino', hora: 'Qui 16:50', registro: 'Recebido no destino final', fim: true, legenda: 'Ocorrência registrada com hora, local e etapa, pronta para o contrato e o seguro', ms: 4500 },
];
const QUADRO_PARADO = 6;

export default function PalletAoVivo() {
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

  return (
    <figure className="leitura rota pallet" aria-label="Exemplo de pallet de servidores acompanhado do embarque ao destino final">
      <div className="leitura__topo">
        <div>
          <p className="leitura__parametro">Custódia do pallet</p>
          <p className="leitura__ativo">Pallet 03 · Servidores</p>
          <p className="apoio">Última atualização <span className="dado">{p.hora}</span></p>
        </div>
        <span className={`chip chip--${p.alerta ? 'atencao' : 'normal'}`}>{p.alerta ? 'Atenção' : 'Normal'}</span>
      </div>
      <ol className="pallet__trilha" style={{ ['--progresso' as string]: p.etapa / (ETAPAS.length - 1) }}>
        {ETAPAS.map((e, k) => (
          <li key={e} className={`pallet__etapa${k < p.etapa ? ' pallet__etapa--feita' : ''}${k === p.etapa ? ' pallet__etapa--atual' : ''}${k === p.etapa && p.alerta ? ' pallet__etapa--atencao' : ''}`}>
            <span className="pallet__marca" aria-hidden="true" />
            <span className="pallet__nome">{e}</span>
          </li>
        ))}
      </ol>
      <p className="pallet__guarda"><span className="rotulo">Com quem está</span>{p.guarda}</p>
      <p className={`hospital__evidencia${p.fim ? '' : ' hospital__evidencia--oculta'}`} aria-hidden={!p.fim}>Ocorrência registrada · pronta para o seguro</p>
      <ol className="hospital__historico" aria-label="Histórico do pallet">
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
