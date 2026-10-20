import Trilha from '@/components/Trilha';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import CaseCard from '@/components/CaseCard';
import CaseSucessoCard from '@/components/CaseSucessoCard';
import JsonLd from '@/components/JsonLd';
import { CASES_PUBLICOS as CASES, CASES_SUCESSO_PUBLICOS as CASES_SUCESSO } from '@/lib/cases';
import { trilhaJsonLd, metadados } from '@/lib/seo';

export const metadata = metadados({ titulo: 'Cases', descricao: 'Resultados de operações que monitoram cargas, estoques e equipamentos com a Sensoriz.', caminho: '/cases' });
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
            <p className="lead">Operações que já monitoram com a Sensoriz.</p>
          </div>
          <div className="grade grade--2">{CASES_SUCESSO.map((c) => <CaseSucessoCard c={c} key={c.id} />)}</div>
          {CASES.length > 0 && (
            <>
              <h2 className="display-l" style={{ margin: 'var(--space-7) 0 var(--space-4)' }}>Clientes ativos</h2>
              <div className="grade grade--3">{CASES.map((c) => <CaseCard c={c} completo key={c.id} />)}</div>
            </>
          )}
        </div>
      </section>
      <ChamadaDiagnostico />
    </>
  );
}
