// Clientes ativos (set 2026). Formato: cenário, impacto, solução, resultado.
// Nomes: GoldPão e Fungo de Quintal podem aparecer (confirmar autorização por escrito antes de publicar).
// Midea Carrier aparece SEM o nome da empresa, só pelo segmento.
import type { SetorId } from './site';

export interface Case {
  id: string;
  cliente: string;
  segmento: string;
  setor: SetorId;
  titulo: string;
  resultado?: string;
  cenario: string;
  solucao: string;
  depoimentos: { texto: string; autor: string }[]; // vazio = depoimento ainda não recebido
  autorizado: boolean; // false = fica fora do site até o cliente autorizar por escrito
}

export const CASES: Case[] = [
  {
    id: 'fabricante-climatizacao',
    autorizado: false, // aguardando autorização (out/2026)
    cliente: 'Fabricante multinacional de climatização',
    segmento: 'Indústria',
    setor: 'ativos-de-alto-valor',
    titulo: 'Onde os equipamentos sofriam impacto',
    resultado: 'Impactos de 14 a 17 G achados',
    cenario: 'Equipamentos de ar-condicionado chegavam danificados, sem saber onde.',
    solucao: 'Os hubs mostraram que os impactos aconteciam no manuseio e no transbordo. Cada um virou laudo para o seguro.',
    depoimentos: [
      { texto: 'A gente trabalha muito com fatos e dados, então onde não conseguíamos comprovar, ficava difícil tomar uma ação. Com o equipamento, conseguimos comprovar exatamente onde estavam acontecendo os problemas no transporte.', autor: 'Gestor de Qualidade · Indústria Multinacional' },
      { texto: 'O equipamento tem servido como uma forma de retroalimentação para o nosso produto. Viramos essa parte do monitoramento em uma rotina para os nossos novos desenvolvimentos.', autor: 'Gestor de Qualidade · Indústria Multinacional' },
      { texto: 'Tem funcionado muito bem. A gente passa uma demanda específica e tem retorno num tempo bem breve.', autor: 'Gestor de Qualidade · Indústria Multinacional' },
    ],
  },
  {
    id: 'goldpao',
    autorizado: false, // aguardando autorização (out/2026)
    cliente: 'GoldPão',
    segmento: 'Pães congelados',
    setor: 'logistica-e-cadeia-fria',
    titulo: 'Pão congelado na temperatura certa até a entrega',
    // Dor real relatada pelo Rodrigo (out/2026). Nome só com autorização por escrito.
    cenario: 'Os sensores anteriores ficavam offline sem explicação, às vezes por dias, e o suporte demorava. Ligados na elétrica dos caminhões de agregados, davam trabalho a cada troca de motorista e chegaram a gerar cobrança por avaria no veículo. Mesmo com sensor, a equipe não confiava no dado.',
    solucao: 'Hubs com bateria própria, instalados sem mexer na elétrica do caminhão. Saem com o agregado em minutos. Dados em tempo real e aviso se a temperatura sair da faixa.',
    depoimentos: [],
  },
  {
    id: 'fungo-de-quintal',
    autorizado: false, // aguardando autorização (out/2026)
    cliente: 'Fungo de Quintal',
    segmento: 'Produção de cogumelos',
    setor: 'logistica-e-cadeia-fria',
    titulo: 'Cogumelos frescos por mais tempo',
    cenario: 'Pouca variação de temperatura e umidade já encurta a vida do cogumelo.',
    solucao: 'O estoque é monitorado o tempo todo, com aviso se algo sair da faixa.',
    depoimentos: [],
  },
];

// Só o que pode aparecer no site (autorizado). Use estas listas nas páginas, nunca CASES/CASES_SUCESSO direto.
export const casesDoSetor = (setor: string) => CASES.filter((c) => c.autorizado && c.setor === setor);

// Cases de sucesso no formato antes · problema · como atuamos · resultado (sugestão do Felipe/WOW e do
// Rodrigo, out/2026). Sem nome de cliente: só o segmento. Aparecem na home e no topo de /cases.
export interface CaseSucesso {
  id: string;
  segmento: string;
  contexto: string;
  destaque: { prefixo?: string; valor: string; unidade?: string; rotulo: string };
  antes: string;
  problema: string;
  como: string;
  resultado: string;
  depoimento?: { texto: string; autor: string };
  foto?: { src: string; alt: string };
  href: string;
  autorizado: boolean; // false = fica fora do site até o cliente autorizar
}

export const CASES_SUCESSO: CaseSucesso[] = [
  {
    id: 'quimica-cadeia-fria',
    autorizado: true,
    segmento: 'Multinacional química',
    contexto: 'Cadeia fria',
    destaque: { prefixo: 'R$', valor: '300', unidade: 'mil', rotulo: 'em perda evitada na primeira ocorrência' },
    antes: 'Cargas refrigeradas acompanhadas só no destino.',
    problema: 'Ninguém via quando a temperatura saía da faixa na rota.',
    como: 'Hub na carga e alerta em tempo real.',
    resultado: 'Excursão de 23,69 °C detectada a tempo. R$ 300 mil em perda evitada logo na primeira ocorrência.',
    href: '/solucoes/logistica-e-cadeia-fria',
  },
  {
    id: 'prefeitura-vacinas',
    autorizado: true,
    segmento: 'Prefeitura',
    contexto: 'Vacinas em postos de saúde',
    destaque: { prefixo: 'menos de', valor: '1', unidade: 'mês', rotulo: 'de payback' },
    antes: 'Temperatura conferida no visor da geladeira.',
    problema: 'O visor mostrava a temperatura certa, mas o compressor estava com defeito.',
    como: 'Tags nas geladeiras e hub na tomada.',
    resultado: 'Defeito encontrado antes da perda das vacinas. Payback em menos de 1 mês.',
    href: '/solucoes/saude',
  },
  {
    id: 'climatizacao-transporte',
    autorizado: false,
    segmento: 'Indústria de climatização',
    contexto: 'Transporte de equipamentos',
    destaque: { valor: '100', unidade: '%', rotulo: 'do trajeto com sinal, do Norte ao Sul' },
    antes: 'Equipamentos chegavam danificados, sem saber onde.',
    problema: 'Sem prova, não havia responsável nem laudo para o seguro.',
    como: 'Hubs nos equipamentos, do Norte ao Sul do Brasil, com trecho fluvial e sinal em todo o trajeto.',
    resultado: 'Impactos localizados no manuseio e no transbordo, com laudo de cada um.',
    depoimento: { texto: 'Conseguimos comprovar exatamente onde estavam acontecendo os problemas no transporte.', autor: 'Gestor de Qualidade · Indústria Multinacional' },
    href: '/solucoes/ativos-de-alto-valor',
  },
  {
    id: 'paes-congelados-frota',
    autorizado: false,
    segmento: 'Fabricante de pães congelados',
    contexto: 'Frota de distribuição',
    destaque: { prefixo: 'menos de', valor: '1', unidade: 'min', rotulo: 'de instalação por caminhão' },
    antes: 'Sensores offline por dias e suporte lento.',
    problema: 'A instalação na elétrica do caminhão de agregados gerava custo e disputa.',
    como: 'Hub com bateria própria, sem mexer no veículo.',
    resultado: 'Instalação em menos de 1 minuto por caminhão e dados em tempo real em toda a frota.',
    href: '/solucoes/estoque-em-movimento',
  },
];

export const CASES_PUBLICOS = CASES.filter((c) => c.autorizado);
export const CASES_SUCESSO_PUBLICOS = CASES_SUCESSO.filter((c) => c.autorizado);
