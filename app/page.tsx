// Home: segue a ordem em que o decisor pensa — a dor, a prova, como funciona e o próximo passo.
import Link from 'next/link';
import LeiturasAoVivo from '@/components/LeiturasAoVivo';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import CardConteudo from '@/components/CardConteudo';
import CaseCard from '@/components/CaseCard';
import JsonLd from '@/components/JsonLd';
import { SETORES } from '@/lib/setores';
import { CASES } from '@/lib/cases';
import { PARAMETROS_HUB } from '@/lib/hardware';
import { artigos } from '@/lib/conteudo';
import { SITE } from '@/lib/site';
import { metadados } from '@/lib/seo';

export const metadata = { ...metadados({ titulo: 'Sensoriz | Monitoramento de ativos sensíveis em tempo real', caminho: '/' }), title: { absolute: 'Sensoriz | Monitoramento de ativos sensíveis em tempo real' } };

const PROBLEMAS = [
  { texto: 'Perdi carga de alimentos ou medicamentos por temperatura', href: '/setores/logistica-e-cadeia-fria' },
  { texto: 'Tenho fiscalização da Anvisa ou da vigilância sanitária', href: '/solucoes/servico-de-compliance' },
  { texto: 'Guardo produto sensível em geladeira, câmara ou sala', href: '/solucoes/monitoramento-ambiental' },
  { texto: 'Equipamentos de alto valor chegam danificados', href: '/setores/industria-e-inventario' },
  { texto: 'Não encontro equipamentos no meu estoque', href: '/setores/industria-e-inventario' },
  { texto: 'Equipamentos somem dentro do hospital', href: '/setores/saude' },
];

const NUMEROS = [
  { valor: '8', unidade: 'parâmetros', texto: 'medidos por um único hub: temperatura, umidade, luz, pressão, impacto, vibração, localização e orientação' },
  { prefixo: 'até', valor: '5', unidade: 'anos', texto: 'de bateria no hub de longa duração, para ativos que ficam anos em operação' },
  { valor: '14–17', unidade: 'G', texto: 'impactos críticos localizados no transporte de equipamentos de um cliente industrial' },
  { valor: '24', unidade: 'h', texto: 'por dia de monitoramento, com aviso só quando algo sai do padrão' },
];

