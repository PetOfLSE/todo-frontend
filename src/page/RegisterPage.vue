<template>
  <div class="container">
    <div class="register-element">
      <h1>회원가입</h1>
      <input type="text" class="input-field" placeholder="닉네임을 입력하세요." v-model="nickname">
      <input type="email" class="input-field" placeholder="이메일을 입력하세요." v-model="email">
      <input type="password" class="input-field" placeholder="비밀번호를 입력하세요." v-model="password">
      <button class="register-btn" @click="btnClick">회원가입</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { register } from '../api/AuthApi';
import type { RegisterData } from '../type/IRegisterData';

let nickname = ref('');
let email = ref('');
let password = ref('');

const btnClick = async (): Promise<void> => {

  const data: RegisterData = {
    nickname: nickname.value,
    email: email.value,
    password: password.value
  };

  try{
    const response = await register(data);
    alert('회원가입에 성공하였습니다.');
    window.location.href = '/login';
  }catch(error){
    alert('회원가입에 실패하였습니다.');
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

.register-element {
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

.register-btn {
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

.register-btn:hover {
  background-color: #2980b9;
}
</style>
