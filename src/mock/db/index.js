import storage from "../utils/storage";
import resData from "../utils/resData";

export default class DB {
    constructor(table) {
        !this.table && (this.table = table);
    }

    getListByMaxId(list, options) {
        const { maxId } = options;
        const arr = list.filter(item => item.id >= maxId);
        return resData.success({
            list: arr,
            count: arr.length
        });
    }

    getList(url, options) {
        const result = storage.getLocalStorage(this.table);
        const list = Array.isArray(result.list)? result.list: [];
        if (options.maxId) return this.getListByMaxId(list, options);
        return resData.success({
            list,
            count: list.length
        });
    }
};