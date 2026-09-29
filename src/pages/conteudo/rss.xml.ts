// Feed RSS da seção Conteúdo: /conteudo/rss.xml
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const artigos = (await getCollection('conteudo', (a) => !a.data.rascunho))
    .sort((a, b) => b.data.publicado.getTime() - a.data.publicado.getTime());
  return rss({
    title: 'Conteúdo Sensoriz',
    description: 'Normas, perdas, gestão da operação e tecnologia para quem responde por ativos sensíveis.',
    site: context.site!,
    customData: '<language>pt-BR</language>',
    items: artigos.map((a) => ({
      title: a.data.titulo,
      description: a.data.descricao,
      pubDate: a.data.publicado,
      link: `/conteudo/${a.id}`,
    })),
  });
}
