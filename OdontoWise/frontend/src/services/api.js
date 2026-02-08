import axios from 'axios';

const API_BASE = '/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: {}
});

// Auth API
export const authApi = {
  login: (username, password) => 
    api.post('/auth/login', { username, password }),
  getUsers: () => 
    api.get('/auth/users')
};

// Patients API
export const patientApi = {
  getAll: () => 
    api.get('/patients'),
  getById: (id) => 
    api.get(`/patients/${id}`),
  create: (data) => 
    api.post('/patients', data),
  update: (id, data) => 
    api.put(`/patients/${id}`, data),
  delete: (id) => 
    api.delete(`/patients/${id}`)
};

// Appointments API
export const appointmentApi = {
  getAll: () => 
    api.get('/appointments'),
  getById: (id) => 
    api.get(`/appointments/${id}`),
  create: (data) => 
    api.post('/appointments', data),
  update: (id, data) => 
    api.put(`/appointments/${id}`, data),
  delete: (id) => 
    api.delete(`/appointments/${id}`),
  getStats: () => 
    api.get('/appointments/stats')
};

export default { authApi, patientApi, appointmentApi };
