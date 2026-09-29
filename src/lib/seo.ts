// Dados estruturados (schema.org). Ajudam o Google e os buscadores de IA a entender e citar cada página.
import { SITE } from '../data/site';

export function faqJsonLd(itens: { pergunta: string; resposta: string }[]) {
  if (!itens.length) return [];
  return [{
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: itens.map((i) => ({
      '@type': 'Question',
      name: i.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: i.resposta },
    })),
  }];
}

export function trilhaJsonLd(itens: { nome: string; caminho: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((i, n) => ({
      '@type': 'ListItem',
      position: n + 1,
      name: i.nome,
      item: new URL(i.caminho, SITE.url).href,
    })),
  };
}

export function formatarData(d: Date) {
  return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
}
