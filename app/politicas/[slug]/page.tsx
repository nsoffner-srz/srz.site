import Link from 'next/link';
import { notFound } from 'next/navigation';
import Trilha from '@/components/Trilha';
import JsonLd from '@/components/JsonLd';
import { metadados, trilhaJsonLd } from '@/lib/seo';
import { politicas, politica } from '@/lib/politicas';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => politicas().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props) {
  const p = politica((await params).slug)!;
  return metadados({ titulo: p.titulo, descricao: p.descricao, caminho: `/politicas/${p.slug}` });
}

export default async function PaginaPolitica({ params }: Props) {
  const p = politica((await params).slug);
  if (!p) notFound();
  const trilha = [
    { nome: 'Início', caminho: '/' },
    { nome: 'Políticas', caminho: '/politicas' },
    { nome: p.titulo, caminho: `/politicas/${p.slug}` },
  ];
  const outras = politicas().filter((o) => o.slug !== p.slug);
  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha)]} />
      <article className="secao">
        <div className="container politica">
          <header className="artigo__topo">
            <Trilha itens={trilha} />
            <p className="rotulo"><Link href="/politicas">Políticas e governança</Link></p>
            <h1 className="display-l">{p.titulo}</h1>
            <p className="apoio">{p.nomeOficial}</p>
          </header>
          {p.secoes.length > 2 && (
            <nav className="politica__sumario" aria-label="Nesta política">
              <p className="rotulo">Nesta política</p>
              <ul>{p.secoes.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.titulo}</a></li>)}</ul>
            </nav>
          )}
          <div className="prosa" dangerouslySetInnerHTML={{ __html: p.html }} />
          <nav className="politica__outras" aria-label="Outras políticas">
            <p className="rotulo">Outras políticas</p>
            <ul>{outras.map((o) => <li key={o.slug}><Link href={`/politicas/${o.slug}`}>{o.titulo}</Link></li>)}</ul>
          </nav>
        </div>
      </article>
    </>
  );
}
