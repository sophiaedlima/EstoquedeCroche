import { ICardMaterialProps } from '../types/tipos';

function IconeTipo({ tipo }: { tipo: string }) {
  if (tipo === 'fio') return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 16 16" className="me-1" style={{ verticalAlign: 'middle' }}>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <path d="M3 5.5C5 4 11 4 13 5.5M2.5 9C5 7 11 7.5 13.5 9M4 12.5C6 11 10 11 12 12.5" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M8 1C6 3 5.5 6 6 8C6.5 10 7 13 8 15" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  );
  if (tipo === 'agulha') return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 16 16" className="me-1" style={{ verticalAlign: 'middle' }}>
      <line x1="14" y1="2" x2="4.5" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4.5 11.5 C3.5 12.5 2.2 13 2 12.5 C1.8 12 2.5 11 3.5 11.2" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  );
  if (tipo === 'utensilio') return <i className="bi bi-scissors me-1"></i>;
  return <i className="bi bi-stars me-1"></i>;
}

const labelsTipo: Record<string, string> = {
  fio: 'Fio',
  agulha: 'Agulha',
  acessorio: 'Acessório',
  utensilio: 'Utensílio',
};

const badgeStatusClasse: Record<string, string> = {
  ok: 'badge-ok',
  baixo: 'badge-baixo',
  esgotado: 'badge-esgotado',
};

const badgeStatusLabel: Record<string, string> = {
  ok: 'Em estoque',
  baixo: 'Estoque baixo',
  esgotado: 'Esgotado',
};

export function CardMaterial({ material, onUsarMaterial, onReporEstoque, onEditar }: ICardMaterialProps) {
  const { id, nome, tipo, cor, quantidade, quantidadeMinima, unidade, marca, statusEstoque, metrosPorNovelo, codigoCor, lote } = material;

  return (
    <div className={`card-material ${statusEstoque === 'esgotado' ? 'card-material--esgotado' : ''}`}>
      <div className="card-material__header">
        <div className="card-material__tipo">
          <IconeTipo tipo={tipo} />
          {labelsTipo[tipo]}
        </div>
        <span className={`badge-status ${badgeStatusClasse[statusEstoque]}`}>
          {badgeStatusLabel[statusEstoque]}
        </span>
      </div>

      <div className="card-material__body">
        <h3 className="card-material__nome">{nome}</h3>
        <div className="card-material__meta">
          {cor && <span>Cor: {cor}</span>}
          {marca && <span>Marca: {marca}</span>}
        </div>

        {tipo === 'fio' && (metrosPorNovelo || codigoCor || lote) && (
          <div className="card-material__fio-info">
            {metrosPorNovelo && <span>{metrosPorNovelo}m/novelo</span>}
            {codigoCor && <span>Cor {codigoCor}</span>}
            {lote && <span>Lote {lote}</span>}
          </div>
        )}

        <div className="card-material__quantidade">
          <small>Quantidade: <strong>{quantidade}{tipo !== 'fio' ? ` ${unidade}` : ''}</strong></small>
          <br />
          <small>Mínimo: {quantidadeMinima}{tipo !== 'fio' ? ` ${unidade}` : ''}</small>
        </div>
      </div>

      <div className="card-material__footer">
        <button
          className="btn-acao btn-editar"
          onClick={() => onEditar(id)}
        >
          <i className="bi bi-pencil me-1"></i>Editar
        </button>
        <button
          className="btn-acao btn-usar"
          onClick={() => onUsarMaterial(id)}
          disabled={statusEstoque === 'esgotado'}
        >
          <i className="bi bi-dash-circle me-1"></i>Usar material
        </button>
        <button
          className="btn-acao btn-repor"
          onClick={() => onReporEstoque(id)}
        >
          <i className="bi bi-plus-circle me-1"></i>Repor
        </button>
      </div>
    </div>
  );
}
