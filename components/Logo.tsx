// Logotipo oficial (arquivos do design system em /public/marca). Nunca recriar com fonte.
// Troca sozinho para a versão negativa no tema escuro. Largura mínima em tela: 140px.
export default function Logo({ largura = 160, sempreNegativo = false }: { largura?: number; sempreNegativo?: boolean }) {
  const altura = Math.round((largura * 393.06) / 3147.78);
  return (
    <span className="logo" style={{ width: largura }}>
      {sempreNegativo ? (
        <img src="/marca/sensoriz-logotipo-negativo.svg" alt="Sensoriz" width={largura} height={altura} />
      ) : (
        <>
          <img className="logo__claro" src="/marca/sensoriz-logotipo-principal.svg" alt="Sensoriz" width={largura} height={altura} />
          <img className="logo__escuro" src="/marca/sensoriz-logotipo-negativo.svg" alt="" aria-hidden="true" width={largura} height={altura} />
        </>
      )}
    </span>
  );
}
