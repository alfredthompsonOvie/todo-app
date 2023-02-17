<template>
	<div class="todo__inputContainer">
		<!-- <span>{{ errorMessage }}</span> -->
		<form @submit="onSubmit">
			<label for="todo"></label>
			<input
				type="text"
				name="todo"
				id="todo"
				placeholder="Create a new todo by pressing enter..."
				class="form__control"
				:class="{ error: errors.todo }"
				v-model="todo"
				@keyup.enter="sendData"
			/>
			<span class="circle"></span>
		</form>
	</div>
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import { object, string } from "yup";
import { useTodoStore } from "../stores/todo";

const store = useTodoStore();

const schema = object({
	todo: string().required(),
});

const { handleSubmit, errors, resetForm } = useForm({
	validationSchema: schema,
});

const { value: todo } = useField("todo");
function UID() {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
		(
			c ^
			(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
		).toString(16)
	);
}

const onSubmit = handleSubmit((values) => {
	let todo = {
		content: values.todo.trim(),
		isCompleted: false,
		id: UID(),
	};
	store.addTodo(todo);
	resetForm();
});

// export default {
// 	name: "CreateTodo",

// 	props: ['modelValue'],

// 	setup(props, context){
//     function sendData(){
//       context.emit("update:modelValue", event.target.value)

//       event.target.value = ''
//     }

//     return {
//       sendData
//     }
//   }
// };

// defineProps({
// 	modelValue: String,
// })
// const emit = defineEmits(['update:modelValue'])

// const onSubmit = () => {
// 	emit('update:modelValue', event.target.value)
// }

// const sendData = () =>{
//       // emit("update:modelValue", event.target.value)
//       // event.target.value = ''
//     }
</script>

<style>
.error {
	border: 1px solid red;
	transform: translate3d(0, 0, 0);
	animation: buzz 0.82s cubic-bezier(.36, .07, .19, .97) both;
	perspective: 1000px;
}

@keyframes buzz {
	10%, 90% {

		transform: translate3d(-1px, 0, 0);
	}
	20%, 80% {
		transform: translate3d(2px, 0, 0);
	}
	30%, 50%, 70% {
		transform: translate3d(-4px, 0, 0);
	}
	40%, 60% {
		transform: translate3d(4px, 0, 0);
	}
}
</style>
