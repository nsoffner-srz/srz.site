import { SITE } from '@/lib/site';
import { metadados } from '@/lib/seo';

// Políticas da Sensoriz (privacidade, termos, cookies). O texto oficial está hoje em sensoriz.com.br/politicas
// (site em Framer) e precisa ser copiado para cá, sem alteração, antes de desligar o Framer.
export const metadata = metadados({ titulo: 'Políticas', descricao: 'Políticas de privacidade e termos de uso da Sensoriz.', caminho: '/politicas' });

export default function Politicas() {
  return (
    <section className="secao">
      <div className="container prosa">
        <h1 className="display-l">Políticas</h1>
        <p className="pendente">Copiar aqui o texto oficial publicado hoje em sensoriz.com.br/politicas antes do lançamento</p>
        <p>Dúvidas sobre o tratamento dos seus dados: <a href={SITE.ouvidoria}>ouvidoria@sensoriz.com.br</a>.</p>
      </div>
    </section>
  );
}
