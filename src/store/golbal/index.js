import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

// actions: {
//     initActives() {

//     },
//     setActives() {

//     }
// },
// getters: {
//     actives(state) {
//         return state.actives;
//     }
// }