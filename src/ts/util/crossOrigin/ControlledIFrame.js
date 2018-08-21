"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iframe_1 = require("../sandbox/iframe");
const anyWindow_1 = require("../window/anyWindow");
exports.ControlledIFrame = {
    new: async (src) => {
        if (!anyWindow_1.isBrowser) {
            return ((f, t) => {
                return Promise.resolve(f(t));
            });
        }
        const iframe = await iframe_1.createIframeSandbox(src);
        const window = iframe.contentWindow;
        let nextId = 0;
        const promises = new Map();
        addEventListener("message", ({ data: { id, evaluated } }) => {
            const promise = promises.get(id);
            promise && promise.resolve(evaluated);
        });
        return ((f, t) => {
            const id = nextId++;
            window.postMessage({ id, evaluate: f.toString(), args: t }, "*");
            return new Promise((resolve, reject) => {
                promises.set(id, { resolve, reject });
            });
        });
    }
};
//# sourceMappingURL=ControlledIFrame.js.map