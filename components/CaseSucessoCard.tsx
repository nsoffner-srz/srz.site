import Link from 'next/link';
import type { CaseSucesso } from '@/lib/cases';
// Card de case de sucesso: o resultado em destaque e a comparação antes x com a Sensoriz. Sem nome de cliente.
export default function CaseSucessoCard({ c }: { c: CaseSucesso }) {
  const d = c.destaque;
  return (
    <article className="card case-sucesso">
      <header className="case-sucesso__topo">
        <p className="rotulo">{c.segmento} · {c.contexto}</p>
        <p className="case-sucesso__numero">
          {d.prefixo && <span className="case-sucesso__prefixo">{d.prefixo}</span>}
          <span className="dado">{d.valor}</span>
          {d.unidade && <span className="case-sucesso__unidade">{d.unidade}</span>}
        </p>
        <p className="case-sucesso__rotulo">{d.rotulo}</p>
      </header>
      <div className="case-sucesso__comparacao">
        <div className="case-sucesso__antes">
          <p className="rotulo">Antes</p>
          <p>{c.antes} {c.problema}</p>
        </div>
        <div className="case-sucesso__depois">
          <p className="rotulo">Com a Sensoriz</p>
          <p>{c.como} <strong>{c.resultado}</strong></p>
        </div>
      </div>
      {c.depoimento && (
        <figure className="case-sucesso__depoimento">
          <blockquote>“{c.depoimento.texto}”</blockquote>
          <figcaption className="apoio">{c.depoimento.autor}</figcaption>
        </figure>
      )}
      <p className="case-sucesso__link apoio"><Link href={c.href}>Ver a solução</Link></p>
    </article>
  );
}
