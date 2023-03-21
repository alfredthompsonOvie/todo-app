<template>
	<li class="todo__item">
    <span ></span>
    <!-- <font-awesome-icon icon="fa-solid fa-user-secret" /> -->
    <font-awesome-icon 
    icon="fa-solid fa-grip-vertical"
    class="handle"
    />
		<div class="checkbox__container">
			<label for="checkbox" class="checkbox__label">
				<input
					type="checkbox"
					id="checkbox"
					name="checkbox"
					class="input__checkbox"
					:class="isCompleted ? 'input__checkbox--completed' : ''"
					@click.prevent="updateTask(task)"
          :checked="true"
          v-model="isCompleted"

          />
          
          <!-- :checked="task.isCompleted"
					v-model="task.isCompleted" -->
			</label>
		</div>
		<p
			class="todo__content"
			:class="task.isCompleted ? 'todo__content--completed' : ''"
		>
			{{ task.content }}
		</p>
		<button 
    class="deleteBtn" 
    @click.prevent="deleteTask(task)"
    >
			<img src="../assets/icon-cross.svg" alt="" />
		</button>
	</li>
</template>

<script setup>
// import { object } from 'yup';
import { ref, watch } from 'vue';
import { useTasksStore } from '../stores/tasks';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const store = useTasksStore();
const isCompleted = ref(null)
watch(props, ()=>{
  // if( props.)
  console.log(props.task.isCompleted);
  isCompleted.value = props.task.isCompleted
})


const updateTask = (task) => {
  store.updateTask(task);
}
const deleteTask = (task) => {
  store.deleteTask(task)
}

</script>

<style scoped>

.sortable-ghost {
  opacity: 0;
}
.sortable-drag {
  opacity: 1;
  visibility: visible;
  transform: rotate(1deg);
}
</style>
