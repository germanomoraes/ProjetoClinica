class Usuario {
  constructor(id, username, password, role, name) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
    this.name = name;
  }

  static fromRow(row) {
    return new Usuario(
      row.id,
      row.username,
      row.password,
      row.role,
      row.name
    );
  }
}

module.exports = Usuario;