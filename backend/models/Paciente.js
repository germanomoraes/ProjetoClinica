class Paciente {
  constructor(id, nome, telefone, cpf, email, dataNascimento, endereco, alergias, observacoes, creator, createdAt) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.cpf = cpf;
    this.email = email;
    this.dataNascimento = dataNascimento;
    this.endereco = endereco;
    this.alergias = alergias;
    this.observacoes = observacoes;
    this.creator = creator;
    this.createdAt = createdAt;
  }

  static fromRow(row) {
    return new Paciente(
      row.id,
      row.nome,
      row.telefone,
      row.cpf,
      row.email,
      row.dataNascimento,
      row.endereco,
      row.alergias,
      row.observacoes,
      row.creator,
      row.createdAt
    );
  }
}

module.exports = Paciente;