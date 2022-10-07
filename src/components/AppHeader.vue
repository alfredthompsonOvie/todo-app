<template>
	<header>
		<h1 class="title">Todo</h1>
		<button type="button" @click="changeTheme">
			<transition name="fade" mode="out-in">
				<span v-if="isDark">
					<img src="@/assets/icon-sun.svg" alt="" />
				</span>
				<span v-else>
					<img src="@/assets/icon-moon.svg" alt="" />
				</span>
			</transition>
		</button>
	</header>
</template>

<script>

export default {
  name: "AppHeader",
  props: {
		isDark: {
			type: Boolean,
			required: true
		} 
	},
  setup(props, context){
    function changeTheme(){
      context.emit("theme")
    }

    return {
      changeTheme
    }
  }
};
</script>

<style></style>
