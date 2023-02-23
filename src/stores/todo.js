import { defineStore } from "pinia";
import { computed, onMounted, ref, watch, watchEffect } from "vue";

export const useTodoStore = defineStore('todo', () => {
  const allTodos = ref([])
  
  const todos = ref([])
  const activeTodos = ref([])
  const completedTodos = ref([])
  const itemsLeftTodo = computed(()=>activeTodos.value.length)



  
  const addTodo = (todoItem) => {
    console.log(todoItem);
    todos.value.unshift(todoItem);
    allTodos.value.unshift(todoItem);
  }
  
  const deleteTodo = (todo) => {
    todos.value = todos.value.filter(td => td !== todo)
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
  
  watchEffect(()=>activeTodos.value = todos.value.filter(tds => !tds.isCompleted))
  watchEffect(() => completedTodos.value = todos.value.filter(td => td.isCompleted))

  // --------------------new------------------
  watch(allTodos, (newVal) => {
    console.log("----------allTodos start---------");
    console.log(newVal);
    console.log("----------allTodos ends---------");
  })

  watch(todos, (newVal) => {
    console.log("----------todos start---------");
    console.log(newVal);
    console.log("----------todos end---------");
  })
  // --------------------new------------------

  
		// watch(
		// 	todos,
		// 	(newVal) => {
		// 		localStorage.setItem("todos", JSON.stringify(newVal));
		// 	},
		// 	{ deep: true }
		// );
		// watch(
		// 	activeTodos,
    //   (newVal) => {
    //     console.log("watch", newVal);
		// 		localStorage.setItem("active", JSON.stringify(newVal));
		// 	},
		// 	{ deep: true }
		// );
	// 	watch(
	// 		completedTodos,
	// 		(newVal) => {
	// 			localStorage.setItem("completed", JSON.stringify(newVal));
	// 		},
	// 		{ deep: true }
  // );

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