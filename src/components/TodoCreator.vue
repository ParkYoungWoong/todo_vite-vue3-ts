<template>
  <div class="todo-creator">
    <input
      :value="title"
      type="text"
      placeholder="할 일을 추가하세요!"
      @input="title = ($event.target as HTMLInputElement).value"
      @keydown.enter="createTodo" />
    <button @click="createTodo">
      추가
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '~/store/todo'

const todoStore = useTodoStore()

const title = ref('')

function createTodo(event: KeyboardEvent | MouseEvent) {
  if ((event as KeyboardEvent).isComposing) return
  if (!title.value.trim()) return
  
  todoStore.createTodo(title.value)
  title.value = ''
}
</script>

<style scoped lang="scss">
.todo-creator {
  display: flex;
  justify-content: center;
  gap: 10px;
  input {
    width: 400px;
  }
  button {
    flex-shrink: 0;
  }
}
</style>
