"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBrotliHeaders = function (response, type, compressed) {
    console.log(type);
    if (!compressed) {
        return;
    }
    response.setHeader("Vary", "Accept-Encoding");
    for (const [key, value] of Object.entries({
        Vary: "Accept-Encoding",
        "Content-Encoding": "br",
        "Content-Type": {
            "html": "text/html",
            "js": "text/javascript",
        }[type],
    })) {
        response.setHeader(key, value);
    }
};
//# sourceMappingURL=headers.js.map