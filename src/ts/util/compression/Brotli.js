"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iltorb_1 = require("../../lib/iltorb");
const production_1 = require("../env/production");
// TODO change to wasmBrotli once it supports options (encode params)
exports.brotli = iltorb_1.iltorb;
exports.brotliOptions = {
    staticText: {
        mode: "text",
        quality: production_1.production ? 11 : 5,
    },
};
//# sourceMappingURL=Brotli.js.map