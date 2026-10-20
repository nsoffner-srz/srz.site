import Link from 'next/link';
import Trilha from '@/components/Trilha';
import Perguntas from '@/components/Perguntas';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import JsonLd from '@/components/JsonLd';
import PainelCore from '@/components/core/PainelCore';
import EsquemaAlertas from '@/components/core/EsquemaAlertas';
import FotoProduto from '@/components/FotoProduto';
import { GRUPOS_PRODUTO, type Produto } from '@/lib/produtos';
import { DISPOSITIVOS, MODELOS_HUB } from '@/lib/hardware';
import { SETORES_ROTULO } from '@/lib/site';
import { faqJsonLd, trilhaJsonLd } from '@/lib/seo';

// Página de produto (/produtos/<slug>). Seções com id viram âncoras usadas pelo menu.
export default function PaginaProduto({ s }: { s: Produto }) {
  const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Produtos', caminho: '/produtos' }, { nome: s.nome, caminho: `/produtos/${s.slug}` }];
  const ehDispositivos = s.slug === 'dispositivos';
  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha), ...faqJsonLd(s.perguntas)]} />
      <section className="pagina-topo">
        <div className="container pagina-topo__grade">
          <Trilha itens={trilha} />
          <p className="rotulo">{GRUPOS_PRODUTO[s.grupo]}</p>
          <h1 className="display-xl">{s.titulo}</h1>
          <p className="lead">{s.resumo}</p>
          <div><Link className="botao botao--primario" href="/diagnostico">Solicitar diagnóstico</Link></div>
        </div>
      </section>

      {s.argumentos && (
        <section className="faixa-argumentos" aria-label="Por que a Sensoriz CORE">
          <ul className="container grade grade--4">
            {s.argumentos.map((a) => (
              <li key={a.titulo}>
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <div><p className="titulo-secao">{a.titulo}</p><p className="apoio">{a.texto}</p></div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {s.secoes.filter((b) => b.vitrine === 'painel').map((b) => (
        <section className="secao vitrine-core" key={b.titulo}>
          <div className="container">
            <div className="secao__topo"><p className="rotulo">Sensoriz CORE</p><h2 className="display-l">{b.titulo}</h2><p className="lead">{b.texto}</p></div>
            <PainelCore />
          </div>
        </section>
      ))}

      {ehDispositivos ? (
        <>
          <section className="secao secao--branca">
            <div className="container">
              <div className="grade grade--3">
                {DISPOSITIVOS.map((d) => (
                  <article className="card dispositivo" id={d.id} key={d.nome}>
                    {d.foto && <FotoProduto foto={d.foto} prioridade />}
                    <p className="dispositivo__uso">“{d.uso}”</p>
                    <h2 className="display-m">{d.nome}</h2>
                    <p className="apoio">{d.resumo}</p>
                    <p className="rotulo">Parâmetros</p>
                    <ul>{d.mede.map((m) => <li key={m}>{m}</li>)}</ul>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className="secao">
            <div className="container">
              <div className="secao__topo"><p className="rotulo">Modelos de hub</p><h2 className="display-l">Um hub para cada aplicação</h2></div>
              <ul className="grade grade--4 modelos-hub">
                {MODELOS_HUB.map((m) => (
                  <li className="card" key={m.nome}>
                    {m.foto ? <FotoProduto foto={m.foto} /> : <p className="pendente foto-produto">Foto pendente</p>}
                    <h3 className="titulo-secao">{m.nome}</h3>
                    <p className="apoio">{m.uso}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      ) : (
        <section className="secao secao--branca">
          <div className="container">
            <div className="grade grade--2">
              {s.secoes.filter((b) => !b.vitrine).map((b) => <div className="card norma" id={b.id} key={b.titulo}><h2 className="titulo-secao">{b.titulo}</h2><p className="apoio">{b.texto}</p></div>)}
            </div>
          </div>
        </section>
      )}

      {s.integridade && (
        <section className="secao" id="integridade">
          <div className="container integridade">
            <div className="secao__topo"><p className="rotulo">Anvisa e auditorias</p><h2 className="display-l">{s.integridade.titulo}</h2></div>
            <p className="lead integridade__texto">{s.integridade.texto}</p>
            <ul className="integridade__principios" aria-label="Princípios ALCOA++">
              {s.integridade.principios.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        </section>
      )}

      {s.alertas && (
        <section className="secao" id="alertas">
          <div className="container">
            <div className="secao__topo"><p className="rotulo">Alertas e gestão por exceção</p><h2 className="display-l">{s.alertas.titulo}</h2></div>
            <EsquemaAlertas />
            <div className="grade grade--4" style={{ marginTop: 'var(--space-5)' }}>
              {s.alertas.itens.map((a, k) => (
                <div className="card norma" key={a.titulo}><span className="pilares__n dado">0{k + 1}</span><h3 className="titulo-secao">{a.titulo}</h3><p className="apoio">{a.texto}</p></div>
              ))}
            </div>
            {s.alertas.limites && (
              <div className="card limites-alerta" id="limites">
                <h3 className="titulo-secao">{s.alertas.limites.titulo}</h3>
                <ol className="grade grade--3 limites-alerta__lista">
                  {s.alertas.limites.itens.map((l) => (
                    <li key={l.nome}><p className="rotulo">{l.nome}</p><p className="apoio">{l.texto}</p></li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="secao">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Onde se aplica</p><h2 className="display-l">Setores</h2></div>
          <ul className="lista-links">
            {s.setores.map((id) => <li key={id}><Link className="botao botao--secundario" href={`/solucoes/${id}`}>{SETORES_ROTULO[id]}</Link></li>)}
          </ul>
        </div>
      </section>
      <section className="secao secao--branca"><div className="container"><Perguntas itens={s.perguntas} /></div></section>
      <ChamadaDiagnostico />
    </>
  );
}
