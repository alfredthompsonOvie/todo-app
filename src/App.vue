<template>
	<div
		class="container"
		:class="isDark ? 'container--dark' : 'container--light'"
	>
		<div class="bg" :class="isDark ? 'bg--dark' : 'bg--light'"></div>
		<div class="todo__container">
			<!-- AppHeader -->
			<app-header :isDark="isDark" @theme="isDark = !isDark" />
			<!-- get todo -->
			<create-todo />
			<!-- display todos -->
			<!-- <todo-lists />  -->
			<TaskLists />
		</div>
	</div>
</template>

<script>
import { ref, watch } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import CreateTodo from "@/components/CreateTodo.vue";
// import TodoLists from "@/components/TodoLists.vue";
import TaskLists from "./components/TaskLists.vue";

export default {
	name: "App",
	components: {
		AppHeader,
		CreateTodo,
		// TodoLists,
		TaskLists
	},

	setup() {
		const isDark = ref(true);
		watch(isDark, (newVal) => {
      localStorage.setItem("theme", newVal)
		})
	
		// fires onCreated
		isDark.value = JSON.parse(localStorage.getItem('theme')) || true
		return {
			isDark,
		};
	},
};
</script>
