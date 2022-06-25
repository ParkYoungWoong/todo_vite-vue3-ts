import { defineStore } from 'pinia'

interface Todo {
  id: string,
  title: string
  done: boolean
  createdAt: string
  updatedAt: string
  order?: number
}
interface Filters {
  done: 'all' | 'true' | 'false'
  sortBy: 'none' | 'newest' | 'oldest'
}
export const useTodoStore = defineStore('todo', {
  state: () => {
    const todo: Todo = {
      id: '',
      title: '',
      done: false,
      createdAt: '',
      updatedAt: ''
    }
    const todos: Todo[] = []
    const filters: Filters = {
      done: 'all',
      sortBy: 'none'
    }
    return {
      todo,
      todos,
      filters
    }
  },
  getters: {
    filteredTodos(state) {
      let filteredTodos = [...state.todos] // 얕은 복사
      // 표시
      if (state.filters.done !== 'all') {
        filteredTodos = state.todos.filter(todo => {
          switch (state.filters.done) {
            case 'true':
              return todo.done === true
            case 'false':
              return todo.done === false
            default:
              return true
          }
        })
      }
      // 정렬
      if (state.filters.sortBy !== 'none') {
        filteredTodos.sort((a, b) => {
          const aTime = new Date(a.createdAt).getTime()
          const bTime = new Date(b.createdAt).getTime()
          switch (state.filters.sortBy) {
            case 'newest':
              return bTime - aTime
            case 'oldest':
              return aTime - bTime
            default:
              return 0
          }
        })
      }

      return filteredTodos
    }
  },
  actions: {
    async readTodos() {
      this.todos = await request({
        method: 'GET'
      })
    },
    async createTodo(title: string) {
      await request({
        method: 'POST',
        body: {
          title
        }
      })
      this.readTodos()
    },
    async updateTodo(
      payload: { // Type!
        id: string
        title: string
        done: boolean
        order: number
      }
    ) {
      const { id, title, done, order } = payload
      // 갱신된 목록을 서버에서 가져오기까지 약간의 지연 시간이 있으므로, 로컬 데이터를 바로 업데이트!
      const currentTodo = this.todos.find(todo => todo.id === id)
      if (currentTodo) currentTodo.title = title

      await request({
        method: 'PUT',
        id,
        body: { 
          title,
          done,
          order
        }
      })
      this.readTodos()
    },
    async deleteTodo(id: string) {
      await request({
        method: 'DELETE',
        id
      })
      this.readTodos()
    },
    async reorderTodos(
      payload: { // Type!
        oldIndex: number, 
        newIndex: number 
      }
    ) {
      const { oldIndex, newIndex } = payload
      const todoIds = this.todos.map(todo => todo.id)
      const oldId = todoIds[oldIndex]
      todoIds.splice(oldIndex, 1)
      todoIds.splice(newIndex, 0, oldId)

      await request({
        method: 'PUT',
        id: 'reorder',
        body: {
          todoIds
        }
      })
      this.readTodos()
    }
  }
})

// Request function!
interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  id?: string
  body?: {
    [prop: string]: unknown
  }
}
async function request(options: RequestOptions) {
  const { id = '', method, body } = options
  const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`, {
    method,
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202204',
      'username': 'ParkYoungWoong'
    },
    body: JSON.stringify(body)
  })
  return res.json()
}
