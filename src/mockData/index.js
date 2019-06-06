module.exports = {
    proxy: {
        "/api/user/list": require("./data/userList.json")
    },
    delay: 500
};