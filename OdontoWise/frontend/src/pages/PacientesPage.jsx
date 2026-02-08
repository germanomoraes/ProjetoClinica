import { useState, useEffect } from 'react';
import { Modal, uid } from '../components/shared';
import { patientApi } from '../services/api';

export default function PacientesPage() {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const response = await patientApi.getAll();
      setPatients(response.data);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = patients.filter((p) =>
    (p.nome || '').toLowerCase().includes(query.toLowerCase()) ||
    (p.cpf || '').includes(query) ||
    (p.telefone || '').includes(query)
  );

  const handleAddPatient = async (data) => {
    try {
      await patientApi.create(data);
      setShowModal(false);
      await loadPatients();
    } catch (error) {
      console.error('Erro ao adicionar paciente:', error);
      alert('Erro ao adicionar paciente');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pacientes</h1>
          <p className="text-gray-500">{patients.length} pacientes cadastrados</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="py-2 px-4 rounded bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium"
        >
          + Novo Paciente
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <input
          placeholder="Buscar por nome, CPF ou telefone..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mt-4">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-500 py-8">Nenhum paciente encontrado</div>
          ) : (
            <div className="space-y-3">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="p-3 border border-gray-100 rounded flex justify-between hover:bg-gray-50"
                >
                  <div>
                    <div className="font-medium">{p.nome}</div>
                    <div className="text-xs text-gray-500">{p.telefone} • {p.cpf}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <NovoPacienteModal onClose={() => setShowModal(false)} onSave={handleAddPatient} />
      )}
    </div>
  );
}

function NovoPacienteModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    dataNascimento: '',
    endereco: '',
    alergias: '',
    observacoes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.cpf) {
      alert('Preencha nome e CPF');
      return;
    }
    onSave({ ...form, id: uid() });
  };

  return (
    <Modal title="Novo Paciente" onClose={onClose} onSave={handleSubmit}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            placeholder="Nome completo"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded text-sm"
          />
          <input
            placeholder="CPF"
            value={form.cpf}
            onChange={(e) => setForm({ ...form, cpf: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded text-sm"
          />
          <input
            placeholder="Telefone"
            value={form.telefone}
            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded text-sm"
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded text-sm"
          />
          <label className="block">
            Data de Nascimento
            <input
              type="date"
              value={form.dataNascimento}
              onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm mt-1"
            />
          </label>
        </div>

        <input
          placeholder="Endereço"
          value={form.endereco}
          onChange={(e) => setForm({ ...form, endereco: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        />

        <textarea
          placeholder="Alergias / Histórico Clínico"
          value={form.alergias}
          onChange={(e) => setForm({ ...form, alergias: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-20"
        />

        <textarea
          placeholder="Observações Gerais"
          value={form.observacoes}
          onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-16"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded text-sm"
          >
            Cadastrar Paciente
          </button>
        </div>
      </form>
    </Modal>
  );
}
