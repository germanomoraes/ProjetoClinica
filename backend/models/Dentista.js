class Dentista {
  constructor(id, username, name) {
    this.id = id;
    this.username = username;
    this.name = name;
  }

  static fromRow(row) {
    return new Dentista(
      row.id,
      row.username,
      row.name
    );
  }
}

module.exports = Dentista;