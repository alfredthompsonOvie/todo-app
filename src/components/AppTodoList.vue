<template>

	<div class="todo__outputContainer">
		<draggable 
		v-model="lists" 
		tag="ul" 
		:animation="400" 
		item-key="list"
		@change="log"
		>
		<template #item="{ element: item }">
			<li class="todo__item">
				<div class="checkbox__container">
					<label for="checkbox" class="checkbox__label">
						<input
							type="checkbox"
							id="checkbox"
							name="checkbox"
							class="input__checkbox"
							:class="item.isCompleted ? 'input__checkbox--completed' : ''"
							@click.prevent="updateTodo(item)"
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
		</template>
		</draggable>
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
	</div>
</template>

<script>
import { ref, watchEffect, computed, watch } from "vue";
import draggable from "vuedraggable";
export default {
	components: {
		draggable,
	},
	props: {
		todos: {
			type: Array,
			required: true,
		},
	},
	emits: [ "deleteItem", "clearCompleted", "updateTodoList" ],
	setup(props, { emit }) {

		// const lists = computed(() => {
		//   return [...props.todos]
		// })
    const filteredBy = ref("all");
		const lists = ref([]);
		const duplicateList = ref([]);

		watchEffect(() => {
			duplicateList.value = [...props.todos];
		});


		// watch(lists, () => {
		// 	emit("updateTodoList", lists.value);
		// }, { deep: true });

    watch(filteredBy, (nV) => {
      if (nV === "active") {
        lists.value = duplicateList.value.filter(l => !l.isCompleted);
        return;
      }
      if (nV === "completed") {
        lists.value = duplicateList.value.filter(l => l.isCompleted);
        return;
      }
      if (nV === "all") {
        return lists.value = duplicateList.value;
      }
      
    })

    const itemsLeft = computed(() => {
			let num = props.todos.filter((todo) => todo.isCompleted != true).length;

			if (num < 2) {
				return `${num} item left`;
			} else {
				return `${num} items left`;
			}
    });

    function deleteTodo(item) {
			emit("deleteItem", item);
		}
		function updateTodo(item) {
			item.isCompleted = !item.isCompleted;
		}
		function clearCompletedTodo() {
			emit("clearCompleted");
		}
		function log(event) {
			console.log(event);
			// console.log(event.moved.oldIndex);
			// console.log(event.moved.element.content);
			console.log(lists.value);
		}

		return {
      lists,
      filteredBy,
      itemsLeft,
      clearCompletedTodo,
      updateTodo,
			deleteTodo,
			log,
		};
	},
};
</script>

<style scoped>
li {
	cursor: pointer;
}
.fade-enter-from, .fade-leave-to {
	opacity: 0;
}
.fade-enter-active, .fade-leave-active {
	transition: all 3s linear;
}
</style>
