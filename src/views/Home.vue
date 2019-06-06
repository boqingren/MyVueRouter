<template>
	<div class="container">
		<h1>This is Home Page.</h1>
		<button class="btn btn-success go-home" @click="handleGoAbout">
			Go About
		</button>
		<!-- <button class="btn btn-default go-back" @click="handleGoBack">
			Go Back
		</button> -->
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import mockAixos from "../utils/mockAixos";

	export default {
		name: "home",
		// 方法一：使用模拟的 mockAixos 获取数据
		async mounted() {
			const data = await mockAixos.post("/api/user/list", { maxId: 75067 });
			console.log("data: ", data);
		},

		// 方法二：使用模拟的 mockAixos 获取数据
		// mounted() {
		// 	mockAixos.post("/api/user/list").then(data => {
		// 		console.log("data: ", data);
		// 	});
		// },
		methods: {
			handleGoAbout() {
				const path = "/about";
				this.$router.push(path);
				this.handleGoPageActive(path);
			},
			// handleGoBack() {
			// 	this.$router.back();
			// 	const path = this.$router.mode === "hash"? window.location.hash.slice(1): window.location.pathname;
			// 	console.log(`mome page path: ${path}`);
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
	.go-about {
		margin-right: 10px;
	}

	.go-back {
		margin-left: 10px;
	}
</style>