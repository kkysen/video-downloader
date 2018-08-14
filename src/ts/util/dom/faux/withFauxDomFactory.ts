import {Component, ComponentClass, createElement, ReactNode} from "react";
import {ElementByTag, ElementTag} from "../../types/ElementTags";
import {FauxComponent, FauxComponentClass} from "./FauxComponent";

interface InjectedFauxDom {
    
    connect<K extends ElementTag>(node: string, name: string, discardNode?: boolean): FauxComponent<ElementByTag<K>>;
    
    draw(): void;
    
    animate(duration: number): void;
    
    stopAnimating(): void;
    
    isAnimating(): boolean;
    
}

export interface FauxDomProps {
    
    readonly fauxDom: InjectedFauxDom;
    
}

interface FauxDomState {

}

interface FauxDomDelegate extends InjectedFauxDom {
    
    componentWillMount(): void;
    
    componentWillUnmount(): void;
    
}

type SetState<P, S> = <K extends keyof S>(
    state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
    callback?: () => void
) => void;

const InjectedFauxDom = {
    
    new<P>(FauxComponent: FauxComponentClass, setState: SetState<P, FauxDomState>): FauxDomDelegate {
        
        const connectedFauxDom: Map<string, FauxComponent<any>> = new Map();
        let animateUntil = 0;
        let drawTimeout = 0;
        let animationInterval = 0;
        
        const isAnimating = (): boolean => animationInterval > 0;
        
        const stopAnimating = (): void => {
            clearInterval(animationInterval);
            animationInterval = 0;
            animateUntil = 0;
        };
        
        const stopDrawing = (): void => {
            clearTimeout(drawTimeout);
            drawTimeout = 0;
        };
        
        const draw = (): void => {
            const vdom = connectedFauxDom.map(e => e.render());
            setState({vdom});
        };
        
        const animate = (duration: number): void => {
            animateUntil = Math.max(Date.now() + duration, animateUntil);
            if (animationInterval === 0) {
                animationInterval = setInterval(() => {
                    if (Date.now() < animateUntil) {
                        draw();
                    } else {
                        stopDrawing();
                    }
                });
            }
        };
        
        const connect = <K extends ElementTag>(node: K, name: string,
                                               discardNode: boolean = false): FauxComponent<ElementByTag<K>> => {
            const element = connectedFauxDom.get(name);
            if (!element || discardNode) {
                const element = FauxComponent.new(node);
                connectedFauxDom.set(name, FauxComponent.new(node));
                drawTimeout = setTimeout(draw);
                return element;
            } else {
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

export const withFauxDomFactory = function(FauxElement: FauxComponentClass) {
    
    return function withFauxDom<OriginalProps>(WrappedComponent: ComponentClass<OriginalProps & FauxDomProps>): ComponentClass<OriginalProps> {
        
        const WithFauxDom: ComponentClass<OriginalProps> = class extends Component<OriginalProps, FauxDomState> {
            
            public componentWillMount(): void {
                this.faux.componentWillMount();
            }
            
            public componentWillUnmount(): void {
                this.faux.componentWillUnmount();
            }
            
            private faux: FauxDomDelegate = InjectedFauxDom.new(FauxElement, this.setState.bind(this));
            
            public render(): ReactNode {
                const props: OriginalProps & FauxDomProps = Object.assign(this.props, {fauxDom: this.faux});
                return createElement(WrappedComponent, props);
            }
            
        };
        
        WithFauxDom.displayName = `withFauxDom(${WrappedComponent.displayName || WrappedComponent.name})`;
        WithFauxDom.setName(WithFauxDom.displayName);
        return WithFauxDom;
        
    };
    
};

