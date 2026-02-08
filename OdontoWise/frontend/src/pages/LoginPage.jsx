import { useState } from 'react';
import { authApi } from '../services/api';

export default function LoginPage({ onLogin, loading }) {
  const [username, setUsername] = useState('dentista1');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.login(username, password);
      if (response.data.success) {
        onLogin(response.data.user);
      } else {
        setError('Usuário ou senha inválidos');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center text-4xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
            🦷
          </div>
          <h1 className="text-2xl font-bold">OdontoWise</h1>
          <p className="text-gray-500 text-sm mt-1">Sistema de Gestão Odontológica</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuário
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nome de usuário"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition disabled:opacity-50"
          >
            {isLoading ? 'Entrando...' : 'Entrar no Sistema'}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6 text-center">
          <strong>Usuários demo:</strong> dentista1, dentista2, dentista3 ou secretaria
          <br />
          <strong>Senha:</strong> 1234
        </p>
      </div>
    </div>
  );
}
