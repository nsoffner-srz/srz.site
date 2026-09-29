import Link from 'next/link';
import Logo from './Logo';
import { NAV, SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="container rodape__grade">
        <div className="rodape__marca">
          <Logo largura={150} sempreNegativo />
          <p>Monitoramento de ativos sensíveis em tempo real. Ver, agir e provar, em qualquer operação.</p>
          <Link className="botao botao--primario" href="/diagnostico">Solicitar diagnóstico</Link>
        </div>
        {NAV.filter((n) => n.filhos).map((n) => (
          <nav aria-label={n.rotulo} key={n.href}>
            <p className="rodape__titulo">{n.rotulo}</p>
            <ul>{n.filhos!.map((f) => <li key={f.href}><Link href={f.href}>{f.rotulo}</Link></li>)}</ul>
          </nav>
        ))}
        <nav aria-label="Institucional">
          <p className="rodape__titulo">Sensoriz</p>
          <ul>
            <li><Link href="/cases">Cases</Link></li>
            <li><Link href="/conteudo">Conteúdo</Link></li>
            <li><Link href="/empresa">Empresa</Link></li>
            <li><a href={SITE.loginCore}>Entrar na Sensoriz CORE</a></li>
            <li><a href={SITE.ouvidoria}>Ouvidoria</a></li>
            <li><Link href="/politicas">Políticas</Link></li>
          </ul>
        </nav>
      </div>
      <div className="container rodape__base">
        <p>© {new Date().getFullYear()} Sensoriz. Todos os direitos reservados.</p>
        <p><a href={SITE.redes.linkedin}>LinkedIn</a> · <a href={SITE.redes.instagram}>Instagram</a></p>
      </div>
    </footer>
  );
}
