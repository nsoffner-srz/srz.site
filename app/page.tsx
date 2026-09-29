// Home: segue a ordem em que o decisor pensa — a dor, a prova, como funciona e o próximo passo.
import Link from 'next/link';
import LeiturasAoVivo from '@/components/LeiturasAoVivo';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import CardConteudo from '@/components/CardConteudo';
import CaseCard from '@/components/CaseCard';
import Parceiros from '@/components/Parceiros';
import JsonLd from '@/components/JsonLd';
import { SETORES } from '@/lib/setores';
import { CASES } from '@/lib/cases';
import { PARAMETROS_HUB } from '@/lib/hardware';
import { artigos } from '@/lib/conteudo';
import { SITE } from '@/lib/site';
import { metadados } from '@/lib/seo';

export const metadata = { ...metadados({ titulo: 'Sensoriz | Monitoramento de ativos sensíveis em tempo real', caminho: '/' }), title: { absolute: 'Sensoriz | Monitoramento de ativos sensíveis em tempo real' } };

const PROBLEMAS = [
  { texto: 'Perdi carga por temperatura', href: '/setores/logistica-e-cadeia-fria' },
  { texto: 'Preciso provar para a fiscalização', href: '/solucoes/servico-de-compliance' },
  { texto: 'Guardo produto em geladeira ou câmara', href: '/solucoes/monitoramento-ambiental' },
  { texto: 'Meus equipamentos chegam danificados', href: '/setores/industria-e-inventario' },
  { texto: 'Não acho equipamentos no estoque', href: '/setores/industria-e-inventario' },
  { texto: 'Equipamentos somem no hospital', href: '/setores/saude' },
];

// Resultados de cases e POCs da Sensoriz (aprovados pela Nicole em 29/09/2026). Sem nome de cliente, só o segmento.
const NUMEROS = [
  { prefixo: 'R$', valor: '300', unidade: 'mil', texto: 'em perda evitada logo na primeira ocorrência. O monitoramento se pagou no primeiro alerta.', contexto: 'Multinacional química · cadeia fria', href: '/setores/logistica-e-cadeia-fria' },
  { prefixo: 'menos de', valor: '1', unidade: 'mês', texto: 'de payback. O alerta revelou um compressor com defeito que o visor da geladeira escondia.', contexto: 'Prefeitura · vacinas em postos de saúde', href: '/setores/saude' },
  { valor: '100', unidade: '%', texto: 'do trajeto com sinal, do Norte ao Sul do Brasil, incluindo trecho fluvial.', contexto: 'Indústria de climatização · transporte', href: '/setores/industria-e-inventario' },
  { prefixo: 'até', valor: '1.440', unidade: 'registros/dia', texto: 'Leitura de 1 em 1 minuto, de 15 em 15 ou de hora em hora. Histórico com hora e valor, pronto para a fiscalização.', contexto: 'A planilha manual costuma ter 2', href: '/solucoes/servico-de-compliance' },
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
            <h1 className="display-xl">Saiba o que acontece onde você não está</h1>
            <p className="lead">Monitore cargas, estoques e equipamentos em tempo real. A Sensoriz avisa antes que o problema vire prejuízo.</p>
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
        <div className="container"><Parceiros /></div>
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
            
          </div>
          <ol className="grade grade--3 pilares">
            <li className="card"><span className="pilares__n dado">01</span><h3 className="display-m">Ver</h3><p>Tudo o que importa no celular e no computador.</p></li>
            <li className="card"><span className="pilares__n dado">02</span><h3 className="display-m">Agir</h3><p>Você só é chamado quando algo sai do padrão.</p></li>
            <li className="card"><span className="pilares__n dado">03</span><h3 className="display-m">Provar</h3><p>O relatório sai pronto para o fiscal.</p></li>
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
            <h2 className="display-l">Simples de começar</h2>
          </div>
          <ol className="passos">
            <li><span className="dado">1</span><h3 className="titulo-secao">Instale</h3><p className="apoio">Dispositivos sem fio, sem obra.</p></li>
            <li><span className="dado">2</span><h3 className="titulo-secao">Acompanhe</h3><p className="apoio">Os dados chegam à Sensoriz CORE o tempo todo.</p></li>
            <li><span className="dado">3</span><h3 className="titulo-secao">Receba o aviso</h3><p className="apoio">A pessoa certa recebe o aviso a tempo.</p></li>
            <li><span className="dado">4</span><h3 className="titulo-secao">Prove</h3><p className="apoio">Relatório em poucos cliques, sem planilha.</p></li>
          </ol>
          <div className="card destaque">
            <h3 className="titulo-secao">Oito parâmetros em um só hub</h3>
            <ul className="parametros">{PARAMETROS_HUB.map((p) => <li key={p}>{p}</li>)}</ul>
            <p className="apoio"><Link href="/solucoes/dispositivos">Conheça os dispositivos</Link></p>
          </div>
        </div>
      </section>

      {/* 7. Resultados */}
      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <p className="rotulo">Resultados</p>
            <h2 className="display-l">O que a Sensoriz já entregou</h2>
          </div>
          <ul className="grade grade--4 numeros">
            {NUMEROS.map((n) => (
              <li className="card card-link" key={n.texto}>
                <p className="numeros__valor">{n.prefixo && <span className="numeros__prefixo">{n.prefixo}</span>}<span className="dado">{n.valor}</span><span className="numeros__unidade">{n.unidade}</span></p>
                <p className="apoio numeros__texto"><Link href={n.href}>{n.texto}</Link></p>
                <p className="rotulo numeros__contexto">{n.contexto}</p>
              </li>
            ))}
          </ul>
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
            <p className="lead">Uma carga de medicamentos descartada pode custar R$ 300 mil. O diagnóstico mostra quanto a sua operação arrisca hoje.</p>
            <Link className="botao botao--primario" href="/diagnostico">Solicitar diagnóstico</Link>
          </div>
        </div>
      </section>

      {ultimos.length > 0 && (
        <section className="secao secao--branca">
          <div className="container">
            <div className="secao__topo"><p className="rotulo">Conteúdo</p><h2 className="display-l">Para aprofundar</h2></div>
            <div className="grade grade--3">
              {ultimos.map((a) => <CardConteudo key={a.slug} artigo={a} />)}
            </div>
          </div>
        </section>
      )}

      {/* 10. CTA final */}
      <ChamadaDiagnostico />
    </>
  );
}
