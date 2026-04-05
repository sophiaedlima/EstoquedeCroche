// Tipos de material disponíveis no estoque
export type TipoMaterial = 'fio' | 'agulha' | 'acessorio' | 'utensilio';

// Status do nível de estoque
export type StatusEstoque = 'ok' | 'baixo' | 'esgotado';

// Unidade de medida do material
export type UnidadeMedida = 'gramas' | 'unidade';

// Interface principal de um material de crochê
export interface IMaterial {
  id: number;
  nome: string;
  tipo: TipoMaterial;
  cor: string;
  quantidade: number;
  quantidadeMinima: number;
  unidade: UnidadeMedida;
  marca: string;
  statusEstoque: StatusEstoque;
  // Campos exclusivos de fio
  novelos?: number;
  metrosPorNovelo?: number;
  codigoCor?: string;
  lote?: string;
}

// Interface para as props do card de material
export interface ICardMaterialProps {
  material: IMaterial;
  onUsarMaterial: (id: number) => void;
  onReporEstoque: (id: number) => void;
  onEditar: (id: number) => void;
}

// Interface para as props do dashboard
export interface IDashboardProps {
  totalMateriais: number;
  totalBaixoEstoque: number;
  totalEsgotados: number;
  totalOk: number;
}

// Interface para as props da barra lateral de filtros
export interface IFiltroSidebarProps {
  filtroAtivo: TipoMaterial | 'todos';
  onFiltroChange: (filtro: TipoMaterial | 'todos') => void;
  onAdicionarMaterial: () => void;
}

// Interface para as props do modal de adição/edição
export interface IModalAdicionarProps {
  visivel: boolean;
  onFechar: () => void;
  onSalvar: (material: Omit<IMaterial, 'id' | 'statusEstoque'>) => void;
  materialEditando?: IMaterial | null;
}

// Interface para as props do formulário de novo material
export interface IFormNovoMaterial {
  nome: string;
  tipo: TipoMaterial;
  cor: string;
  quantidade: number;
  quantidadeMinima: number;
  unidade: UnidadeMedida;
  marca: string;
  novelos?: number;
  metrosPorNovelo?: number;
  codigoCor?: string;
  lote?: string;
}
