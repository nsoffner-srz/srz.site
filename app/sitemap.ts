// Sitemap gerado no build: /sitemap.xml
import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { SETORES } from '@/lib/setores';
import { PRODUTOS } from '@/lib/produtos';
import { CASOS_DE_USO } from '@/lib/casos-de-uso';
import { artigos } from '@/lib/conteudo';
import { politicas } from '@/lib/politicas';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (c: string) => new URL(c, SITE.url).href;
  return [
    { url: u('/'), priority: 1 },
    { url: u('/solucoes') },
    ...SETORES.map((s) => ({ url: u(`/solucoes/${s.id}`), priority: 0.9 })),
    ...CASOS_DE_USO.map((c) => ({ url: u(`/solucoes/${c.slug}`), priority: 0.8 })),
    { url: u('/produtos') },
    ...PRODUTOS.map((p) => ({ url: u(`/produtos/${p.slug}`), priority: 0.8 })),
    { url: u('/cases') },
    { url: u('/conteudo') },
    ...artigos().map((a) => ({ url: u(`/conteudo/${a.slug}`), lastModified: a.atualizado ?? a.publicado })),
    { url: u('/empresa') },
    { url: u('/diagnostico') },
    { url: u('/politicas'), priority: 0.3 },
    ...politicas().map((p) => ({ url: u(`/politicas/${p.slug}`), priority: 0.3 })),
  ];
}
