// Página de artigo: gera Article + FAQPage + Breadcrumb em dados estruturados.
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Trilha from '@/components/Trilha';
import Perguntas from '@/components/Perguntas';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import JsonLd from '@/components/JsonLd';
import { artigos, artigo } from '@/lib/conteudo';
import { TEMAS, SETORES_ROTULO, SITE } from '@/lib/site';
import { faqJsonLd, trilhaJsonLd, metadados, formatarData } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => artigos().map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props) {
  const a = artigo((await params).slug)!;
  return metadados({ titulo: a.titulo, descricao: a.descricao, caminho: `/conteudo/${a.slug}`, tipo: 'article', imagem: a.capa });
}

export default async function Artigo({ params }: Props) {
  const a = artigo((await params).slug);
  if (!a) notFound();
  const trilha = [
    { nome: 'Início', caminho: '/' },
    { nome: 'Conteúdo', caminho: '/conteudo' },
    { nome: TEMAS[a.tema], caminho: `/conteudo/tema/${a.tema}` },
    { nome: a.titulo, caminho: `/conteudo/${a.slug}` },
  ];
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.titulo,
    description: a.descricao,
    datePublished: a.publicado.toISOString(),
    dateModified: (a.atualizado ?? a.publicado).toISOString(),
    inLanguage: 'pt-BR',
    mainEntityOfPage: `${SITE.url}/conteudo/${a.slug}`,
    author: { '@type': 'Organization', name: a.autor, url: SITE.url },
    publisher: { '@id': `${SITE.url}/#organizacao` },
    about: a.setores.map((s) => SETORES_ROTULO[s]),
    ...(a.palavrasChave.length ? { keywords: a.palavrasChave.join(', ') } : {}),
    ...(a.capa ? { image: `${SITE.url}${a.capa}` } : {}),
  };
  return (
    <>
      <JsonLd dados={[articleLd, trilhaJsonLd(trilha), ...faqJsonLd(a.perguntas)]} />
      <article className="secao">
        <div className="container artigo">
          <header className="artigo__topo">
            <Trilha itens={trilha} />
            {a.rascunho && <p className="pendente">Rascunho: não aparece no site publicado</p>}
            <p className="rotulo"><Link href={`/conteudo/tema/${a.tema}`}>{TEMAS[a.tema]}</Link></p>
            <h1 className="display-l">{a.titulo}</h1>
            <p className="lead">{a.descricao}</p>
            <p className="apoio">
              {a.autor} · <time dateTime={a.publicado.toISOString()}>{formatarData(a.publicado)}</time>
              {a.atualizado && <> · atualizado em <time dateTime={a.atualizado.toISOString()}>{formatarData(a.atualizado)}</time></>}
            </p>
            {a.setores.length > 0 && (
              <ul className="artigo__setores">
                {a.setores.map((s) => <li key={s}><Link className="chip chip--info" href={`/conteudo/setor/${s}`}>{SETORES_ROTULO[s]}</Link></li>)}
              </ul>
            )}
          </header>
          {a.capa && (
            <figure className="artigo__capa">
              <img src={a.capa} alt={a.capaAlt ?? ''} width={1200} height={675} fetchPriority="high" decoding="async" />
              {a.capaCredito && <figcaption className="apoio">{a.capaCredito}</figcaption>}
            </figure>
          )}
          <div className="prosa" dangerouslySetInnerHTML={{ __html: a.html }} />
          {a.origem && <p className="apoio">Publicado originalmente no <a href={a.origem}>LinkedIn da Sensoriz</a>.</p>}
          {a.perguntas.length > 0 && <div style={{ maxWidth: '70ch' }}><Perguntas itens={a.perguntas} titulo="Resumo em perguntas" /></div>}
        </div>
      </article>
      <ChamadaDiagnostico />
    </>
  );
}
