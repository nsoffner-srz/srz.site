import type { Case } from '@/lib/cases';
import { SETORES_ROTULO } from '@/lib/site';
// Card de case: cenário, solução, resultado e depoimento (quando houver).
export default function CaseCard({ c, completo = false }: { c: Case; completo?: boolean }) {
  return (
    <article className="card case">
      <p className="rotulo">{SETORES_ROTULO[c.setor]} · {c.segmento}</p>
      <p className="case__cliente">{c.cliente}</p>
      <h3 className="apoio">{c.titulo}</h3>
      {c.resultado && <p className="case__resultado">{c.resultado}</p>}
      {completo && (
        <dl className="case__etapas">
          <div><dt>Cenário</dt><dd>{c.cenario}</dd></div>
          <div><dt>Solução</dt><dd>{c.solucao}</dd></div>
        </dl>
      )}
      {c.depoimento ? (
        <figure className="depoimento">
          <blockquote>{c.depoimento.texto}</blockquote>
          <figcaption className="apoio">{c.depoimento.autor}</figcaption>
        </figure>
      ) : (
        <p className="pendente">Depoimento e resultados pendentes</p>
      )}
    </article>
  );
}
