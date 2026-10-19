import Link from 'next/link';
import Logo from './Logo';
import { SITE, SETORES_ROTULO } from '@/lib/site';
import { PRODUTOS } from '@/lib/produtos';
import { CASOS_DE_USO } from '@/lib/casos-de-uso';

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="container rodape__grade">
        <div className="rodape__marca">
          <Logo largura={150} sempreNegativo />
          <p>Monitoramento de ativos sensíveis em tempo real.</p>
          <Link className="botao botao--primario" href="/diagnostico">Solicitar diagnóstico</Link>
        </div>
        <nav aria-label="Produtos">
          <p className="rodape__titulo">Produtos</p>
          <ul>{PRODUTOS.map((p) => <li key={p.slug}><Link href={`/produtos/${p.slug}`}>{p.nome}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Soluções">
          <p className="rodape__titulo">Soluções</p>
          <ul>
            {Object.entries(SETORES_ROTULO).map(([id, nome]) => <li key={id}><Link href={`/solucoes/${id}`}>{nome}</Link></li>)}
            {CASOS_DE_USO.map((c) => <li key={c.slug}><Link href={`/solucoes/${c.slug}`}>{c.nome}</Link></li>)}
          </ul>
        </nav>
        <nav aria-label="Institucional">
          <p className="rodape__titulo">Sensoriz</p>
          <ul>
            <li><Link href="/cases">Cases</Link></li>
            <li><Link href="/conteudo">Conteúdo</Link></li>
            <li><Link href="/empresa">Empresa</Link></li>
            <li><a href={SITE.loginCore}>Entrar na Sensoriz CORE</a></li>
            <li><a href={SITE.ouvidoria}>Ouvidoria</a></li>
            <li><Link href="/politicas">Políticas</Link></li>
            <li><Link href="/politicas/privacidade">Privacidade (LGPD)</Link></li>
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
