import type { Setor } from '@/lib/setores';

// Esquema de custódia (Ativos de Alto Valor): etapas da viagem, quem tem a guarda e o que cada tecnologia cobre.
// Faixa cheia = cobre (ao vivo ou registrando para enviar depois); tracejada = a validar na rota do cliente. Cada célula também diz em palavras.
export default function EsquemaCustodia({ c }: { c: NonNullable<Setor['custodia']> }) {
  return (
    <div className="custodia">
      <ol className="custodia__etapas" style={{ ['--n' as string]: c.etapas.length }}>
        {c.etapas.map((e, k) => (
          <li className="custodia__etapa" key={e.nome}>
            <span className="custodia__n dado">{String(k + 1).padStart(2, '0')}</span>
            <h3 className="custodia__nome">{e.nome}</h3>
            <p className="custodia__guarda"><span className="rotulo">Com quem está</span>{e.guarda}</p>
            <p className={`custodia__faixa custodia__faixa--hub-${e.hub}`}>
              <span className="custodia__rotulo-faixa">Hub Sensoriz no pallet</span>
              <span className="custodia__estado">{e.hub === 'sim' ? 'Acompanha' : e.hub === 'registra' ? 'Registra · envia no pouso' : 'Testar na rota'}</span>
            </p>
            <p className={`custodia__faixa custodia__faixa--caminhao-${e.caminhao ? 'sim' : 'nao'}`}>
              <span className="custodia__rotulo-faixa">Rastreador do caminhão</span>
              <span className="custodia__estado">{e.caminhao ? 'Acompanha' : 'Não vê'}</span>
            </p>
          </li>
        ))}
      </ol>
      <p className="apoio custodia__nota">{c.nota}</p>
    </div>
  );
}
