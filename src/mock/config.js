import userModel from "./model/user";

export default {
    delay: 500,
    proxy: {
        "/api/user/list": (url, options) => userModel.getList(url, options)
    }
};