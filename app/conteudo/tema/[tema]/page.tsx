import Trilha from '@/components/Trilha';
import CardConteudo from '@/components/CardConteudo';
import FiltrosConteudo from '@/components/FiltrosConteudo';
import JsonLd from '@/components/JsonLd';
import { artigos } from '@/lib/conteudo';
import { TEMAS, type Tema } from '@/lib/site';
import { trilhaJsonLd, metadados } from '@/lib/seo';

type Props = { params: Promise<{ tema: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(TEMAS).map((tema) => ({ tema }));

export async function generateMetadata({ params }: Props) {
  const tema = (await params).tema as Tema;
  const vazio = !artigos().some((a) => a.tema === tema);
  return metadados({ titulo: `${TEMAS[tema]} | Conteúdo`, descricao: `Artigos da Sensoriz sobre ${TEMAS[tema].toLowerCase()}.`, caminho: `/conteudo/tema/${tema}`, semIndice: vazio });
}

export default async function Tema({ params }: Props) {
  const tema = (await params).tema as Tema;
  const lista = artigos().filter((a) => a.tema === tema);
  const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Conteúdo', caminho: '/conteudo' }, { nome: TEMAS[tema], caminho: `/conteudo/tema/${tema}` }];
  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha)]} />
      <section className="secao">
        <div className="container">
          <div className="secao__topo"><Trilha itens={trilha} /><h1 className="display-l">{TEMAS[tema]}</h1></div>
          <FiltrosConteudo atual={`/conteudo/tema/${tema}`} />
          {lista.length ? (
            <div className="grade grade--3">{lista.map((a) => <CardConteudo key={a.slug} slug={a.slug} titulo={a.titulo} descricao={a.descricao} tema={a.tema} data={a.publicado} />)}</div>
          ) : <p className="apoio">Ainda não há artigos neste tema.</p>}
        </div>
      </section>
    </>
  );
}
