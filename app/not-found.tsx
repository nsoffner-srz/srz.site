import Link from 'next/link';
export const metadata = { title: 'Página não encontrada', robots: { index: false } };
export default function NaoEncontrada() {
  return (
    <section className="secao">
      <div className="container" style={{ display: 'grid', gap: 'var(--space-4)', maxWidth: 720 }}>
        <p className="rotulo">Erro 404</p>
        <h1 className="display-l">Esta página não existe ou mudou de endereço</h1>
        <p className="lead">O site da Sensoriz foi reorganizado. Comece pelos setores ou fale com o nosso time.</p>
        <div className="acoes">
          <Link className="botao botao--primario" href="/">Ir para o início</Link>
          <Link className="botao botao--secundario" href="/solucoes">Ver soluções</Link>
        </div>
      </div>
    </section>
  );
}
