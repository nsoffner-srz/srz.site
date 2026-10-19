// /solucoes/<slug>: um setor (lib/setores.ts) ou um caso de uso (lib/casos-de-uso.ts).
import { notFound } from 'next/navigation';
import PaginaSetor from '@/components/paginas/PaginaSetor';
import PaginaCasoDeUso from '@/components/paginas/PaginaCasoDeUso';
import { SETORES, setorPorId } from '@/lib/setores';
import { CASOS_DE_USO, casoPorSlug } from '@/lib/casos-de-uso';
import { metadados } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => [...SETORES.map((s) => ({ slug: s.id })), ...CASOS_DE_USO.map((c) => ({ slug: c.slug }))];

export async function generateMetadata({ params }: Props) {
  const slug = (await params).slug;
  const s = setorPorId(slug);
  if (s) return metadados({ titulo: `${s.nome}: monitoramento em tempo real`, descricao: s.resumo, caminho: `/solucoes/${s.id}` });
  const c = casoPorSlug(slug)!;
  return metadados({ titulo: `${c.nome}: monitoramento em tempo real`, descricao: c.resumo, caminho: `/solucoes/${c.slug}` });
}

export default async function PaginaSolucao({ params }: Props) {
  const slug = (await params).slug;
  const s = setorPorId(slug);
  if (s) return <PaginaSetor s={s} />;
  const c = casoPorSlug(slug);
  if (c) return <PaginaCasoDeUso c={c} />;
  notFound();
}
