export default {
    proxy: {
        "/api/user/list": ({ maxId }) => {
            const result = require("./data/userList.json");
            return {
                ...result,
                data: {
                    ...result.data,
                    list: result.data.list.filter(item => {
                        return item.id >= maxId;
                    })
                }
            };
        }
    },
    delay: 500
};