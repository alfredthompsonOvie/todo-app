import { defineStore } from "pinia";
import { computed, ref, watch, watchEffect } from "vue";

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])
  // const allTodos = ref([])
  const activeTodos = ref([])
  const completedTodos = ref([])
  
  // watch(todos, () => todos.value = allTodos.value.map(tds => tds))
  
  // watch(todos, ()=> activeTodos.value = todos.value.filter(td => !td.isCompleted))
  // watch(todos, () => completedTodos.value = todos.value.filter(td => td.isCompleted))

  watchEffect(()=>activeTodos.value = todos.value.filter(tds => !tds.isCompleted))
  watchEffect(() => completedTodos.value = todos.value.filter(td => td.isCompleted))
  

  const itemsLeftTodo = computed(()=>activeTodos.value.length)
  
  const deleteTodo = (todo) => {
    todos.value = todos.value.filter(td => td !== todo)
    console.log("store",todos.value);
  }
  const clearCompleted = (todo) => {
    todos.value = todos.value.filter(td => !td.isCompleted)
  }
  const updateTodo = (todo) => {
    todos.value = todos.value.map(td => {
      if (td === todo) {
        td.isCompleted = !td.isCompleted
      }
      return td;
    })
  }
  const addTodo = (todo) => {
    todos.value.unshift(todo)
  }


  return {
    todos,
    activeTodos,
    completedTodos,
    deleteTodo,
    addTodo,
    itemsLeftTodo,
    updateTodo,
    clearCompleted,
  }
})