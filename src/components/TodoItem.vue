<template>
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
          <!-- @click.prevent="updateTodo(todo)" -->
          <!-- v-model="todo.isCompleted" -->
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
  <!-- <transition-group tag="ul" name="td" appear mode="out-in">
  </transition-group> -->
	<!-- <draggable :list="todos" tag="ul" :animation="900">
	</draggable> -->
</template>

<script setup>
  // import draggable from 'vuedraggable';
import { ref, watchEffect } from 'vue';
import { useTodoStore } from '../stores/todo';

const store = useTodoStore();
const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
});
const todos = ref([])

// watchEffect(() => {
//   todos.value = [...props.todo]
// })

const handleChange = ($event, todo) => {
  // console.log($event.target.checked);
  // console.log(todo);
  store.updateTodo(todo)
}
const handleClick = (todo) => {
  console.log("todoItem",todo);
  store.deleteTodo(todo)
}
</script>

<style lang="scss" scoped></style>
