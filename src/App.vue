<template>
	<div
		class="container"
		:class="isDark ? 'container--dark' : 'container--light'"
	>
		<div class="bg" :class="isDark ? 'bg--dark' : 'bg--light'"></div>
		<div class="todo__container">
			<!-- AppHeader -->
			<app-header :isDark="isDark" @theme="isDark = !isDark" />
			<!-- todo input -->
			<!-- <create-todo v-model="todoItem" /> -->
			<create-todo />
			<!-- todo output -->
			<todo-lists /> 
			<!-- <app-todo-list 
			:todos="todos"
			@deleteItem="deleteTodo"
			@clearCompleted="clearCompletedTodo"
			/> -->
			<!-- @updateTodoList="updateTodoList" -->
		</div>
	</div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import CreateTodo from "@/components/CreateTodo.vue";
import TodoLists from "@/components/TodoLists.vue";
// import AppTodoList from "./components/AppTodoList.vue";

export default {
	name: "App",
	components: {
		AppHeader,
		CreateTodo,
		TodoLists,
		// AppTodoList,
	},

	setup() {
		const isDark = ref(true);
		// const todoItem = ref("");
		// const todos = ref([]);

		// const getTodoItem = (v) => todoItem.value = v

		// watch(todoItem, () => {
		// 	let todo = {
		// 			content: todoItem.value,
		// 			isCompleted: false,
		// 			id: UID(),
		// 		};

		// 		todos.value.unshift(todo);
		// })


		// watch(
		// 	todos,
		// 	(newVal) => {
		// 		localStorage.setItem("todos", JSON.stringify(newVal));
		// 	},
		// 	{ deep: true }
		// );

		// onMounted(() => {
		// 	todos.value = JSON.parse(localStorage.getItem("todos")) || [];
		// });
		onMounted(()=> console.log('app'))

		// function deleteTodo(item) {
		// 	todos.value = todos.value.filter((todo) => {
		// 		return todo !== item;
		// 	});
		// }
		// function clearCompletedTodo() {
		// 	todos.value = todos.value.filter((todo) => {
		// 		return todo.isCompleted !== true;
		// 	});
		// }

		// function updateTodoList(lists) {
		// 	todos.value = [];
		// 	todos.value = lists
		// 	console.log(lists);
		// }

		return {
			isDark,
			// todoItem,
			// todos,
			// deleteTodo,
			// clearCompletedTodo,
			// getTodoItem,
			// updateTodoList,
		};
	},
};
</script>
