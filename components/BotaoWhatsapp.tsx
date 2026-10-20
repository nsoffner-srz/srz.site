'use client';
// Botão flutuante de WhatsApp (out/2026). Antes de abrir a conversa, pede nome, empresa e WhatsApp:
// o lead entra no Pipeline do Notion (visão "Leads do site") e o WhatsApp abre com a mensagem pronta.
// O envio do lead usa sendBeacon, que não segura a abertura do WhatsApp (e não é bloqueado pelo navegador).
// Sem JavaScript, o botão é um link direto para o WhatsApp. Não aparece na página de diagnóstico.
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/site';

const NUMERO = SITE.whatsapp.match(/wa\.me\/(\d+)/)?.[1] ?? '';

function IconeWhatsapp() {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M16.04 3C8.88 3 3.06 8.8 3.06 15.94c0 2.28.6 4.5 1.74 6.46L3 29l6.78-1.77a13 13 0 0 0 6.25 1.6h.01c7.15 0 12.97-5.8 12.97-12.94S23.19 3 16.04 3Zm0 23.65h-.01a10.8 10.8 0 0 1-5.5-1.5l-.39-.23-4.02 1.05 1.07-3.91-.26-.4a10.7 10.7 0 0 1-1.65-5.72c0-5.94 4.84-10.77 10.78-10.77 2.88 0 5.58 1.12 7.62 3.16a10.7 10.7 0 0 1 3.15 7.62c0 5.94-4.84 10.7-10.79 10.7Zm5.91-8.03c-.32-.16-1.92-.95-2.22-1.06-.3-.11-.51-.16-.73.16-.21.32-.84 1.06-1.03 1.27-.19.22-.38.24-.7.08-.32-.16-1.37-.5-2.6-1.6-.96-.86-1.61-1.91-1.8-2.23-.19-.32-.02-.5.14-.66.15-.14.32-.38.49-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.69 0 1.58 1.16 3.11 1.32 3.33.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.25 1.48.21 2.03.13.62-.09 1.92-.78 2.19-1.54.27-.76.27-1.41.19-1.54-.08-.14-.3-.22-.62-.38Z" />
    </svg>
  );
}

export default function BotaoWhatsapp() {
  const caminho = usePathname();
  const [aberto, setAberto] = useState(false);
  const primeiro = useRef<HTMLInputElement>(null);
  const botao = useRef<HTMLAnchorElement>(null);
  const enviando = useRef(false);

  useEffect(() => {
    if (!aberto) return;
    primeiro.current?.focus();
    const fechar = (e: KeyboardEvent) => { if (e.key === 'Escape') { setAberto(false); botao.current?.focus(); } };
    window.addEventListener('keydown', fechar);
    return () => window.removeEventListener('keydown', fechar);
  }, [aberto]);

  if (caminho?.startsWith('/diagnostico')) return null;

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enviando.current) return;
    enviando.current = true;
    const dados = new FormData(e.currentTarget);
    const nome = String(dados.get('nome') ?? '').trim();
    const empresa = String(dados.get('empresa') ?? '').trim();
    try { navigator.sendBeacon('/api/diagnostico', dados); } catch { /* o WhatsApp abre mesmo assim */ }
    const texto = `Olá, sou ${nome}, da ${empresa}. Quero falar sobre monitoramento.`;
    const url = `https://wa.me/${NUMERO}?text=${encodeURIComponent(texto)}`;
    // Abre o WhatsApp em outra aba. Atenção: window.open com 'noopener' devolve sempre null, então não dá para
    // usar o retorno para decidir um plano B (isso fazia o site também navegar para o WhatsApp). Um link
    // com target=_blank, clicado dentro do envio do formulário, abre só a nova aba.
    const link = document.createElement('a');
    link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    document.body.appendChild(link); link.click(); link.remove();
    setAberto(false);
  };

  return (
    <div className="zap">
      {aberto && (
        <div className="zap__painel" role="dialog" aria-modal="false" aria-labelledby="zap-titulo">
          <div className="zap__topo">
            <p id="zap-titulo" className="titulo-secao">Fale com a Sensoriz</p>
            <button type="button" className="zap__fechar" onClick={() => setAberto(false)} aria-label="Fechar">×</button>
          </div>
          <p className="apoio">Deixe seu contato e continue a conversa no WhatsApp.</p>
          <form className="form zap__form" onSubmit={enviar}>
            <input type="hidden" name="canal" value="whatsapp" />
            <div className="armadilha" aria-hidden="true"><label>Não preencha<input type="text" name="site_url" tabIndex={-1} autoComplete="off" /></label></div>
            <div className="campo"><label htmlFor="zap-nome">Nome</label><input ref={primeiro} id="zap-nome" name="nome" required autoComplete="name" maxLength={120} /></div>
            <div className="campo"><label htmlFor="zap-empresa">Empresa</label><input id="zap-empresa" name="empresa" required autoComplete="organization" maxLength={200} /></div>
            <div className="campo"><label htmlFor="zap-telefone">WhatsApp</label><input id="zap-telefone" name="telefone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="(11) 90000-0000" maxLength={40} /></div>
            <div className="campo campo--consentimento">
              <input id="zap-consentimento" name="consentimento" type="checkbox" required />
              <label htmlFor="zap-consentimento">Concordo que a Sensoriz use estes dados para entrar em contato, conforme a <Link href="/politicas/privacidade">política de privacidade</Link>.</label>
            </div>
            <button type="submit" className="botao botao--primario">Continuar no WhatsApp</button>
          </form>
        </div>
      )}
      <a
        ref={botao}
        className="zap__botao"
        href={SITE.whatsapp}
        aria-label="Falar com a Sensoriz pelo WhatsApp"
        aria-expanded={aberto}
        onClick={(e) => { e.preventDefault(); enviando.current = false; setAberto((v) => !v); }}
      >
        <IconeWhatsapp />
      </a>
    </div>
  );
}
