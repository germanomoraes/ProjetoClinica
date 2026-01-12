const PagamentoService = require('../services/PagamentoService');

class PagamentoController {
  static async getAll(req, res) {
    try {
      const pagamentos = await PagamentoService.getPagamentos();
      res.json(pagamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async marcarPago(req, res) {
    try {
      await PagamentoService.marcarComoPago(req.params.id);
      res.json({ message: 'Pagamento marcado como pago' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PagamentoController;