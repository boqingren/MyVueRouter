<template>
	<div id="app">
		<Navigation>
			<router-link to="/home">首页</router-link>
			<router-link to="/about">关于</router-link>
		</Navigation>
		<router-view></router-view>
	</div>
</template>

<script>
	import Navigation from "./layout/Navigation.js";

	export default {
		name: "app",
		components: { Navigation }
	};
</script>