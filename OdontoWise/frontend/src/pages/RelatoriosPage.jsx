import { useState, useEffect } from 'react';
import { formatBR } from '../components/shared';
import { appointmentApi } from '../services/api';

export default function RelatoriosPage() {
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [onlyUnpaid, setOnlyUnpaid] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentApi.getAll();
      setAppointments(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const clients = Array.from(
    new Set(appointments.map((a) => a.patient))
  ).sort();

  const toggleClient = (name) => {
    setSelectedClients((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  };

  const clearClients = () => setSelectedClients([]);

  const applyFilters = () => {
    let list = [...appointments];

    if (selectedClients.length) {
      list = list.filter((a) => selectedClients.includes(a.patient));
    }
    if (startDate) {
      list = list.filter((a) => a.date >= startDate);
    }
    if (endDate) {
      list = list.filter((a) => a.date <= endDate);
    }
    if (onlyUnpaid) {
      list = list.filter((a) => !a.paid);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          (a.patient || '').toLowerCase().includes(q) ||
          (a.date || '').includes(q) ||
          (a.time || '').includes(q)
      );
    }

    setFiltered(list);
  };

  const resetFilters = () => {
    setSelectedClients([]);
    setStartDate('');
    setEndDate('');
    setOnlyUnpaid(false);
    setSearch('');
    setFiltered(appointments);
  };

  const exportCSV = () => {
    const rows = [['Paciente', 'Data', 'Horário', 'Pago', 'Valor']];
    filtered.forEach((a) =>
      rows.push([a.patient, a.date, a.time, a.paid ? 'Sim' : 'Não', a.value])
    );

    const csv = rows
      .map((r) =>
        r
          .map((c) => `"${String(c).replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio_agendamentos_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Relatórios</h1>
        <p className="text-gray-500">Filtering e geração de relatórios</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 space-y-4">
        {/* Clientes */}
        <div>
          <div className="text-sm text-gray-600 font-medium mb-2">Clientes</div>
          {clients.length === 0 ? (
            <span className="text-xs text-gray-500">Nenhum cliente disponível</span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {clients.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleClient(c)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedClients.includes(c)
                      ? 'bg-indigo-100 border border-indigo-200 text-indigo-700'
                      : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {c}
                  {selectedClients.includes(c) && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleClient(c);
                      }}
                      className="ml-2 cursor-pointer"
                    >
                      ✕
                    </span>
                  )}
                </button>
              ))}
              {clients.length > 0 && (
                <button
                  onClick={clearClients}
                  className="px-3 py-1 rounded-full text-sm border border-gray-300 hover:bg-gray-50"
                >
                  Limpar
                </button>
              )}
            </div>
          )}
        </div>

        {/* Filtros de data */}
        <div className="grid md:grid-cols-4 gap-3">
          <div>
            <div className="text-sm text-gray-600 font-medium mb-1">
              Data Inicial
            </div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div>
            <div className="text-sm text-gray-600 font-medium mb-1">
              Data Final
            </div>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={onlyUnpaid}
                onChange={(e) => setOnlyUnpaid(e.target.checked)}
              />
              <span>Somente Não Pagos</span>
            </label>
          </div>
          <div className="flex items-end justify-end gap-2">
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded text-sm font-medium"
            >
              VISUALIZAR
            </button>
          </div>
        </div>

        {/* Busca e exportação */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              placeholder="Buscar (nome / data / horário)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') applyFilters();
              }}
            />
          </div>
          <div className="flex gap-2">
            <button
              title="Exportar CSV"
              onClick={exportCSV}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
            >
              📥 Exportar
            </button>
            <button
              title="Limpar filtros"
              onClick={resetFilters}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
            >
              ✖ Limpar
            </button>
          </div>
        </div>

        {/* Tabela */}
        <div className="border rounded overflow-y-auto max-h-96">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-50 sticky top-0">
              <tr className="border-b">
                <th className="text-left px-3 py-2 text-xs font-medium text-gray-600">
                  Paciente
                </th>
                <th className="text-left px-3 py-2 text-xs font-medium text-gray-600">
                  Dentista
                </th>
                <th className="text-left px-3 py-2 text-xs font-medium text-gray-600">
                  Data
                </th>
                <th className="text-left px-3 py-2 text-xs font-medium text-gray-600">
                  Horário
                </th>
                <th className="text-left px-3 py-2 text-xs font-medium text-gray-600">
                  Serviço
                </th>
                <th className="text-left px-3 py-2 text-xs font-medium text-gray-600">
                  Status
                </th>
                <th className="text-right px-3 py-2 text-xs font-medium text-gray-600">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-gray-500">
                    Nenhum agendamento encontrado
                  </td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">{a.patient}</td>
                    <td className="px-3 py-2 text-xs text-gray-600">
                      {a.professional}
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-600">{a.date}</td>
                    <td className="px-3 py-2 text-xs text-gray-600">{a.time}</td>
                    <td className="px-3 py-2 text-xs text-gray-600">
                      {a.treatment || '-'}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          a.paid
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {a.paid ? 'Pago' : 'Não Pago'}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-xs font-semibold">
                      {formatBR(a.value)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
