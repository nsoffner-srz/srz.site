import Link from 'next/link';
import Trilha from '@/components/Trilha';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import JsonLd from '@/components/JsonLd';
import { SOLUCOES } from '@/lib/solucoes';
import { trilhaJsonLd, metadados } from '@/lib/seo';

export const metadata = metadados({ titulo: 'Soluções', descricao: 'Sensoriz CORE, monitoramento ambiental, dispositivos, serviço de compliance e integrações.', caminho: '/solucoes' });
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
            <p className="lead">Dispositivos, plataforma e serviço trabalhando juntos.</p>
          </div>
          <div className="grade grade--2">
            {SOLUCOES.map((s) => (
              <article className="card card-link" key={s.slug}>
                <h2 className="display-m"><Link href={`/solucoes/${s.slug}`}>{s.nome}</Link></h2>
                <p className="apoio">{s.resumo}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ChamadaDiagnostico />
    </>
  );
}
