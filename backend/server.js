const app = require('./app');
require('./config/database'); // Inicializa o banco

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});