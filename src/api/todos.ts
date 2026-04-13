import axios from 'axios';
import type { Todo } from '../types/todo';
const API_URL = 'https://server-1-dpje.onrender.com';



export interface FetchTodosResponse {
  data: Todo[];
  total: number;
  page: number;
  limit: number;
}


export const fetchTodos = async (
  page: number,
  limit: number,
  filter: 'all' | 'active' | 'completed' = 'all'
): Promise<FetchTodosResponse> => {
  const response = await axios.get(`${API_URL}/todos`, {
    params: { page, limit, filter },
  });
  return response.data;
};

export const createTodo = async (text: string): Promise<Todo> => {
  const response = await axios.post(`${API_URL}/todos`, { text });
  return response.data;
};

export const updateTodo = async (id: number, text: string, completed: boolean): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/todos/${id}`, { text, completed });
  return response.data;
};


export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/todos/${id}`);
};


export const toggleTodo = async (id: number): Promise<Todo> => {
  const response = await axios.patch(`${API_URL}/todos/${id}/toggle`);
  return response.data;
};