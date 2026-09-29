// Coleções de conteúdo do site. Cada arquivo .md dentro de src/content/<coleção> vira uma página.
// Os campos abaixo são validados no build: se faltar algo obrigatório, o build avisa.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Lista fechada de temas e setores. Para criar um novo, adicione aqui primeiro.
export const TEMAS = [
  'normas-e-fiscalizacao',
  'perdas-e-custos',
  'gestao-da-operacao',
  'tecnologia-e-dados',
  'cases-e-depoimentos',
] as const;

export const SETORES = [
  'logistica-e-cadeia-fria',
  'farmacias-e-clinicas',
  'saude',
  'industria-e-inventario',
] as const;

const conteudo = defineCollection({
  // Arquivos que começam com _ (ex.: _modelo.md) não são publicados.
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/conteudo' }),
  schema: z.object({
    titulo: z.string().max(90),
    descricao: z.string().max(170), // vira a meta description e o resumo no card
    publicado: z.coerce.date(),
    atualizado: z.coerce.date().optional(),
    autor: z.string().default('Equipe Sensoriz'),
    tema: z.enum(TEMAS),
    setores: z.array(z.enum(SETORES)).default([]),
    serie: z.enum(['norma-em-dia']).optional(),
    rascunho: z.boolean().default(false),
    // Perguntas e respostas curtas no fim do artigo: ajudam buscadores e IA a citar o texto.
    perguntas: z.array(z.object({ pergunta: z.string(), resposta: z.string() })).default([]),
  }),
});

const setores = defineCollection({
  loader: glob({ pattern: ['*.md', '!_*.md'], base: './src/content/setores' }),
  schema: z.object({
    nome: z.string(),
    ordem: z.number(),
    resumo: z.string().max(170),
    tituloHero: z.string(),
    subtituloHero: z.string(),
    publico: z.string(),
    dor: z.object({ titulo: z.string(), texto: z.string(), custo: z.string() }),
    normas: z.array(z.object({ nome: z.string(), exige: z.string() })).default([]),
    comoResolve: z.object({ ver: z.string(), agir: z.string(), provar: z.string() }),
    configuracao: z.array(z.object({ item: z.string(), detalhe: z.string() })),
    ambientes: z.array(z.string()),
    perguntas: z.array(z.object({ pergunta: z.string(), resposta: z.string() })),
  }),
});

export const collections = { conteudo, setores };
