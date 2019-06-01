import HistoryRoute from "./HistoryRoute";

class MyVueRouter {
    // 使用 Vue.use 注册插件，会默认调用插件的 install 方法，对应到 Class 就是类的静态方法 install
    // 详情参考 Vue 官网：https://cn.vuejs.org/v2/guide/plugins.html
    static install(Vue, options) {                                                  // 第一个参数就是 Vue 这个大类，第二个参数是可配置的选项
        Vue.mixin({                                                                 // 全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。插件作者可以使用混入，向组件注入自定义的行为
            beforeCreate() {
                const vm = this;                                                    // 这里的 this 并不是 MyVueRouter 的实例，而是 Vue 的实例，而且 static 的方法是不能访问当前类的实例的
                MyVueRouter.mountOneRouterToAllVM(Vue, vm);
                MyVueRouter.defineRouter(vm);
                MyVueRouter.defineRoute(vm);
                MyVueRouter.registerRouterLink(Vue);
                MyVueRouter.registerRouterView(Vue);
            }
        });
    }

    // Vue 组件的渲染过程是：父组件 -> 子组件 -> 孙子组件
    static mountOneRouterToAllVM(Vue, vm) {                                         // 让所有的组件挂载同一个 MyVueRouter 的实例
        if (vm.$options && vm.$options.router) {                                    // 定位根组件：按照 Vue 组件的渲染过程，MyVueRouter 的实例是首次被注册到根组件里的，即 new Vue(...)
            vm._root = vm;                                                          // 把根组件挂载在根组件的 _root 属性上
            vm._router = vm.$options.router;                                        // 把 MyVueRouter 的实例 router 挂载在根组件的 _router 属性上
            MyVueRouter.subscribeHistoryChange(Vue, vm);
        } else {                                                                    // 子组件和孙子组件往上回溯父组件的 _root 和 _router 属性，将他们挂载在自身上
            vm._root = vm.$parent._root;                                            // 把 父组件的 _root 属性挂载在当前 Vue 的实例上
            // vm._router = vm.$parent.router;                                      // 把 父组件的 _router 属性挂载在当前 Vue 的实例上
        }
    }

    // 深度劫持
    // observer（订阅 history 中的 current 属性变化）
    // 如果 history 中的 current 属性变化，也会属性视图
    // vm.__history__ = vm._router.history 起别名
    static subscribeHistoryChange(Vue, vm) {
        Vue.util.defineReactive(vm, "__history__", vm._router.history);
    }

    static defineRouter(vm) {                                                       // 为所有 Vue 的实例定义一个叫做 "$router" 的属性
        Object.defineProperty(vm, "$router", {                                      // $router 本质是 MyVueRouter 的实例
            get() {
                return vm._root._router;
            }
        });
    }

    static defineRoute(vm) {                                                        // 为所有 Vue 的实例定义一个叫做 "$route" 的属性
        Object.defineProperty(vm, "$route", {
            get() {
                return {
                    current: vm._root._router.history.current                       // 当前路由所在的状态
                };
            }
        });
    }

    static registerRouterLink(Vue) {                                                // 注册全局组件 <router-link />
        Vue.component("router-link", {
            props: {
                to: String,
                tag: String,
                class: String
            },
            methods: {
                handleClick(myVueRouter, to) {
                    myVueRouter._root._router.history.current = to;
                }
            },
            render(createElement) {                                                 // 在 render 方法中 this 是一个特殊的 Proxy 对象，Proxy 对象下的 _self 属性只向当前的 Vue 组件
                const { tag, class: className, to, $slots, _self: self } = this;
                const { mode } = self._root._router;
                const Tag = tag || "a";
                // debugger;
                return (
                    <Tag
                        className={className}
                        href={mode === "hash"? `#${to}`: to}
                        on-click={() => this.handleClick(self, to)}
                    >
                        {$slots.default}
                    </Tag>
                );
            }
        });
    }

    static registerRouterView(Vue) {                                                // 注册全局组件 <router-view />
        Vue.component("router-view", {                                              // Vue 把插件注册完成再去渲染页面，也就是说 "window.onload" 事件会发生地比这一步晚
            render(createElement) {
                const { _self: self } = this;                                       // 在 render 方法中 this 是一个特殊的 Proxy 对象，Proxy 对象下的 _self 属性只向当前的 Vue 组件
                const { current } = self._root._router.history;                     // 获取当前的路由状态
                const { routesMap } = self._root._router;                           // 获取路由表
                return createElement(routesMap[current]);
            }
        });
    }

    constructor(options) {
        this.mode = options.mode || "hash";                                         // mode 默认不传为 "hash"
        this.routes = Array.isArray(options.routes)? options.routes: [];
        this.routesMap = this.createRoutesMap(this.routes);                         // 构造一个路径到组件的映射对象 { "/home": Home, "/about": About }
        this.history = new HistoryRoute();                                          // 构建一个用于存放当前路径的 this.history
        this.init();                                                                // 开始初始化操作
    }

    // 构造一个路径到组件的映射对象 { "/home": Home, "/about": About }
    createRoutesMap(routes) {
        return routes.reduce((memo, route) => {
            memo[route.path] = route.component;
            return memo;
        }, {});
    }

    init() {
        if (this.mode === "hash") this.handleHashMode();
        else this.handleHistoryMode();
    }

    handleHashMode() {
        window.location.hash = window.location.hash || "/";
        window.addEventListener("load", () => {                                     // 页面初始化的时候把当前的 hash 值保存到 this.history.current
            this.history.current = window.location.hash.slice(1);
        });
        window.addEventListener("hashchange", () => {                               // hash 值变化的时候把当前的 hash 值保存到 this.history.current
            this.history.current = window.location.hash.slice(1);
        });
    }

    handleHistoryMode() {
        window.location.pathname = window.location.pathname || "/";
        window.addEventListener("load", () => {                                     // 页面初始化的时候把当前的 pathname 保存到 this.history.current
            this.history.current = window.location.pathname;
        });
        window.addEventListener("popstate", () => {                                 // history 值变化的时候把当前的 pathname 保存到 this.history.current
            this.history.current = window.location.pathname;
        });
    }

    // TODO
    go() {
    }

    // TODO
    back() {
    }

    // TODO
    push() {
    }
};

export default MyVueRouter;