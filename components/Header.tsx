'use client';
// Cabeçalho: logo, menu, login da CORE e o CTA de diagnóstico.
// Menus abrem por toque ou clique (<details>): nada depende de passar o mouse.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Logo from './Logo';
import { NAV, SITE } from '@/lib/site';

export default function Header() {
  const atual = usePathname() ?? '/';
  const ativo = (href: string) => atual === href || atual.startsWith(href + '/');
  const raiz = useRef<HTMLElement>(null);

  // Fecha menus ao abrir outro, ao tocar fora, com Esc e ao trocar de página.
  useEffect(() => {
    const menus = Array.from(raiz.current?.querySelectorAll('details') ?? []);
    menus.forEach((m) => (m.open = false));
    const aoAlternar = (e: Event) => {
      const m = e.target as HTMLDetailsElement;
      if (m.open) menus.forEach((o) => o !== m && (o.open = false));
    };
    const aoClicar = (e: MouseEvent) => menus.forEach((m) => m.open && !m.contains(e.target as Node) && (m.open = false));
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && menus.forEach((m) => (m.open = false));
    menus.forEach((m) => m.addEventListener('toggle', aoAlternar));
    document.addEventListener('click', aoClicar);
    document.addEventListener('keydown', aoTeclar);
    return () => {
      menus.forEach((m) => m.removeEventListener('toggle', aoAlternar));
      document.removeEventListener('click', aoClicar);
      document.removeEventListener('keydown', aoTeclar);
    };
  }, [atual]);

  return (
    <header className="topo" ref={raiz}>
      <div className="container topo__barra">
        <Link href="/" className="topo__logo" aria-label="Sensoriz, página inicial"><Logo largura={148} /></Link>

        <nav className="topo__nav" aria-label="Principal">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                {item.filhos ? (
                  <details className="menu">
                    <summary className={`topo__link${ativo(item.href) ? ' is-ativo' : ''}`}>{item.rotulo}</summary>
                    <ul className="menu__lista">
                      <li><Link href={item.href}>Ver todos</Link></li>
                      {item.filhos.map((f) => (
                        <li key={f.href}><Link href={f.href} aria-current={atual === f.href ? 'page' : undefined}>{f.rotulo}</Link></li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link className={`topo__link${ativo(item.href) ? ' is-ativo' : ''}`} href={item.href} aria-current={ativo(item.href) ? 'page' : undefined}>{item.rotulo}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="topo__acoes">
          <a className="topo__login" href={SITE.loginCore}>Entrar na CORE</a>
          <Link className="botao botao--primario" href="/diagnostico">Solicitar diagnóstico</Link>
        </div>

        <details className="movel">
          <summary className="movel__botao" aria-label="Abrir menu">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            <span>Menu</span>
          </summary>
          <div className="movel__painel">
            <nav aria-label="Principal no celular">
              {NAV.map((item) => (
                <div className="movel__grupo" key={item.href}>
                  <Link className="movel__titulo" href={item.href}>{item.rotulo}</Link>
                  {item.filhos && <ul>{item.filhos.map((f) => <li key={f.href}><Link href={f.href}>{f.rotulo}</Link></li>)}</ul>}
                </div>
              ))}
            </nav>
            <Link className="botao botao--primario" href="/diagnostico">Solicitar diagnóstico</Link>
            <a className="botao botao--secundario" href={SITE.loginCore}>Entrar na Sensoriz CORE</a>
          </div>
        </details>
      </div>
    </header>
  );
}
