import { mapState, mapActions, mapGetters } from "vuex";

const Li = context => {
    const { props, children, listeners } = context;
    const isActive = props.activeInfo && props.activeInfo.isActive;
    return (
        <li
            role="presentation"
            style={{ cursor: "pointer" }}
            on-click={listeners.click}
            class={{ "active": isActive }}
        >
            {children}
        </li>
    );
};

export default {
    name: "navigation",
    mounted() {
        const list = Array.isArray(this.$children)? this.$children: [];
        this.setActives(list.map((item, index) => ({
            isActive: index === 0? true: false,
            path: item.$options.propsData.to
        })));
    },
    methods: {
        // 从 Vuex 里读取
        handleClick(idx) {
            this.setActives(this.actives.map((item, index) => {
                return {
                    ...item,
                    isActive: idx === index? true: false
                };
            }));
        },
        ...mapActions({
            setActives: "golbal/setActives"
        })
    },
    computed: {
        ...mapGetters({
            actives: "golbal/actives"
        })
    },
    render(createElement) {
        const { default: children } = this.$slots;
        const list = Array.isArray(children)? children: [];
        return (
            <div class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-heading">
                        <div class="navbar-brand">
                            Vue Router !
                        </div>
                    </div>
                    <ul class="nav navbar-nav">
                        {list.map((item, index) => (
                            <Li
                                key={index}
                                activeInfo={this.actives[index]}
                                on-click={() => this.handleClick(index)}
                            >
                                {item}
                            </Li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
};