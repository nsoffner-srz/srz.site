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
      {c.depoimentos.length > 0 ? (
        // Na versão resumida (home) aparece só o primeiro depoimento; na completa, todos.
        (completo ? c.depoimentos : c.depoimentos.slice(0, 1)).map((d) => (
          <figure className="depoimento" key={d.texto}>
            <blockquote>“{d.texto}”</blockquote>
            <figcaption className="apoio">{d.autor}</figcaption>
          </figure>
        ))
      ) : (
        <p className="pendente">Depoimento e resultados pendentes</p>
      )}
    </article>
  );
}
