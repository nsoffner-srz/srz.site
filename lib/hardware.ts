// Hardware usado pela Sensoriz. Fonte: Nicole Soffner (CMO), 29 set 2026.
// Hubs e tags: parceiro internacional SystemLoco. Lacre inteligente: parceiro internacional TydenBrooks.
// Os nomes dos parceiros ficam fora do texto do site até a decisão de citá-los (ver CLAUDE.md).

export const PARAMETROS_HUB = [
  'Temperatura',
  'Umidade',
  'Luminosidade',
  'Pressão atmosférica',
  'Impacto',
  'Vibração',
  'Localização',
  'Orientação (eixos X, Y e Z)',
] as const;

export const PARAMETROS_TAG = ['Temperatura', 'Umidade', 'Localização'] as const;

export const MODELOS_HUB = [
  { nome: 'Recarregável', uso: 'Para frotas que voltam à base.' },
  { nome: 'Na tomada', uso: 'Para geladeiras, câmaras e salas. Avisa se a energia cair.' },
  { nome: 'Descartável', uso: 'Para envios só de ida.' },
  { nome: 'Longa duração', uso: 'Para equipamentos de longa permanência. Até 5 anos de bateria.' },
];

export const DISPOSITIVOS = [
  {
    nome: 'Hub',
    resumo: 'Mede 8 parâmetros e envia tudo para a CORE.',
    mede: PARAMETROS_HUB,
  },
  {
    nome: 'Tag',
    resumo: 'Pequena, vai em cada caixa ou palete. Envia pelo hub.',
    mede: PARAMETROS_TAG,
  },
  {
    nome: 'Lacre inteligente',
    resumo: 'Na porta do caminhão. Avisa se a carga for aberta.',
    mede: ['Abertura da porta'] as readonly string[],
  },
];
