import Link from 'next/link';
import { TEMAS } from '@/lib/site';
import { formatarData } from '@/lib/seo';
import type { Artigo } from '@/lib/conteudo';
// Card da seção Conteúdo. A foto aparece quando existe public/conteudo/capas/<slug>.*
export default function CardConteudo({ artigo: a }: { artigo: Artigo }) {
  return (
    <article className={`card card-link${a.capa ? ' card-conteudo--foto' : ''}`}>
      {a.capa && <img className="card-conteudo__foto" src={a.capa} alt="" loading="lazy" decoding="async" width={1200} height={675} />}
      <p className="rotulo">{TEMAS[a.tema]}</p>
      <h3 className="titulo-secao"><Link href={`/conteudo/${a.slug}`}>{a.titulo}</Link></h3>
      <p className="apoio">{a.descricao}</p>
      <p className="apoio card-conteudo__data"><time dateTime={a.publicado.toISOString()}>{formatarData(a.publicado)}</time></p>
    </article>
  );
}
