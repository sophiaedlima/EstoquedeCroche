import { IFiltroSidebarProps, TipoMaterial } from '../types/tipos';

const categorias = [
  { valor: 'todos', label: 'Todos os Itens' },
  { valor: 'fio', label: 'Fios' },
  { valor: 'agulha', label: 'Agulhas' },
  { valor: 'acessorio', label: 'Acessórios' },
  { valor: 'utensilio', label: 'Utensílios' },
];

export function FiltroSidebar({ filtroAtivo, onFiltroChange, onAdicionarMaterial }: IFiltroSidebarProps) {
  return (
    <aside className="filtro-sidebar">
      <h5 className="text-danger mb-1">Estoque de Crochê</h5>
      <p className="text-muted small mb-4">Gestão de materiais de crochê</p>

      <p className="text-muted small text-uppercase mb-2">Filtrar por tipo</p>
      <div className="d-flex flex-column gap-1 mb-4">
        {categorias.map((cat) => (
          <button
            key={cat.valor}
            className={`btn btn-sm text-start ${filtroAtivo === cat.valor ? 'btn-danger' : 'btn-outline-secondary'}`}
            onClick={() => onFiltroChange(cat.valor as TipoMaterial | 'todos')}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <button className="btn btn-danger w-100" onClick={onAdicionarMaterial}>
        + Novo Material
      </button>
    </aside>
  );
}
