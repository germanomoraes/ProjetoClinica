# Frontend - OdontoWise

O frontend foi separado em páginas HTML individuais, cada uma com seus próprios componentes React.

## Estrutura

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

## Como executar

1. Inicie o backend (`npm start` no diretório `backend/`).
2. Abra `frontend/pages/Login.html` no navegador.
3. Faça login e navegue pelas páginas.

Nota: As páginas usam fetch para consumir a API do backend. Certifique-se de que o backend está rodando na porta 3000.