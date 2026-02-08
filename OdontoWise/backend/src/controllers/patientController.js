import { getDb } from '../config/database.js';

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export async function getPatients(req, res) {
  try {
    const db = await getDb();
    const patients = await db.all('SELECT * FROM patients');
    res.json(patients);
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    res.status(500).json({ error: 'Erro ao buscar pacientes' });
  }
}

export async function getPatientById(req, res) {
  try {
    const { id } = req.params;
    const db = await getDb();
    const patient = await db.get('SELECT * FROM patients WHERE id = ?', [id]);
    
    if (!patient) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    
    res.json(patient);
  } catch (error) {
    console.error('Erro ao buscar paciente:', error);
    res.status(500).json({ error: 'Erro ao buscar paciente' });
  }
}

export async function createPatient(req, res) {
  try {
    const db = await getDb();
    const { nome, cpf, telefone, email, dataNascimento, endereco, alergias, observacoes } = req.body;
    
    if (!nome || !cpf) {
      return res.status(400).json({ error: 'Nome e CPF são obrigatórios' });
    }

    const id = uid();
    
    await db.run(
      'INSERT INTO patients (id, nome, cpf, telefone, email, dataNascimento, endereco, alergias, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, nome, cpf, telefone, email, dataNascimento, endereco, alergias, observacoes]
    );

    const patient = await db.get('SELECT * FROM patients WHERE id = ?', [id]);
    res.status(201).json(patient);
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    res.status(500).json({ error: 'Erro ao criar paciente' });
  }
}

export async function updatePatient(req, res) {
  try {
    const { id } = req.params;
    const { nome, cpf, telefone, email, dataNascimento, endereco, alergias, observacoes } = req.body;
    
    const db = await getDb();
    
    await db.run(
      'UPDATE patients SET nome = ?, cpf = ?, telefone = ?, email = ?, dataNascimento = ?, endereco = ?, alergias = ?, observacoes = ? WHERE id = ?',
      [nome, cpf, telefone, email, dataNascimento, endereco, alergias, observacoes, id]
    );

    const patient = await db.get('SELECT * FROM patients WHERE id = ?', [id]);
    res.json(patient);
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    res.status(500).json({ error: 'Erro ao atualizar paciente' });
  }
}

export async function deletePatient(req, res) {
  try {
    const { id } = req.params;
    const db = await getDb();
    
    await db.run('DELETE FROM patients WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar paciente:', error);
    res.status(500).json({ error: 'Erro ao deletar paciente' });
  }
}
