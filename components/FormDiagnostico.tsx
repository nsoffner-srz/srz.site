'use client';
// Formulário de diagnóstico. Envia para /api/diagnostico (worker/index.ts),
// que cria o lead no Pipeline Sensoriz do Notion com origem "Site".
// Sem JavaScript, o formulário funciona do mesmo jeito (envio normal).
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SETORES_ROTULO } from '@/lib/site';

export default function FormDiagnostico() {
  const form = useRef<HTMLFormElement>(null);
  const [retorno, setRetorno] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const setor = p.get('setor');
    if (setor && form.current) (form.current.elements.namedItem('setor') as HTMLSelectElement).value = setor;
    // Vindo de "Calcule seu ROI": já deixa o pedido escrito na mensagem.
    if (p.get('objetivo') === 'roi' && form.current) {
      const msg = form.current.elements.namedItem('mensagem') as HTMLTextAreaElement;
      if (!msg.value) msg.value = 'Quero calcular o retorno (ROI) da Sensoriz na minha operação.';
    }
    if (p.get('enviado')) setRetorno('Recebemos o seu pedido. O nosso time entra em contato em até um dia útil.');
    if (p.get('erro')) setRetorno('Não foi possível enviar. Confira os campos obrigatórios ou fale pelo WhatsApp.');
  }, []);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setRetorno('Enviando…');
    try {
      const r = await fetch('/api/diagnostico', { method: 'POST', body: new FormData(e.currentTarget), headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error();
      form.current?.reset();
      setRetorno('Recebemos o seu pedido. O nosso time entra em contato em até um dia útil.');
    } catch {
      setRetorno('Não foi possível enviar agora. Tente de novo ou fale pelo WhatsApp.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form ref={form} className="card form" method="post" action="/api/diagnostico" onSubmit={enviar}>
      <div className="campo"><label htmlFor="nome">Nome</label><input id="nome" name="nome" autoComplete="name" required /></div>
      <div className="campo"><label htmlFor="cargo">Cargo</label><input id="cargo" name="cargo" autoComplete="organization-title" /></div>
      <div className="campo"><label htmlFor="email">E-mail corporativo</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      <div className="campo"><label htmlFor="telefone">Telefone ou WhatsApp</label><input id="telefone" name="telefone" type="tel" autoComplete="tel" required /></div>
      <div className="campo"><label htmlFor="empresa">Empresa</label><input id="empresa" name="empresa" autoComplete="organization" required /></div>
      <div className="campo">
        <label htmlFor="setor">Setor</label>
        <select id="setor" name="setor" required defaultValue="">
          <option value="">Selecione</option>
          {Object.entries(SETORES_ROTULO).map(([id, nome]) => <option key={id} value={id}>{nome}</option>)}
          <option value="outro">Outro</option>
        </select>
      </div>
      <div className="campo">
        <label htmlFor="pontos">Quantos pontos quer monitorar? <span className="opcional">(opcional)</span></label>
        <input id="pontos" name="pontos" type="number" min={1} inputMode="numeric" />
        <p className="ajuda">Uma geladeira, uma câmara, um veículo ou um equipamento contam como um ponto.</p>
      </div>
      <div className="campo campo--largo">
        <label htmlFor="mensagem">O que você quer resolver? <span className="opcional">(opcional)</span></label>
        <textarea id="mensagem" name="mensagem" rows={4} />
      </div>
      <div className="armadilha" aria-hidden="true"><label>Não preencha<input type="text" name="site_url" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="campo campo--largo campo--consentimento">
        <input id="consentimento" name="consentimento" type="checkbox" required />
        <label htmlFor="consentimento">Concordo que a Sensoriz use estes dados para entrar em contato sobre o diagnóstico, conforme a <Link href="/politicas/privacidade">política de privacidade</Link>.</label>
      </div>
      <button className="botao botao--primario" type="submit" disabled={enviando}>Solicitar diagnóstico</button>
      <p className="form__retorno" role="status" aria-live="polite">{retorno}</p>
    </form>
  );
}
