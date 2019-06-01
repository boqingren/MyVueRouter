<template>
	<div class="container">
		<h1>This is About Page.</h1>
		<button class="btn btn-success go-home" @click="handleGoHome">
			Go Home
		</button>
		<button class="btn btn-default go-back" @click="handleGoBack">
			Go Back
		</button>
	</div>
</template>

<script>
	export default {
		name: "about",
		methods: {
			handleGoHome() {
				this.$router.push("/home");
			},
			handleGoBack() {
				this.$router.back();
			}
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
