# Sistema de Gestão Odontológica - OdontoWise

Este projeto foi reestruturado em camadas para melhor organização e manutenção

## Estrutura do Backend

```
backend/
├── controllers/
│   ├── PacienteController.js
│   ├── ConsultaController.js
│   ├── UsuarioController.js
│   └── PagamentoController.js
├── services/
│   ├── PacienteService.js
│   ├── ConsultaService.js
│   ├── AuthService.js
│   └── PagamentoService.js
├── repositories/
│   ├── PacienteRepository.js
│   ├── ConsultaRepository.js
│   └── UsuarioRepository.js
├── models/
│   ├── Paciente.js
│   ├── Dentista.js
│   ├── Usuario.js
│   ├── Consulta.js
│   ├── Prontuario.js
│   └── Pagamento.js
├── routes/
│   ├── pacienteRoutes.js
│   ├── consultaRoutes.js
│   └── authRoutes.js
├── config/
│   ├── database.js
│   └── auth.js
├── app.js
└── server.js
```

## Como executar

1. Instale o Node.js (se não tiver).
2. No diretório `backend/`, execute `npm install`.
3. Execute `npm start` para iniciar o servidor na porta 3000.

## APIs Disponíveis

- `POST /api/auth/login` - Login
- `GET /api/pacientes` - Listar pacientes
- `POST /api/pacientes` - Criar paciente
- `GET /api/consultas` - Listar consultas
- `POST /api/consultas` - Criar consulta

## Frontend

Estrutura organizada:

```
frontend/
├── pages/
│   ├── Login.html
│   ├── Pacientes.html
│   ├── Consultas.html
│   ├── Financeiro.html
│   └── index.html (Dashboard)
├── components/
│   ├── Navbar.js
│   ├── FormPaciente.js
│   └── TabelaConsultas.js
├── services/
│   ├── api.js
│   ├── pacienteService.js
│   └── consultaService.js
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── imagens/
└── index.html
```

### Como executar o Frontend

1. Inicie o backend.
2. Abra `frontend/pages/Login.html` no navegador.
3. Faça login e navegue pelas páginas.

Nota: O frontend usa fetch para consumir a API. Certifique-se de que o backend está rodando.