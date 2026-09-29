import Link from 'next/link';
import Trilha from '@/components/Trilha';
import CardConteudo from '@/components/CardConteudo';
import FiltrosConteudo from '@/components/FiltrosConteudo';
import JsonLd from '@/components/JsonLd';
import { artigos } from '@/lib/conteudo';
import { SETORES_ROTULO, type SetorId } from '@/lib/site';
import { trilhaJsonLd, metadados } from '@/lib/seo';

type Props = { params: Promise<{ setor: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(SETORES_ROTULO).map((setor) => ({ setor }));

export async function generateMetadata({ params }: Props) {
  const setor = (await params).setor as SetorId;
  const vazio = !artigos().some((a) => a.setores.includes(setor));
  return metadados({ titulo: `${SETORES_ROTULO[setor]} | Conteúdo`, descricao: `Artigos da Sensoriz para ${SETORES_ROTULO[setor].toLowerCase()}.`, caminho: `/conteudo/setor/${setor}`, semIndice: vazio });
}

export default async function SetorConteudo({ params }: Props) {
  const setor = (await params).setor as SetorId;
  const nome = SETORES_ROTULO[setor];
  const lista = artigos().filter((a) => a.setores.includes(setor));
  const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Conteúdo', caminho: '/conteudo' }, { nome, caminho: `/conteudo/setor/${setor}` }];
  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha)]} />
      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <Trilha itens={trilha} />
            <h1 className="display-l">Conteúdo para {nome}</h1>
            <p className="apoio"><Link href={`/setores/${setor}`}>Ver como a Sensoriz atende {nome}</Link></p>
          </div>
          <FiltrosConteudo atual={`/conteudo/setor/${setor}`} />
          {lista.length ? (
            <div className="grade grade--3">{lista.map((a) => <CardConteudo key={a.slug} artigo={a} />)}</div>
          ) : <p className="apoio">Ainda não há artigos para este setor.</p>}
        </div>
      </section>
    </>
  );
}
