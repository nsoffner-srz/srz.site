// Leitura dos artigos da seção Conteúdo (content/conteudo/*.md).
// Os campos do cabeçalho são validados no build: se faltar algo obrigatório, o build para e avisa.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { z } from 'zod';
import { TEMAS, SETORES_ROTULO } from './site';

const PASTA = path.join(process.cwd(), 'content', 'conteudo');

const Esquema = z.object({
  titulo: z.string().max(120),
  descricao: z.string().max(170),
  publicado: z.coerce.date(),
  atualizado: z.coerce.date().optional(),
  autor: z.string().default('Equipe Sensoriz'),
  tema: z.enum(Object.keys(TEMAS) as [keyof typeof TEMAS]),
  setores: z.array(z.enum(Object.keys(SETORES_ROTULO) as [keyof typeof SETORES_ROTULO])).default([]),
  serie: z.enum(['norma-em-dia']).optional(),
  rascunho: z.boolean().default(false),
  palavrasChave: z.array(z.string()).default([]), // viram keywords nos dados estruturados
  origem: z.string().url().optional(), // onde o texto foi publicado primeiro (ex.: LinkedIn)
  perguntas: z.array(z.object({ pergunta: z.string(), resposta: z.string() })).default([]),
});

export type Artigo = z.infer<typeof Esquema> & { slug: string; html: string };

let cache: Artigo[] | null = null;

// Arquivos que começam com _ (ex.: _modelo.md) e artigos com rascunho: true não são publicados.
export function artigos(): Artigo[] {
  if (cache) return cache;
  cache = fs
    .readdirSync(PASTA)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((arquivo) => {
      const { data, content } = matter(fs.readFileSync(path.join(PASTA, arquivo), 'utf8'));
      const r = Esquema.safeParse(data);
      if (!r.success) throw new Error(`Cabeçalho inválido em content/conteudo/${arquivo}: ${r.error.message}`);
      return { ...r.data, slug: arquivo.replace(/\.md$/, ''), html: marked.parse(content, { async: false }) as string };
    })
    // Rascunhos aparecem só no `npm run dev` (com a marca Rascunho), nunca no site publicado.
    .filter((a) => !a.rascunho || process.env.NODE_ENV === 'development')
    .sort((a, b) => b.publicado.getTime() - a.publicado.getTime());
  return cache;
}

export const artigo = (slug: string) => artigos().find((a) => a.slug === slug);
