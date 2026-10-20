// Cloudflare Pages Function: recebe o formulário de diagnóstico e cria o lead no Notion.
// Rota: POST /api/diagnostico
//
// Variáveis de ambiente (configurar no painel da Cloudflare, nunca no código):
//   NOTION_TOKEN            token da integração do Notion com acesso ao banco "Pipeline Sensoriz"
//   NOTION_DATA_SOURCE_ID   id da fonte de dados do Pipeline (padrão abaixo)
//
// Mapeamento para o Pipeline Sensoriz:
//   Name = empresa · Contato principal = nome e cargo · Email · Phone · Origem = Site
//   Status = Prospecção · A2 Pontos de monitoramento = pontos · Próxima Ação Comercial = setor e mensagem
//   (ou, com canal=whatsapp, aviso de que veio pelo botão de WhatsApp). Visão "Leads do site": Origem Site + Prospecção.

interface Env {
  NOTION_TOKEN?: string;
  NOTION_DATA_SOURCE_ID?: string;
}
interface Contexto { request: Request; env: Env }

const PIPELINE_PADRAO = '215c6b1d-e809-80b6-bab4-000bec491c23';
const SETORES: Record<string, string> = {
  'logistica-e-cadeia-fria': 'Logística e Cadeia Fria',
  'farmacias-e-clinicas': 'Farmácias e Clínicas',
  saude: 'Saúde',
  'industria-e-inventario': 'Indústria e Inventário',
  outro: 'Outro',
};

const texto = (v: FormDataEntryValue | null, max = 500) => String(v ?? '').trim().slice(0, max);
const rich = (t: string) => ({ rich_text: t ? [{ text: { content: t } }] : [] });

function responder(request: Request, ok: boolean, status = ok ? 200 : 400) {
  if ((request.headers.get('Accept') ?? '').includes('application/json')) {
    return new Response(JSON.stringify({ ok }), { status, headers: { 'Content-Type': 'application/json' } });
  }
  // Sem JavaScript no navegador: volta para a página com o resultado na URL.
  return Response.redirect(new URL(`/diagnostico?${ok ? 'enviado=1' : 'erro=1'}`, request.url).href, 303);
}

export async function onRequestPost({ request, env }: Contexto): Promise<Response> {
  const form = await request.formData();

  // Campo escondido: se veio preenchido, é robô. Responde ok sem gravar nada.
  if (texto(form.get('site_url'))) return responder(request, true);

  const nome = texto(form.get('nome'), 120);
  const cargo = texto(form.get('cargo'), 120);
  const email = texto(form.get('email'), 200);
  const telefone = texto(form.get('telefone'), 40);
  const empresa = texto(form.get('empresa'), 200);
  const setor = SETORES[texto(form.get('setor'), 60)] ?? 'Não informado';
  const pontos = Number(texto(form.get('pontos'), 10)) || null;
  const mensagem = texto(form.get('mensagem'), 1500);
  const consentimento = form.get('consentimento');
  // Botão flutuante de WhatsApp: cadastro rápido (nome, empresa e WhatsApp), sem e-mail.
  const viaWhatsapp = texto(form.get('canal'), 20) === 'whatsapp';

  if (!nome || !telefone || !empresa || !consentimento || (!viaWhatsapp && !email.includes('@'))) {
    return responder(request, false);
  }
  const proximaAcao = viaWhatsapp
    ? 'Veio pelo botão de WhatsApp do site. Responder pelo WhatsApp.'
    : `Retornar pedido de diagnóstico do site. Setor: ${setor}.${mensagem ? ` Mensagem: ${mensagem}` : ''}`;

  if (!env.NOTION_TOKEN) {
    console.error('NOTION_TOKEN não configurado');
    return responder(request, false, 500);
  }

  const resposta = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.NOTION_TOKEN}`,
      'Notion-Version': '2025-09-03',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { type: 'data_source_id', data_source_id: env.NOTION_DATA_SOURCE_ID || PIPELINE_PADRAO },
      properties: {
        Name: { title: [{ text: { content: empresa } }] },
        'Contato principal': rich(cargo ? `${nome} (${cargo})` : nome),
        ...(email.includes('@') ? { Email: { email } } : {}),
        Phone: { phone_number: telefone },
        Origem: { select: { name: 'Site' } },
        Status: { status: { name: 'Prospecção' } },
        ...(pontos ? { 'A2 Pontos de monitoramento': { number: pontos } } : {}),
        'Próxima Ação Comercial': rich(proximaAcao),
      },
    }),
  });

  if (!resposta.ok) {
    console.error('Erro ao criar lead no Notion', resposta.status, await resposta.text());
    return responder(request, false, 502);
  }
  return responder(request, true);
}
