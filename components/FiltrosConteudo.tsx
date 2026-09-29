import Link from 'next/link';
import { TEMAS, SETORES_ROTULO } from '@/lib/site';
// Filtros da seção Conteúdo: cada filtro é uma página própria (indexável por tema e por setor).
export default function FiltrosConteudo({ atual }: { atual: string }) {
  const marca = (href: string) => (atual === href ? 'page' : undefined);
  return (
    <div className="filtros">
      <nav aria-label="Filtrar por tema">
        <p className="rotulo">Tema</p>
        <ul>
          <li><Link href="/conteudo" aria-current={marca('/conteudo')}>Todos</Link></li>
          {Object.entries(TEMAS).map(([id, nome]) => (
            <li key={id}><Link href={`/conteudo/tema/${id}`} aria-current={marca(`/conteudo/tema/${id}`)}>{nome}</Link></li>
          ))}
        </ul>
      </nav>
      <nav aria-label="Filtrar por setor">
        <p className="rotulo">Setor</p>
        <ul>
          {Object.entries(SETORES_ROTULO).map(([id, nome]) => (
            <li key={id}><Link href={`/conteudo/setor/${id}`} aria-current={marca(`/conteudo/setor/${id}`)}>{nome}</Link></li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
