// Configuração do Astro para o site da Sensoriz.
// Saída 100% estática (HTML pronto em cada página): melhor para SEO, busca por IA e velocidade.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.sensoriz.com.br',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      // Fora do sitemap: páginas sem índice e filtros da seção Conteúdo (entram quando tiverem artigos).
      filter: (page) =>
        !page.includes('/privacidade') && !page.includes('/404') && !page.includes('/conteudo/tema/') && !page.includes('/conteudo/setor/'),
    }),
  ],
});
