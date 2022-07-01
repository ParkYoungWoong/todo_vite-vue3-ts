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

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '~/store/todo'

const router = useRouter()
const todoStore = useTodoStore()

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const inFocusTitle = ref(false)

const title = computed({
  get() {
    return props.todo.title
  },
  set(title: string) {
    todoStore.updateTodo({
      id: props.todo.id,
      title,
      done: props.todo.done,
      order: props.todo.order
    })
  }
})
const done = computed({
  get() {
    return props.todo.done
  },
  set(done: boolean) {
    todoStore.updateTodo({
      id: props.todo.id,
      title: props.todo.title,
      done,
      order: props.todo.order
    })
  }
})

function showTodoDetails() {
  router.push(`/todos/${props.todo.id}`)
}
function getDate(timestamp: string) {
  return dayjs(timestamp).format('MM월 YY일 HH:mm')
}
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
