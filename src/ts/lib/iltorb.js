"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iltorb_1 = require("iltorb");
const convertOptions = function ({ mode, quality, windowSize, inputBlockSize, disableLiteralContextModeling, sizeHint, largeWindow, numPostfixBits, numDirect, }) {
    const allParams = {
        mode: mode && {
            generic: 0,
            text: 1,
            font: 2,
        }[mode],
        quality,
        lgwin: windowSize,
        lgblock: inputBlockSize,
        disable_literal_context_modeling: disableLiteralContextModeling,
        size_hint: sizeHint,
        large_window: largeWindow,
        npostfix: numPostfixBits,
        ndirect: numDirect,
    };
    // if any param is left as undefined,
    // it is interpreted badly by iltorb,
    // so those undefined fields need to not exists, not just undefined
    const specifiedParams = {};
    for (const [key, value] of Object.entries(allParams)) {
        if (value !== undefined) {
            specifiedParams[key] = value;
        }
    }
    return specifiedParams;
};
const _compress = iltorb_1.compress;
const _decompress = iltorb_1.decompress;
exports.iltorb = {
    get browser() {
        throw new Error("Iltorb uses native-bindings so is Node only. Use wasm-brotli instead.");
    },
    node: {
        compress: (buffer, options) => _compress(buffer, options && convertOptions(options)),
        decompress: _decompress,
    },
};
//# sourceMappingURL=iltorb.js.map