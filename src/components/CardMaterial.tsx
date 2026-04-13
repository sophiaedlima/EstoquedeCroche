import { ICardMaterialProps } from '../types/tipos';

export function CardMaterial({ material, onUsarMaterial, onReporEstoque, onEditar }: ICardMaterialProps) {
  const { id, nome, tipo, cor, quantidade, quantidadeMinima, marca, statusEstoque, metrosPorNovelo, codigoCor, lote } = material;

  const badgeCor = statusEstoque === 'ok' ? 'bg-success' : statusEstoque === 'baixo' ? 'bg-warning text-dark' : 'bg-danger';
  const badgeLabel = statusEstoque === 'ok' ? 'Em estoque' : statusEstoque === 'baixo' ? 'Estoque baixo' : 'Esgotado';

  return (
    <div className={`card h-100 ${statusEstoque === 'esgotado' ? 'opacity-50' : ''}`}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <small className="text-muted text-uppercase fw-bold">{tipo}</small>
        <span className={`badge ${badgeCor}`}>{badgeLabel}</span>
      </div>

      <div className="card-body">
        <h6 className="card-title">{nome}</h6>
        {cor && <p className="card-text text-muted mb-1"><small>Cor: {cor}</small></p>}
        {marca && <p className="card-text text-muted mb-1"><small>Marca: {marca}</small></p>}
        {tipo === 'fio' && (
          <p className="card-text text-muted mb-1">
            <small>
              {metrosPorNovelo && `${metrosPorNovelo}m/novelo`}
              {codigoCor && ` · Cor ${codigoCor}`}
              {lote && ` · Lote ${lote}`}
            </small>
          </p>
        )}
        <p className="card-text mt-2">
          <small>Quantidade: <strong>{quantidade}</strong> · Mínimo: {quantidadeMinima}</small>
        </p>
      </div>

      <div className="card-footer d-flex gap-1">
        <button className="btn btn-sm btn-outline-primary" onClick={() => onEditar(id)}>
          Editar
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onUsarMaterial(id)} disabled={statusEstoque === 'esgotado'}>
          Usar
        </button>
        <button className="btn btn-sm btn-outline-success" onClick={() => onReporEstoque(id)}>
          Repor
        </button>
      </div>
    </div>
  );
}
