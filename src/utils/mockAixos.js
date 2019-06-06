import mockData from "../mockData";

class MockAixos {
    constructor({ proxy, delay = 500 }) {
        this.proxy = proxy;
        this.delay = delay;
    }

    get(url) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                const data = this.proxy[url];
                clearTimeout(timer);
                resolve(data);
            }, this.delay);
        });
    }

    post(url) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                const data = this.proxy[url];
                clearTimeout(timer);
                resolve(data);
            }, this.delay);
        });
    }
}

export default new MockAixos(mockData);