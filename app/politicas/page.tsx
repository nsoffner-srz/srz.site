import Link from 'next/link';
import Trilha from '@/components/Trilha';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/lib/site';
import { metadados, trilhaJsonLd } from '@/lib/seo';
import { politicas } from '@/lib/politicas';

export const metadata = metadados({
  titulo: 'Políticas e governança',
  descricao: 'Código de conduta, direitos humanos, privacidade (LGPD), classificação da informação, gestão de riscos e termos de uso da Sensoriz.',
  caminho: '/politicas',
});

export default function Politicas() {
  const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Políticas', caminho: '/politicas' }];
  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha)]} />
      <section className="secao">
        <div className="container">
          <header className="pagina-topo__grade" style={{ marginBottom: 'var(--space-6)' }}>
            <Trilha itens={trilha} />
            <h1 className="display-l">Políticas e governança</h1>
            <p className="lead">Nosso compromisso com a ética, a segurança dos dados, os direitos humanos e a transparência.</p>
          </header>
          <ul className="grade grade--3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {politicas().map((p) => (
              <li key={p.slug} className="card card-link">
                <h2 className="titulo-secao"><Link href={`/politicas/${p.slug}`}>{p.titulo}</Link></h2>
                <p className="apoio">{p.descricao}</p>
              </li>
            ))}
          </ul>
          <p className="apoio" style={{ marginTop: 'var(--space-6)' }}>
            Dúvidas sobre dados pessoais: <a href="mailto:privacidade@sensoriz.com.br">privacidade@sensoriz.com.br</a>.
            Denúncias e ouvidoria: <a href={SITE.ouvidoria}>ouvidoria@sensoriz.com.br</a>.
          </p>
        </div>
      </section>
    </>
  );
}
