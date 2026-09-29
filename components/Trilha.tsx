import Link from 'next/link';
// Trilha de navegação (breadcrumb) visível. O dado estruturado vai junto, pela página.
export default function Trilha({ itens }: { itens: { nome: string; caminho: string }[] }) {
  return (
    <nav className="trilha" aria-label="Você está em">
      <ol>
        {itens.map((i, n) => (
          <li key={i.caminho}>{n < itens.length - 1 ? <Link href={i.caminho}>{i.nome}</Link> : <span aria-current="page">{i.nome}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}
