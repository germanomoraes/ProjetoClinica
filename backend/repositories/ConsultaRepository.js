const db = require('../config/database');
const Consulta = require('../models/Consulta');

class ConsultaRepository {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM appointments", (err, rows) => {
        if (err) reject(err);
        else resolve(rows.map(row => Consulta.fromRow(row)));
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM appointments WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row ? Consulta.fromRow(row) : null);
      });
    });
  }

  static create(consulta) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO appointments (date, time, patient, phone, treatment, value, professional, paid, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const params = [consulta.date, consulta.time, consulta.patient, consulta.phone, consulta.treatment, consulta.value, consulta.professional, consulta.paid, consulta.status];
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  static update(id, consulta) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE appointments SET date = ?, time = ?, patient = ?, phone = ?, treatment = ?, value = ?, professional = ?, paid = ?, status = ? WHERE id = ?`;
      const params = [consulta.date, consulta.time, consulta.patient, consulta.phone, consulta.treatment, consulta.value, consulta.professional, consulta.paid, consulta.status, id];
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM appointments WHERE id = ?", [id], function(err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }
}

module.exports = ConsultaRepository;