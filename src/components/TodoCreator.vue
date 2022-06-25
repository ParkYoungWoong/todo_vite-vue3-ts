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

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useTodoStore } from '~/store/todo'

export default defineComponent({
  data() {
    return {
      title: ''
    }
  },
  computed: {
    ...mapStores(useTodoStore)
  },
  methods: {
    createTodo(event: KeyboardEvent | MouseEvent) {
      if ((event as KeyboardEvent).isComposing) return
      if (!this.title.trim()) return
      
      this.todoStore.createTodo(this.title)
      this.title = ''
    }
  }
})
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
