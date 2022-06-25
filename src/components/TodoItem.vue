<template>
  <div 
    :class="{ focus: inFocusTitle }"
    class="todo-item">
    <span class="order-handle">:::</span>
    <input
      v-model="done"
      type="checkbox" />
    <input
      :value="title"
      type="text"
      class="title"
      @change="title = ($event.target as HTMLInputElement).value"
      @focus="inFocusTitle = true"
      @blur="inFocusTitle = false" />
    <div class="date">
      <div>생성일: {{ getDate(todo.createdAt) }}</div>
      <div>수정일: {{ getDate(todo.updatedAt) }}</div>
    </div>
    <button @click="todoStore.deleteTodo(todo.id)">
      삭제
    </button>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useTodoStore } from '~/store/todo'

export default defineComponent({
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      inFocusTitle: false
    }
  },
  computed: {
    ...mapStores(useTodoStore),
    title: {
      get() {
        return this.todo.title
      },
      set(title: string) {
        this.todoStore.updateTodo({
          id: this.todo.id,
          title,
          done: this.todo.done,
          order: this.todo.order
        })
      }
    },
    done: {
      get() {
        return this.todo.done
      },
      set(done: boolean) {
        this.todoStore.updateTodo({
          id: this.todo.id,
          title: this.todo.title,
          done,
          order: this.todo.order
        })
      }
    }
  },
  methods: {
    showTodoDetails() {
      this.$router.push(`/todos/${this.todo.id}`)
    },
    getDate(timestamp: string) {
      return dayjs(timestamp).format('MM월 YY일 HH:mm')
    }
  }
})
</script>

<style scoped lang="scss">
.todo-item {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid lightgray;
  display: flex;
  gap: 10px;
  align-items: center;
  &.focus {
    border-color: royalblue;
  }
  .order-handle {
    cursor: move;
  }
  input.title {
    flex-grow: 1;
    width: 100px;
    border: none;
    outline: none;
    font-size: 16px;
  }
  .date {
    font-size: 14px;
  }
}
</style>
