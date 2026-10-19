import Link from 'next/link';
import Trilha from '@/components/Trilha';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import JsonLd from '@/components/JsonLd';
import { NAV } from '@/lib/site';
import { PRODUTOS, GRUPOS_PRODUTO } from '@/lib/produtos';
import { trilhaJsonLd, metadados } from '@/lib/seo';

export const metadata = metadados({ titulo: 'Produtos', descricao: 'Dispositivos, a plataforma Sensoriz CORE e os serviços de implantação, compliance e suporte.', caminho: '/produtos' });
const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Produtos', caminho: '/produtos' }];
const colunas = NAV.find((n) => n.href === '/produtos')?.colunas ?? [];

export default function Produtos() {
  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha)]} />
      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <Trilha itens={trilha} />
            <h1 className="display-xl">Produtos</h1>
            <p className="lead">Dispositivos, plataforma e serviço trabalhando juntos.</p>
          </div>
          <div className="grade grade--3">
            {PRODUTOS.map((p) => (
              <article className="card card-link" key={p.slug}>
                <p className="rotulo">{GRUPOS_PRODUTO[p.grupo]}</p>
                <h2 className="display-m"><Link href={`/produtos/${p.slug}`}>{p.nome}</Link></h2>
                <p className="apoio">{p.resumo}</p>
                <ul className="produto__itens">
                  {colunas.find((c) => c.titulo === GRUPOS_PRODUTO[p.grupo])?.itens.map((i) => <li key={i.href}>{i.rotulo}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ChamadaDiagnostico />
    </>
  );
}
