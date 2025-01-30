import axios from 'axios';
import type { RegisterData } from '@/type/IRegisterData';
import type { LoginData } from '@/type/ILoginData';

const API_URL = import.meta.env.VITE_API_URL;

export const register = async (data: RegisterData) => {

  try{
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response;
  }catch(error){
    throw error;
  }
}

export const login = async (data: LoginData) => {

  try{

    const response = await axios.post(`${API_URL}/auth/login`, data);

    if(response.status === 200){

      localStorage.setItem('access', response.data.jwtResponse.accessToken);
      localStorage.setItem('refresh', response.data.jwtResponse.refreshToken);
  
      return response;
    }

    return null;
    
  }catch(error){

    throw error;

  }
}