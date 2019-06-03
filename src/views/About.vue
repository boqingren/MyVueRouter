<template>
	<div class="container">
		<h1>This is About Page.</h1>
		<button class="btn btn-success go-home" @click="handleGoHome">
			Go Home
		</button>
		<!-- <button class="btn btn-default go-back" @click="handleGoBack">
			Go Back
		</button> -->
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";

	export default {
		name: "about",
		methods: {
			handleGoHome() {
				const path = "/home";
				this.$router.push(path);
				this.handleGoPageActive(path);
			},
			// handleGoBack() {
			// 	this.$router.back();
			// 	const path = this.$router.mode === "hash"? window.location.hash.slice(1): window.location.pathname;
			// 	console.log(`about page path: ${path}`);
			// 	this.handleGoPageActive(path);
			// },
			...mapActions({
				setActives: "golbal/setActives",
				handleGoPageActive: "golbal/handleGoPageActive"
			})
		},
		computed: {
			...mapGetters({
				actives: "golbal/actives"
			})
    	}
	};
</script>

<style scoped>
	.go-home {
		margin-right: 10px;
	}

	.go-back {
		margin-left: 10px;
	}
</style>
