import { useState, useRef } from 'react';
import { IModalHistoricoProps } from '../types/tipos';

const estadoInicial = {
  data: new Date().toISOString().split('T')[0],
  peca: '',
  fioRestante: 0,
  agulhaUsada: '',
  acessorioUsado: '',
  imagem: '',
};

export function ModalHistorico({ material, materiais, onFechar, onAdicionarRegistro }: IModalHistoricoProps) {
  const [adicionando, setAdicionando] = useState(false);
  const [form, setForm] = useState(estadoInicial);
  const [imagemPreview, setImagemPreview] = useState('');
  const [registroAberto, setRegistroAberto] = useState<number | null>(null);
  const inputImagemRef = useRef<HTMLInputElement>(null);

  if (!material) return null;

  const agulhas = materiais.filter((m) => m.tipo === 'agulha');
  const acessorios = materiais.filter((m) => m.tipo === 'acessorio');
  const historico = material.historico ?? [];

  function handleImagem(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const resultado = ev.target?.result as string;
      setImagemPreview(resultado);
      setForm((f) => ({ ...f, imagem: resultado }));
    };
    reader.readAsDataURL(file);
  }

  function handleSalvar() {
    if (!form.peca.trim()) return;
    onAdicionarRegistro(material!.id, {
      data: form.data,
      peca: form.peca,
      fioRestante: Number(form.fioRestante),
      agulhaUsada: form.agulhaUsada,
      acessorioUsado: form.acessorioUsado,
      imagem: form.imagem,
    });
    setForm(estadoInicial);
    setImagemPreview('');
    setAdicionando(false);
  }

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-caixa modal-caixa--historico" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-custom">
          <h2 className="modal-titulo">
            <i className="bi bi-clock-history me-2"></i>
            Histórico — {material.nome}
          </h2>
          <button className="modal-fechar" onClick={onFechar}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="modal-body-custom historico-body">
          {!adicionando ? (
            <>
              <button className="btn-adicionar mb-3" onClick={() => setAdicionando(true)}>
                <i className="bi bi-plus-lg me-2"></i>Registrar uso
              </button>

              {historico.length === 0 ? (
                <div className="lista-vazia" style={{ padding: '2rem 0' }}>
                  <i className="bi bi-journal-x display-5"></i>
                  <p className="mt-2">Nenhum registro ainda.</p>
                </div>
              ) : (
                <div className="historico-lista">
                  {[...historico].reverse().map((registro) => (
                    <div key={registro.id} className="historico-card">
                      <div
                        className="historico-card__header"
                        onClick={() => setRegistroAberto(registroAberto === registro.id ? null : registro.id)}
                      >
                        <div>
                          <span className="historico-peca">{registro.peca}</span>
                          <span className="historico-data ms-2">{new Date(registro.data + 'T12:00:00').toLocaleDateString('pt-BR')}</span>
                        </div>
                        <i className={`bi bi-chevron-${registroAberto === registro.id ? 'up' : 'down'}`}></i>
                      </div>

                      {registroAberto === registro.id && (
                        <div className="historico-card__body">
                          <div className="historico-detalhe">
                            <span><i className="bi bi-boxes me-1"></i>Fio restante: <strong>{registro.fioRestante} {material.unidade}</strong></span>
                            {registro.agulhaUsada && <span><i className="bi bi-tools me-1"></i>Agulha: <strong>{registro.agulhaUsada}</strong></span>}
                            {registro.acessorioUsado && <span><i className="bi bi-stars me-1"></i>Acessório: <strong>{registro.acessorioUsado}</strong></span>}
                          </div>
                          {registro.imagem && (
                            <img src={registro.imagem} alt={registro.peca} className="historico-imagem" />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="historico-form">
              <div className="mb-3">
                <label className="form-label-custom">Peça feita *</label>
                <input
                  className="input-custom"
                  placeholder="Ex: Amigurumi coelho"
                  value={form.peca}
                  onChange={(e) => setForm((f) => ({ ...f, peca: e.target.value }))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label-custom">Data</label>
                <input
                  type="date"
                  className="input-custom"
                  value={form.data}
                  onChange={(e) => setForm((f) => ({ ...f, data: e.target.value }))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label-custom">Fio restante ({material.unidade})</label>
                <input
                  type="number"
                  className="input-custom"
                  min={0}
                  value={form.fioRestante}
                  onChange={(e) => setForm((f) => ({ ...f, fioRestante: Number(e.target.value) }))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label-custom">Agulha utilizada</label>
                <select
                  className="input-custom"
                  value={form.agulhaUsada}
                  onChange={(e) => setForm((f) => ({ ...f, agulhaUsada: e.target.value }))}
                >
                  <option value="">Selecione...</option>
                  {agulhas.map((a) => (
                    <option key={a.id} value={a.nome}>{a.nome}</option>
                  ))}
                  <option value="Outra">Outra</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label-custom">Acessório utilizado</label>
                <select
                  className="input-custom"
                  value={form.acessorioUsado}
                  onChange={(e) => setForm((f) => ({ ...f, acessorioUsado: e.target.value }))}
                >
                  <option value="">Selecione...</option>
                  {acessorios.map((a) => (
                    <option key={a.id} value={a.nome}>{a.nome}</option>
                  ))}
                  <option value="Nenhum">Nenhum</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label-custom">Foto da peça</label>
                <input
                  ref={inputImagemRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImagem}
                />
                <button
                  type="button"
                  className="btn-upload"
                  onClick={() => inputImagemRef.current?.click()}
                >
                  <i className="bi bi-image me-2"></i>
                  {imagemPreview ? 'Trocar foto' : 'Escolher foto'}
                </button>
                {imagemPreview && (
                  <img src={imagemPreview} alt="Preview" className="historico-preview" />
                )}
              </div>

              <div className="d-flex gap-2 mt-3">
                <button className="btn-cancelar flex-fill" onClick={() => { setAdicionando(false); setForm(estadoInicial); setImagemPreview(''); }}>
                  Cancelar
                </button>
                <button className="btn-salvar flex-fill" onClick={handleSalvar} disabled={!form.peca.trim()}>
                  Salvar registro
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
