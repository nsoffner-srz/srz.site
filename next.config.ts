import type { NextConfig } from 'next';

// Exportação estática: `npm run build` gera a pasta out/ com HTML pronto de cada página.
// É o que vai para a Cloudflare Pages. Melhor para SEO, busca por IA e velocidade.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
