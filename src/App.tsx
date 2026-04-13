import { useState, useEffect } from 'react';
import { IMaterial, TipoMaterial } from './types/tipos';
import { materiaisIniciais } from './data/materiaisIniciais';
import { Navbar } from './components/Navbar';
import { FiltroSidebar } from './components/FiltroSidebar';
import { Dashboard } from './components/Dashboard';
import { CardMaterial } from './components/CardMaterial';
import { ModalAdicionar } from './components/ModalAdicionar';
import { Rodape } from './components/Rodape';

// Função auxiliar para calcular o status do estoque
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
  const [modalVisivel, setModalVisivel] = useState<boolean>(false);
  const [busca, setBusca] = useState('');
  const [materialEditando, setMaterialEditando] = useState<IMaterial | null>(null);

  useEffect(() => {
    localStorage.setItem('estoquecroche_materiais', JSON.stringify(materiais));
  }, [materiais]);

  // Lógica de filtro
  const materiaisFiltrados = materiais
    .filter((m) => filtroAtivo === 'todos' || m.tipo === filtroAtivo)
    .filter((m) => m.nome.toLowerCase().includes(busca.toLowerCase()));


  // Contadores do Dashboard
  const totalMateriais = materiais.length;
  const totalOk = materiais.filter((m) => m.statusEstoque === 'ok').length;
  const totalBaixoEstoque = materiais.filter((m) => m.statusEstoque === 'baixo').length;
  const totalEsgotados = materiais.filter((m) => m.statusEstoque === 'esgotado').length;

  // usar material (reduz 1 unidade do estoque)
  function handleUsarMaterial(id: number) {
    setMateriais((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const novaQtd = Math.max(0, m.quantidade - 1);
        return { ...m, quantidade: novaQtd, statusEstoque: calcularStatus(novaQtd, m.quantidadeMinima) };
      })
    );
  }

  // repor estoque (adiciona unidades)
  function handleReporEstoque(id: number) {
    setMateriais((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const novaQtd = m.quantidade + 1;
        return { ...m, quantidade: novaQtd, statusEstoque: calcularStatus(novaQtd, m.quantidadeMinima) };
      })
    );
  }

  //  abrir modal de edição
  function handleEditar(id: number) {
    const material = materiais.find((m) => m.id === id) ?? null;
    setMaterialEditando(material);
    setModalVisivel(true);
  }

  // adicionar novo material ou salvar edição
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
    <div className="app-wrapper">
      <Navbar />

      <div className="container-fluid px-0">
        <div className="row g-0 layout-principal">
          <div className="col-12 col-md-3">
            <FiltroSidebar
              filtroAtivo={filtroAtivo}
              onFiltroChange={setFiltroAtivo}
              onAdicionarMaterial={() => setModalVisivel(true)}
            />
          </div>

          <div className="col-12 col-md-9">
            <main className="conteudo-principal">
              {filtroAtivo === 'todos' && (
                <Dashboard
                  totalMateriais={totalMateriais}
                  totalOk={totalOk}
                  totalBaixoEstoque={totalBaixoEstoque}
                  totalEsgotados={totalEsgotados}
                />
              )}

              <section className="lista-materiais-section">
                <div className="busca-wrapper">
                  <input
                    type="text"
                    className="input-custom input-busca"
                    placeholder="Buscar por nome..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </div>
                <div className="lista-materiais-header">
                  <h2 className="lista-titulo">
                    {filtroAtivo === 'todos' ? 'Todos os materiais' : `${filtroAtivo.charAt(0).toUpperCase() + filtroAtivo.slice(1)}s`}
                  </h2>
                  <span className="lista-contagem">{materiaisFiltrados.length} ite{materiaisFiltrados.length === 1 ? 'm' : 'ns'}</span>
                </div>

                {materiaisFiltrados.length === 0 ? (
                  <div className="lista-vazia">
                    <i className="bi bi-inbox display-4"></i>
                    <p>Nenhum material encontrado para este filtro.</p>
                  </div>
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
              </section>
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
