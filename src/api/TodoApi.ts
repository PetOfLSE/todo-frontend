import type { TodoAddData } from '@/type/ITodoAddData';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('access');

export const list = async () => {
  try{
    const response = await axios.get(`${API_URL}/todo/list`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(response.status === 200){
      return response;
    }

    return null;

  }catch(error){
    throw error;
  }
}

export const add = async (data: TodoAddData) => {

  if (data.content.trim() === '') {
    alert('입력란이 비어있습니다.');
    return;
  }

  try{
    const response = await axios.post(`${API_URL}/todo/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(response && response.status === 200){
      return response;
    }

    return null;

  }catch(error){
    throw error;
  }
}

export const toggle = async (todoId: number) => {
  try{
    const response = await axios.get(`${API_URL}/todo/complete`, {
      params: {
        todoId: todoId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(response && response.status === 200){
      return response;
    }

    return null;
  }catch(error){
    throw error;
  }
}

export const del = async (todoId: number) => {
  try{
    const response = await axios.delete(`${API_URL}/todo/delete`, {
      params: {
        todoId: todoId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(response && response.status === 200){
      return response;
    }

    return null;
  }catch(error){
    throw error;
  }
}