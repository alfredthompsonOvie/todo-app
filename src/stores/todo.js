import { defineStore } from "pinia";
import { computed, onMounted, ref, watch, watchEffect } from "vue";

export const useTodoStore = defineStore('todo', () => {
  console.log('pinia');
  const todos = ref([])
  // const allTodos = ref([])
  const activeTodos = ref([])
  const completedTodos = ref([])

  watchEffect(()=>activeTodos.value = todos.value.filter(tds => !tds.isCompleted))
  watchEffect(() => completedTodos.value = todos.value.filter(td => td.isCompleted))


  // watchEffect(() => todos.value.forEach(tds =>
  // { 
  //   if (!tds.isCompleted) {
  //     activeTodos.value.push(tds)
  //   }
  //  }))
  
  // watchEffect(() => {
  //   // active
  //   for (let i = 0; i < todos.value.length; i++) {
  //     console.log(todos.value[i]);
  //     if (!todos.value[i].isCompleted) {
  //       activeTodos.value.push(todos.value[i]);
  //     } else {
  //       continue;
  //     }
  //   }
  // })
  
  // watch(todos, () => {
  //   // active
  //   for (let todo of todos.value) {
  //     console.log(todo);
  //     if (!todo.isCompleted) {
  //       activeTodos.value.unshift(todo);
  //     } else {
  //       continue;
  //     }
  //   }
  // })
  

  const itemsLeftTodo = computed(()=>activeTodos.value.length)
  
  const deleteTodo = (todo) => {
    todos.value = todos.value.filter(td => td !== todo)
    console.log("store",todos.value);
  }
  const clearCompleted = () => {
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


  
		watch(
			todos,
			(newVal) => {
				localStorage.setItem("todos", JSON.stringify(newVal));
			},
			{ deep: true }
		);
		// watch(
		// 	activeTodos,
		// 	(newVal) => {
		// 		localStorage.setItem("active", JSON.stringify(newVal));
		// 	},
		// 	{ deep: true }
		// );
		watch(
			completedTodos,
			(newVal) => {
				localStorage.setItem("completed", JSON.stringify(newVal));
			},
			{ deep: true }
  );
  watchEffect(()=>localStorage.setItem("active", JSON.stringify(activeTodos)))

		onMounted(() => {
			todos.value = JSON.parse(localStorage.getItem("todos")) || [];
			activeTodos.value = JSON.parse(localStorage.getItem("active")) || [];
			completedTodos.value = JSON.parse(localStorage.getItem("completed")) || [];
		});
  /*
  
  actions: {
  updateRole(newRole) {
    this.currentRole = newRole
}
and the computed property in component:

const myComputed = computed({
  get: () => getElementsForCurrentRole.value,
  set: (val) => updateRole(val),
})
  */ 


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