const AuthService = require('../services/AuthService');

class UsuarioController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await AuthService.login(username, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  static async register(req, res) {
    try {
      const id = await AuthService.register(req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UsuarioController;