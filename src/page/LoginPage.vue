<template>
  <div class="container">
    <div class="login-element">
      <h1>로그인</h1>
      <input type="email" class="input-field" placeholder="이메일을 입력하세요." v-model="email">
      <input type="password" class="input-field" placeholder="비밀번호를 입력하세요." v-model="password">
      <a href="/register" class="register-link">회원가입</a>
      <button class="login-btn" @click="btnClick">로그인</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { login } from '../api/AuthApi';
import axios from 'axios';
import type { LoginData } from '../type/ILoginData';

let email = ref('');
let password = ref('');

const btnClick = async (): Promise<void> => {

  const data: LoginData = {
    email: email.value,
    password: password.value
  };

  try{
    const response = await login(data);
    if(response && response.status === 200){
      alert('로그인에 성공하였습니다.');
      window.location.href = '/';
    }
  } catch(error){
    console.error(error);
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eef2f3;
  font-family: 'Roboto', sans-serif;
}

.login-element {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

h1 {
  font-size: 22px;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  height: 40px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 14px;
  background-color: #fafafa;
}

.input-field:focus {
  border-color: #3498db;
  outline: none;
}

.login-btn {
  width: 100%;
  height: 45px;
  background-color: #3498db;
  color: white;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.register-link {
  align-self: flex-start; 
  font-size: 14px;
  color: #3498db;
  text-decoration: none;
  margin-bottom: 15px;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
