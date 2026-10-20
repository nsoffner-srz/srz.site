import { PARCEIROS } from '@/lib/site';
// Faixa branca com os logos dos programas de aceleração.
export default function Parceiros({ titulo = 'Aceleradas e apoiadas por', detalhado = false }: { titulo?: string; detalhado?: boolean }) {
  // Versão com texto curto de cada programa (página Empresa).
  if (detalhado) {
    return (
      <ul className="grade grade--3 programas">
        {PARCEIROS.map((p) => (
          <li key={p.nome} className="card programa">
            <div className="programa__logo">
              <img src={p.logo} alt={p.nome} width={p.largura} height={p.altura} loading="lazy" decoding="async" style={{ height: p.exibir, width: 'auto' }} />
            </div>
            <h3 className="titulo-secao">{p.nome}</h3>
            <p className="apoio">{p.texto}</p>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="faixa-parceiros">
      <p className="rotulo">{titulo}</p>
      <ul className="faixa-parceiros__logos">
        {PARCEIROS.map((p) => (
          <li key={p.nome}>
            <img src={p.logo} alt={p.nome} width={p.largura} height={p.altura} loading="lazy" decoding="async" style={{ height: p.exibir, width: 'auto' }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
