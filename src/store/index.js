import Vue from "vue";
import Vuex from "vuex";
import golbal from "./golbal";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        golbal
    }
});