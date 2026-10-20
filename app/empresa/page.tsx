import Trilha from '@/components/Trilha';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import JsonLd from '@/components/JsonLd';
import { trilhaJsonLd, metadados } from '@/lib/seo';
import Parceiros from '@/components/Parceiros';

export const metadata = metadados({ titulo: 'Empresa', descricao: 'A Sensoriz desenvolve a plataforma Sensoriz CORE e integra hardware de parceiros internacionais para monitorar ativos sensíveis em tempo real.', caminho: '/empresa' });
const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Empresa', caminho: '/empresa' }];
// Fotos e bios: apresentação institucional dos sócios (out/2026). Fotos em public/fotos/socios.
const SOCIOS = [
  { id: 'rodrigo-amaral', nome: 'Rodrigo Amaral', cargo: 'CEO e fundador', bio: 'Engenheiro de Produção, com mais de 12 anos em inovação tecnológica e supply chain. Liderou projetos logísticos em grandes multinacionais.' },
  { id: 'leonard-lorentziadis', nome: 'Leonard Lorentziadis', cargo: 'CCO', bio: 'Especialista em negócios médico-hospitalares, com mais de 20 anos no setor. Cofundador da Biocare e da Sparkia e conselheiro estratégico, com rede no Brasil e no exterior.' },
  { id: 'natan-pace', nome: 'Natan Pace', cargo: 'CFO', bio: 'Engenheiro de Produção, com experiência como controller em empresas de tecnologia. Perfil analítico, com atuação no mercado financeiro e foco em excelência operacional.' },
  { id: 'leonardo-rissi', nome: 'Leonardo Rissi', cargo: 'CTO', bio: 'Engenheiro de software, com mais de 15 anos criando sistemas escaláveis para startups e grandes empresas. Foco em alta performance e robustez.' },
  { id: 'nicole-soffner', nome: 'Nicole Soffner', cargo: 'CMO', bio: 'Mais de 10 anos em estratégia digital e branding B2B, entre grandes empresas e a própria agência, a NICZO. Experiência em logística, inovação e projetos orientados a dados.' },
];

export default function Empresa() {
  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha)]} />
      <section className="pagina-topo">
        <div className="container pagina-topo__grade">
          <Trilha itens={trilha} />
          <h1 className="display-xl">A Sensoriz existe para que nada de valor se perca longe dos olhos</h1>
          <p className="lead">Desenvolvemos a plataforma Sensoriz CORE e trabalhamos com parceiros internacionais de hardware. Para que você veja, aja e prove.</p>
        </div>
      </section>
      <section className="secao secao--branca">
        <div className="container historia">
          <div className="secao__topo"><p className="rotulo">História</p><h2 className="display-l">Por que a Sensoriz existe</h2></div>
          <div className="prosa">
            <p>Alimentos, vacinas e medicamentos são descartados porque saíram da temperatura certa em algum ponto do caminho. Equipamentos de alto valor chegam avariados sem que se saiba onde aconteceu. Quase sempre, a perda só é descoberta no fim, quando já não há o que fazer.</p>
            <p>A Sensoriz foi fundada em fevereiro de 2024 por Rodrigo Amaral, Leonardo Rissi e Natan Pace para mudar isso, a partir de mais de uma década de experiência em operações logísticas. Com o tempo, novos sócios se juntaram para levar esse trabalho a mais setores.</p>
            <p>Hoje atuamos com alimentos, farmácias, saúde, logística e ativos de alto valor. O objetivo é o mesmo em todos: menos desperdício, operações em conformidade e produtos que chegam inteiros a quem depende deles.</p>
          </div>
        </div>
      </section>
      <section className="secao">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Sócios</p><h2 className="display-l">Quem faz a Sensoriz</h2></div>
          <ul className="socios">
            {SOCIOS.map((s) => (
              <li className="card socio" key={s.id}>
                <img className="socio__foto" src={`/fotos/socios/${s.id}.webp`} alt={`Foto de ${s.nome}`} width={480} height={480} loading="lazy" decoding="async" />
                <p className="rotulo">{s.cargo}</p>
                <h3 className="titulo-secao">{s.nome}</h3>
                <p className="apoio">{s.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="secao secao--branca">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Programas</p><h2 className="display-l">Aceleração e apoio</h2></div>
          <Parceiros detalhado />
        </div>
      </section>
      <ChamadaDiagnostico />
    </>
  );
}
