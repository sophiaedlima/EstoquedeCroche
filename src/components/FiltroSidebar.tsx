import { IFiltroSidebarProps, TipoMaterial } from '../types/tipos';

interface IFiltroOpcao {
  valor: TipoMaterial | 'todos';
  label: string;
  icone: string;
}

const opcoesFiltro: IFiltroOpcao[] = [
  { valor: 'todos', label: 'Todos os Itens', icone: 'bi-grid-fill' },
  { valor: 'fio', label: 'Fios', icone: '' },
  { valor: 'agulha', label: 'Agulhas', icone: 'bi-tools' },
  { valor: 'acessorio', label: 'Acessórios', icone: 'bi-stars' },
  { valor: 'utensilio', label: 'Utensílios', icone: 'bi-scissors' },
];

export function FiltroSidebar({ filtroAtivo, onFiltroChange, onAdicionarMaterial }: IFiltroSidebarProps) {
  return (
    <aside className="filtro-sidebar">
      <div className="sidebar__logo">
        <div>
          <div className="sidebar__logo-titulo">Estoque de Crochê</div>
          <div className="sidebar__logo-sub">Gestão de materiais de crochê</div>
        </div>
      </div>

      <nav className="sidebar__nav">
        <p className="sidebar__nav-label">Filtrar por tipo</p>
        {opcoesFiltro.map((opcao) => (
          <button
            key={opcao.valor}
            className={`sidebar__nav-item ${filtroAtivo === opcao.valor ? 'sidebar__nav-item--ativo' : ''}`}
            onClick={() => onFiltroChange(opcao.valor)}
          >
            {opcao.valor === 'fio'
              ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                  <path d="M3 5.5C5 4 11 4 13 5.5M2.5 9C5 7 11 7.5 13.5 9M4 12.5C6 11 10 11 12 12.5" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
                  <path d="M8 1C6 3 5.5 6 6 8C6.5 10 7 13 8 15" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
                </svg>
              : opcao.valor === 'agulha'
              ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" className="me-2">
                  <line x1="14" y1="2" x2="4.5" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M4.5 11.5 C3.5 12.5 2.2 13 2 12.5 C1.8 12 2.5 11 3.5 11.2" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                </svg>
              : <i className={`bi ${opcao.icone} me-2`}></i>
            }
            {opcao.label}
          </button>
        ))}
      </nav>

      <div className="sidebar__acoes">
        <button className="btn-adicionar" onClick={onAdicionarMaterial}>
          <i className="bi bi-plus-lg me-2"></i>Novo Material
        </button>
      </div>

    </aside>
  );
}
