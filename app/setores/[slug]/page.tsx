// Modelo único das páginas de setor (7 blocos). O conteúdo vem de lib/setores.ts.
// A seção de norma só aparece quando existe norma que exige monitoramento no setor.
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Trilha from '@/components/Trilha';
import Perguntas from '@/components/Perguntas';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import CardConteudo from '@/components/CardConteudo';
import CaseCard from '@/components/CaseCard';
import JsonLd from '@/components/JsonLd';
import { SETORES, setorPorId } from '@/lib/setores';
import { casesDoSetor } from '@/lib/cases';
import { artigos } from '@/lib/conteudo';
import { faqJsonLd, trilhaJsonLd, metadados } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => SETORES.map((s) => ({ slug: s.id }));

export async function generateMetadata({ params }: Props) {
  const s = setorPorId((await params).slug)!;
  return metadados({ titulo: `${s.nome}: monitoramento em tempo real`, descricao: s.resumo, caminho: `/setores/${s.id}` });
}

export default async function PaginaSetor({ params }: Props) {
  const s = setorPorId((await params).slug);
  if (!s) notFound();
  const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Setores', caminho: '/setores' }, { nome: s.nome, caminho: `/setores/${s.id}` }];
  const cases = casesDoSetor(s.id);
  const relacionados = artigos().filter((a) => a.setores.includes(s.id)).slice(0, 3);

  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha), ...faqJsonLd(s.perguntas)]} />
      <section className="pagina-topo">
        <div className="container pagina-topo__grade">
          <Trilha itens={trilha} />
          <p className="rotulo">{s.nome}</p>
          <h1 className="display-xl">{s.tituloHero}</h1>
          <p className="lead">{s.subtituloHero}</p>
          <p className="apoio"><strong>Para quem:</strong> {s.publico}</p>
          <div className="acoes">
            <Link className="botao botao--primario" href={`/diagnostico?setor=${s.id}`}>Solicitar diagnóstico</Link>
            <a className="botao botao--secundario" href="#como-resolve">Ver como funciona</a>
          </div>
        </div>
      </section>

      {/* 1. Dor e custo */}
      <section className="secao secao--branca">
        <div className="container duas-colunas">
          <div><p className="rotulo">O problema</p><h2 className="display-l">{s.dor.titulo}</h2></div>
          <div className="duas-colunas__texto">
            <p className="lead">{s.dor.texto}</p>
            <p className="dor__custo">{s.dor.custo}</p>
          </div>
        </div>
      </section>

      {/* 2. O que a norma exige (só quando existe norma de monitoramento) */}
      {s.normas.length > 0 && (
        <section className="secao">
          <div className="container">
            <div className="secao__topo">
              <p className="rotulo">O que a norma exige</p>
              <h2 className="display-l">Registro pronto para a fiscalização</h2>
            </div>
            <div className="grade grade--2">
              {s.normas.map((n) => (
                <div className="card norma" key={n.nome}>
                  <h3 className="titulo-secao">{n.nome}</h3>
                  <p className="norma__vale">Vale para: {n.valePara}</p>
                  <ul>{n.exige.map((e) => <li key={e}>{e}</li>)}</ul>
                </div>
              ))}
            </div>
            <p className="apoio" style={{ marginTop: 'var(--space-4)' }}>Resumo para orientação. Consulte a norma completa.</p>
          </div>
        </section>
      )}

      {/* 3. Ver, Agir, Provar */}
      <section className="secao secao--branca" id="como-resolve">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Como a Sensoriz resolve</p><h2 className="display-l">Ver, agir e provar</h2></div>
          <ol className="grade grade--3 pilares">
            <li className="card"><span className="pilares__n dado">01</span><h3 className="titulo-secao">Ver</h3><p className="apoio">{s.comoResolve.ver}</p></li>
            <li className="card"><span className="pilares__n dado">02</span><h3 className="titulo-secao">Agir</h3><p className="apoio">{s.comoResolve.agir}</p></li>
            <li className="card"><span className="pilares__n dado">03</span><h3 className="titulo-secao">Provar</h3><p className="apoio">{s.comoResolve.provar}</p></li>
          </ol>
        </div>
      </section>

      {/* 4. Configuração típica */}
      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <p className="rotulo">Configuração típica</p>
            <h2 className="display-l">O que é instalado</h2>
            <p className="apoio">Ambientes atendidos: {s.ambientes.join(' · ')}.</p>
          </div>
          <dl className="config__lista">
            {s.configuracao.map((c) => <div key={c.item}><dt>{c.item}</dt><dd className="apoio">{c.detalhe}</dd></div>)}
          </dl>
          <p className="apoio"><Link href="/solucoes/dispositivos">Ver todos os dispositivos</Link></p>
          <p className="pendente" style={{ marginTop: 'var(--space-3)' }}>Foto dos dispositivos instalados neste setor: pendente</p>
        </div>
      </section>

      {/* 5. Case ou depoimento */}
      <section className="secao secao--branca">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Resultado em operação</p><h2 className="display-l">{cases.length > 1 ? 'Clientes do setor' : 'Case do setor'}</h2></div>
          {cases.length > 0 ? (
            <div className="grade grade--2">{cases.map((c) => <CaseCard c={c} completo key={c.id} />)}</div>
          ) : (
            <div className="card case"><p className="pendente">Case e depoimento: pendentes</p></div>
          )}
        </div>
      </section>

      {/* 6. Perguntas frequentes */}
      <section className="secao"><div className="container"><Perguntas itens={s.perguntas} /></div></section>

      {relacionados.length > 0 && (
        <section className="secao secao--branca">
          <div className="container">
            <div className="secao__topo"><p className="rotulo">Conteúdo</p><h2 className="display-l">Para aprofundar</h2></div>
            <div className="grade grade--3">{relacionados.map((a) => <CardConteudo key={a.slug} slug={a.slug} titulo={a.titulo} descricao={a.descricao} tema={a.tema} data={a.publicado} />)}</div>
          </div>
        </section>
      )}

      {/* 7. CTA */}
      <ChamadaDiagnostico />
    </>
  );
}
