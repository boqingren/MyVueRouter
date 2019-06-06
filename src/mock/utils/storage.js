class Storage {
    isSetStorage(name) {
        return this.getLocalStorage(name);
    }

    setLocalStorage(name, data) {
        localStorage.setItem("database", JSON.stringify({
            [name]: data
        }));
    }

    getLocalStorage(name) {
        const result = localStorage.getItem("database");
        const database = JSON.parse(result);
        return database[name];
    }
}

export default new Storage();