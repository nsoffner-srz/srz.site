// Layout base de todas as páginas: fontes, estilos, SEO padrão, dados da organização, cabeçalho e rodapé.
import type { Metadata, Viewport } from 'next';
import '@fontsource/archivo-black/400.css';
import '@fontsource/questrial/400.css';
import '@fontsource/atkinson-hyperlegible-mono/400.css';
import '@fontsource/atkinson-hyperlegible-mono/500.css';
import '@/styles/global.css';
import '@/styles/site.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BotaoWhatsapp from '@/components/BotaoWhatsapp';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/lib/site';
import { organizacaoJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Sensoriz | Monitoramento de ativos sensíveis em tempo real', template: '%s | Sensoriz' },
  description: SITE.descricao,
  icons: { icon: '/favicon-32.png', apple: '/apple-touch-icon.png' },
  alternates: { types: { 'application/rss+xml': '/conteudo/rss.xml' } },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F8FC' },
    { media: '(prefers-color-scheme: dark)', color: '#060B14' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <JsonLd dados={[organizacaoJsonLd]} />
        <a className="pular" href="#conteudo">Pular para o conteúdo</a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <BotaoWhatsapp />
      </body>
    </html>
  );
}
