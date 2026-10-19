import { notFound } from 'next/navigation';
import PaginaProduto from '@/components/paginas/PaginaProduto';
import { PRODUTOS, produtoPorSlug } from '@/lib/produtos';
import { metadados } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => PRODUTOS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props) {
  const p = produtoPorSlug((await params).slug)!;
  return metadados({ titulo: p.nome, descricao: p.resumo, caminho: `/produtos/${p.slug}` });
}

export default async function Pagina({ params }: Props) {
  const p = produtoPorSlug((await params).slug);
  if (!p) notFound();
  return <PaginaProduto s={p} />;
}
