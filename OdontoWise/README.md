# 🦷 OdontoWise - Sistema de Gestão Odontológica

Um sistema web de gestão para clínicas odontológicas, desenvolvido com **Node.js + Express** no backend e **React** no frontend, organizado em camadas.

## 📋 Características

- ✅ **Autenticação** de usuários (Dentistas e Secretários)
- ✅ **Gestão de Pacientes** (CRUD completo)
- ✅ **Agenda de Agendamentos** com visualização semanal
- ✅ **Controle Financeiro** com receitas e pagamentos
- ✅ **Relatórios** com filtros e exportação CSV
- ✅ **Dashboard** com estatísticas
- ✅ **Banco de Dados SQLite** persistente

## 🏗️ Arquitetura em Camadas

```
OdontoWise/
├── backend/                    # Node.js + Express
│   ├── src/
│   │   ├── controllers/       # Lógica de negócio (API)
│   │   ├── routes/            # Rotas HTTP
│   │   ├── models/            # Estrutura de dados
│   │   ├── middleware/        # Middleware autenticação
│   │   ├── config/            # Configuração (banco de dados)
│   │   └── index.js           # Entrada da aplicação
│   ├── package.json
│   └── odontowise.db          # Banco de dados SQLite
│
└── frontend/                   # React + Vite
    ├── src/
    │   ├── pages/             # Páginas (Dashboard, Agenda, etc)
    │   ├── components/        # Componentes reutilizáveis
    │   ├── services/          # Cliente API
    │   ├── main.jsx           # Entrada React
    │   └── index.css          # Estilos
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🚀 Como Rodar

### Pré-requisitos
- **Node.js** v16+ instalado
- **npm** (vem com Node.js)

### 1️⃣ Instalar Dependências

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd frontend
npm install
```

### 2️⃣ Iniciar o Backend

```bash
cd backend
npm run dev
# Ou para produção: npm start
```

O backend rodará em: **http://localhost:5000**

### 3️⃣ Iniciar o Frontend

Em outro terminal:
```bash
cd frontend
npm run dev
```

O frontend rodará em: **http://localhost:3000**

## Login Padrão

| Usuário | Senha | Papel |
|---------|-------|-------|
| dentista1 | 1234 | Dentista |
| dentista2 | 1234 | Dentista |
| dentista3 | 1234 | Dentista |
| secretaria | 1234 | Secretária |

## API Endpoints

### Autenticação
- `POST /api/auth/login` - Login do usuário
- `GET /api/auth/users` - Lista de usuários

### Pacientes
- `GET /api/patients` - Listar pacientes
- `POST /api/patients` - Criar paciente
- `PUT /api/patients/:id` - Atualizar paciente
- `DELETE /api/patients/:id` - Deletar paciente

### Agendamentos
- `GET /api/appointments` - Listar agendamentos
- `GET /api/appointments/stats` - Estatísticas
- `POST /api/appointments` - Criar agendamento
- `PUT /api/appointments/:id` - Atualizar agendamento
- `DELETE /api/appointments/:id` - Deletar agendamento

## Banco de Dados

O sistema usa **SQLite** para persistência de dados. O arquivo `odontowise.db` é criado automaticamente na primeira execução no diretório `backend/`.

### Tabelas:
- **users** - Usuários do sistema
- **patients** - Dados dos pacientes
- **appointments** - Agendamentos e consultas

## Tecnologias

### Backend
- Express.js - Framework web
- SQLite - Banco de dados
- CORS - Cross-origin requests

### Frontend
- React 18 - UI
- Vite - Build tool
- Axios - Cliente HTTP
- Tailwind CSS - Estilos

## Notas Importantes

1. **Dados são persistidos** no SQLite (`backend/odontowise.db`)
2. **CORS está habilitado** para desenvolvimento
3. O frontend faz proxy das requisições da API através do Vite

## Troubleshooting

### Erro de conexão no frontend
- Verifique se o backend está rodando em `http://localhost:5000`
- Verifique a porta no `vite.config.js`

### Erro ao iniciar frontend
```bash
# Limpar cache e dependências
rm -rf node_modules package-lock.json
npm install
```

### Banco de dados corrompido
- Delete `backend/odontowise.db` e reinicie o backend

## Estrutura de Componentes React

- **LoginPage** - Autenticação
- **DashboardPage** - Visão geral
- **AgendaPage** - Calendário e agendamentos
- **PacientesPage** - Gestão de pacientes
- **FinanceiroPage** - Controle financeiro
- **RelatoriosPage** - Relatórios e filtros
- **Topbar** - Barra de navegação
- **shared.jsx** - Componentes reutilizáveis

## Customização

### Portas
- Backend: Modificar em `backend/src/index.js` (linha com `PORT`)
- Frontend: Modificar em `frontend/vite.config.js` (server.port)

### Estilos
- Usando Tailwind CSS via CDN
- Arquivo customizado: `frontend/src/index.css`

## Suporte

Para dúvidas sobre a implementação, verifique:
- Logs do backend no terminal
- Console do navegador (DevTools)
- Aba Network para requisições API

---

**OdontoWise v1.0.0** 

