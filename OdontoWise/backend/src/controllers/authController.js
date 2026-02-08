import { getDb } from '../config/database.js';

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }

    const db = await getDb();
    const user = await db.get(
      'SELECT id, username, name, role FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (!user) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao processar login' });
  }
}

export async function getUsers(req, res) {
  try {
    const db = await getDb();
    const users = await db.all('SELECT id, username, name, role FROM users');
    res.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
}
