import Link from 'next/link';
import { notFound } from 'next/navigation';
import Trilha from '@/components/Trilha';
import Perguntas from '@/components/Perguntas';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import JsonLd from '@/components/JsonLd';
import { SOLUCOES } from '@/lib/solucoes';
import { DISPOSITIVOS, MODELOS_HUB } from '@/lib/hardware';
import { SETORES_ROTULO } from '@/lib/site';
import { faqJsonLd, trilhaJsonLd, metadados } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => SOLUCOES.map((s) => ({ slug: s.slug }));
const achar = (slug: string) => SOLUCOES.find((s) => s.slug === slug);

export async function generateMetadata({ params }: Props) {
  const s = achar((await params).slug)!;
  return metadados({ titulo: s.nome, descricao: s.resumo, caminho: `/solucoes/${s.slug}` });
}

export default async function PaginaSolucao({ params }: Props) {
  const s = achar((await params).slug);
  if (!s) notFound();
  const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Soluções', caminho: '/solucoes' }, { nome: s.nome, caminho: `/solucoes/${s.slug}` }];
  const ehDispositivos = s.slug === 'dispositivos';
  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha), ...faqJsonLd(s.perguntas)]} />
      <section className="pagina-topo">
        <div className="container pagina-topo__grade">
          <Trilha itens={trilha} />
          <p className="rotulo">{s.nome}</p>
          <h1 className="display-xl">{s.titulo}</h1>
          <p className="lead">{s.resumo}</p>
          <div><Link className="botao botao--primario" href="/diagnostico">Solicitar diagnóstico</Link></div>
        </div>
      </section>

      {ehDispositivos ? (
        <>
          <section className="secao secao--branca">
            <div className="container">
              <div className="grade grade--3">
                {DISPOSITIVOS.map((d) => (
                  <article className="card dispositivo" key={d.nome}>
                    <h2 className="display-m">{d.nome}</h2>
                    <p className="apoio">{d.resumo}</p>
                    <p className="rotulo">Mede</p>
                    <ul>{d.mede.map((m) => <li key={m}>{m}</li>)}</ul>
                  </article>
                ))}
              </div>
              <p className="pendente" style={{ marginTop: 'var(--space-4)' }}>Fotos dos dispositivos: pendentes</p>
            </div>
          </section>
          <section className="secao">
            <div className="container">
              <div className="secao__topo"><p className="rotulo">Modelos de hub</p><h2 className="display-l">Um hub para cada aplicação</h2></div>
              <dl className="config__lista">
                {MODELOS_HUB.map((m) => <div key={m.nome}><dt>{m.nome}</dt><dd className="apoio">{m.uso}</dd></div>)}
              </dl>
            </div>
          </section>
        </>
      ) : (
        <section className="secao secao--branca">
          <div className="container">
            <div className="grade grade--2">
              {s.blocos.map((b) => <div className="card norma" key={b.titulo}><h2 className="titulo-secao">{b.titulo}</h2><p className="apoio">{b.texto}</p></div>)}
            </div>
          </div>
        </section>
      )}

      <section className="secao">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Onde se aplica</p><h2 className="display-l">Setores</h2></div>
          <ul className="lista-links">
            {s.setores.map((id) => <li key={id}><Link className="botao botao--secundario" href={`/setores/${id}`}>{SETORES_ROTULO[id]}</Link></li>)}
          </ul>
        </div>
      </section>
      <section className="secao secao--branca"><div className="container"><Perguntas itens={s.perguntas} /></div></section>
      <ChamadaDiagnostico />
    </>
  );
}
