// Modelo único das páginas de setor (7 blocos), em /solucoes/<setor>. O conteúdo vem de lib/setores.ts.
// A seção de norma só aparece quando existe norma que exige monitoramento no setor.
import Link from 'next/link';
import Trilha from '@/components/Trilha';
import Perguntas from '@/components/Perguntas';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import CardConteudo from '@/components/CardConteudo';
import CaseCard from '@/components/CaseCard';
import JsonLd from '@/components/JsonLd';
import type { Setor } from '@/lib/setores';
import { casesDoSetor, CASES_SUCESSO } from '@/lib/cases';
import CaseSucessoCard from '@/components/CaseSucessoCard';
import { artigos } from '@/lib/conteudo';
import { faqJsonLd, trilhaJsonLd } from '@/lib/seo';
import RotaAoVivo from '@/components/RotaAoVivo';
import GeladeiraAoVivo from '@/components/GeladeiraAoVivo';
import EsquemaCustodia from '@/components/EsquemaCustodia';

export default function PaginaSetor({ s }: { s: Setor }) {
  const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Soluções', caminho: '/solucoes' }, { nome: s.nome, caminho: `/solucoes/${s.id}` }];
  // ocultarCase: case aguardando aprovação do cliente; a seção sai da página até lá.
  const cases = s.ocultarCase ? [] : casesDoSetor(s.id);
  const sucesso = s.ocultarCase ? [] : CASES_SUCESSO.filter((c) => c.href === `/solucoes/${s.id}`);
  const relacionados = artigos().filter((a) => a.setores.includes(s.id)).slice(0, 3);

  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha), ...faqJsonLd(s.perguntas)]} />
      <section className="pagina-topo">
        <div className={`container pagina-topo__grade${s.visual ? ' pagina-topo__grade--visual' : ''}`}>
          {s.visual === 'rota' && <RotaAoVivo />}
          {s.visual === 'geladeira' && <GeladeiraAoVivo />}
          <Trilha itens={trilha} />
          <p className="rotulo">{s.nome}</p>
          <h1 className="display-xl">{s.tituloHero}</h1>
          <p className="lead">{s.subtituloHero}</p>
          <p className="apoio"><strong>Para quem:</strong> {s.publico}</p>
          <div className="acoes">
            <Link className="botao botao--primario" href={`/diagnostico?setor=${s.id}`}>Solicitar diagnóstico</Link>
            <a className="botao botao--secundario" href="#como-resolve">Ver como funciona</a>
          </div>
        </div>
      </section>

      {/* 1. Dor e custo */}
      <section className="secao secao--branca">
        <div className="container duas-colunas">
          <div><p className="rotulo">O problema</p><h2 className="display-l">{s.dor.titulo}</h2></div>
          <div className="duas-colunas__texto">
            <p className="lead">{s.dor.texto}</p>
            <p className="dor__custo">{s.dor.custo}</p>
            {s.dor.custoNota && <p className="apoio">{s.dor.custoNota}</p>}
          </div>
        </div>
      </section>

      {/* 1a. Esquema de custódia (só quando o setor tem) */}
      {s.custodia && (
        <section className="secao">
          <div className="container">
            <div className="secao__topo"><p className="rotulo">Custódia</p><h2 className="display-l">{s.custodia.titulo}</h2><p className="lead">{s.custodia.texto}</p></div>
            <EsquemaCustodia c={s.custodia} />
          </div>
        </section>
      )}

      {/* 1b. Quanto vale a carga (só quando o setor tem a tabela) */}
      {s.valorCarga && (
        <section className="secao">
          <div className="container">
            <div className="secao__topo">
              <p className="rotulo">Valor em risco</p>
              <h2 className="display-l">{s.valorCarga.titulo}</h2>
              <p className="lead">{s.valorCarga.texto}</p>
            </div>
            <div className="tabela-rolagem">
              <table className="tabela-valor">
                <caption className="apoio">Capacidade em paletes PBR (1,0 × 1,2 m), por tipo de veículo. Estimativa Sensoriz pela medida do baú</caption>
                <thead><tr><th scope="col">Veículo</th><th scope="col">Paletes</th><th scope="col">Operação</th></tr></thead>
                <tbody>
                  {s.valorCarga.linhas.map((l) => (
                    <tr key={l.veiculo}><th scope="row">{l.veiculo}</th><td className="dado">{l.paletes}</td><td>{l.operacao}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: 'var(--space-4)' }}><Link className="botao botao--secundario" href="/diagnostico?objetivo=roi">Calcular o valor em risco da minha frota</Link></p>
          </div>
        </section>
      )}

      {/* 2. O que a norma exige (só quando existe norma de monitoramento) */}
      {s.normas.length > 0 && (
        <section className="secao">
          <div className="container">
            <div className="secao__topo">
              <p className="rotulo">O que a norma exige</p>
              <h2 className="display-l">Registro pronto para a fiscalização</h2>
            </div>
            <div className="grade grade--2">
              {s.normas.map((n) => (
                <div className="card norma" key={n.nome}>
                  <h3 className="titulo-secao">{n.nome}</h3>
                  <p className="norma__vale">Vale para: {n.valePara}</p>
                  <ul>{n.exige.map((e) => <li key={e}>{e}</li>)}</ul>
                </div>
              ))}
            </div>
            <p className="apoio" style={{ marginTop: 'var(--space-4)' }}>Resumo para orientação. Consulte a norma completa.</p>
          </div>
        </section>
      )}

      {/* 3. Ver, Agir, Provar */}
      <section className="secao secao--branca" id="como-resolve">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Como a Sensoriz resolve</p><h2 className="display-l">Ver, agir e provar</h2></div>
          <ol className="grade grade--3 pilares">
            <li className="card"><span className="pilares__n dado">01</span><h3 className="titulo-secao">Ver</h3><p className="apoio">{s.comoResolve.ver}</p></li>
            <li className="card"><span className="pilares__n dado">02</span><h3 className="titulo-secao">Agir</h3><p className="apoio">{s.comoResolve.agir}</p></li>
            <li className="card"><span className="pilares__n dado">03</span><h3 className="titulo-secao">Provar</h3><p className="apoio">{s.comoResolve.provar}</p></li>
          </ol>
        </div>
      </section>

      {/* 4. Configuração típica */}
      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <p className="rotulo">Configuração típica</p>
            <h2 className="display-l">O que é instalado</h2>
            <p className="apoio">Ambientes atendidos: {s.ambientes.join(' · ')}.</p>
          </div>
          <dl className="config__lista">
            {s.configuracao.map((c) => <div key={c.item}><dt>{c.item}</dt><dd className="apoio">{c.detalhe}</dd></div>)}
          </dl>
          <p className="apoio"><Link href="/produtos/dispositivos">Ver todos os dispositivos</Link></p>
          {s.fotos ? (
            <div className="fotos-instalacao">
              {s.fotos.map((f) => (
                <figure key={f.src}><img src={f.src} alt={f.alt} width={f.largura} height={f.altura} loading="lazy" decoding="async" /></figure>
              ))}
              <p className="apoio">Instalação real em um caminhão de distribuição: o hub vai na parede do baú, em menos de 1 minuto, sem mexer na elétrica.</p>
            </div>
          ) : (
            <p className="pendente" style={{ marginTop: 'var(--space-3)' }}>Foto dos dispositivos instalados neste setor: pendente</p>
          )}
        </div>
      </section>

      {/* 4b. Limites: o que é testado na rota do cliente (só quando o setor tem) */}
      {s.limites && (
        <section className="secao secao--branca">
          <div className="container duas-colunas">
            <div className="duas-colunas__texto">
              <p className="rotulo">Antes de começar</p>
              <h2 className="display-l">{s.limites.titulo}</h2>
              <p className="lead">{s.limites.texto}</p>
              <Link className="botao botao--primario" href="/diagnostico">Mapear a custódia da minha rota</Link>
            </div>
            <ul className="limites">{s.limites.itens.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        </section>
      )}

      {/* 5. Case ou depoimento. Sem cliente ativo no setor, usa o case de sucesso sem nome; sem nenhum, a seção sai. */}
      {(cases.length > 0 || sucesso.length > 0) && (
        <section className="secao secao--branca">
          <div className="container">
            <div className="secao__topo"><p className="rotulo">Resultado em operação</p><h2 className="display-l">{cases.length > 1 ? 'Clientes do setor' : 'Case do setor'}</h2></div>
            {cases.length > 0 ? (
              <div className="grade grade--2">{cases.map((c) => <CaseCard c={c} completo key={c.id} />)}</div>
            ) : (
              <div className="grade grade--2">{sucesso.map((c) => <CaseSucessoCard c={c} semLink key={c.id} />)}</div>
            )}
          </div>
        </section>
      )}

      {/* 6. Perguntas frequentes */}
      <section className="secao"><div className="container"><Perguntas itens={s.perguntas} /></div></section>

      {relacionados.length > 0 && (
        <section className="secao secao--branca">
          <div className="container">
            <div className="secao__topo"><p className="rotulo">Conteúdo</p><h2 className="display-l">Para aprofundar</h2></div>
            <div className="grade grade--3">{relacionados.map((a) => <CardConteudo key={a.slug} artigo={a} />)}</div>
          </div>
        </section>
      )}

      {/* 7. CTA */}
      <ChamadaDiagnostico />
    </>
  );
}
