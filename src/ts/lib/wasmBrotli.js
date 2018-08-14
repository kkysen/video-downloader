"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypedArray_1 = require("../util/types/TypedArray");
const browser = require("wasm-brotli");
exports.wasmBrotli = {
    browser,
    node: {
        compress: async (buffer, options) => TypedArray_1.noCopyBuffer(await browser.compress(buffer, options)),
        decompress: async (buffer) => TypedArray_1.noCopyBuffer(await browser.decompress(buffer)),
    },
};
//# sourceMappingURL=wasmBrotli.js.map