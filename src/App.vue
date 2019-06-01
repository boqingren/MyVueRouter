<template>
	<div id="app">
		<router-link tag="div" class="home" to="/home">首页</router-link>
		<router-link tag="div" class="about" to="/about">关于</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: "app",
		components: {
		}
	};
</script>

<style>
	.home {
		color: red;
	}
</style>