// Home: segue a ordem em que o decisor pensa — a dor, a prova, como funciona e o próximo passo.
import Link from 'next/link';
import LeiturasAoVivo from '@/components/LeiturasAoVivo';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import CardConteudo from '@/components/CardConteudo';
import CaseSucessoCard from '@/components/CaseSucessoCard';
import Parceiros from '@/components/Parceiros';
import JsonLd from '@/components/JsonLd';
import { SETORES } from '@/lib/setores';
import { CASOS_DE_USO } from '@/lib/casos-de-uso';
import { CASES_SUCESSO } from '@/lib/cases';
import { PARAMETROS_SOLUCAO } from '@/lib/hardware';
import { artigos } from '@/lib/conteudo';
import { SITE } from '@/lib/site';
import { metadados } from '@/lib/seo';

export const metadata = { ...metadados({ titulo: 'Sensoriz | Monitoramento de ativos sensíveis em tempo real', caminho: '/' }), title: { absolute: 'Sensoriz | Monitoramento de ativos sensíveis em tempo real' } };

const PROBLEMAS = [
  { texto: 'Perdi carga por temperatura', href: '/solucoes/logistica-e-cadeia-fria' },
  { texto: 'Preciso provar para a fiscalização', href: '/produtos/servicos#compliance' },
  { texto: 'Guardo produto em geladeira ou câmara', href: '/solucoes/estoque-parado' },
  { texto: 'Cliente recusa a entrega por avaria', href: '/solucoes/ativos-de-alto-valor' },
  { texto: 'Não consigo instalar sensor no caminhão do agregado', href: '/solucoes/estoque-em-movimento' },
  { texto: 'Equipamentos e insumos críticos somem no hospital', href: '/solucoes/saude' },
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
            <li className="card"><span className="pilares__n dado">03</span><h3 className="display-m">Provar</h3><p>Dados que ninguém altera, prontos para consultar e extrair.</p></li>
          </ol>
        </div>
      </section>

      {/* 5. Setores */}
      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <p className="rotulo">Soluções</p>
            <h2 className="display-l">Uma plataforma, operações diferentes</h2>
          </div>
          <div className="grade grade--2 casos-uso">
            {CASOS_DE_USO.map((c) => (
              <article className="card card-link casos-uso__card" key={c.slug}>
                <p className="rotulo">Caso de uso</p>
                <h3 className="display-m"><Link href={`/solucoes/${c.slug}`}>{c.nome}</Link></h3>
                <p className="apoio">{c.ondeSeAplica.join(' · ')}</p>
              </article>
            ))}
          </div>
          <p className="rotulo" style={{ margin: 'var(--space-5) 0 var(--space-3)' }}>Por setor</p>
          <div className="grade grade--4">
            {SETORES.map((s) => (
              <article className="card card-link" key={s.id}>
                <h3 className="titulo-secao"><Link href={`/solucoes/${s.id}`}>{s.nome}</Link></h3>
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
          <div className="grade grade--2 como-funciona__cards">
            <div className="card destaque">
              <h3 className="titulo-secao">Oito parâmetros em uma só solução</h3>
              <ul className="parametros">{PARAMETROS_SOLUCAO.map((p) => <li key={p}>{p}</li>)}</ul>
              <p className="apoio"><Link href="/produtos/dispositivos">Conheça os dispositivos</Link></p>
            </div>
            {/* Out/2026: "a partir de" o caso mais favorável documentado. Fichas técnicas (HGR4, HGD4): verifica a cada 10 s.
                Registro configurável; mínimo usual de 1 min (Nicole), padrão de fábrica 5 min. */}
            <div className="card destaque">
              <h3 className="titulo-secao">Monitoramento inteligente</h3>
              <p className="numeros__valor"><span className="numeros__prefixo">a partir de</span><span className="dado">10</span><span className="numeros__unidade">s</span></p>
              <p className="apoio">É o intervalo mais curto em que o dispositivo verifica o ambiente. O registro é configurável, a partir de 1 minuto. Os intervalos variam conforme o modelo. Se algo sai do padrão, o dispositivo quebra esse ritmo, registra e avisa na hora.</p>
              <p className="apoio"><Link href="/produtos/servicos#compliance">Frequência ajustável para estoque parado ou em movimento</Link></p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Cases de sucesso (antes · problema · como atuamos · resultado), sem nome de cliente */}
      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <p className="rotulo">Cases de sucesso</p>
            <h2 className="display-l">Antes e depois da Sensoriz</h2>
          </div>
          <div className="grade grade--2">{CASES_SUCESSO.map((c) => <CaseSucessoCard c={c} key={c.id} />)}</div>
          <p className="apoio" style={{ marginTop: 'var(--space-4)' }}><Link href="/cases">Ver todos os cases</Link></p>
        </div>
      </section>

      {/* 8. Custo de não monitorar */}
      <section className="secao secao--branca">
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
        <section className="secao">
          <div className="container">
            <div className="secao__topo"><p className="rotulo">Conteúdo</p><h2 className="display-l">Para aprofundar</h2></div>
            <div className="grade grade--3">
              {ultimos.map((a) => <CardConteudo key={a.slug} artigo={a} />)}
            </div>
          </div>
        </section>
      )}

      {/* 9. CTA final */}
      <ChamadaDiagnostico />
    </>
  );
}
