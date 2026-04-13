import { useState, useEffect } from 'react';
import { IModalAdicionarProps, IFormNovoMaterial } from '../types/tipos';

const estadoInicial: IFormNovoMaterial = {
  nome: '',
  tipo: 'fio',
  cor: '',
  quantidade: 0,
  quantidadeMinima: 0,
  unidade: 'unidade',
  marca: '',
};

export function ModalAdicionar({ visivel, onFechar, onSalvar, materialEditando }: IModalAdicionarProps) {
  const [form, setForm] = useState<IFormNovoMaterial>(estadoInicial);

  useEffect(() => {
    if (materialEditando) {
      setForm({
        nome: materialEditando.nome,
        tipo: materialEditando.tipo,
        cor: materialEditando.cor,
        quantidade: materialEditando.quantidade,
        quantidadeMinima: materialEditando.quantidadeMinima,
        unidade: materialEditando.unidade,
        marca: materialEditando.marca,
        novelos: materialEditando.novelos,
        metrosPorNovelo: materialEditando.metrosPorNovelo,
        codigoCor: materialEditando.codigoCor,
        lote: materialEditando.lote,
      });
    } else {
      setForm(estadoInicial);
    }
  }, [materialEditando, visivel]);

  if (!visivel) return null;

  const camposNumericos = ['quantidade', 'quantidadeMinima', 'novelos', 'metrosPorNovelo'];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: camposNumericos.includes(name) ? Number(value) : value,
    }));
  }

  function handleSalvar() {
    if (!form.nome) {
      alert('Por favor, informe o nome do material.');
      return;
    }
    onSalvar(form);
    setForm(estadoInicial);
  }

  function handleFechar() {
    setForm(estadoInicial);
    onFechar();
  }

  return (
    <div className="modal-overlay" onClick={handleFechar}>
      <div className="modal-caixa" onClick={(e) => e.stopPropagation()}>

        {/* Cabeçalho */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="mb-0">{materialEditando ? 'Editar Material' : 'Novo Material'}</h5>
          <button className="btn-close" onClick={handleFechar}></button>
        </div>

        {/* Formulário */}
        <div className="p-3">
          <div className="mb-3">
            <label className="form-label">Nome *</label>
            <input type="text" name="nome" className="form-control" placeholder="Ex: Fio de algodão rosa" value={form.nome} onChange={handleChange} />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-6">
              <label className="form-label">Tipo *</label>
              <select name="tipo" className="form-select" value={form.tipo} onChange={handleChange}>
                <option value="fio">Fio</option>
                <option value="agulha">Agulha</option>
                <option value="acessorio">Acessório</option>
                <option value="utensilio">Utensílio</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label">Cor</label>
              <input type="text" name="cor" className="form-control" placeholder="Ex: Rosa" value={form.cor} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Marca</label>
            <input type="text" name="marca" className="form-control" placeholder="Ex: Círculo" value={form.marca} onChange={handleChange} />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-6">
              <label className="form-label">Quantidade *</label>
              <input type="number" name="quantidade" className="form-control" min={0} value={form.quantidade} onChange={handleChange} />
            </div>
            <div className="col-6">
              <label className="form-label">Quantidade Mínima *</label>
              <input type="number" name="quantidadeMinima" className="form-control" min={0} value={form.quantidadeMinima} onChange={handleChange} />
            </div>
          </div>

          {form.tipo === 'fio' && (
            <>
              <p className="text-muted small text-uppercase mb-2 border-top pt-2">Informações do novelo</p>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label">Metros por novelo</label>
                  <input type="number" name="metrosPorNovelo" className="form-control" min={0} placeholder="Ex: 150" value={form.metrosPorNovelo ?? ''} onChange={handleChange} />
                </div>
                <div className="col-6">
                  <label className="form-label">Código de cor</label>
                  <input type="text" name="codigoCor" className="form-control" placeholder="Ex: 3527" value={form.codigoCor ?? ''} onChange={handleChange} />
                </div>
                <div className="col-6">
                  <label className="form-label">Lote</label>
                  <input type="text" name="lote" className="form-control" placeholder="Ex: L2024-08" value={form.lote ?? ''} onChange={handleChange} />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Rodapé */}
        <div className="d-flex justify-content-end gap-2 p-3 border-top">
          <button className="btn btn-secondary" onClick={handleFechar}>Cancelar</button>
          <button className="btn btn-danger" onClick={handleSalvar}>
            {materialEditando ? 'Salvar Alterações' : 'Salvar Material'}
          </button>
        </div>

      </div>
    </div>
  );
}
