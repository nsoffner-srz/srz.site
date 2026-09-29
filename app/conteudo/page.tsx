import Trilha from '@/components/Trilha';
import CardConteudo from '@/components/CardConteudo';
import FiltrosConteudo from '@/components/FiltrosConteudo';
import JsonLd from '@/components/JsonLd';
import { artigos } from '@/lib/conteudo';
import { trilhaJsonLd, metadados } from '@/lib/seo';

export const metadata = metadados({ titulo: 'Conteúdo', descricao: 'Normas, perdas, gestão da operação e tecnologia para quem responde por alimentos, medicamentos e equipamentos de alto valor.', caminho: '/conteudo' });
const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Conteúdo', caminho: '/conteudo' }];

export default function Conteudo() {
  const lista = artigos();
  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha)]} />
      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <Trilha itens={trilha} />
            <h1 className="display-xl">Conteúdo</h1>
            <p className="lead">Normas, perdas e gestão da operação, em detalhe.</p>
          </div>
          <FiltrosConteudo atual="/conteudo" />
          {lista.length ? (
            <div className="grade grade--3">{lista.map((a) => <CardConteudo key={a.slug} slug={a.slug} titulo={a.titulo} descricao={a.descricao} tema={a.tema} data={a.publicado} />)}</div>
          ) : <p className="apoio">Nenhum artigo publicado ainda.</p>}
        </div>
      </section>
    </>
  );
}
