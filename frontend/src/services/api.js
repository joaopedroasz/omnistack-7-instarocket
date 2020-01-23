import axios from 'axios';

// Criando conexão com a API:
const api = axios.create({
  baseURL: 'http://localhost:8000'
});

export default api;