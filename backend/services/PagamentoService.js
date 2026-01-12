const ConsultaRepository = require('../repositories/ConsultaRepository');

class PagamentoService {
  static async marcarComoPago(consultaId) {
    const consulta = await ConsultaRepository.getById(consultaId);
    if (!consulta) throw new Error('Consulta não encontrada');

    consulta.paid = true;
    return await ConsultaRepository.update(consultaId, consulta);
  }

  static async getPagamentos() {
    const consultas = await ConsultaRepository.getAll();
    return consultas.filter(c => c.paid);
  }
}

module.exports = PagamentoService;