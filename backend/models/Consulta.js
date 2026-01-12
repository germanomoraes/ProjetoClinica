class Consulta {
  constructor(id, date, time, patient, phone, treatment, value, professional, paid, status) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.patient = patient;
    this.phone = phone;
    this.treatment = treatment;
    this.value = value;
    this.professional = professional;
    this.paid = paid;
    this.status = status;
  }

  static fromRow(row) {
    return new Consulta(
      row.id,
      row.date,
      row.time,
      row.patient,
      row.phone,
      row.treatment,
      row.value,
      row.professional,
      row.paid,
      row.status
    );
  }
}

module.exports = Consulta;