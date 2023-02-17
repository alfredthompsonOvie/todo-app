<template>
	<div class="todo__outputContainer" v-auto-animate>
	<!-- ------------------------------------------------- -->
			<!-- ALL -->
			<template v-if="filteredBy === 'all'">
				<draggable :list="todoList" tag="ul" :animation="900">
					<TodoItem
					v-for="item in todoList"
					:key="item.content"
					:todo="item"
					/>
				</draggable>
				<!-- <TodoItem :todoList="todoList"/> -->
			</template>
			<!-- ACTIVE -->
			<template v-if="filteredBy === 'active'">
				<!-- <TodoItem :todoList="active"/> -->
				<TodoItem
				v-for="item in active"
				:key="item.content"
				:todo="item"
				/>
			</template>
			<!-- COMPLETED-->
			<template v-if="filteredBy === 'completed'">
				<!-- <TodoItem :todoList="completed"/> -->
				<TodoItem
				v-for="item in completed"
				:key="item.content"
				:todo="item"
				/>
			</template>
	<!-- ------------------------------------------------- -->
	<!-- ------------------------------------------------- -->
	<!-- ------------------------------------------------- -->
		<!--! controls -->
		<div class="controlsTab" v-if="todoList.length">
			<p class="item__left">{{ store.itemsLeftTodo }} left</p>
			<div class="main__controlTab tabComponents">
				<button
				type="button"
					class="allBtn"
					@click.prevent="filteredBy = 'all'"
					:class="filteredBy === 'all' ? 'isActive' : ''"
				>
					All
				</button>
				<button
				type="button"
					class="activeBtn"
					@click.prevent="filteredBy = 'active'"
					:class="filteredBy === 'active' ? 'isActive' : ''"
				>
					Active
				</button>
				<button
				type="button"
					class.prevent="completedBtn"
					@click="filteredBy = 'completed'"
					:class="filteredBy === 'completed' ? 'isActive' : ''"
				>
					Completed
				</button>
			</div>
			<button class="clear__completed" @click.prevent="handleClearCompleted()">
				Clear Completed
			</button>
		</div>
	</div>
	<transition name="info">
		<p class="info" v-if="store.itemsLeftTodo >= 2">
			Drag and drop to reorder list
		</p>
	</transition>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import TodoItem from "./TodoItem.vue";
import { useTodoStore } from "../stores/todo";
import { storeToRefs } from "pinia";
// import { VueDraggableNext } from "vue-draggable-next";
import draggable from 'vuedraggable';

const store = useTodoStore();
const { todos, activeTodos, completedTodos } = storeToRefs(store)
const filteredBy = ref('all')

const todoList = ref(todos)

const active = ref(activeTodos)
const completed = ref(completedTodos)

const handleClearCompleted = () => {
	store.clearCompleted()
}





// export default {
// 	name: "TodoLists",
// 	components: {
// 		draggable: VueDraggableNext,
// 	},
// 	props: {
// 		todos: {
// 			type: Array,
// 			required: true,
// 		},
// 	},
// 	emits: ["deleteItem", "clearCompleted"],

// 	data() {
// 		return {
// 			enabled: true,
// 			dragging: false,
// 		};
// 	},

// 	setup(props, context) {
// 		const filteredBy = ref("all");

// 		const filteredTodo = computed(() => {
// 			if (filteredBy.value === "active") {
// 				return props.todos.filter((todo) => {
// 					return todo.isCompleted === false;
// 				});
// 			} else if (filteredBy.value === "completed") {
// 				return props.todos.filter((todo) => {
// 					return todo.isCompleted === true;
// 				});
// 			}
// 			return props.todos;
// 		});

// 		const itemsLeft = computed(() => {
// 			let num = props.todos.filter((todo) => todo.isCompleted != true).length;

// 			if (num < 2) {
// 				return `${num} item left`;
// 			} else {
// 				return `${num} items left`;
// 			}
// 		});

// 		watch(
// 			props.todos,
// 			(newVal) => {
// 				console.log(newVal);
// 			},
// 			{ deep: true }
// 		);
// 		console.log(props.todos);

// 		function deleteTodo(item) {
// 			context.emit("deleteItem", item);
// 		}
// 		function updateTodo(item) {
// 			item.isCompleted = !item.isCompleted;
// 		}
// 		function clearCompletedTodo() {
// 			context.emit("clearCompleted");
// 		}

// 		return {
// 			filteredTodo,
// 			itemsLeft,
// 			filteredBy,
// 			deleteTodo,
// 			updateTodo,
// 			clearCompletedTodo,
// 		};
// 	},
// };
</script>

<style></style>
