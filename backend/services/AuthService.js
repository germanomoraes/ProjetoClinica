const UsuarioRepository = require('../repositories/UsuarioRepository');
const { generateToken, hashPassword, comparePassword } = require('../config/auth');

class AuthService {
  static async login(username, password) {
    const user = await UsuarioRepository.getByUsername(username);
    if (!user) throw new Error('Usuário não encontrado');

    if (!comparePassword(password, user.password)) throw new Error('Senha inválida');

    const token = generateToken(user);
    return { token, user: { id: user.id, username: user.username, role: user.role, name: user.name } };
  }

  static async register(userData) {
    const existing = await UsuarioRepository.getByUsername(userData.username);
    if (existing) throw new Error('Usuário já existe');

    userData.password = hashPassword(userData.password);
    return await UsuarioRepository.create(userData);
  }
}

module.exports = AuthService;