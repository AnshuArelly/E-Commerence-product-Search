
import axios from 'axios';
import { getAuthToken } from './auth';

const API_URL = 'https://e-commerence-product-search.onrender.com/api';

export interface Message {
  content: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: Date;
}

export interface Chat {
  _id: string;
  title: string;
  lastMessage: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

const getHeaders = () => {
  const token = getAuthToken();
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
};

export const getChats = async (): Promise<Chat[]> => {
  const response = await axios.get(`${API_URL}/chats`, getHeaders());
  return response.data;
};

export const getChatById = async (chatId: string): Promise<Chat> => {
  const response = await axios.get(`${API_URL}/chats/${chatId}`, getHeaders());
  return response.data;
};

export const createChat = async (title?: string): Promise<Chat> => {
  const response = await axios.post(`${API_URL}/chats`, { title }, getHeaders());
  return response.data;
};

export const addMessage = async (chatId: string, content: string, sender: 'user' | 'assistant' | 'system' = 'user'): Promise<Message> => {
  const response = await axios.post(
    `${API_URL}/chats/${chatId}/messages`, 
    { content, sender }, 
    getHeaders()
  );
  return response.data;
};
