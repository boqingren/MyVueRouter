import { GOLBAL_SET_ACTIVES } from "./mutations.type";

export default {
    [GOLBAL_SET_ACTIVES](state, actives) {
        state.actives = actives;
    }
};