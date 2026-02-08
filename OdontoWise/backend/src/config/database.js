import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../../odontowise.db');

let db = null;

export async function getDb() {
  if (!db) {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    await initializeDatabase(db);
  }
  return db;
}

async function initializeDatabase(database) {
  // Criar tabelas se não existirem
  
  // Tabela de usuários
  await database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Tabela de pacientes
  await database.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id TEXT PRIMARY KEY,
      nome TEXT NOT NULL,
      cpf TEXT UNIQUE,
      telefone TEXT,
      email TEXT,
      dataNascimento TEXT,
      endereco TEXT,
      alergias TEXT,
      observacoes TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Tabela de agendamentos
  await database.exec(`
    CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      patient TEXT NOT NULL,
      phone TEXT,
      treatment TEXT,
      value REAL DEFAULT 0,
      professional TEXT NOT NULL,
      paid INTEGER DEFAULT 0,
      status TEXT DEFAULT 'pendente',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Verificar se já existem usuários padrão
  const userCount = await database.get('SELECT COUNT(*) as count FROM users');
  
  if (userCount.count === 0) {
    // Inserir usuários padrão
    const defaultUsers = [
      { username: 'dentista1', password: '1234', name: 'Dr. Dentista 1', role: 'dentista' },
      { username: 'dentista2', password: '1234', name: 'Dr. Dentista 2', role: 'dentista' },
      { username: 'dentista3', password: '1234', name: 'Dr. Dentista 3', role: 'dentista' },
      { username: 'secretaria', password: '1234', name: 'Secretária', role: 'secretaria' }
    ];

    for (const user of defaultUsers) {
      await database.run(
        'INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)',
        [user.username, user.password, user.name, user.role]
      );
    }
  }

  // Verificar se existe paciente padrão
  const patientCount = await database.get('SELECT COUNT(*) as count FROM patients');
  
  if (patientCount.count === 0) {
    await database.run(
      'INSERT INTO patients (id, nome, cpf, telefone) VALUES (?, ?, ?, ?)',
      ['p1', 'João Silva', '000.000.000-00', '11988880000']
    );
  }

  // Verificar se existe agendamento padrão
  const appointmentCount = await database.get('SELECT COUNT(*) as count FROM appointments');
  
  if (appointmentCount.count === 0) {
    const today = new Date().toISOString().split('T')[0];
    await database.run(
      'INSERT INTO appointments (id, date, time, patient, phone, treatment, value, professional, paid, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      ['a1', today, '09:00', 'João Silva', '11988880000', 'Limpeza', 150, 'dentista1', 1, 'concluido']
    );
  }
}

export default { getDb };
