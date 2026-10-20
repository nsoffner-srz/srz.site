import Link from 'next/link';
import Trilha from '@/components/Trilha';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import JsonLd from '@/components/JsonLd';
import { SETORES } from '@/lib/setores';
import { CASOS_DE_USO } from '@/lib/casos-de-uso';
import { trilhaJsonLd, metadados } from '@/lib/seo';

export const metadata = metadados({
  titulo: 'Soluções',
  descricao: 'Soluções da Sensoriz por setor (logística e cadeia fria, farmácias e clínicas, saúde, ativos de alto valor) e por caso de uso (estoque parado e em movimento).',
  caminho: '/solucoes',
});
const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Soluções', caminho: '/solucoes' }];

export default function Solucoes() {
  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha)]} />
      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <Trilha itens={trilha} />
            <h1 className="display-xl">Soluções</h1>
            <p className="lead">Operações diferentes, o mesmo desafio: cuidar do que está longe.</p>
          </div>
          <h2 className="rotulo" id="por-setor" style={{ marginBottom: 'var(--space-3)' }}>Por setor</h2>
          <div className="grade grade--2">
            {SETORES.map((s) => (
              <article className="card card-link" key={s.id}>
                <h3 className="display-m"><Link href={`/solucoes/${s.id}`}>{s.nome}</Link></h3>
                <p className="apoio">{s.resumo}</p>
              </article>
            ))}
          </div>
          <h2 className="rotulo" style={{ margin: 'var(--space-6) 0 var(--space-3)' }}>Por caso de uso</h2>
          <div className="grade grade--2">
            {CASOS_DE_USO.map((c) => (
              <article className="card card-link" key={c.slug}>
                <h3 className="display-m"><Link href={`/solucoes/${c.slug}`}>{c.nome}</Link></h3>
                <p className="apoio">{c.resumo}</p>
              </article>
            ))}
          </div>
          <Link className="card menu__chamada" style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4) var(--space-5)' }} href="/diagnostico?objetivo=roi">
            <strong>Calcule seu ROI</strong>
            <span>Veja o retorno na sua operação, com o nosso time.</span>
          </Link>
        </div>
      </section>
      <ChamadaDiagnostico />
    </>
  );
}
