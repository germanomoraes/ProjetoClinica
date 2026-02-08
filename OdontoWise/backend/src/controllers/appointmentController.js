import { getDb } from '../config/database.js';

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export async function getAppointments(req, res) {
  try {
    const db = await getDb();
    const appointments = await db.all('SELECT * FROM appointments');
    res.json(appointments);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    res.status(500).json({ error: 'Erro ao buscar agendamentos' });
  }
}

export async function getAppointmentById(req, res) {
  try {
    const { id } = req.params;
    const db = await getDb();
    const appointment = await db.get('SELECT * FROM appointments WHERE id = ?', [id]);
    
    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }
    
    res.json(appointment);
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    res.status(500).json({ error: 'Erro ao buscar agendamento' });
  }
}

export async function createAppointment(req, res) {
  try {
    const db = await getDb();
    const { date, time, patient, phone, treatment, value, professional, paid, status } = req.body;
    
    if (!date || !time || !patient || !professional) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const id = uid();
    const paidValue = paid ? 1 : 0;
    const appointmentStatus = status || 'pendente';
    
    await db.run(
      'INSERT INTO appointments (id, date, time, patient, phone, treatment, value, professional, paid, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, date, time, patient, phone, treatment, value || 0, professional, paidValue, appointmentStatus]
    );

    const appointment = await db.get('SELECT * FROM appointments WHERE id = ?', [id]);
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({ error: 'Erro ao criar agendamento' });
  }
}

export async function updateAppointment(req, res) {
  try {
    const { id } = req.params;
    const { date, time, patient, phone, treatment, value, professional, paid, status } = req.body;
    
    const db = await getDb();
    const paidValue = paid ? 1 : 0;
    
    await db.run(
      'UPDATE appointments SET date = ?, time = ?, patient = ?, phone = ?, treatment = ?, value = ?, professional = ?, paid = ?, status = ? WHERE id = ?',
      [date, time, patient, phone, treatment, value, professional, paidValue, status, id]
    );

    const appointment = await db.get('SELECT * FROM appointments WHERE id = ?', [id]);
    res.json(appointment);
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    res.status(500).json({ error: 'Erro ao atualizar agendamento' });
  }
}

export async function deleteAppointment(req, res) {
  try {
    const { id } = req.params;
    const db = await getDb();
    
    await db.run('DELETE FROM appointments WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error);
    res.status(500).json({ error: 'Erro ao deletar agendamento' });
  }
}

export async function getAppointmentStats(req, res) {
  try {
    const db = await getDb();
    const today = new Date().toISOString().split('T')[0];
    
    const totalAppointments = await db.get('SELECT COUNT(*) as count FROM appointments');
    const appointmentsToday = await db.get('SELECT COUNT(*) as count FROM appointments WHERE date = ?', [today]);
    const totalRevenue = await db.get('SELECT SUM(value) as total FROM appointments');
    const paidRevenue = await db.get('SELECT SUM(value) as total FROM appointments WHERE paid = 1');
    const pendingRevenue = await db.get('SELECT SUM(value) as total FROM appointments WHERE paid = 0');

    res.json({
      totalAppointments: totalAppointments.count,
      appointmentsToday: appointmentsToday.count,
      totalRevenue: totalRevenue.total || 0,
      paidRevenue: paidRevenue.total || 0,
      pendingRevenue: pendingRevenue.total || 0
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
}
