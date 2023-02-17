<template>

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
