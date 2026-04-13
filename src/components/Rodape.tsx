export function Rodape() {
  return (
    <footer className="bg-dark text-white text-center py-2 mt-auto">
      <small>
        Desenvolvido por <strong>Sophia Eduarda Lima</strong> · Desenvolvimento de Software Web · Prof. Alexandre Almeida · {new Date().toLocaleDateString('pt-BR')}
      </small>
    </footer>
  );
}
