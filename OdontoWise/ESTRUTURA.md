# 📦 Estrutura Completa do Projeto OdontoWise

## Árvore de Arquivos

```
OdontoWise/
│
├── 📄 README.md                    # Documentação principal
├── 📄 INSTALAR.md                  # Guia passo-a-passo de instalação
├── 📄 setup.bat                    # Script automático de instalação
├── 📄 .gitignore                   # Arquivos ignorados pelo Git
│
├── 📁 backend/                     # ⚙️ SERVIDOR NODE.JS + EXPRESS
│   ├── 📄 package.json             # Dependências e scripts
│   ├── 📄 .env.example             # Exemplo de variáveis de ambiente
│   ├── odontowise.db               # Banco de dados SQLite (gerado automaticamente)
│   │
│   └── 📁 src/
│       ├── 📄 index.js             # 🚀 Entrada da aplicação (inicia servidor)
│       │
│       ├── 📁 config/
│       │   └── 📄 database.js      # 🗄️ Configuração e inicialização do SQLite
│       │
│       ├── 📁 middleware/
│       │   └── 📄 auth.js          # 🔐 Verificação de autenticação
│       │
│       ├── 📁 controllers/         # 🎯 Lógica de negócio da API
│       │   ├── 📄 authController.js       # Login e autenticação
│       │   ├── 📄 patientController.js    # CRUD de Pacientes
│       │   └── 📄 appointmentController.js # CRUD de Agendamentos
│       │
│       ├── 📁 routes/              # 🛣️ Rotas HTTP da API
│       │   ├── 📄 authRoutes.js          # Rotas de autenticação
│       │   ├── 📄 patientRoutes.js       # Rotas de pacientes
│       │   └── 📄 appointmentRoutes.js   # Rotas de agendamentos
│       │
│       └── 📁 models/              # 📋 Estrutura de dados (SQLite)
│           └── (Implícito nos controllers)
│
├── 📁 frontend/                    # 💻 APLICAÇÃO REACT + VITE
│   ├── 📄 package.json             # Dependências e scripts
│   ├── 📄 vite.config.js           # Configuração do Vite
│   ├── 📄 index.html               # HTML base
│   │
│   └── 📁 src/
│       ├── 📄 main.jsx             # 🚀 Entrada do React (inicia aplicação)
│       ├── 📄 index.css            # 🎨 Estilos globais
│       │
│       ├── 📁 pages/               # 📄 Páginas completas
│       │   ├── 📄 LoginPage.jsx             # Tela de login
│       │   ├── 📄 DashboardPage.jsx         # Painel principal
│       │   ├── 📄 AgendaPage.jsx            # Calendário de agendamentos
│       │   ├── 📄 PacientesPage.jsx         # Gestão de pacientes
│       │   ├── 📄 FinanceiroPage.jsx        # Controle financeiro
│       │   └── 📄 RelatoriosPage.jsx        # Relatórios e filtros
│       │
│       ├── 📁 components/          # 🧩 Componentes reutilizáveis
│       │   ├── 📄 Topbar.jsx              # Barra de navegação
│       │   └── 📄 shared.jsx              # Funções e componentes compartilhados
│       │
│       └── 📁 services/            # 📡 Integração com API
│           └── 📄 api.js                 # Cliente Axios com endpoints
```

---

## 🔌 Fluxo de Requisições

