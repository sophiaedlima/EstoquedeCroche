export function Rodape() {
  return (
    <footer className="rodape">
      <address className="rodape__address">
        <span>Desenvolvido por <strong>Sophia Eduarda Lima</strong></span>
        <span className="rodape__sep">·</span>
        <span>{new Date().toLocaleDateString('pt-BR')}</span>
        <span className="rodape__sep">·</span>
        <span>Desenvolvimento de Software Web Prof. Alexandre Almeida</span>
      </address>
    </footer>
  );
}
