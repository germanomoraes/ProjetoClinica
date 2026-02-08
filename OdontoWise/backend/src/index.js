import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor OdontoWise está rodando' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🦷 OdontoWise Backend rodando em http://localhost:${PORT}`);
  console.log(`📚 API disponível em http://localhost:${PORT}/api`);
});
