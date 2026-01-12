class Prontuario {
  constructor(id, patientId, date, notes, dentist) {
    this.id = id;
    this.patientId = patientId;
    this.date = date;
    this.notes = notes;
    this.dentist = dentist;
  }

  static fromRow(row) {
    return new Prontuario(
      row.id,
      row.patientId,
      row.date,
      row.notes,
      row.dentist
    );
  }
}

module.exports = Prontuario;