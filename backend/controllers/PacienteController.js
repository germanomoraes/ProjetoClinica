const PacienteService = require('../services/PacienteService');

class PacienteController {
  static async getAll(req, res) {
    try {
      const pacientes = await PacienteService.getAllPacientes();
      res.json(pacientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const paciente = await PacienteService.getPacienteById(req.params.id);
      if (!paciente) return res.status(404).json({ error: 'Paciente não encontrado' });
      res.json(paciente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const id = await PacienteService.createPaciente(req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      await PacienteService.updatePaciente(req.params.id, req.body);
      res.json({ message: 'Paciente atualizado' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await PacienteService.deletePaciente(req.params.id);
      res.json({ message: 'Paciente deletado' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PacienteController;