import { GOLBAL_SET_ACTIVES } from "./mutations.type";

export default {
    setActives(context, actives) {
        context.commit(GOLBAL_SET_ACTIVES, actives);
    }
};