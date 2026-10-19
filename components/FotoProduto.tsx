import type { FotoProduto as Foto } from '@/lib/hardware';

// Foto de dispositivo sobre uma base clara, igual nos dois temas (o produto é preto).
export default function FotoProduto({ foto, prioridade }: { foto: Foto; prioridade?: boolean }) {
  const base = `/fotos/dispositivos/${foto.nome}`;
  return (
    <figure className="foto-produto">
      <img
        src={`${base}-600.webp`}
        srcSet={`${base}-600.webp 600w, ${base}-1200.webp 1200w`}
        sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 92vw"
        alt={foto.alt}
        width={600}
        height={450}
        loading={prioridade ? 'eager' : 'lazy'}
        decoding="async"
      />
    </figure>
  );
}
