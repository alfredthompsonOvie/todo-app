<template>
	<div class="todo__outputContainer" v-auto-animate>
		<!-- ALL -->
		<template v-if="filteredBy === 'all'">
			<draggable v-model="todos" tag="ul" itemKey="todo" :animation="100">
				<template #item="{ element: todo }">
					<li class="todo__item">
						<div class="checkbox__container">
							<label for="checkbox" class="checkbox__label">
								<input
									type="checkbox"
									id="checkbox"
									name="checkbox"
									class="input__checkbox"
									:class="todo.isCompleted ? 'input__checkbox--completed' : ''"
									@change="handleChange($event, todo)"
									:checked="todo.isCompleted"
								/>
							</label>
						</div>
						<p
							class="todo__content"
							:class="todo.isCompleted ? 'todo__content--completed' : ''"
						>
							{{ todo.content }}
						</p>
						<button class="deleteBtn" @click.prevent="handleClick(todo)">
							<img src="../assets/icon-cross.svg" alt="delete todo" />
						</button>
					</li>
				</template>
			</draggable>
		</template>
		<!-- ACTIVE -->
		<template v-if="filteredBy === 'active'">
			<draggable
			v-model="activeTodos" 
			tag="ul" 
			itemKey="active" 
			:animation="100"
			@change="onDragChange"
			>
				<template #item="{ element: todo }">
					<li class="todo__item">
						<div class="checkbox__container">
							<label for="checkbox" class="checkbox__label">
								<input
									type="checkbox"
									id="checkbox"
									name="checkbox"
									class="input__checkbox"
									:class="todo.isCompleted ? 'input__checkbox--completed' : ''"
									@change="handleChange($event, todo)"
									:checked="todo.isCompleted"
								/>
							</label>
						</div>
						<p
							class="todo__content"
							:class="todo.isCompleted ? 'todo__content--completed' : ''"
						>
							{{ todo.content }}
						</p>
						<button class="deleteBtn" @click.prevent="handleClick(todo)">
							<img src="../assets/icon-cross.svg" alt="delete todo" />
						</button>
					</li>
				</template>
			</draggable>
		</template>
		<!-- COMPLETED-->
		<template v-if="filteredBy === 'completed'">
			<draggable v-model="completedTodos" tag="ul" itemKey="completed" :animation="100">
				<template #item="{ element: todo }">
					<li class="todo__item">
						<div class="checkbox__container">
							<label for="checkbox" class="checkbox__label">
								<input
									type="checkbox"
									id="checkbox"
									name="checkbox"
									class="input__checkbox"
									:class="todo.isCompleted ? 'input__checkbox--completed' : ''"
									@change="handleChange($event, todo)"
									:checked="todo.isCompleted"
								/>
							</label>
						</div>
						<p
							class="todo__content"
							:class="todo.isCompleted ? 'todo__content--completed' : ''"
						>
							{{ todo.content }}
						</p>
						<button class="deleteBtn" @click.prevent="handleClick(todo)">
							<img src="../assets/icon-cross.svg" alt="delete todo" />
						</button>
					</li>
				</template>
			</draggable>
		</template>

		<!--! controls -->
		<div class="controlsTab" v-if="todos.length">
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
import { onMounted, ref, watch } from "vue";
import { useTodoStore } from "../stores/todo";
import { storeToRefs } from "pinia";

import draggable from "vuedraggable";

const store = useTodoStore();
const { todos, activeTodos, completedTodos } = storeToRefs(store);
const filteredBy = ref("all");

const handleClearCompleted = () => {
	store.clearCompleted();
};

const handleChange = ($event, todo) => {
  store.updateTodo(todo)
}
const handleClick = (todo) => {
	store.deleteTodo(todo)
}
const onDragChange = () => {
	localStorage.setItem("active", JSON.stringify(activeTodos.value));
}
watch(
	filteredBy,
			(newVal) => {
				localStorage.setItem("filteredBy", JSON.stringify(newVal));
			},
			{ deep: true }
  );
watch(
	todos,
			() => {
				if (!todos.value.length) {
					filteredBy.value = "all"
				}
			},
			{ deep: true }
  );

		onMounted(() => {
			filteredBy.value = JSON.parse(localStorage.getItem("filteredBy")) || 'all';
		});
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
