# Sistema de Gestão Odontológica - OdontoWise

# DESCRIÇÃO GERAL DO SISTEMA 
OdontoWise – Sistema de Gestão Odontológica

O OdontoWise é um sistema web desenvolvido para auxiliar na gestão de clínicas odontológicas, permitindo o controle de pacientes, dentistas, consultas, prontuários e pagamentos.
O sistema foi projetado com base nos requisitos levantados em uma entrevista simulada com o gestor da clínica, adotando uma Arquitetura de Software em Camadas, evitando soluções monolíticas e garantindo separação de responsabilidades, baixo acoplamento e alta coesão.

# REQUISITOS DO SISTEMA

# Requisitos Funcionais

RF01 – Cadastrar, editar e excluir pacientes
RF02 – Gerenciar prontuários odontológicos
RF03 – Agendar, editar e cancelar consultas
RF04 – Controlar pagamentos das consultas
RF05 – Autenticar usuários com níveis de acesso
RF06 – Listar consultas por data e profissional

# Requisitos Não Funcionais

RNF01 – O sistema deve utilizar arquitetura em camadas
RNF02 – Comunicação via API REST
RNF03 – Interface responsiva e intuitiva
RNF04 – Controle de acesso por perfil de usuário
RNF05 – Código organizado e documentado

# Arquitetura Adotada

Arquitetura em Camadas: A arquitetura foi escolhida para facilitar manutenção, evolução do sistema e reaproveitamento de código.

<img width="392" height="629" alt="Arq_em_camadas" src="https://github.com/user-attachments/assets/b76d319e-157e-41f1-8454-23e0f3762cf4" />

# JUSTIFICATIVA DA ARQUITETURA

A utilização da Arquitetura em Camadas permite a separação clara das responsabilidades do sistema, evitando o acoplamento excessivo entre interface, regras de negócio e acesso a dados. Essa abordagem facilita a manutenção, a escalabilidade e a evolução do software, além de melhorar a organização e a qualidade do código.

# Camadas do Sistema

Camada de Apresentação (Front-end)

- Interface gráfica
  Formulários e listagens
  Consumo da API REST

  Tecnologias:
  HTML, CSS, JavaScript

Camada de Aplicação / Negócio (Back-end)

- Regras de negócio
  Validações
  Autenticação
  Exposição da API REST

  Tecnologias:
  Node.js + Express

- Camada de Persistência de Dados

  Armazenamento
  Relacionamentos
  Consultas ao banco

  Banco de Dados:
  MongoDB ou PostgreSQL

Este projeto foi reestruturado em camadas para melhor organização e manutenção.

# Estrutura das pastas 

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

## Como executar o projeto

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

# AUTORES
Germano de Oliveira Moraes
Curso: Análise e Desenvolvimento de Sistemas
IFCE – Campus Boa Viagem
