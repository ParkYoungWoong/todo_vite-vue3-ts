<template>
  <div class="filters">
    <div
      v-for="value, key in filters"
      :key="key">
      {{ value.title }}: 
      <select
        v-model="todoStore.filters[key]"
        class="done">
        <option
          v-for="item in value.values"
          :key="item.name"
          :value="item.value">
          {{ item.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '~/store/todo'

const todoStore = useTodoStore()

const filters = {
  done: {
    title: '표시',
    values: [
      { name: '모두', value: 'all' },
      { name: '완료만', value: 'true' },
      { name: '미완료만', value: 'false' }
    ]
  },
  sortBy: {
    title: '정렬',
    values: [
      { name: '사용자지정 순', value: 'none' },
      { name: '최신 순', value: 'newest' },
      { name: '오래된 순', value: 'oldest' },
    ]
  }
}
</script>

<style scoped lang="scss">
.filters {
  padding: 10px 0;
  display: flex;
  justify-content: end;
  gap: 20px;
}
</style>
