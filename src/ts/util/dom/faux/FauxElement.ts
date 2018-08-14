import {createElement, ReactElement, ReactNode} from "react";
import {anyWindow} from "../../window/anyWindow";
import {cache} from "../../cache/cache";
import {DebugProxy} from "../../debug/DebugProxy";
import {ElementByTag, ElementTag} from "../../types/ElementTags";
import {development} from "../../env/production";
import {Range} from "../../collections/Range";
import {Is} from "../../types/isType";
import {camelCase} from "../../misc/utils";

type LibQuerySelectorAll = (selectors: string, node: ParentNode) => NodeListOf<Element>;
const libQuerySelectorAll: LibQuerySelectorAll = require("query-selector");

interface FauxElement<Real extends Element = Element> extends Element {
    
    render(key?: number | string): ReactElement<any>;
    
}

type NamespaceURI = "http://www.w3.org/1999/xhtml" | "http://www.w3.org/2000/svg";

export const FauxElement = (() => {
    
    const skipNameTransformationExpressions: ReadonlyArray<RegExp> = [
        /^data-/,
        /^aria-/,
    ];
    
    const attributeNameMap: Map<string, string> = new Map([
        ["class", "className"],
    ]);
    
    const attributeToPropName = (name: string): string => {
        if (skipNameTransformationExpressions.some(e => e.test(name))) {
            return name;
        }
        return attributeNameMap.get(name) || camelCase(name);
    };
    
    const eventNameMap: Map<string, string> = new Map([]);
    
    const eventToPropName = (type: string): string => {
        return eventNameMap.get(type) || type;
    };
    
    type ItemIndexed<T> = {item(i: number): T};
    const itemIndexed = <T>(a: T[]): T[] & ItemIndexed<T> => {
        const _a = a as T[] & ItemIndexed<T>;
        _a.item = i => a[i];
        return _a;
    };
    
    const arrayToNodeList = <T extends Node>(nodes: T[]): T[] & NodeListOf<T> => {
        return itemIndexed(nodes) as T[] & NodeListOf<T>;
    };
    
    const arrayToHTMLCollection = (elements: Element[]): Element[] & HTMLCollection => {
        const htmlCollection = itemIndexed(elements) as Element[] & HTMLCollection;
        if (development) {
            return DebugProxy.for(htmlCollection, {}, "FauxElement.HTMLCollection");
        }
        return htmlCollection;
    };
    
    const arrayToDomTokenList = (tokens: string[]): string[] & DOMTokenList => {
        // TODO
        return tokens as string[] & DOMTokenList;
    };
    
    const child = <T extends Node>(node: T): T & ChildNode => node as any as T & ChildNode;
    
    const isFaux: Is<FauxElement> = (node: Node): node is FauxElement => !!(node as FauxElement).render;
    
    return {
        
        new<K extends ElementTag>(
            tagName: K,
            namespaceURI: NamespaceURI | string = "http://www.w3.org/1999/xhtml",
        ): FauxElement<ElementByTag<K>> & ElementByTag<K> {
            type ThisElement = ElementByTag<K>;
            type This = FauxElement<ThisElement>;
            
            const ownerDocument = fauxDocument;
            
            const nodeName: string = tagName;
            const nodeType: number = 1;
            
            let parentNode: Node | null;
            let parentElement: HTMLElement | null;
            
            const setParent = (parent: Element | null): void => {
                parentElement = parentNode = parent as HTMLElement;
            };
            
            let innerHTML = "";
            
            const childNodes = arrayToNodeList<Node & ChildNode>([]);
            
            // const classList = arrayToDomTokenList([]);
            
            const props: {[key: string]: string} = {};
            
            // const eventListeners: Map<string, EventListenerOrEventListenerObject[]> = new Map();
            
            const getAttribute = (name: string): string | null => {
                return props[attributeToPropName(name)] || null;
                // return props.get(attributeToPropName(name)) || null;
            };
            
            const setAttribute = (name: string, value: string): void => {
                props[attributeToPropName(name)] = value;
                // props.set(attributeToPropName(name), value);
            };
            
            const removeAttribute = (name: string): void => {
                delete props[attributeToPropName(name)];
                // props.delete(attributeToPropName(name));
            };
            
            const getAttributeNode = (name: string): Attr | null => {
                const value = getAttribute(name);
                if (!value) {
                    return null;
                }
                const _attr: Partial<Attr> = {
                    name,
                    value,
                    specified: true,
                    ownerElement: _,
                };
                const attr = _attr as Attr;
                if (development) {
                    return DebugProxy.for(attr, {}, "FauxElement.Attr");
                }
                return attr;
            };
            
            // const addEventListener = (
            //     type: string,
            //     listener: EventListenerOrEventListenerObject,
            //     options?: boolean | AddEventListenerOptions,
            // ): void => {
            //     const prop = eventToPropName(type);
            //     const emptyListeners: EventListenerOrEventListenerObject[] = [];
            //     const listeners = eventListeners.get(prop) || (eventListeners.set(prop,
            //         emptyListeners), emptyListeners);
            //     listeners.push(listener);
            // };
            
            // const removeEventListener = (
            //     type: string,
            //     listener: EventListenerOrEventListenerObject,
            //     options?: boolean | EventListenerOptions,
            // ): void => {
            //     const prop = eventToPropName(type);
            //     const listeners = eventListeners.get(prop);
            //     if (listeners) {
            //         listeners.remove(listener);
            //     }
            // };
            
            const appendChild = <T extends Node>(newChild: T): T => {
                (newChild as {parentElement: Element}).parentElement = _;
                childNodes.push(child(newChild));
                return newChild;
            };
            
            const removeChild = <T extends Node>(oldChild: T): T => {
                const removed = childNodes.remove(child(oldChild));
                if (!removed) {
                    throw new Error("Not Found Error");
                }
                return oldChild;
            };
            
            // const remove = (): void => {
            //     if (parentNode) {
            //         parentNode.removeChild(_);
            //     }
            // };
            
            const insertBefore = <T extends Node>(newChild: T, refChild: Node | null): T => {
                if (!refChild) {
                    return appendChild(newChild);
                }
                const i = childNodes.indexOf(child(refChild));
                if (i === -1) {
                    return appendChild(child(newChild));
                }
                childNodes.add(i, child(newChild));
                return newChild;
            };
            
            const isElement = (node: Node): node is Element => node.nodeType === undefined || node.nodeType === 1;
            
            const getChildren = (): Element[] & HTMLCollection => {
                return arrayToHTMLCollection(childNodes.filter(isElement));
            };
            
            // const getSibling = (offset: number): Node | null => {
            //     if (!parentNode) {
            //         return null;
            //     }
            //     const siblings = parentNode.childNodes as any as Node[];
            //     return siblings[siblings.indexOf(_) + offset];
            // };
            
            const querySelectorAll = (selectors: string): NodeListOf<Element> => {
                return libQuerySelectorAll(selectors, _);
            };
            
            const querySelector = (selectors: string): Element | null => {
                return querySelectorAll(selectors)[0] || null;
            };
            
            const getElementsByTagName = (tagName: string): NodeListOf<Element> => {
                const children = getChildren();
                if (children.length === 0) {
                    return arrayToNodeList([]);
                }
                const shallowMatches = tagName === "*"
                    ? children
                    : children.filter(e => e.nodeName === tagName);
                const allMatches = shallowMatches.flatMap(e => [...e.getElementsByTagName(tagName)]);
                return arrayToNodeList(allMatches);
            };
            
            // const getElementsByClassName = (className: string): NodeListOf<Element> => {
            //     const children = getChildren();
            //     if (children.length === 0) {
            //         return arrayToNodeList([]);
            //     }
            //     const shallowMatches = tagName === "*"
            //         ? children
            //         : children.filter(e => e.className === className || [...e.classList].includes(className));
            //     const allMatches = shallowMatches.flatMap(e => [...e.getElementsByTagName(tagName)]);
            //     return arrayToNodeList(allMatches);
            // };
            
            const render = (key: number | string = 0): ReactElement<any> => {
                const children: ReactNode[] = getChildren().map((e, i) => isFaux(e) ? e.render(i) : e);
                if (innerHTML) {
                    children.push(innerHTML);
                }
                const _props: {[key: string]: string | number} = props;
                _props.key = key;
                return createElement(nodeName, _props, children.length === 1 ? innerHTML : children);
            };
            
            const e: Partial<This> = {
                
                ownerDocument,
                namespaceURI,
                
                nodeName,
                nodeType,
                
                get parentNode() {
                    return parentNode;
                },
                get parentElement() {
                    return parentElement;
                },
                
                set parentNode(node) {
                    setParent(node as Element);
                },
                set parentElement(element) {
                    setParent(element);
                },
                
                // get innerHTML() {
                //     return innerHTML;
                // },
                // set innerHTML(html) {
                //     innerHTML = html;
                // },

                get textContent() {
                    return innerHTML;
                },
                set textContent(text) {
                    innerHTML = text;
                },
                
                childNodes,
                
                get children() {
                    return getChildren();
                },
                
                // get nextSibling() {
                //     return getSibling(+1);
                // },
                // get previousSibling() {
                //     return getSibling(-1);
                // },
                
                // classList,
                //
                // get className() {
                //     return classList.join(" ");
                // },
                
                getAttribute,
                setAttribute,
                removeAttribute,
                
                // getAttributeNode,
                
                // addEventListener,
                // removeEventListener,
                
                appendChild,
                removeChild,
                // remove,
                insertBefore,
                
                querySelectorAll,
                querySelector,
                
                getElementsByTagName,
                // getElementsByClassName,
                
                render,
                
            };
            
            const _ = e as This & ThisElement;
            if (development) {
                return DebugProxy.for(_, {}, "FauxElement");
            }
            return _;
        },
        
    };
    
})();

const fauxDocument = ((): Document => {
    const getDocumentElement = cache(() => FauxElement.new("html"));
    const document: Partial<Document> = {
        createElement: <K extends ElementTag>(tagName: K) => FauxElement.new(tagName),
        createElementNS: FauxElement.new,
        get documentElement() {
            return getDocumentElement();
        },
    };
    const _ = document as Document;
    if (development) {
        return DebugProxy.for(_, {}, "FauxDocument");
    }
    return _;
})();