import userModel from "./model/user";

export default {
    delay: 500,
    proxy: {
        "/api/user/list": options => userModel.getList(options)
    }
};