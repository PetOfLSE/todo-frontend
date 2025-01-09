<template>
    <div class="container">
        <header>
            <p class="title">Todo-List</p>
        </header>
        <main>
            <div class="todo-list">
                <div class="todo-element">
                    <p class="todo-content">할 일 예시 1</p>
                    <input type="checkbox" class="todo-completed">
                </div>
            </div>
            
            <div class="todo-input-element">
                <input type="text" class="input-todo-content">
                <button class="add-todo-element"><i class="fa fa-arrow-up"></i></button>
                <button class="remove-todo-element"><i class="fa fa-trash"></i></button>
            </div>
            
        </main>
    </div>
</template>

<script setup lang="ts">

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
    width: 900px;
    height: 100px;
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
.todo-completed{
    margin-right: 50px;
}
.add-todo-element, .remove-todo-element{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid black;
}
</style>