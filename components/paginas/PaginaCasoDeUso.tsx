// Página de solução por caso de uso (/solucoes/estoque-parado e /solucoes/estoque-em-movimento).
import Link from 'next/link';
import Trilha from '@/components/Trilha';
import Perguntas from '@/components/Perguntas';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import JsonLd from '@/components/JsonLd';
import type { CasoDeUso } from '@/lib/casos-de-uso';
import { SETORES_ROTULO } from '@/lib/site';
import ArmazemAoVivo from '@/components/ArmazemAoVivo';
import FrotaAoVivo from '@/components/FrotaAoVivo';
import { faqJsonLd, trilhaJsonLd } from '@/lib/seo';

export default function PaginaCasoDeUso({ c }: { c: CasoDeUso }) {
  const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Soluções', caminho: '/solucoes' }, { nome: c.nome, caminho: `/solucoes/${c.slug}` }];
  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha), ...faqJsonLd(c.perguntas)]} />
      <section className="pagina-topo">
        <div className={`container pagina-topo__grade${c.visual ? ' pagina-topo__grade--visual' : ''}`}>
          {c.visual === 'armazem' && <ArmazemAoVivo />}
          {c.visual === 'frota' && <FrotaAoVivo />}
          <Trilha itens={trilha} />
          <p className="rotulo">{c.nome}</p>
          <h1 className="display-xl">{c.titulo}</h1>
          <p className="lead">{c.resumo}</p>
          <div className="acoes">
            <Link className="botao botao--primario" href="/diagnostico">Solicitar diagnóstico</Link>
            <Link className="botao botao--secundario" href="/solucoes#por-setor">Ver por setor</Link>
          </div>
        </div>
      </section>

      <section className="secao secao--branca">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Onde se aplica</p><h2 className="display-l">Ambientes atendidos</h2></div>
          <ul className="grade grade--4 ambientes">
            {c.ondeSeAplica.map((a) => <li className="card" key={a}>{a}</li>)}
          </ul>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Como funciona</p><h2 className="display-l">Medição, aviso e registro</h2></div>
          <div className="grade grade--2">
            {c.blocos.map((b) => <div className="card norma" key={b.titulo}><h3 className="titulo-secao">{b.titulo}</h3><p className="apoio">{b.texto}</p></div>)}
          </div>
        </div>
      </section>

      <section className="secao secao--branca">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Por setor</p><h2 className="display-l">Veja como funciona no seu setor</h2></div>
          <ul className="lista-links">
            {c.setores.map((id) => <li key={id}><Link className="botao botao--secundario" href={`/solucoes/${id}`}>{SETORES_ROTULO[id]}</Link></li>)}
          </ul>
        </div>
      </section>

      <section className="secao"><div className="container"><Perguntas itens={c.perguntas} /></div></section>
      <ChamadaDiagnostico />
    </>
  );
}
