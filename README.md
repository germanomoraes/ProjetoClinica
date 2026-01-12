# Projeto-Clinica-Odontológica

Este Projeto apresenta a proposta de um sistema web para a gestão de uma clínica odontológica, por meio do qual dentistas podem agendar suas consultas e guardar dados de seus clientes e tratamentos. O sistema também gera relatórios com informações sobre clientes e agendamentos. O sistema foi desenvolvido de forma monolítica utilizando  Javascript, React, HTML e CSS. 
O sistema web desenvolvido para auxiliar na gestão de clínicas odontológicas, permitindo o controle de pacientes, dentistas, consultas, prontuários e pagamentos.
O sistema foi projetado com base nos requisitos levantados em uma entrevista simulada com o gestor da clínica, adotando uma Arquitetura de Software em Camadas, evitando soluções monolíticas e garantindo separação de responsabilidades, baixo acoplamento e alta coesão.

# REQUISITOS FUNCIONAIS 

F01 – Cadastrar, editar e excluir pacientes

RF02 – Gerenciar prontuários odontológicos

RF03 – Agendar, editar e cancelar consultas

RF04 – Controlar pagamentos das consultas

RF05 – Autenticar usuários com níveis de acesso

RF06 – Listar consultas por data e profissional

# REQUISITOS NÃO FUNCIONAIS

RNF01 – O sistema deve utilizar arquitetura em camadas

RNF02 – Comunicação via API REST

RNF03 – Interface responsiva e intuitiva

RNF04 – Controle de acesso por perfil de usuário

RNF05 – Código organizado e documentado

# ARQUITETURA ADOTADA

Arquitetura em Camadas: A arquitetura foi escolhida para facilitar manutenção, evolução do sistema e reaproveitamento de código.

<img width="392" height="629" alt="Arq_em_camadas" src="https://github.com/user-attachments/assets/a7c7a335-5fc5-4027-b913-ac73dcbbe6c9" />

# JUSTIFICATIVA DA ARQUITETURA

A utilização da Arquitetura em Camadas permite a separação clara das responsabilidades do sistema, evitando o acoplamento excessivo entre interface, regras de negócio e acesso a dados. Essa abordagem facilita a manutenção, a escalabilidade e a evolução do software, além de melhorar a organização e a qualidade do código.

# CAMADAS DO SISTEMA

- Camada de Apresentação (Front-end)
Interface gráfica
Formulários e listagens
Consumo da API REST
Tecnologias:
HTML, CSS, JavaScript

- Camada de Aplicação / Negócio (Back-end)
Regras de negócio
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

# ORGANIZAÇÃO DO CÓDIGO

# backend/   

├── controllers/
├── PacienteController.js
├── ConsultaController.js
├── UsuarioController.js
└── PagamentoController.js

├── services/
├── PacienteService.js
├── ConsultaService.js
├── AuthService.js
└── PagamentoService.js

├── repositories/
├── PacienteRepository.js
├── ConsultaRepository.js
└── UsuarioRepository.js

├── models/
├── Paciente.js
├── Dentista.js
├── Usuario.js
├── Consulta.js
├── Prontuario.js
└── Pagamento.js

├── routes/
├── pacienteRoutes.js
├── consultaRoutes.js
└── authRoutes.js

├── config/
└── database.js
└── app.js

# frontend/

├── pages/
├── login.html
├── dashboard.html
├── pacientes.html
├── consultas.html
└── financeiro.html

├── components/
├── navbar.js
├── formularioPaciente.js
└── tabelaConsultas.js

├── services/
├── api.js
├── pacienteService.js
└── consultaService.js

├── assets/
├── css/
└── imagens/
└── index.html

└── README.md


# INSTRUÇÕES PARA EXECUÇÃO (README)
# Back-end

cd backend
npm install
npm start

# Front-end

cd frontend
abrir index.html no navegador

# AUTORES

Germano de Oliveira Moraes
Curso: Análise e Desenvolvimento de Sistemas - IFCE – Campus Boa Viagem



