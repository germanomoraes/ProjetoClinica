const db = require('../config/database');
const Paciente = require('../models/Paciente');

class PacienteRepository {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM patients", (err, rows) => {
        if (err) reject(err);
        else resolve(rows.map(row => Paciente.fromRow(row)));
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM patients WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row ? Paciente.fromRow(row) : null);
      });
    });
  }

  static create(paciente) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO patients (nome, telefone, cpf, email, dataNascimento, endereco, alergias, observacoes, creator, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const params = [paciente.nome, paciente.telefone, paciente.cpf, paciente.email, paciente.dataNascimento, paciente.endereco, paciente.alergias, paciente.observacoes, paciente.creator, paciente.createdAt];
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  static update(id, paciente) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE patients SET nome = ?, telefone = ?, cpf = ?, email = ?, dataNascimento = ?, endereco = ?, alergias = ?, observacoes = ? WHERE id = ?`;
      const params = [paciente.nome, paciente.telefone, paciente.cpf, paciente.email, paciente.dataNascimento, paciente.endereco, paciente.alergias, paciente.observacoes, id];
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM patients WHERE id = ?", [id], function(err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }
}

module.exports = PacienteRepository;