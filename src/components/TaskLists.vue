<template>
	<div class="todo__outputContainer" v-auto-animate>
		<ul>
			<template v-if="filterBy === 'all'">
				<draggable
					v-model="store.todos"
					group="people"
					@start="drag = true"
					@end="drag = false"
					item-key="id"
          :animation="150"
          handle=".handle"
				>
					<template #item="{ element: task }">
            <TaskItem :task="task" />

					</template>
				</draggable>
			</template>
			<template v-if="filterBy === 'active'">
        <draggable
					v-model="store.activeTask"
					group="people"
					@start="drag = true"
					@end="drag = false"
					item-key="id"
          :animation="150"
          handle=".handle"
				>
					<template #item="{ element: task }">
            <TaskItem :task="task" />

					</template>
				</draggable>
				<!-- <TaskItem
					v-for="task in store.activeTask"
					:key="task.id"
					:task="task"
				/> -->
			</template>
			<template v-if="filterBy === 'completed'">
        <draggable
					v-model="store.completedTask"
					group="people"
					@start="drag = true"
					@end="drag = false"
					item-key="id"
          :animation="150"
          handle=".handle"
				>
					<template #item="{ element: task }">
            <TaskItem :task="task" />

					</template>
				</draggable>
				<!-- <TaskItem
					v-for="task in store.completedTask"
					:key="task.id"
					:task="task"
				/> -->
			</template>
		</ul>

		<!--! controls -->
		<!-- v-if="todos.length" -->
		<div class="controlsTab">
			<p class="item__left">{{ store.itemsLeftTodo }} left</p>
			<div class="main__controlTab tabComponents">
				<button
					type="button"
					class="allBtn"
					@click.prevent="filterBy = 'all'"
					:class="filterBy === 'all' ? 'isActive' : ''"
				>
					All
				</button>
				<button
					type="button"
					class="activeBtn"
					@click.prevent="filterBy = 'active'"
					:class="filterBy === 'active' ? 'isActive' : ''"
				>
					Active
				</button>
				<button
					type="button"
					class.prevent="completedBtn"
					@click="filterBy = 'completed'"
					:class="filterBy === 'completed' ? 'isActive' : ''"
				>
					Completed
				</button>
			</div>
			<button class="clear__completed">
				<!-- @click.prevent="handleClearCompleted()" -->
				Clear Completed
			</button>
		</div>
		<transition name="info">
			<!-- v-if="store.itemsLeftTodo >= 2" -->
			<p class="info">Drag and drop to reorder list</p>
		</transition>
	</div>
</template>

<script setup>
import TaskItem from "./TaskItem.vue";
import { useTasksStore } from "../stores/tasks";
import { ref } from "vue";
import draggable from "vuedraggable";

const store = useTasksStore();
// const tasks =
const drag = ref(false);
const filterBy = ref("all");
// const tasks = computed({
//   // getter
//   get() {
//     return store.todos
//   },
//   // setter
//   set(newValue) {
//     // Note: we are using destructuring assignment syntax here.

//   }
// })
</script>

<style scoped>

</style>
