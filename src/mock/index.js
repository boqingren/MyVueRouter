import config from "./config";
import initStorage from "./utils/initStorage";

class MockHttp {
    constructor({ proxy, delay = 500 }) {
        this.proxy = proxy;
        this.delay = delay;
    }

    request(url, options) {
        return (resolve, reject) => {
            const timer = setTimeout(() => {
                const data = this.proxy[url](options);
                clearTimeout(timer);
                resolve(data);
            }, this.delay);
        };
    }

    get(url, options) {
        return new Promise(this.request(url, options));
    }

    post(url, options) {
        return new Promise(this.request(url, options));
    }
}

export default {
    init: initStorage,
    http: new MockHttp(config)
};