import { GOLBAL_SET_ACTIVES } from "./mutations.type";

export default {
    setActives(context, actives) {
        context.commit(GOLBAL_SET_ACTIVES, actives);
    },
    handleGoPageActive({ state, commit }, path) {
        commit(GOLBAL_SET_ACTIVES, state.actives.map(item => ({
            ...item,
            isActive: item.path === path? true: false
        })));
    }
};