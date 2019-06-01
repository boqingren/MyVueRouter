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
    data() {
        return {
            actives: []
        };
    },
    mounted() {
        const list = Array.isArray(this.$children)? this.$children: [];
        this.actives = list.map((item, index) => ({
            isActive: index === 0? true: false,
            path: item.$options.propsData.to
        }));
    },
    methods: {
        handleClick(idx) {
            this.actives = this.actives.map((item, index) => {
                return {
                    ...item,
                    isActive: idx === index? true: false
                };
            });
        }
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