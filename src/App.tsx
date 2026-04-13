import { useState, useEffect } from 'react';
import { IMaterial, TipoMaterial } from './types/tipos';
import { materiaisIniciais } from './data/materiaisIniciais';
import { Navbar } from './components/Navbar';
import { FiltroSidebar } from './components/FiltroSidebar';
import { Dashboard } from './components/Dashboard';
import { CardMaterial } from './components/CardMaterial';
import { ModalAdicionar } from './components/ModalAdicionar';
import { Rodape } from './components/Rodape';

function calcularStatus(quantidade: number, quantidadeMinima: number): IMaterial['statusEstoque'] {
  if (quantidade === 0) return 'esgotado';
  if (quantidade < quantidadeMinima) return 'baixo';
  return 'ok';
}

function App() {
  const [materiais, setMateriais] = useState<IMaterial[]>(() => {
    const salvo = localStorage.getItem('estoquecroche_materiais');
    return salvo ? JSON.parse(salvo) : materiaisIniciais;
  });
  const [filtroAtivo, setFiltroAtivo] = useState<TipoMaterial | 'todos'>('todos');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [busca, setBusca] = useState('');
  const [materialEditando, setMaterialEditando] = useState<IMaterial | null>(null);

  useEffect(() => {
    localStorage.setItem('estoquecroche_materiais', JSON.stringify(materiais));
  }, [materiais]);

  const materiaisFiltrados = materiais
    .filter((m) => filtroAtivo === 'todos' || m.tipo === filtroAtivo)
    .filter((m) => m.nome.toLowerCase().includes(busca.toLowerCase()));

  const totalMateriais = materiais.length;
  const totalOk = materiais.filter((m) => m.statusEstoque === 'ok').length;
  const totalBaixoEstoque = materiais.filter((m) => m.statusEstoque === 'baixo').length;
  const totalEsgotados = materiais.filter((m) => m.statusEstoque === 'esgotado').length;

  function handleUsarMaterial(id: number) {
    setMateriais((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const novaQtd = Math.max(0, m.quantidade - 1);
        return { ...m, quantidade: novaQtd, statusEstoque: calcularStatus(novaQtd, m.quantidadeMinima) };
      })
    );
  }

  function handleReporEstoque(id: number) {
    setMateriais((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const novaQtd = m.quantidade + 1;
        return { ...m, quantidade: novaQtd, statusEstoque: calcularStatus(novaQtd, m.quantidadeMinima) };
      })
    );
  }

  function handleEditar(id: number) {
    const material = materiais.find((m) => m.id === id) ?? null;
    setMaterialEditando(material);
    setModalVisivel(true);
  }

  function handleAdicionarMaterial(dados: Omit<IMaterial, 'id' | 'statusEstoque'>) {
    if (materialEditando) {
      setMateriais((prev) =>
        prev.map((m) =>
          m.id === materialEditando.id
            ? { ...m, ...dados, statusEstoque: calcularStatus(dados.quantidade, dados.quantidadeMinima) }
            : m
        )
      );
      setMaterialEditando(null);
      setModalVisivel(false);
      return;
    }

    const novoId = materiais.length > 0 ? Math.max(...materiais.map((m) => m.id)) + 1 : 1;
    const novoMaterial: IMaterial = {
      ...dados,
      id: novoId,
      statusEstoque: calcularStatus(dados.quantidade, dados.quantidadeMinima),
    };
    setMateriais((prev) => [...prev, novoMaterial]);
    setModalVisivel(false);
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container-fluid flex-grow-1 px-0">
        <div className="row g-0 h-100">

          <div className="col-12 col-md-3">
            <FiltroSidebar
              filtroAtivo={filtroAtivo}
              onFiltroChange={setFiltroAtivo}
              onAdicionarMaterial={() => setModalVisivel(true)}
            />
          </div>

          <div className="col-12 col-md-9">
            <main className="p-4">

              {filtroAtivo === 'todos' && (
                <Dashboard
                  totalMateriais={totalMateriais}
                  totalOk={totalOk}
                  totalBaixoEstoque={totalBaixoEstoque}
                  totalEsgotados={totalEsgotados}
                />
              )}

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  style={{ maxWidth: '320px' }}
                  placeholder="Buscar por nome..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>

              <div className="d-flex align-items-center gap-2 mb-3">
                <h5 className="mb-0">
                  {filtroAtivo === 'todos' ? 'Todos os materiais' : `${filtroAtivo.charAt(0).toUpperCase() + filtroAtivo.slice(1)}s`}
                </h5>
                <span className="badge bg-secondary">{materiaisFiltrados.length}</span>
              </div>

              {materiaisFiltrados.length === 0 ? (
                <p className="text-muted">Nenhum material encontrado.</p>
              ) : (
                <div className="row g-3">
                  {materiaisFiltrados.map((material) => (
                    <div key={material.id} className="col-12 col-sm-6 col-xl-4">
                      <CardMaterial
                        material={material}
                        onUsarMaterial={handleUsarMaterial}
                        onReporEstoque={handleReporEstoque}
                        onEditar={handleEditar}
                      />
                    </div>
                  ))}
                </div>
              )}

            </main>
          </div>

        </div>
      </div>

      <Rodape />

      <ModalAdicionar
        visivel={modalVisivel}
        onFechar={() => { setModalVisivel(false); setMaterialEditando(null); }}
        onSalvar={handleAdicionarMaterial}
        materialEditando={materialEditando}
      />
    </div>
  );
}

export default App;
