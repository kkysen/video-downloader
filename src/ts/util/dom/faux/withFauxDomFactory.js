"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const InjectedFauxDom = {
    new(FauxComponent, setState) {
        const connectedFauxDom = new Map();
        let animateUntil = 0;
        let drawTimeout = 0;
        let animationInterval = 0;
        const isAnimating = () => animationInterval > 0;
        const stopAnimating = () => {
            clearInterval(animationInterval);
            animationInterval = 0;
            animateUntil = 0;
        };
        const stopDrawing = () => {
            clearTimeout(drawTimeout);
            drawTimeout = 0;
        };
        const draw = () => {
            const vdom = connectedFauxDom.map(e => e.render());
            setState({ vdom });
        };
        const animate = (duration) => {
            animateUntil = Math.max(Date.now() + duration, animateUntil);
            if (animationInterval === 0) {
                animationInterval = setInterval(() => {
                    if (Date.now() < animateUntil) {
                        draw();
                    }
                    else {
                        stopDrawing();
                    }
                });
            }
        };
        const connect = (node, name, discardNode = false) => {
            const element = connectedFauxDom.get(name);
            if (!element || discardNode) {
                const element = FauxComponent.new(node);
                connectedFauxDom.set(name, FauxComponent.new(node));
                drawTimeout = setTimeout(draw);
                return element;
            }
            else {
                return element;
            }
        };
        return {
            componentWillMount: () => {
                connectedFauxDom.clear();
                animateUntil = 0;
            },
            componentWillUnmount: () => {
                stopAnimating();
                stopDrawing();
            },
            connect,
            draw,
            animate,
            stopAnimating,
            isAnimating,
        };
    },
};
exports.withFauxDomFactory = function (FauxElement) {
    return function withFauxDom(WrappedComponent) {
        const WithFauxDom = class extends react_1.Component {
            constructor() {
                super(...arguments);
                this.faux = InjectedFauxDom.new(FauxElement, this.setState.bind(this));
            }
            componentWillMount() {
                this.faux.componentWillMount();
            }
            componentWillUnmount() {
                this.faux.componentWillUnmount();
            }
            render() {
                const props = Object.assign(this.props, { fauxDom: this.faux });
                return react_1.createElement(WrappedComponent, props);
            }
        };
        WithFauxDom.displayName = `withFauxDom(${WrappedComponent.displayName || WrappedComponent.name})`;
        WithFauxDom.setName(WithFauxDom.displayName);
        return WithFauxDom;
    };
};
//# sourceMappingURL=withFauxDomFactory.js.map