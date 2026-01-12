const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Criar tabelas se não existirem
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      name TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT,
      cpf TEXT UNIQUE,
      email TEXT,
      dataNascimento TEXT,
      endereco TEXT,
      alergias TEXT,
      observacoes TEXT,
      creator TEXT,
      createdAt TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      patient TEXT NOT NULL,
      phone TEXT,
      treatment TEXT,
      value REAL DEFAULT 0,
      professional TEXT NOT NULL,
      paid BOOLEAN DEFAULT 0,
      status TEXT DEFAULT 'agendado'
    )
  `);

  // Inserir dados padrão se vazio
  db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
    if (row.count === 0) {
      const defaultUsers = [
        { username: 'dentista1', password: '$2a$10$dummyhash', role: 'dentista', name: 'Dr. Dentista 1' },
        { username: 'dentista2', password: '$2a$10$dummyhash', role: 'dentista', name: 'Dr. Dentista 2' },
        { username: 'dentista3', password: '$2a$10$dummyhash', role: 'dentista', name: 'Dr. Dentista 3' },
        { username: 'secretaria', password: '$2a$10$dummyhash', role: 'secretaria', name: 'Secretária' }
      ];
      const stmt = db.prepare("INSERT INTO users (username, password, role, name) VALUES (?, ?, ?, ?)");
      defaultUsers.forEach(user => stmt.run(user.username, user.password, user.role, user.name));
      stmt.finalize();
    }
  });

  db.get("SELECT COUNT(*) as count FROM patients", (err, row) => {
    if (row.count === 0) {
      const stmt = db.prepare("INSERT INTO patients (nome, telefone, cpf) VALUES (?, ?, ?)");
      stmt.run('João Silva', '11988880000', '000.000.000-00');
      stmt.finalize();
    }
  });

  db.get("SELECT COUNT(*) as count FROM appointments", (err, row) => {
    if (row.count === 0) {
      const stmt = db.prepare("INSERT INTO appointments (date, time, patient, phone, treatment, value, professional, paid, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
      stmt.run('2024-01-01', '09:00', 'João Silva', '11988880000', 'Limpeza', 150, 'dentista1', 1, 'concluido');
      stmt.finalize();
    }
  });
});

module.exports = db;