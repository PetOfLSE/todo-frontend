<template>
  <div class="container">
    <div class="todo-app">
      <header class="todo-header">
        <h1 class="todo-title">할 일 목록</h1>
        <button @click="logout" class="logout-btn">로그아웃</button>
      </header>

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
import type { Todo } from '../type/ITodo';
import type { TodoAddData } from '../type/ITodoAddData';
import { list, add, toggle, del } from '../api/TodoApi';
import { useRouter } from 'vue-router';
import { todoAddValidator } from '../util/ValidatorUtil';

const router = useRouter();
const todos = ref<Todo[]>([]);
const newTodo = ref('');

const todoList = async (): Promise<void> => {
  try {
    const response = await list();
    if (response && response.status === 200) {
      todos.value = response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(todoList);

const addTodo = async (): Promise<void> => {
  const data: TodoAddData = { content: newTodo.value };

  if(!todoAddValidator(data)){
    return;
  }

  try {
    const response = await add(data);
    if (response && response.status === 200) {
      todos.value.push({ content: response.data.content, completed: response.data.completed, id: response.data.id });
      newTodo.value = '';
    }
  } catch (error) {
    console.error(error);
  }
};

const toggleComplete = async (index: number) => {
  const todo = todos.value[index];
  try {
    const response = await toggle(todo.id);
    if (response && response.status === 200) {
      todos.value[index] = response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteTodo = async (index: number) => {
  const todo = todos.value[index];
  try {
    const response = await del(todo.id);
    if (response && response.status === 200) {
      todos.value = response.data.todo;
    }
  } catch (error) {
    console.error(error);
  }
};

const logout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  router.push('/login');
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

.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.todo-title {
  font-size: 24px;
  color: #333;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #c0392b;
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
