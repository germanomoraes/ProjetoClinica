import api from './api.js';

const consultaService = {
  getAll: () => api.get('/consultas'),
  getById: (id) => api.get(`/consultas/${id}`),
  create: (data) => api.post('/consultas', data),
  update: (id, data) => api.put(`/consultas/${id}`, data),
  delete: (id) => api.delete(`/consultas/${id}`),
};

export default consultaService;