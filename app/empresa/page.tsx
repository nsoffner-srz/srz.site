import Trilha from '@/components/Trilha';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import JsonLd from '@/components/JsonLd';
import { trilhaJsonLd, metadados } from '@/lib/seo';

export const metadata = metadados({ titulo: 'Empresa', descricao: 'A Sensoriz desenvolve a plataforma Sensoriz CORE e integra hardware de parceiros internacionais para monitorar ativos sensíveis em tempo real.', caminho: '/empresa' });
const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Empresa', caminho: '/empresa' }];
const SOCIOS = [
  { nome: 'Rodrigo Amaral', cargo: 'Fundador e CEO' },
  { nome: 'Leonardo Rissi', cargo: 'CTO' },
  { nome: 'Leonard Lorentziadis', cargo: 'CSO' },
  { nome: 'Natan Pace', cargo: 'CFO' },
  { nome: 'Nicole Soffner', cargo: 'CMO' },
];

export default function Empresa() {
  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha)]} />
      <section className="pagina-topo">
        <div className="container pagina-topo__grade">
          <Trilha itens={trilha} />
          <h1 className="display-xl">A Sensoriz existe para que nada de valor se perca longe dos olhos</h1>
          <p className="lead">Desenvolvemos a plataforma Sensoriz CORE e trabalhamos com hardware de parceiros internacionais para que operações de alimentos, medicamentos, saúde e indústria vejam o que acontece com os seus ativos, ajam antes do prejuízo e provem que tudo esteve dentro do padrão.</p>
          <p className="pendente">História da empresa: pendente</p>
        </div>
      </section>
      <section className="secao secao--branca">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Sócios</p><h2 className="display-l">Quem faz a Sensoriz</h2></div>
          <ul className="grade grade--3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {SOCIOS.map((s) => (
              <li className="card case" key={s.nome}><p className="titulo-secao">{s.nome}</p><p className="apoio">{s.cargo}</p><p className="pendente">Foto e mini bio pendentes</p></li>
            ))}
          </ul>
        </div>
      </section>
      <section className="secao">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Programas</p><h2 className="display-l">Aceleração e apoio</h2></div>
          <div className="grade grade--2">
            <div className="card case"><p className="titulo-secao">WOW Aceleradora</p><p className="pendente">Logo e texto pendentes</p></div>
            <div className="card case"><p className="titulo-secao">Sebrae for Startups</p><p className="pendente">Logo e texto pendentes</p></div>
          </div>
        </div>
      </section>
      <ChamadaDiagnostico />
    </>
  );
}
