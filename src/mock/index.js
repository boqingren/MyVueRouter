import config from "./config";
import initStorage from "./utils/initStorage";

class MockHttp {
    constructor({ proxy, delay = 500 }) {
        this.proxy = proxy;
        this.delay = delay;
    }

    get(url, options) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                const data = this.proxy[url](options);
                clearTimeout(timer);
                resolve(data);
            }, this.delay);
        });
    }

    post(url, options) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                const data = this.proxy[url](options);
                clearTimeout(timer);
                resolve(data);
            }, this.delay);
        });
    }
}

export default {
    init: initStorage,
    http: new MockHttp(config)
};