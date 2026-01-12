import React from 'react';

function Navbar({ user, onLogout, navigate }) {
  const initial = user && user.name ? user.name[0] : 'U';
  return (
    <header className="bg-white shadow sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="logo-badge">🦷</div>
          <div>
            <div className="font-bold text-lg">OdontoWise</div>
            <div className="tiny">Sistema de Gestão Odontológica</div>
          </div>
          <nav className="ml-6 hidden md:flex gap-4">
            <a href="#dashboard" className="px-3 py-2 rounded hover:bg-gray-50">Dashboard</a>
            <a href="#agenda" className="px-3 py-2 rounded hover:bg-gray-50">Agenda</a>
            <a href="#pacientes" className="px-3 py-2 rounded hover:bg-gray-50">Pacientes</a>
            <a href="#financeiro" className="px-3 py-2 rounded hover:bg-gray-50">Financeiro</a>
            <a href="#relatorios" className="px-3 py-2 rounded hover:bg-gray-50">Relatórios</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <button className="p-2 rounded hover:bg-gray-100">🔔</button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center">{initial}</div>
              <div className="hidden lg:block text-sm">{user.name}</div>
              <button onClick={onLogout} className="ml-2 py-1 px-3 border rounded text-sm hover:bg-gray-50">Sair</button>
            </div>
          </div>
          <div className="md:hidden">
            <button className="p-2" onClick={()=>navigate('dashboard')}>☰</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;