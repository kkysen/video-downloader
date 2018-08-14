"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIframeSandbox = function (src) {
    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.hidden = true;
    const activatedIframe = iframe.activate();
    return new Promise((resolve, reject) => {
        iframe.onload = () => {
            resolve(activatedIframe);
        };
        iframe.onerror = reject;
    });
};
//# sourceMappingURL=iframe.js.map