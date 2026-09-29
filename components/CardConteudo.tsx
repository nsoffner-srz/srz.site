import Link from 'next/link';
import { TEMAS, type Tema } from '@/lib/site';
import { formatarData } from '@/lib/seo';
export default function CardConteudo({ slug, titulo, descricao, tema, data }: { slug: string; titulo: string; descricao: string; tema: Tema; data: Date }) {
  return (
    <article className="card card-link">
      <p className="rotulo">{TEMAS[tema]}</p>
      <h3 className="titulo-secao"><Link href={`/conteudo/${slug}`}>{titulo}</Link></h3>
      <p className="apoio">{descricao}</p>
      <p className="apoio card-conteudo__data"><time dateTime={data.toISOString()}>{formatarData(data)}</time></p>
    </article>
  );
}
