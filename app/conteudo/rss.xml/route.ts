// Feed RSS da seção Conteúdo: /conteudo/rss.xml
import { SITE } from '@/lib/site';
import { artigos } from '@/lib/conteudo';

export const dynamic = 'force-static';

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
  const itens = artigos().map((a) => `
    <item>
      <title>${esc(a.titulo)}</title>
      <link>${SITE.url}/conteudo/${a.slug}</link>
      <guid>${SITE.url}/conteudo/${a.slug}</guid>
      <description>${esc(a.descricao)}</description>
      <pubDate>${a.publicado.toUTCString()}</pubDate>
    </item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Conteúdo Sensoriz</title>
    <link>${SITE.url}/conteudo</link>
    <description>Normas, perdas, gestão da operação e tecnologia para quem responde por ativos sensíveis.</description>
    <language>pt-BR</language>${itens}
  </channel>
</rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
