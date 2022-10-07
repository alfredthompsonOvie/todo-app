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
				<create-todo v-model="todoItem" />
			<!-- todo output -->
			<todo-lists
			:todos="todos" 
			@deleteItem="deleteTodo"
			@clearCompleted="clearCompletedTodo"/>
			<!-- <test-draggable  class="test"/> -->
			<!-- <drag-n-drop /> -->
		</div>
	</div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import CreateTodo from "@/components/CreateTodo.vue";
import TodoLists from "@/components/TodoLists.vue";
// import DragNDrop from "@/components/DragNDrop.vue";
// import TestDraggable from "./components/TestDraggable.vue";
export default {
	name: "App",
	components: {
		AppHeader,
		CreateTodo,
		TodoLists,
		// DragNDrop
		// TestDraggable,
	},

	setup() {
		const isDark = ref(true);
		const todoItem = ref("");
		const todos = ref([]);

		watch(todoItem, (newVal) => {
			if (newVal !== "") {
				let todo = {
					content: todoItem.value,
					isCompleted: false,
					id: UID(),
				};

				todos.value.unshift(todo);
				todoItem.value = "";
			}
		});

		watch(
			todos,
			(newVal) => {
				localStorage.setItem("todos", JSON.stringify(newVal));
			},
			{ deep: true }
		);

		onMounted(() => {
			todos.value = JSON.parse(localStorage.getItem("todos")) || [];
		});

		function deleteTodo(item) {
			todos.value = todos.value.filter((todo) => {
				return todo !== item;
			});
		}
		function clearCompletedTodo() {
			todos.value = todos.value.filter((todo) => {
				return todo.isCompleted !== true;
			});
		}
		function UID() {
			return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
				(
					c ^
					(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
				).toString(16)
			);
		}
		return {
			isDark,
			todoItem,
			todos,
			deleteTodo,
			clearCompletedTodo,
		};
	},
};
</script>
