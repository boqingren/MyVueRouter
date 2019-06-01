<template>
	<div class="container">
		<h1>This is Home Page.</h1>
		<button class="btn btn-success go-home" @click="handleGoAbout">
			Go About
		</button>
		<button class="btn btn-default go-back" @click="handleGoBack">
			Go Back
		</button>
	</div>
</template>

<script>
	export default {
		name: "home",
		methods: {
			handleGoAbout() {
				this.$router.push("/about");
			},
			handleGoBack() {
				this.$router.back();
			}
		}
	};
</script>

<style scoped>
	.go-about {
		margin-right: 10px;
	}

	.go-back {
		margin-left: 10px;
	}
</style>