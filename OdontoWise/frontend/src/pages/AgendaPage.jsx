import { useState, useEffect } from 'react';
import { Modal, uid, formatBR } from '../components/shared';
import { appointmentApi, authApi } from '../services/api';

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedAp, setSelectedAp] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersRes, aptsRes] = await Promise.all([
        authApi.getUsers(),
        appointmentApi.getAll()
      ]);
      setProfessionals(
        usersRes.data
          .filter((u) => u.role === 'dentista')
          .map((u) => u.username)
      );
      setAppointments(aptsRes.data);
    } catch (error) {
      console.error('Erro ao carregar agenda:', error);
    } finally {
      setLoading(false);
    }
  };

  const weekStart = getStartOfWeek(
    new Date(selectedDate + 'T00:00:00')
  );
  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    return date;
  });

  const timeSlots = generateTimeSlots();

  const openNew = (date, time) => {
    setSelectedAp({
      date,
      time,
      patient: '',
      phone: '',
      treatment: '',
      value: 0,
      professional: professionals[0] || ''
    });
    setShowModal(true);
  };

  const openEdit = (ap) => {
    setSelectedAp(ap);
    setShowModal(true);
  };

  const handleSave = async (data) => {
    try {
      if (selectedAp && selectedAp.id) {
        await appointmentApi.update(selectedAp.id, data);
      } else {
        await appointmentApi.create({ ...data, id: uid() });
      }
      setShowModal(false);
      await loadData();
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
      alert('Erro ao salvar agendamento');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Confirmar exclusão?')) return;
    try {
      await appointmentApi.delete(id);
      await loadData();
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Agenda</h1>
          <p className="text-gray-500">Visualização semanal</p>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={() =>
              setSelectedDate(
                formatDate(addDays(parseDate(selectedDate), -7))
              )
            }
            className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
          >
            ‹ Anterior
          </button>
          <button
            onClick={() =>
              setSelectedDate(
                formatDate(addDays(parseDate(selectedDate), 7))
              )
            }
            className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
          >
            Próxima ›
          </button>
          <button
            onClick={() =>
              setSelectedDate(new Date().toISOString().split('T')[0])
            }
            className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
          >
            Hoje
          </button>
          <button
            onClick={() => openNew(selectedDate, '09:00')}
            className="py-2 px-4 rounded bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium"
          >
            + Novo
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-1/4 space-y-4">
          <MiniCalendar
            date={parseDate(selectedDate)}
            onSelectDay={(d) => setSelectedDate(formatDate(d))}
          />
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <h3 className="font-semibold text-sm mb-2">Dentistas</h3>
            {professionals.map((p) => (
              <div key={p} className="text-sm border-l-4 border-blue-400 pl-2 py-1">
                {p}
              </div>
            ))}
          </div>
        </div>

        <div className="w-3/4 bg-white rounded-lg shadow-sm p-3 border border-gray-100 overflow-x-auto">
          <AgendaGrid
            days={days}
            timeSlots={timeSlots}
            appointments={appointments}
            onOpenNew={openNew}
            onOpenEdit={openEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {showModal && (
        <NovoAgendamentoModal
          professionals={professionals}
          initial={selectedAp}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function AgendaGrid({
  days,
  timeSlots,
  appointments,
  onOpenNew,
  onOpenEdit,
  onDelete
}) {
  return (
    <div className="inline-block min-w-full">
      <div className="grid border border-gray-300" style={{
        gridTemplateColumns: '80px repeat(7, minmax(120px, 1fr))'
      }}>
        <div className="bg-gray-50 p-2 font-semibold text-sm border-r">
          Hora
        </div>
        {days.map((d) => {
          const isToday = formatDate(d) === new Date().toISOString().split('T')[0];
          return (
            <div
              key={formatDate(d)}
              className={`p-3 text-center text-sm font-semibold border-r ${
                isToday ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-50'
              }`}
            >
              <div className="text-xs">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][d.getDay()]}
              </div>
              <div className="text-lg">{d.getDate()}</div>
            </div>
          );
        })}

        {timeSlots.map((timeSlot) => (
          <AgendaRow
            key={timeSlot}
            timeSlot={timeSlot}
            days={days}
            appointments={appointments}
            onOpenNew={onOpenNew}
            onOpenEdit={onOpenEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

function AgendaRow({
  timeSlot,
  days,
  appointments,
  onOpenNew,
  onOpenEdit,
  onDelete
}) {
  return (
    <>
      <div className="bg-gray-50 p-2 text-sm font-medium border-r border-b text-center">
        {timeSlot}
      </div>
      {days.map((d) => {
        const iso = formatDate(d);
        const ap = appointments.find(
          (a) => a.date === iso && a.time === timeSlot
        );
        return (
          <div
            key={`${iso}-${timeSlot}`}
            className="min-h-[48px] border-r border-b p-1 cursor-pointer hover:bg-blue-50"
            onDoubleClick={() => onOpenNew(iso, timeSlot)}
          >
            {ap && (
              <div
                className="p-1 bg-indigo-50 border-l-4 border-indigo-500 rounded text-xs hover:bg-indigo-100"
                onClick={() => onOpenEdit(ap)}
              >
                <div className="font-medium text-indigo-900">{ap.patient}</div>
                <div className="text-indigo-700 text-xs">{ap.time}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(ap.id);
                  }}
                  className="text-red-500 hover:text-red-700 text-xs mt-1"
                >
                  ✕ Deletar
                </button>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function MiniCalendar({ date, onSelectDay }) {
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  const cells = [];
  for (let i = startDay - 1; i >= 0; i--) {
    cells.push(new Date(year, month, -i));
  }
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push(new Date(year, month, i));
  }
  while (cells.length < 42) {
    cells.push(new Date(year, month + 1, cells.length - startDay - daysInMonth + 1));
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setMonth(month === 0 ? 11 : month - 1)}
          className="text-gray-600"
        >
          &lt;
        </button>
        <span className="font-semibold text-sm">
          {new Date(year, month).toLocaleString('pt-BR', {
            month: 'long',
            year: 'numeric'
          })}
        </span>
        <button
          onClick={() => setMonth(month === 11 ? 0 : month + 1)}
          className="text-gray-600"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-2">
        {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => (
          <button
            key={i}
            onClick={() => onSelectDay(d)}
            className={`p-2 text-xs rounded ${
              d.getMonth() !== month
                ? 'text-gray-400'
                : 'hover:bg-blue-100'
            } ${
              formatDate(d) === formatDate(date)
                ? 'bg-indigo-600 text-white font-semibold'
                : ''
            }`}
          >
            {d.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
}

function NovoAgendamentoModal({ professionals = [], onClose, onSave, initial }) {
  const [form, setForm] = useState(
    initial || {
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      patient: '',
      phone: '',
      treatment: '',
      value: 0,
      professional: professionals[0] || ''
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patient) {
      alert('Informe o paciente');
      return;
    }
    onSave(form);
  };

  return (
    <Modal
      title={initial?.id ? 'Editar Agendamento' : 'Novo Agendamento'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <label>
            Data
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm mt-1"
            />
          </label>
          <label>
            Hora
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm mt-1"
            />
          </label>
        </div>

        <label>
          Paciente
          <input
            value={form.patient}
            onChange={(e) => setForm({ ...form, patient: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm mt-1"
            placeholder="Nome do paciente"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label>
            Tel
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm mt-1"
            />
          </label>
          <label>
            Valor (R$)
            <input
              type="number"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm mt-1"
            />
          </label>
        </div>

        <label>
          Tratamento
          <input
            value={form.treatment}
            onChange={(e) => setForm({ ...form, treatment: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm mt-1"
          />
        </label>

        <label>
          Profissional
          <select
            value={form.professional}
            onChange={(e) =>
              setForm({ ...form, professional: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm mt-1"
          >
            {professionals.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

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
            Agendar
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Utilitários
function generateTimeSlots() {
  const slots = [];
  for (let h = 7; h < 18; h++) {
    for (let m = 0; m < 60; m += 30) {
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return slots;
}

function parseDate(dateStr) {
  return new Date(dateStr + 'T00:00:00');
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}
