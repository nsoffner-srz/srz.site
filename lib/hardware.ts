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
  { nome: 'Recarregável', uso: 'Rotas que voltam à base, como a frota de distribuição. Recarrega entre uma viagem e outra.' },
  { nome: 'Na tomada', uso: 'Geladeiras, câmaras e salas fixas. Mede também a queda de energia.' },
  { nome: 'Descartável', uso: 'Envios de ida, sem retorno do equipamento. Bateria de longa duração.' },
  { nome: 'Longa duração', uso: 'Ativos que ficam anos no mesmo lugar ou em circulação. Bateria de até 5 anos.' },
];

export const DISPOSITIVOS = [
  {
    nome: 'Hub',
    resumo: 'Sensor completo e comunicador com a nuvem. Mede 8 parâmetros e envia as leituras, dele e das tags próximas, para a Sensoriz CORE.',
    mede: PARAMETROS_HUB,
  },
  {
    nome: 'Tag',
    resumo: 'Sensor compacto para cada volume, palete, caixa ou equipamento. Envia as leituras pelo hub mais próximo.',
    mede: PARAMETROS_TAG,
  },
  {
    nome: 'Lacre inteligente',
    resumo: 'Lacre eletrônico para portas de caminhão e baú. Registra e avisa quando a carga é aberta fora do previsto.',
    mede: ['Abertura e violação da porta'] as readonly string[],
  },
];
