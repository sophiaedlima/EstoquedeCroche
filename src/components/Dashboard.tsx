import { IDashboardProps } from '../types/tipos';

export function Dashboard({ totalMateriais, totalBaixoEstoque, totalEsgotados, totalOk }: IDashboardProps) {
  return (
    <section className="dashboard-section mb-4">
      <h2 className="dashboard-titulo mb-3">Visão Geral do Estoque</h2>
      <div className="row g-3">
        <div className="col-6 col-md-3">
          <div className="card-contador card-total">

            <div className="contador-valor">{totalMateriais}</div>
            <div className="contador-label">Total de Itens</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card-contador card-ok">

            <div className="contador-valor">{totalOk}</div>
            <div className="contador-label">Em Estoque</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card-contador card-baixo">

            <div className="contador-valor">{totalBaixoEstoque}</div>
            <div className="contador-label">Estoque Baixo</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card-contador card-esgotado">

            <div className="contador-valor">{totalEsgotados}</div>
            <div className="contador-label">Esgotados</div>
          </div>
        </div>
      </div>
    </section>
  );
}
