import axios from 'axios';

const API_URL = 'https://todo-backend-api-production.up.railway.app/api/todo';

export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

export const updateTodo = async (id, updatedTodo) => {
  await axios.put(`${API_URL}/${id}`, updatedTodo);
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
