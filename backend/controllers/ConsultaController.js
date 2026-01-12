const ConsultaService = require('../services/ConsultaService');

class ConsultaController {
  static async getAll(req, res) {
    try {
      const consultas = await ConsultaService.getAllConsultas();
      res.json(consultas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const consulta = await ConsultaService.getConsultaById(req.params.id);
      if (!consulta) return res.status(404).json({ error: 'Consulta não encontrada' });
      res.json(consulta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const id = await ConsultaService.createConsulta(req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      await ConsultaService.updateConsulta(req.params.id, req.body);
      res.json({ message: 'Consulta atualizada' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await ConsultaService.deleteConsulta(req.params.id);
      res.json({ message: 'Consulta deletada' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ConsultaController;