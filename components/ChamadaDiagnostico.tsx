import Link from 'next/link';
import { SITE } from '@/lib/site';
// Bloco final de conversão, usado no fim da home e das páginas de setor e solução.
export default function ChamadaDiagnostico({
  titulo = 'Descubra onde a sua operação está perdendo',
  texto = 'No diagnóstico, nosso time técnico levanta os ativos sensíveis da sua operação, as normas que se aplicam e onde estão os riscos de perda. Sem custo e sem compromisso.',
}: { titulo?: string; texto?: string }) {
  return (
    <section className="chamada">
      <div className="container chamada__grade">
        <div className="chamada__texto">
          <p className="rotulo">Diagnóstico gratuito</p>
          <h2 className="display-l">{titulo}</h2>
          <p className="lead">{texto}</p>
        </div>
        <div className="chamada__acoes">
          <Link className="botao botao--primario" href="/diagnostico">Solicitar diagnóstico</Link>
          <a className="botao botao--secundario" href={SITE.whatsapp}>Falar pelo WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
