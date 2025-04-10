
import axios from 'axios';

const API_URL = 'https://e-commerence-product-search.onrender.com/api';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password
  });
  
  return response.data;
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password
  });
  
  return response.data;
};

export const saveAuthData = (authData: AuthResponse) => {
  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', JSON.stringify(authData.user));
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getUser = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};
