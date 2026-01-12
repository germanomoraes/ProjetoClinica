class Pagamento {
  constructor(id, appointmentId, amount, date, method) {
    this.id = id;
    this.appointmentId = appointmentId;
    this.amount = amount;
    this.date = date;
    this.method = method;
  }

  static fromRow(row) {
    return new Pagamento(
      row.id,
      row.appointmentId,
      row.amount,
      row.date,
      row.method
    );
  }
}

module.exports = Pagamento;