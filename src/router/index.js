import Vue from "vue";
import MyVueRouter from "../myVueRouter";
import routes from "./routes";

// 1. 在全局注册 <router-link /> 用于跳转路径、注册 <router-view /> 用于显示内容
Vue.use(MyVueRouter);

// 2. 实例化路由 router
export default new MyVueRouter({
    mode: "hash",                               // mode 分别可以为带 "#" 的 hash 模式和不带 "#" 的 history 模式
    routes
});