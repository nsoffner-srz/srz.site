import { PARCEIROS } from '@/lib/site';
// Faixa escura com os logos dos programas de aceleração (os logos são brancos).
export default function Parceiros({ titulo = 'Aceleradas e apoiadas por' }: { titulo?: string }) {
  return (
    <div className="faixa-parceiros">
      <p className="rotulo">{titulo}</p>
      <ul className="faixa-parceiros__logos">
        {PARCEIROS.map((p) => (
          <li key={p.nome}>
            <img src={p.logo} alt={p.nome} width={p.largura} height={p.altura} loading="lazy" decoding="async" className={p.largura / p.altura > 3 ? 'logo-largo' : 'logo-alto'} />
          </li>
        ))}
      </ul>
    </div>
  );
}
