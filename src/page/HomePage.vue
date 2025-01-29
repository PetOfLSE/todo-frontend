<template>
  <div class="container">
    <div class="todo-app">
      <h1 class="todo-title">할 일 목록</h1>

      <div class="todo-input">
        <input
          type="text"
          v-model="newTodo"
          placeholder="할 일을 입력하세요"
          @keyup.enter="addTodo"
        />
        <button @click="addTodo" class="add-btn">추가</button>
      </div>

      <ul class="todo-list">
        <li v-for="(todo, index) in todos" :key="index" class="todo-item">
          <span :class="{ completed: todo.completed }" @click="toggleComplete(index)">
            {{ todo.content }}
          </span>
          <button @click="deleteTodo(index)" class="delete-btn">삭제</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Todo } from '../type/Todo';
import axios from 'axios';

const token = localStorage.getItem('access');

const todos = ref<Todo[]>([]);

const todoList = async (): Promise<void> => {
  try{
    const response = await axios.get('http://localhost:8080/api/v1/todo/list', {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });

    todos.value = response.data
  }catch(error){
    console.error(error);
  }
}

onMounted(todoList);

const newTodo = ref('');

const addTodo = async (): Promise<void> => {
  if (newTodo.value.trim() === '') {
    alert('입력란이 비어있습니다.');
    return;
  }

  const data = {
    content: newTodo.value
  };

  try{
    const response = await axios.post(
      'http://localhost:8080/api/v1/todo/add', 
      data,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(response.data);

    todos.value.push({ content: response.data.content, completed: response.data.completed, id: response.data.id});
    newTodo.value = ''; 

  }catch(error){
    console.error(error);
  }
};

const toggleComplete = async (index: number) => {
  const todo = todos.value[index];
  const todoId = todo.id;

  try{
    const response = await axios.get(
      'http://localhost:8080/api/v1/todo/complete', 
      {
        params: {
          todoId: todoId
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    todos.value[index] = response.data;
  }catch(error){
    console.error(error);
  }
};

const deleteTodo = async (index: number) => {
  const todo = todos.value[index];
  const todoId = todo.id;

  try{
    const response = await axios.delete('http://localhost:8080/api/v1/todo/delete', {
      params: {
        todoId: todoId
      },
      headers:{
        Authorization: `Bearer ${token}`
      }
    });

    if(response.status === 200){
      console.log(response.data.todo);
      todos.value = response.data.todo;
    }
  }catch(error){
    console.error(error);
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  font-family: 'Arial', sans-serif;
}

.todo-app {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.todo-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.todo-input {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.todo-input input {
  width: 80%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.todo-input button {
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.todo-input button:hover {
  background-color: #2980b9;
}

.todo-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-item span {
  cursor: pointer;
  font-size: 16px;
  color: #333;
}

.todo-item span.completed {
  text-decoration: line-through;
  color: #aaa;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>
