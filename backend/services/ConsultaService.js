const ConsultaRepository = require('../repositories/ConsultaRepository');

class ConsultaService {
  static async getAllConsultas() {
    return await ConsultaRepository.getAll();
  }

  static async getConsultaById(id) {
    return await ConsultaRepository.getById(id);
  }

  static async createConsulta(consultaData) {
    // Validações
    if (!consultaData.date || !consultaData.time || !consultaData.patient || !consultaData.professional) {
      throw new Error('Campos obrigatórios: data, hora, paciente, profissional');
    }

    consultaData.status = consultaData.status || 'agendado';
    consultaData.paid = consultaData.paid || false;

    return await ConsultaRepository.create(consultaData);
  }

  static async updateConsulta(id, consultaData) {
    const consulta = await ConsultaRepository.getById(id);
    if (!consulta) throw new Error('Consulta não encontrada');

    return await ConsultaRepository.update(id, consultaData);
  }

  static async deleteConsulta(id) {
    const consulta = await ConsultaRepository.getById(id);
    if (!consulta) throw new Error('Consulta não encontrada');

    return await ConsultaRepository.delete(id);
  }
}

module.exports = ConsultaService;