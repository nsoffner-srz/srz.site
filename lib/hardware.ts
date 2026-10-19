// Hardware usado pela Sensoriz. Fonte: Nicole Soffner (CMO), 29 set 2026.
// Dúvidas de hardware: confirmar com o Rodrigo (CEO).
// Hubs e tags: parceiro internacional SystemLoco. Lacre inteligente: parceiro internacional TydenBrooks.
// Os nomes dos parceiros ficam fora do texto do site até a decisão de citá-los (ver CLAUDE.md).

// A solução completa (hub + tag) mede 8 parâmetros. É assim que falamos na home e nas páginas gerais.
// Só nas páginas de hardware separamos o que cada dispositivo mede (Nicole, 19 out 2026).
export const PARAMETROS_SOLUCAO = [
  'Temperatura',
  'Umidade',
  'Luminosidade',
  'Pressão atmosférica',
  'Impacto',
  'Vibração',
  'Localização',
  'Orientação (eixos X, Y e Z)',
] as const;

// O hub NÃO mede umidade: quem mede é a tag.
export const PARAMETROS_HUB = PARAMETROS_SOLUCAO.filter((p) => p !== 'Umidade');

export const PARAMETROS_TAG = ['Temperatura', 'Umidade', 'Localização'] as const;

// Fotos em public/fotos/dispositivos (<nome>-600.webp e <nome>-1200.webp, 4:3, fundo transparente).
export type FotoProduto = { nome: string; alt: string };

export const MODELOS_HUB: { nome: string; uso: string; foto?: FotoProduto }[] = [
  { nome: 'Recarregável', uso: 'Para frotas que voltam à base.', foto: { nome: 'hub-recarregavel', alt: 'Hub recarregável, preto, com botão e sensor de luz no canto' } },
  { nome: 'Na tomada', uso: 'Para geladeiras, câmaras e salas. Avisa se a energia cair.', foto: { nome: 'hub-tomada', alt: 'Hub na tomada, preto, com cabo de energia e furos para fixar na parede' } },
  { nome: 'Descartável', uso: 'Para envios só de ida.' },
  { nome: 'Longa duração', uso: 'Para equipamentos de longa permanência. Até 5 anos de bateria.', foto: { nome: 'hub-longa-duracao', alt: 'Hub de longa duração, quadrado e preto, com furos para parafusos nas laterais' } },
];

export const DISPOSITIVOS = [
  {
    id: 'hub',
    nome: 'Hub',
    uso: 'Quero dados em tempo real de vários parâmetros, de onde a carga estiver',
    resumo: 'Fala com a nuvem e envia tudo para a CORE. Com a tag, a solução mede os 8 parâmetros.',
    mede: PARAMETROS_HUB,
    foto: { nome: 'hub-recarregavel', alt: 'Hub recarregável, preto, com botão e sensor de luz no canto' } as FotoProduto,
  },
  {
    id: 'tag',
    nome: 'Tag',
    uso: 'Quero medir vários pontos da câmara, ou cada palete, sem infraestrutura',
    resumo: 'Pequena, vai em cada caixa ou palete. Envia pelo hub.',
    mede: PARAMETROS_TAG,
    foto: { nome: 'tag', alt: 'Tag Sensoriz, pequena e preta, com etiqueta de identificação e código de barras' } as FotoProduto,
  },
  {
    id: 'lacre',
    nome: 'Lacre inteligente',
    uso: 'Preciso provar que a porta do caminhão só foi aberta no destino',
    resumo: 'Na porta do caminhão. Avisa se a carga for aberta.',
    mede: ['Abertura da porta'] as readonly string[],
    foto: { nome: 'lacre', alt: 'Lacre inteligente azul com cabo de aço' } as FotoProduto,
  },
];
