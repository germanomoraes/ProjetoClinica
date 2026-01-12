const PacienteRepository = require('../repositories/PacienteRepository');

class PacienteService {
  static async getAllPacientes() {
    return await PacienteRepository.getAll();
  }

  static async getPacienteById(id) {
    return await PacienteRepository.getById(id);
  }

  static async createPaciente(pacienteData) {
    // Validações
    if (!pacienteData.nome) throw new Error('Nome é obrigatório');
    if (!pacienteData.cpf) throw new Error('CPF é obrigatório');
    // Verificar se CPF já existe
    const existing = await PacienteRepository.getAll();
    if (existing.some(p => p.cpf === pacienteData.cpf)) throw new Error('CPF já cadastrado');

    pacienteData.createdAt = new Date().toISOString();
    pacienteData.creator = 'system'; // ou do usuário logado

    return await PacienteRepository.create(pacienteData);
  }

  static async updatePaciente(id, pacienteData) {
    const paciente = await PacienteRepository.getById(id);
    if (!paciente) throw new Error('Paciente não encontrado');

    return await PacienteRepository.update(id, pacienteData);
  }

  static async deletePaciente(id) {
    const paciente = await PacienteRepository.getById(id);
    if (!paciente) throw new Error('Paciente não encontrado');

    return await PacienteRepository.delete(id);
  }
}

module.exports = PacienteService;