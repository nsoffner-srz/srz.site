// Perguntas frequentes. Abrem por toque e já vêm no HTML (buscadores e IA leem mesmo fechadas).
export default function Perguntas({ itens, titulo = 'Perguntas frequentes' }: { itens: { pergunta: string; resposta: string }[]; titulo?: string }) {
  if (!itens.length) return null;
  return (
    <section className="perguntas" aria-label={titulo}>
      <h2 className="display-m">{titulo}</h2>
      <div className="perguntas__lista">
        {itens.map((i) => (
          <details key={i.pergunta}>
            <summary>{i.pergunta}</summary>
            <p>{i.resposta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
