export default function Topbar({ user, onLogout, navigate }) {
  const initial = user?.name ? user.name[0] : 'U';

  return (
    <header className="bg-white shadow sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-[10px] flex items-center justify-center text-2xl bg-gradient-to-br from-blue-600 to-purple-600">
            🦷
          </div>
          <div>
            <div className="font-bold text-lg">OdontoWise</div>
            <div className="text-xs text-gray-500">Sistema de Gestão Odontológica</div>
          </div>
          <nav className="ml-6 hidden md:flex gap-4">
            <button
              onClick={() => navigate('dashboard')}
              className="px-3 py-2 rounded hover:bg-gray-50 text-sm"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('agenda')}
              className="px-3 py-2 rounded hover:bg-gray-50 text-sm"
            >
              Agenda
            </button>
            <button
              onClick={() => navigate('pacientes')}
              className="px-3 py-2 rounded hover:bg-gray-50 text-sm"
            >
              Pacientes
            </button>
            <button
              onClick={() => navigate('financeiro')}
              className="px-3 py-2 rounded hover:bg-gray-50 text-sm"
            >
              Financeiro
            </button>
            <button
              onClick={() => navigate('relatorios')}
              className="px-3 py-2 rounded hover:bg-gray-50 text-sm"
            >
              Relatórios
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <button className="p-2 rounded hover:bg-gray-100">🔔</button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center text-sm font-bold">
                {initial}
              </div>
              <div className="hidden lg:block text-sm">{user?.name}</div>
              <button
                onClick={onLogout}
                className="ml-2 py-1 px-3 border rounded text-sm hover:bg-gray-50"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
