// Sitemap gerado no build: /sitemap.xml
import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { SETORES } from '@/lib/setores';
import { SOLUCOES } from '@/lib/solucoes';
import { artigos } from '@/lib/conteudo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (c: string) => new URL(c, SITE.url).href;
  return [
    { url: u('/'), priority: 1 },
    { url: u('/setores') },
    ...SETORES.map((s) => ({ url: u(`/setores/${s.id}`), priority: 0.9 })),
    { url: u('/solucoes') },
    ...SOLUCOES.map((s) => ({ url: u(`/solucoes/${s.slug}`), priority: 0.8 })),
    { url: u('/cases') },
    { url: u('/conteudo') },
    ...artigos().map((a) => ({ url: u(`/conteudo/${a.slug}`), lastModified: a.atualizado ?? a.publicado })),
    { url: u('/empresa') },
    { url: u('/diagnostico') },
  ];
}
