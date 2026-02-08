export function authMiddleware(req, res, next) {
  // Para simplificar, vamos aceitar um header com o username
  // Em produção, seria JWT
  const username = req.headers['x-user'];
  
  if (!username) {
    return res.status(401).json({ error: 'Não autenticado' });
  }
  
  req.user = { username };
  next();
}

export function optionalAuthMiddleware(req, res, next) {
  const username = req.headers['x-user'];
  if (username) {
    req.user = { username };
  }
  next();
}