export default function Home() {
  const ultimos = artigos().slice(0, 3);
  return (
    <>
      <JsonLd dados={[{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Sensoriz', url: SITE.url, inLanguage: 'pt-BR' }]} />

      {/* 1. Hero */}
      <section className="hero">
        <div className="container hero__grade">
          <div className="hero__texto">
            <p className="rotulo">Monitoramento de ativos sensíveis</p>
            <h1 className="display-xl">Saiba o que acontece com o que importa, onde você não está</h1>
            <p className="lead">Temperatura, umidade, impacto, localização e mais cinco parâmetros de cargas, estoques, geladeiras e equipamentos em tempo real. A Sensoriz avisa antes que o problema vire prejuízo e gera a prova para a fiscalização.</p>
            <div className="acoes">
              <Link className="botao botao--primario" href="/diagnostico">Solicitar diagnóstico</Link>
              <a className="botao botao--secundario" href="#como-funciona">Ver como funciona</a>
            </div>
          </div>
          <LeiturasAoVivo />
        </div>
      </section>

      {/* 2. Prova social */}
      <section className="prova" aria-label="Quem apoia a Sensoriz">
        <div className="container prova__grade">
          <p className="rotulo">Aceleradas e apoiadas por</p>
          <div className="prova__logos">
            <span className="prova__logo">WOW Aceleradora <span className="pendente">logo pendente</span></span>
            <span className="prova__logo">Sebrae for Startups <span className="pendente">logo pendente</span></span>
          </div>
        </div>
      </section>

      {/* 3. Por onde começar */}
      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <p className="rotulo">Por onde começar</p>
            <h2 className="display-l">Qual destes problemas é o seu?</h2>
          </div>
          <ul className="problemas">
            {PROBLEMAS.map((p) => (
              <li key={p.texto}>
                <Link href={p.href}>
                  <span>{p.texto}</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M7 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Ver, Agir, Provar */}
      <section className="secao secao--branca">
        <div className="container">
          <div className="secao__topo">
            <p className="rotulo">Como a Sensoriz trabalha</p>
            <h2 className="display-l">Ver, agir e provar</h2>
            <p className="lead">Três passos que valem para um caminhão de congelados, uma geladeira de vacinas ou um equipamento de alto valor no estoque.</p>
          </div>
          <ol className="grade grade--3 pilares">
            <li className="card"><span className="pilares__n dado">01</span><h3 className="display-m">Ver</h3><p>Cada ativo com o valor, a unidade, a hora da leitura e o estado, no celular e no computador.</p></li>
            <li className="card"><span className="pilares__n dado">02</span><h3 className="display-m">Agir</h3><p>Gestão por exceção: a equipe só é chamada quando algo sai do padrão, por WhatsApp, e-mail ou SMS.</p></li>
            <li className="card"><span className="pilares__n dado">03</span><h3 className="display-m">Provar</h3><p>Relatórios imutáveis e QR Code para o fiscal consultar os últimos 30 dias sem acessar o sistema.</p></li>
          </ol>
        </div>
      </section>

      {/* 5. Setores */}
      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <p className="rotulo">Setores</p>
            <h2 className="display-l">Uma plataforma, operações diferentes</h2>
          </div>
          <div className="grade grade--4">
            {SETORES.map((s) => (
              <article className="card card-link" key={s.id}>
                <h3 className="titulo-secao"><Link href={`/setores/${s.id}`}>{s.nome}</Link></h3>
                <p className="apoio">{s.resumo}</p>
                {s.normas.length > 0 && <p className="rotulo">{s.normas.map((n) => n.nome.split(' (')[0].replace(/\/\d{4}/, '')).join(' · ')}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Como funciona */}
      <section className="secao secao--branca" id="como-funciona">
        <div className="container">
          <div className="secao__topo">
            <p className="rotulo">Como funciona</p>
            <h2 className="display-l">Do dispositivo ao relatório, sem planilha</h2>
          </div>
          <ol className="passos">
            <li><span className="dado">1</span><h3 className="titulo-secao">Instalação</h3><p className="apoio">Hubs e tags sem fio junto da carga, na câmara, na geladeira ou no equipamento. Lacre inteligente na porta do caminhão.</p></li>
            <li><span className="dado">2</span><h3 className="titulo-secao">Leitura contínua</h3><p className="apoio">As leituras chegam à Sensoriz CORE o tempo todo, com a hora e o estado de cada uma.</p></li>
            <li><span className="dado">3</span><h3 className="titulo-secao">Aviso na exceção</h3><p className="apoio">Quando algo sai da faixa, a pessoa certa recebe o aviso a tempo de agir.</p></li>
            <li><span className="dado">4</span><h3 className="titulo-secao">Prova pronta</h3><p className="apoio">O relatório para auditoria e fiscalização sai em poucos cliques, sem anotação manual.</p></li>
          </ol>
          <div className="card destaque">
            <h3 className="titulo-secao">Oito parâmetros em um só hub</h3>
            <ul className="parametros">{PARAMETROS_HUB.map((p) => <li key={p}>{p}</li>)}</ul>
            <p className="apoio">Hardware de parceiros internacionais, escolhido e configurado pela Sensoriz para cada aplicação. <Link href="/solucoes/dispositivos">Conheça os dispositivos</Link>.</p>
          </div>
        </div>
      </section>

      {/* 7. Números */}
      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <p className="rotulo">Em números</p>
            <h2 className="display-l">O que a Sensoriz mede e entrega</h2>
          </div>
          <dl className="grade grade--4 numeros">
            {NUMEROS.map((n) => (
              <div className="card" key={n.texto}>
                <dt className="numeros__valor">{n.prefixo && <span className="numeros__prefixo">{n.prefixo}</span>}<span className="dado">{n.valor}</span><span className="numeros__unidade">{n.unidade}</span></dt>
                <dd className="apoio">{n.texto}</dd>
              </div>
            ))}
          </dl>
          <p className="pendente">Números a confirmar com os sócios antes de publicar</p>
        </div>
      </section>

      {/* 8. Cases */}
      <section className="secao secao--branca">
        <div className="container">
          <div className="secao__topo">
            <p className="rotulo">Clientes</p>
            <h2 className="display-l">Quem já monitora com a Sensoriz</h2>
          </div>
          <div className="grade grade--3">{CASES.map((c) => <CaseCard c={c} key={c.id} />)}</div>
        </div>
      </section>

      {/* 9. Custo de não monitorar */}
      <section className="secao">
        <div className="container duas-colunas">
          <div>
            <p className="rotulo">O custo de não ver</p>
            <h2 className="display-l">Uma carga perdida paga anos de monitoramento</h2>
          </div>
          <div className="duas-colunas__texto">
            <p className="lead">Uma única carga de medicamentos descartada por excursão de temperatura pode custar R$ 300 mil. Um lote de alimentos devolvido, uma autuação ou um equipamento danificado sem responsável também custam, e costumam aparecer quando já é tarde.</p>
            <p className="lead">O diagnóstico mostra quanto a sua operação arrisca hoje e quanto custa deixar de arriscar.</p>
            <Link className="botao botao--primario" href="/diagnostico">Calcular com o nosso time</Link>
          </div>
        </div>
      </section>

      {ultimos.length > 0 && (
        <section className="secao secao--branca">
          <div className="container">
            <div className="secao__topo"><p className="rotulo">Conteúdo</p><h2 className="display-l">Normas, perdas e gestão da operação</h2></div>
            <div className="grade grade--3">
              {ultimos.map((a) => <CardConteudo key={a.slug} slug={a.slug} titulo={a.titulo} descricao={a.descricao} tema={a.tema} data={a.publicado} />)}
            </div>
          </div>
        </section>
      )}

      {/* 10. CTA final */}
      <ChamadaDiagnostico />
    </>
  );
}
