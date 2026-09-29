// Políticas da Sensoriz (content/politicas/*.md). Cada arquivo vira /politicas/<slug>.
// O texto é o oficial: não reescrever sem aprovação jurídica.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { z } from 'zod';

const PASTA = path.join(process.cwd(), 'content', 'politicas');

const Esquema = z.object({
  titulo: z.string(),
  nomeOficial: z.string(),
  descricao: z.string().max(170),
  ordem: z.number(),
  atualizado: z.coerce.date().optional(),
});

export type Politica = z.infer<typeof Esquema> & { slug: string; html: string; secoes: { id: string; titulo: string }[] };

const idDe = (t: string) =>
  t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

let cache: Politica[] | null = null;
export function politicas(): Politica[] {
  if (cache) return cache;
  cache = fs
    .readdirSync(PASTA)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((arquivo) => {
      const { data, content } = matter(fs.readFileSync(path.join(PASTA, arquivo), 'utf8'));
      const r = Esquema.safeParse(data);
      if (!r.success) throw new Error(`Cabeçalho inválido em content/politicas/${arquivo}: ${r.error.message}`);
      // Cada ## ganha um id, para o sumário e para links diretos (ex.: /politicas/privacidade#7-direitos...).
      const secoes: { id: string; titulo: string }[] = [];
      let html = marked.parse(content, { async: false }) as string;
      html = html.replace(/<h2>(.*?)<\/h2>/g, (_, inner: string) => {
        const texto = inner.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
        const id = idDe(texto);
        secoes.push({ id, titulo: texto });
        return `<h2 id="${id}">${inner}</h2>`;
      });
      return { ...r.data, slug: arquivo.replace(/\.md$/, ''), html, secoes };
    })
    .sort((a, b) => a.ordem - b.ordem);
  return cache;
}

export const politica = (slug: string) => politicas().find((p) => p.slug === slug);
