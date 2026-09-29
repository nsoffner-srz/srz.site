// Dados estruturados (schema.org) no HTML da página.
export default function JsonLd({ dados }: { dados: Record<string, unknown>[] }) {
  return (
    <>
      {dados.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
    </>
  );
}
