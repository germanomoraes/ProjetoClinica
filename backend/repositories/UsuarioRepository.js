const db = require('../config/database');
const Usuario = require('../models/Usuario');

class UsuarioRepository {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM users", (err, rows) => {
        if (err) reject(err);
        else resolve(rows.map(row => Usuario.fromRow(row)));
      });
    });
  }

  static getByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
        if (err) reject(err);
        else resolve(row ? Usuario.fromRow(row) : null);
      });
    });
  }

  static create(usuario) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO users (username, password, role, name) VALUES (?, ?, ?, ?)`;
      const params = [usuario.username, usuario.password, usuario.role, usuario.name];
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }
}

module.exports = UsuarioRepository;