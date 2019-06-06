<template>
	<div class="container">
		<h1>This is Home Page.</h1>
		<button class="btn btn-success go-home" @click="handleGoAbout">
			Go About
		</button>
		<!-- <button class="btn btn-default go-back" @click="handleGoBack">
			Go Back
		</button> -->

		<div class="inputContainer">
			<label for="inputId">输入框最大的 ID 值：</label>
			<input
				id="inputId"
				type="text"
				placeholder="范围值：0 - 10"
				v-model.number="inputId"
			/>
		</div>

		<div class="table-responsive tableContainer">
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th class="text-center">id</th>
                        <th class="text-center">username</th>
                        <th class="text-center">nickname</th>
                        <th class="text-center">password</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in userList" :key="index">
                        <th class="text-center">{{user.id}}</th>
                        <th class="text-center">{{user.username}}</th>
                        <th class="text-center">{{user.nickname}}</th>
                        <th class="text-center">{{user.password}}</th>
                    </tr>
                </tbody>
            </table>
        </div>

		<div class="text-center" v-if="!userList.length">
			暂无数据 ……
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import mock from "../mock";
	const { http: mockHttp } = mock;

	export default {
		name: "home",
		data() {
			return {
				inputId: null,
				userList: []
			}
		},
		// 方法一：使用模拟的 mockHttp 获取数据
		async mounted() {
			const maxId = this.inputId? this.inputId: 0;
			const { data } = await mockHttp.post("/api/user/list", { maxId });
			this.userList = Array.isArray(data.list)? data.list: [];
		},

		// 方法二：使用模拟的 mockHttp 获取数据
		// mounted() {
		// 	mockHttp.post("/api/user/list").then(data => {
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
			}),
			userList() {
				return this.userList;
			}
		},
		watch: {
			async inputId(newVal, oldVal) {
				const maxId = newVal? newVal: 0
				if (newVal !== oldVal) {
					const { data } = await mockHttp.post("/api/user/list", { maxId });
					this.userList = Array.isArray(data.list)? data.list: [];
				}
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

	#inputId {
		text-align: center;
	}

	.inputContainer, .tableContainer {
		margin-top: 30px;
	}
</style>