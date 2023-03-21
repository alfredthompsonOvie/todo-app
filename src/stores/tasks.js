import { defineStore } from "pinia";
import { computed,ref, watchEffect } from "vue";

export const useTasksStore = defineStore('task', () => {
  
  const todos = ref([]);
  const activeTask = ref([]);
  const completedTask = ref([])

  const itemsLeftTodo = computed(()=> activeTask.value.length)

  const addTask = (todoItem) => {

    // todos.value.unshift(todoItem);
    todos.value.unshift(todoItem);
  }

  const updateTask = (task) => {
    todos.value = todos.value.map(e => {
      if (e === task) {
        e.isCompleted = !e.isCompleted
      }
      return e;
    })
  }
  const deleteTask = (task) => {
    todos.value = todos.value.filter(e=> e !== task)
  }

  watchEffect(() => {
    activeTask.value = todos.value.filter(e=> !e.isCompleted)
  })
  watchEffect(() => {
    completedTask.value = todos.value.filter(e=> e.isCompleted)
    // if (todos.value.length) {
    // }
  })

  return {
    todos,
    activeTask,
    completedTask,

    itemsLeftTodo,

    addTask,
    updateTask,
    deleteTask
  }
})

