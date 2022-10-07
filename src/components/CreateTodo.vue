<template>
	<div class="todo__inputContainer">
		<label for="todo"></label>
		<input
			type="text"
			placeholder="Create a new todo by pressing enter..."
			class="form__control"
			:value="modelValue"
			@keyup.enter="sendData"
		/>
		<span class="circle"></span>
	</div>
</template>

<script>
export default {
	name: "CreateTodo",
  
	props: ['modelValue'],
  
	setup(props, context){
    function sendData(){
      context.emit("update:modelValue", event.target.value)

      event.target.value = ''
    }

    return {
      sendData
    }
  }
};
</script>

<style></style>
