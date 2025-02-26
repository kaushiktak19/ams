import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apartments-0h6y.onrender.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
