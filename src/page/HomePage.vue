<template>
    <div class="container">
        <header>
            <p class="title">Todo-List</p>
        </header>
        <main>
            <div class="todo-list">
                <div class="todo-element" v-for="element in todoElement" :key="element.id.toString()">
                    <p class="todo-content" :style="{ textDecoration: element.completed ? 'line-through' : 'none'}">{{ element.content }}</p>
                    <div class="todo-content-helper">
                        <input type="checkbox" class="todo-completed" v-model="element.completed">
                        <button class="remove-todo-element" @click="removeTodo(element.id)"><i class="fa fa-trash"></i></button>
                    </div>
                </div>

            </div>
            
            <div class="todo-input-element">
                <input type="text" class="input-todo-content" v-model="inputContent" @keydown.enter="addTodo" placeholder="할일을 입력하세요.">
                <button class="add-todo-element" @click="addTodo"><i class="fa fa-arrow-up"></i></button>
            </div>
        
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import type Todo from '../types/Todo';
import type TodoAdd from '../types/TodoAdd';
import axios from 'axios';

let inputContent = ref<string>('');

let todoElement = reactive<Todo[]>([]);

const addTodo = async() => {
    
    if(inputContent.value.trim() !== ''){
        const todo: TodoAdd = {content: inputContent.value}
        
        try{
            const response = await axios.post('http://localhost:8080/api/v1/todo/add', todo);
            todoElement.push(response.data);
            inputContent.value = '';
        }catch(error){
            console.error(error);
        }
    }
}

const removeTodo = async (index: bigint) => {
    try{
        console.log(index);
        const response = await axios.delete('http://localhost:8080/api/v1/todo/remove', {
            params: {
                todoId: index
            }
        })

        const todoIndex: Number = todoElement.findIndex(todo => todo.id === index);
        todoElement.splice(Number(todoIndex), 1);
    }catch(error){
        console.error(error);
    }
}

onMounted(async () => {
    try{
        const response = await axios.get('http://localhost:8080/api/v1/todo/list');
        console.log(...response.data.content);
        todoElement.push(...response.data.content);
    }catch(error){
        console.error(error);
    }
})
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
}
header{
    width: 100%;
    height: 120px;
    background: black;
    color: white;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    align-items: center;
}
.title{
    margin: 10px;
}
main{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
    align-items: center;
}
.todo-list{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    flex-grow: 1;
}
.todo-element{
    width: 850px;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: lightgray;
    margin-bottom: 10px;
}
.todo-content{
    margin-left: 25px;
    font-size: 20px;
    font-weight: bold;
}
.input-todo-content{
    width: 700px;
    height: 50px;
}
.add-todo-element, .input-todo-content{
    margin-right: 10px;
}
.add-todo-element, .remove-todo-element{
    width: 30px;
    height: 30px;
}
.add-todo-element{
    border-radius: 50%;
    border: 1px solid black;
}
.remove-todo-element{
    margin: 20px;
    border: none;
    border-radius: 50%;
    background:black;
    color: white;
}
</style>