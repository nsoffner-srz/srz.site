import Link from 'next/link';
import Trilha from '@/components/Trilha';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import JsonLd from '@/components/JsonLd';
import { SETORES } from '@/lib/setores';
import { trilhaJsonLd, metadados } from '@/lib/seo';

export const metadata = metadados({ titulo: 'Setores atendidos', descricao: 'Logística e cadeia fria, farmácias e clínicas, saúde e indústria: onde a Sensoriz monitora ativos sensíveis em tempo real.', caminho: '/setores' });
const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Setores', caminho: '/setores' }];

export default function Setores() {
  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha)]} />
      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <Trilha itens={trilha} />
            <h1 className="display-xl">Setores</h1>
            <p className="lead">Operações diferentes com o mesmo problema: ativos sensíveis longe dos olhos de quem responde por eles.</p>
          </div>
          <div className="grade grade--2">
            {SETORES.map((s) => (
              <article className="card card-link" key={s.id}>
                <h2 className="display-m"><Link href={`/setores/${s.id}`}>{s.nome}</Link></h2>
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
