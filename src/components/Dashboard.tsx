import { IDashboardProps } from '../types/tipos';

export function Dashboard({ totalMateriais, totalBaixoEstoque, totalEsgotados, totalOk }: IDashboardProps) {
  return (
    <section className="mb-4">
      <h5 className="mb-3">Visão Geral do Estoque</h5>
      <div className="row g-3">
        <div className="col-6 col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3>{totalMateriais}</h3>
              <small className="text-muted">Total de Itens</small>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center border-success">
            <div className="card-body">
              <h3 className="text-success">{totalOk}</h3>
              <small className="text-muted">Em Estoque</small>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center border-warning">
            <div className="card-body">
              <h3 className="text-warning">{totalBaixoEstoque}</h3>
              <small className="text-muted">Estoque Baixo</small>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center border-danger">
            <div className="card-body">
              <h3 className="text-danger">{totalEsgotados}</h3>
              <small className="text-muted">Esgotados</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
