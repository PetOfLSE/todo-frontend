<template>
    <div class="container">
        <header>
            <p class="title">Todo-List</p>
        </header>
        <main>
            <div class="todo-list">
                <div class="todo-element" v-for="(element, index) in todoElement" :key="index">
                    <p class="todo-content" :style="{ textDecoration: element.isComplete ? 'line-through' : 'none'}">{{ element.content }}</p>
                    <div class="todo-content-helper">
                        <input type="checkbox" class="todo-completed" v-model="element.isComplete">
                        <button class="remove-todo-element" @click="removeTodo(index)"><i class="fa fa-trash"></i></button>
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
import { ref, reactive } from 'vue';

class Todo{
    content: string;
    isComplete: boolean;

    constructor(content: string){
        this.content = content;
        this.isComplete = false;
    }
}

let isCompleted = ref<boolean>(false);
let inputContent = ref<string>('');

let todoElement = reactive<Todo[]>([]);

const addTodo = () => {
    if(inputContent.value.trim() !== ''){
        todoElement.push(new Todo(inputContent.value));
        inputContent.value = '';
    }
}

const removeTodo = (index: number) => {
    todoElement.splice(index, 1);
}
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