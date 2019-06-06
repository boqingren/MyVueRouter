const initStorage = async () => {
    const result = localStorage.getItem("database");
    const database = JSON.parse(result);
    !database && localStorage.setItem("database", JSON.stringify({
        login: (await import("../model/login/data.json")).default,
        userList: (await import("../model/user/data.json")).default,
        prizeList: (await import("../model/prize/data.json")).default,
        expressList: (await import("../model/express/data.json")).default
    }));
};

export default initStorage;