<template>
  <div class="todo__outputContainer">
				<transition-group
					tag="ul"
					name="todo"
					appear
					mode="out-in"
					class="todo__list"
					v-if="filteredTodo.length"
				>
					<li class="todo__item" v-for="item in filteredTodo" :key="item.id">
						<div class="checkbox__container">
							<label for="checkbox" class="checkbox__label">
								<input
									type="checkbox"
									id="checkbox"
									name="checkbox"
									class="input__checkbox"
									:class="item.isCompleted ? 'input__checkbox--completed' : ''"
									@click="updateTodo(item)"
									v-model="item.isCompleted"
								/>
							</label>
						</div>
						<p
							class="todo__content"
							:class="item.isCompleted ? 'todo__content--completed' : ''"
						>
							{{ item.content }}
						</p>
						<button class="deleteBtn" @click="deleteTodo(item)">
							<img src="../assets/icon-cross.svg" alt="" />
						</button>
					</li>
					<!--! controls -->
					<div class="controlsTab" v-if="todos.length">
						<p class="item__left">{{ itemsLeft }}</p>
						<div class="main__controlTab tabComponents">
							<button
								class="allBtn"
								@click="filteredBy = 'all'"
								:class="filteredBy === 'all' ? 'isActive' : ''"
							>
								All
							</button>
							<button
								class="activeBtn"
								@click="filteredBy = 'active'"
								:class="filteredBy === 'active' ? 'isActive' : ''"
							>
								Active
							</button>
							<button
								class="completedBtn"
								@click="filteredBy = 'completed'"
								:class="filteredBy === 'completed' ? 'isActive' : ''"
							>
								Completed
							</button>
						</div>
						<button class="clear__completed" @click="clearCompletedTodo()">
							Clear Completed
						</button>
					</div>
				</transition-group>
				<transition name="controls">
				</transition>
			</div>
			<transition name="info">
				<p class="info" v-if="filteredTodo.length >= 2">
					Drag and drop to reorder list
				</p>
			</transition>
</template>

<script>
import { ref, computed, watch, } from "vue";

export default {
  name: "TodoLists",
  props: {
		todos: {
			type: Array,
			required: true
		}
	},
	emits: ["deleteItem", "clearCompleted"],

	setup(props, context){
		const filteredBy = ref('all')

		const filteredTodo = computed(()=>{
			if(filteredBy.value === "active") {
				return props.todos.filter(todo =>{
					return todo.isCompleted === false
				})
			}else if(filteredBy.value === "completed"){
				return props.todos.filter(todo => {
					return todo.isCompleted === true
				})
			}
			return props.todos
		})

		const itemsLeft = computed(()=>{
			let num = props.todos.filter((todo) => todo.isCompleted != true).length;
			
			if(num < 2) {
				return `${num} item left`
			} else {
				return `${num} items left`
			}
		})

		watch(props.todos, (newVal)=>{
			console.log(newVal);
		}, {deep: true})
		console.log(props.todos);

		function deleteTodo(item) {
			context.emit("deleteItem", item)
		}
		function updateTodo(item) {
			item.isCompleted = !item.isCompleted
		}
		function clearCompletedTodo(){
			context.emit("clearCompleted")
		}

		return {
			filteredTodo,
			itemsLeft,
			filteredBy,
			deleteTodo,
			updateTodo,
			clearCompletedTodo
		}
	}
}
</script>

<style>

</style>