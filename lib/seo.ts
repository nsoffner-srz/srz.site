// Metadados e dados estruturados (schema.org): ajudam o Google e os buscadores de IA a entender e citar cada página.
import type { Metadata } from 'next';
import { SITE } from './site';

export function metadados({ titulo, descricao = SITE.descricao, caminho, tipo = 'website', semIndice = false, imagem }: {
  titulo: string;
  descricao?: string;
  caminho: string;
  tipo?: 'website' | 'article';
  semIndice?: boolean;
  imagem?: string; // caminho da foto de capa (ex.: /conteudo/capas/slug.jpg)
}): Metadata {
  const url = new URL(caminho, SITE.url).href;
  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: url },
    robots: semIndice ? { index: false, follow: true } : undefined,
    openGraph: { title: titulo, description: descricao, url, type: tipo, siteName: 'Sensoriz', locale: 'pt_BR', images: [imagem ? new URL(imagem, SITE.url).href : `${SITE.url}/icon-512.png`] },
    twitter: { card: imagem ? 'summary_large_image' : 'summary' },
  };
}

export function faqJsonLd(itens: { pergunta: string; resposta: string }[]) {
  if (!itens.length) return [];
  return [{
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: itens.map((i) => ({ '@type': 'Question', name: i.pergunta, acceptedAnswer: { '@type': 'Answer', text: i.resposta } })),
  }];
}

export function trilhaJsonLd(itens: { nome: string; caminho: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((i, n) => ({ '@type': 'ListItem', position: n + 1, name: i.nome, item: new URL(i.caminho, SITE.url).href })),
  };
}

export const organizacaoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organizacao`,
  name: 'Sensoriz',
  url: SITE.url,
  logo: `${SITE.url}/icon-512.png`,
  description: SITE.descricao,
  sameAs: Object.values(SITE.redes),
};

export function formatarData(d: Date) {
  return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
}
