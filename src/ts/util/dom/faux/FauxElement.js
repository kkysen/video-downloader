"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const cache_1 = require("../../cache/cache");
const DebugProxy_1 = require("../../debug/DebugProxy");
const production_1 = require("../../env/production");
const utils_1 = require("../../misc/utils");
const libQuerySelectorAll = require("query-selector");
exports.FauxElement = (() => {
    const skipNameTransformationExpressions = [
        /^data-/,
        /^aria-/,
    ];
    const attributeNameMap = new Map([
        ["class", "className"],
    ]);
    const attributeToPropName = (name) => {
        if (skipNameTransformationExpressions.some(e => e.test(name))) {
            return name;
        }
        return attributeNameMap.get(name) || utils_1.camelCase(name);
    };
    const eventNameMap = new Map([]);
    const eventToPropName = (type) => {
        return eventNameMap.get(type) || type;
    };
    const itemIndexed = (a) => {
        const _a = a;
        _a.item = i => a[i];
        return _a;
    };
    const arrayToNodeList = (nodes) => {
        return itemIndexed(nodes);
    };
    const arrayToHTMLCollection = (elements) => {
        const htmlCollection = itemIndexed(elements);
        if (production_1.development) {
            return DebugProxy_1.DebugProxy.for(htmlCollection, {}, "FauxElement.HTMLCollection");
        }
        return htmlCollection;
    };
    const arrayToDomTokenList = (tokens) => {
        // TODO
        return tokens;
    };
    const child = (node) => node;
    const isFaux = (node) => !!node.render;
    return {
        new(tagName, namespaceURI = "http://www.w3.org/1999/xhtml") {
            const ownerDocument = fauxDocument;
            const nodeName = tagName;
            const nodeType = 1;
            let parentNode;
            let parentElement;
            const setParent = (parent) => {
                parentElement = parentNode = parent;
            };
            let innerHTML = "";
            const childNodes = arrayToNodeList([]);
            // const classList = arrayToDomTokenList([]);
            const props = {};
            // const eventListeners: Map<string, EventListenerOrEventListenerObject[]> = new Map();
            const getAttribute = (name) => {
                return props[attributeToPropName(name)] || null;
                // return props.get(attributeToPropName(name)) || null;
            };
            const setAttribute = (name, value) => {
                props[attributeToPropName(name)] = value;
                // props.set(attributeToPropName(name), value);
            };
            const removeAttribute = (name) => {
                delete props[attributeToPropName(name)];
                // props.delete(attributeToPropName(name));
            };
            const getAttributeNode = (name) => {
                const value = getAttribute(name);
                if (!value) {
                    return null;
                }
                const _attr = {
                    name,
                    value,
                    specified: true,
                    ownerElement: _,
                };
                const attr = _attr;
                if (production_1.development) {
                    return DebugProxy_1.DebugProxy.for(attr, {}, "FauxElement.Attr");
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
            const appendChild = (newChild) => {
                newChild.parentElement = _;
                childNodes.push(child(newChild));
                return newChild;
            };
            const removeChild = (oldChild) => {
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
            const insertBefore = (newChild, refChild) => {
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
            const isElement = (node) => node.nodeType === undefined || node.nodeType === 1;
            const getChildren = () => {
                return arrayToHTMLCollection(childNodes.filter(isElement));
            };
            // const getSibling = (offset: number): Node | null => {
            //     if (!parentNode) {
            //         return null;
            //     }
            //     const siblings = parentNode.childNodes as any as Node[];
            //     return siblings[siblings.indexOf(_) + offset];
            // };
            const querySelectorAll = (selectors) => {
                return libQuerySelectorAll(selectors, _);
            };
            const querySelector = (selectors) => {
                return querySelectorAll(selectors)[0] || null;
            };
            const getElementsByTagName = (tagName) => {
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
            const render = (key = 0) => {
                const children = getChildren().map((e, i) => isFaux(e) ? e.render(i) : e);
                if (innerHTML) {
                    children.push(innerHTML);
                }
                const _props = props;
                _props.key = key;
                return react_1.createElement(nodeName, _props, children.length === 1 ? innerHTML : children);
            };
            const e = {
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
                    setParent(node);
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
            const _ = e;
            if (production_1.development) {
                return DebugProxy_1.DebugProxy.for(_, {}, "FauxElement");
            }
            return _;
        },
    };
})();
const fauxDocument = (() => {
    const getDocumentElement = cache_1.cache(() => exports.FauxElement.new("html"));
    const document = {
        createElement: (tagName) => exports.FauxElement.new(tagName),
        createElementNS: exports.FauxElement.new,
        get documentElement() {
            return getDocumentElement();
        },
    };
    const _ = document;
    if (production_1.development) {
        return DebugProxy_1.DebugProxy.for(_, {}, "FauxDocument");
    }
    return _;
})();
//# sourceMappingURL=FauxElement.js.map