```
FRONTEND (React - Porta 3000)
   │
   ├─ LoginPage.jsx
   │  └─> authApi.login()
   │      └─> POST /api/auth/login
   │          └─> authController.js
   │              └─> Database (SQLite)
   │
   ├─ DashboardPage.jsx
   │  └─> appointmentApi.getStats()
   │      └─> GET /api/appointments/stats
   │
   ├─ AgendaPage.jsx
   │  ├─> authApi.getUsers()
   │  │   └─> GET /api/auth/users
   │  └─> appointmentApi.getAll()
   │      └─> GET /api/appointments
   │
   ├─ PacientesPage.jsx
   │  └─> patientApi.getAll()
   │      └─> GET /api/patients
   │
   ├─ FinanceiroPage.jsx
   │  └─> appointmentApi.getAll()
   │      └─> GET /api/appointments
   │
   └─ RelatoriosPage.jsx
      └─> appointmentApi.getAll()
          └─> GET /api/appointments

         ↓↓↓ (Via Axios)

BACKEND (Node.js + Express - Porta 5000)
   │
   ├─ src/index.js [Servidor rodando]
   │
   ├─ routes/
   │  ├─ authRoutes.js
   │  ├─ patientRoutes.js
   │  └─ appointmentRoutes.js
   │
   ├─ controllers/
   │  ├─ authController.js
   │  ├─ patientController.js
   │  └─ appointmentController.js
   │
   └─ config/database.js [SQLite]
      │
      ├─ users table
      ├─ patients table
      └─ appointments table
```

---

## 🗄️ Banco de Dados (SQLite)

### Tabela: `users`
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,  -- 'dentista' ou 'secretaria'
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: `patients`
```sql
CREATE TABLE patients (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  cpf TEXT UNIQUE,
  telefone TEXT,
  email TEXT,
  dataNascimento TEXT,
  endereco TEXT,
  alergias TEXT,
  observacoes TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: `appointments`
```sql
CREATE TABLE appointments (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  patient TEXT NOT NULL,
  phone TEXT,
  treatment TEXT,
  value REAL DEFAULT 0,
  professional TEXT NOT NULL,
  paid INTEGER DEFAULT 0,  -- 0 ou 1
  status TEXT DEFAULT 'pendente',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🌐 Endpoints da API

### **Autenticação**
- `POST /api/auth/login`
  - Body: `{ username: string, password: string }`
  - Response: `{ success: true, user: { id, username, name, role } }`

- `GET /api/auth/users`
  - Response: `[ { id, username, name, role }, ... ]`

### **Pacientes**
- `GET /api/patients` - Listar todos
- `GET /api/patients/:id` - Obter um paciente
- `POST /api/patients` - Criar novo
- `PUT /api/patients/:id` - Atualizar
- `DELETE /api/patients/:id` - Deletar

### **Agendamentos**
- `GET /api/appointments` - Listar todos
- `GET /api/appointments/stats` - Estatísticas (total, receita, etc)
- `GET /api/appointments/:id` - Obter um agendamento
- `POST /api/appointments` - Criar novo
- `PUT /api/appointments/:id` - Atualizar
- `DELETE /api/appointments/:id` - Deletar

---

## 🚀 Commands Disponíveis

### Backend
```bash
cd backend
npm install      # Instalar dependências
npm run dev      # Rodar em modo desenvolvimento (com auto-reload)
npm start        # Rodar em produção
```

### Frontend
```bash
cd frontend
npm install      # Instalar dependências
npm run dev      # Rodar em desenvolvimento (porta 3000)
npm run build    # Build para produção
npm run preview  # Preview do build
```

---

## 📋 Checklist de Implementação

✅ Estrutura de pastas em camadas
✅ Backend com Express e SQLite
✅ Frontend com React e Vite
✅ Autenticação de usuários
✅ CRUD de Pacientes
✅ CRUD de Agendamentos com Agenda Visual
✅ Controle Financeiro
✅ Relatórios com Filtros e Exportação CSV
✅ Dashboard com Estatísticas
✅ Banco de dados persistente
✅ Documentação completa
✅ Scripts de instalação

---

## 🎯 Próximos Passos Opcionais (Para Melhorias Futuras)

- [ ] Implementar JWT proper para autenticação
- [ ] Adicionar criptografia de senhas (bcrypt)
- [ ] Testes unitários (Jest)
- [ ] Deploy (Heroku, Vercel, etc)
- [ ] Docker containerização
- [ ] Notificações por email/WhatsApp
- [ ] Backup automático de dados
- [ ] Interface de gestão de dentistas
- [ ] Histórico de revisões de agendamentos

---

**OdontoWise v1.0.0** - Sistema completo e funcional em camadas! 🦷

