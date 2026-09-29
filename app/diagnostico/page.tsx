import FormDiagnostico from '@/components/FormDiagnostico';
import { SITE } from '@/lib/site';
import { metadados } from '@/lib/seo';

export const metadata = metadados({ titulo: 'Solicitar diagnóstico gratuito', descricao: 'Peça um diagnóstico gratuito: o time técnico da Sensoriz levanta os ativos sensíveis da sua operação, as normas que se aplicam e onde estão os riscos de perda.', caminho: '/diagnostico' });

export default function Diagnostico() {
  return (
    <section className="secao">
      <div className="container diag">
        <div className="diag__texto">
          <p className="rotulo">Diagnóstico gratuito</p>
          <h1 className="display-l">Conte sobre a sua operação</h1>
          <p className="lead">Nosso time entra em contato para entender o que você precisa monitorar.</p>
          <ul className="diag__lista">
            <li>O que monitorar</li>
            <li>Quais normas se aplicam</li>
            <li>Dispositivos e prazo de instalação</li>
          </ul>
          <p className="apoio">Prefere conversar agora? <a href={SITE.whatsapp}>Fale pelo WhatsApp</a>.</p>
        </div>
        <FormDiagnostico />
      </div>
    </section>
  );
}
