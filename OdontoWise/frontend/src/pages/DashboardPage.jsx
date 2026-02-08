import { useState, useEffect } from 'react';
import { Card, ActionBox, formatBR } from '../components/shared';
import { appointmentApi, patientApi } from '../services/api';

export default function DashboardPage({ navigate }) {
  const [stats, setStats] = useState({
    totalPatients: 0,
    appointmentsToday: 0,
    totalAppointments: 0,
    totalRevenue: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const [statsRes, patientsRes, appointmentsRes] = await Promise.all([
        appointmentApi.getStats(),
        patientApi.getAll(),
        appointmentApi.getAll()
      ]);

      setStats({
        totalPatients: patientsRes.data.length,
        appointmentsToday: statsRes.data.appointmentsToday,
        totalAppointments: statsRes.data.totalAppointments,
        totalRevenue: statsRes.data.totalRevenue
      });

      setRecentAppointments(appointmentsRes.data.slice(0, 6));
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Visão geral e principais ações</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('agenda')}
            className="py-2 px-4 rounded bg-white border border-gray-300 text-sm font-medium hover:bg-gray-50"
          >
            Ver Agenda
          </button>
          <button
            onClick={() => navigate('pacientes')}
            className="py-2 px-4 rounded bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium"
          >
            Novo Paciente
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Total de Pacientes" value={stats.totalPatients} />
        <Card title="Agendamentos Hoje" value={stats.appointmentsToday} />
        <Card title="Total de Consultas" value={stats.totalAppointments} />
        <Card title="Receita Total" value={formatBR(stats.totalRevenue)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Próximos Agendamentos</h2>
            <button
              onClick={() => navigate('agenda')}
              className="text-blue-600 text-sm hover:text-blue-700"
            >
              Ver todos →
            </button>
          </div>

          {recentAppointments.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Nenhum agendamento próximo
            </div>
          ) : (
            <div className="space-y-3">
              {recentAppointments.map((ap) => (
                <div
                  key={ap.id}
                  className="p-3 border border-gray-100 rounded flex justify-between items-center hover:bg-gray-50"
                >
                  <div>
                    <div className="font-medium text-sm">{ap.patient}</div>
                    <div className="text-xs text-gray-500">
                      {ap.date} • {ap.time}
                    </div>
                  </div>
                  <div className="text-sm font-semibold">{formatBR(ap.value)}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 gap-3">
            <ActionBox title="Nova Agenda" onClick={() => navigate('agenda')} />
            <ActionBox title="Novo Paciente" onClick={() => navigate('pacientes')} />
            <ActionBox title="Financeiro" onClick={() => navigate('financeiro')} />
            <ActionBox title="Relatórios" onClick={() => navigate('relatorios')} />
          </div>
        </div>
      </div>
    </div>
  );
}
