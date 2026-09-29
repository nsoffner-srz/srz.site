import Trilha from '@/components/Trilha';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import CaseCard from '@/components/CaseCard';
import JsonLd from '@/components/JsonLd';
import { CASES } from '@/lib/cases';
import { trilhaJsonLd, metadados } from '@/lib/seo';

export const metadata = metadados({ titulo: 'Cases', descricao: 'Clientes que monitoram cargas, estoques e equipamentos com a Sensoriz: alimentos congelados, cogumelos frescos e equipamentos de climatização.', caminho: '/cases' });
const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Cases', caminho: '/cases' }];

export default function Cases() {
  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha)]} />
      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <Trilha itens={trilha} />
            <h1 className="display-xl">Cases</h1>
            <p className="lead">Cenário, solução e resultado de operações que monitoram com a Sensoriz.</p>
          </div>
          <div className="grade grade--3">{CASES.map((c) => <CaseCard c={c} completo key={c.id} />)}</div>
        </div>
      </section>
      <ChamadaDiagnostico />
    </>
  );
}
