import axios from 'axios';

const api = axios.create({
  baseURL: 'http://zssn-backend-example.herokuapp.com/api',
});

export default api; 