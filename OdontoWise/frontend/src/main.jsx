import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Topbar from './components/Topbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AgendaPage from './pages/AgendaPage';
import PacientesPage from './pages/PacientesPage';
import FinanceiroPage from './pages/FinanceiroPage';
import RelatoriosPage from './pages/RelatoriosPage';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState(() => {
    const hash = location.hash.replace('#', '');
    return hash || 'login';
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = location.hash.replace('#', '');
      setRoute(hash || 'login');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setRoute('dashboard');
    location.hash = 'dashboard';
  };

  const handleLogout = () => {
    if (confirm('Deseja sair?')) {
      setUser(null);
      setRoute('login');
      location.hash = 'login';
    }
  };

  const navigate = (newRoute) => {
    setRoute(newRoute);
    location.hash = newRoute;
  };

  // Redirecionar para login se tentar acessar página protegida sem estar autenticado
  if (!user && route !== 'login') {
    navigate('login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {user && <Topbar user={user} onLogout={handleLogout} navigate={navigate} />}

      <div className="max-w-6xl mx-auto px-6 py-6">
        {!user ? (
          <LoginPage onLogin={handleLogin} loading={loading} />
        ) : (
          <>
            {route === 'dashboard' && <DashboardPage navigate={navigate} />}
            {route === 'agenda' && <AgendaPage />}
            {route === 'pacientes' && <PacientesPage />}
            {route === 'financeiro' && <FinanceiroPage />}
            {route === 'relatorios' && <RelatoriosPage />}
          </>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
