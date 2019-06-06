import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import initStorage from "./mockData/utils/initStorage";
import "bootstrap/dist/css/bootstrap.css";

initStorage();
Vue.config.productionTip = false;

new Vue({
    name: "main",
    router,
    store,
    render: createElement => createElement(App)
}).$mount("#app");