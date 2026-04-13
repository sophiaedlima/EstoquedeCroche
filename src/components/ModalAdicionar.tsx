import { useState, useEffect } from 'react';
import { IModalAdicionarProps, IFormNovoMaterial } from '../types/tipos';

const estadoInicial: IFormNovoMaterial = {
  nome: '',
  tipo: 'fio',
  cor: '',
  quantidade: 0,
  quantidadeMinima: 0,
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

  const editando = !!materialEditando;

  const camposNumericos = ['quantidade', 'quantidadeMinima', 'novelos', 'metrosPorNovelo'];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: camposNumericos.includes(name) ? Number(value) : value };
      if (name === 'tipo') {
        updated.unidade = value === 'fio' ? 'gramas' : 'unidade';
      }
      return updated;
    });
  }

  function handleSalvar() {
    const corObrigatoria = (form.tipo === 'fio' || form.tipo === 'acessorio') && !form.cor;
    const marcaObrigatoria = form.tipo === 'fio' && !form.marca;
    if (!form.nome || corObrigatoria || marcaObrigatoria) {
      alert('Por favor, preencha todos os campos obrigatórios.');
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
        <div className="modal-header-custom">
          <h2 className="modal-titulo">
            <i className={`bi ${editando ? 'bi-pencil' : 'bi-plus-circle'} me-2`}></i>
            {editando ? 'Editar Material' : 'Novo Material'}
          </h2>
          <button className="modal-fechar" onClick={handleFechar}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="modal-body-custom">
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label-custom">Nome do Material *</label>
              <input
                type="text"
                name="nome"
                className="input-custom"
                placeholder="Ex: Fio 100% Algodão Rosa"
                value={form.nome}
                onChange={handleChange}
              />
            </div>

            <div className="col-6">
              <label className="form-label-custom">Tipo *</label>
              <select name="tipo" className="input-custom" value={form.tipo} onChange={handleChange}>
                <option value="fio">Fio</option>
                <option value="agulha">Agulha</option>
                <option value="acessorio">Acessório</option>
                <option value="utensilio">Utensílio</option>
              </select>
            </div>


            <div className="col-6">
              <label className="form-label-custom">Cor {(form.tipo === 'fio' || form.tipo === 'acessorio') ? '*' : ''}</label>
              <input
                type="text"
                name="cor"
                className="input-custom"
                placeholder="Ex: Rosa Candy"
                value={form.cor}
                onChange={handleChange}
              />
            </div>

            <div className="col-6">
              <label className="form-label-custom">Marca {form.tipo === 'fio' ? '*' : ''}</label>
              <input
                type="text"
                name="marca"
                className="input-custom"
                placeholder="Ex: Círculo"
                value={form.marca}
                onChange={handleChange}
              />
            </div>

            <div className="col-6">
              <label className="form-label-custom">Quantidade Inicial *</label>
              <input
                type="number"
                name="quantidade"
                className="input-custom"
                min={0}
                value={form.quantidade}
                onChange={handleChange}
              />
            </div>

            <div className="col-6">
              <label className="form-label-custom">Quantidade Mínima *</label>
              <input
                type="number"
                name="quantidadeMinima"
                className="input-custom"
                min={0}
                value={form.quantidadeMinima}
                onChange={handleChange}
              />
            </div>

            {form.tipo === 'fio' && (
              <>
                <div className="col-12">
                  <div className="separador-fio">
                    <i className="bi bi-info-circle me-2"></i>Informações do novelo
                  </div>
                </div>

                <div className="col-6">
                  <label className="form-label-custom">Metros por novelo</label>
                  <input
                    type="number"
                    name="metrosPorNovelo"
                    className="input-custom"
                    min={0}
                    value={form.metrosPorNovelo ?? ''}
                    placeholder="Ex: 150"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-6">
                  <label className="form-label-custom">Código de cor</label>
                  <input
                    type="text"
                    name="codigoCor"
                    className="input-custom"
                    placeholder="Ex: 3527"
                    value={form.codigoCor ?? ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-6">
                  <label className="form-label-custom">Lote</label>
                  <input
                    type="text"
                    name="lote"
                    className="input-custom"
                    placeholder="Ex: L2024-08"
                    value={form.lote ?? ''}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="modal-footer-custom">
          <button className="btn-cancelar" onClick={handleFechar}>Cancelar</button>
          <button className="btn-salvar" onClick={handleSalvar}>
            <i className="bi bi-check-lg me-1"></i>{editando ? 'Salvar Alterações' : 'Salvar Material'}
          </button>
        </div>
      </div>
    </div>
  );
}
