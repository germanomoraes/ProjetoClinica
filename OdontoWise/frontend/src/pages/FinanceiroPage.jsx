import { useState, useEffect } from 'react';
import { formatBR } from '../components/shared';
import { appointmentApi } from '../services/api';

export default function FinanceiroPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentApi.getAll();
      setAppointments(response.data);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalReceived = appointments
    .filter((a) => a.paid)
    .reduce((s, a) => s + (Number(a.value) || 0), 0);
  const totalPending = appointments
    .filter((a) => !a.paid)
    .reduce((s, a) => s + (Number(a.value) || 0), 0);
  const total = totalReceived + totalPending;

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Financeiro</h1>
          <p className="text-gray-500">Resumo de faturas e pagamentos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="text-xs text-gray-500 font-medium">Receita Total</div>
          <div className="mt-2 font-bold text-2xl">{formatBR(total)}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="text-xs text-gray-500 font-medium">Recebido</div>
          <div className="mt-2 font-bold text-2xl text-green-600">
            {formatBR(totalReceived)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="text-xs text-gray-500 font-medium">Pendente</div>
          <div className="mt-2 font-bold text-2xl text-red-600">
            {formatBR(totalPending)}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Consultas</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="px-3 py-3 text-left">Data</th>
                <th className="px-3 py-3 text-left">Paciente</th>
                <th className="px-3 py-3 text-left">Dentista</th>
                <th className="px-3 py-3 text-right">Valor</th>
                <th className="px-3 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    Nenhuma consulta encontrada
                  </td>
                </tr>
              ) : (
                appointments.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-3 text-xs text-gray-600">{a.date}</td>
                    <td className="px-3 py-3">{a.patient}</td>
                    <td className="px-3 py-3 text-xs text-gray-600">
                      {a.professional}
                    </td>
                    <td className="px-3 py-3 text-right font-semibold">
                      {formatBR(a.value)}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          a.paid
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {a.paid ? 'Pago' : 'Pendente'}
                      </span>
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
