"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const production_1 = require("./production");
const uglify_1 = require("./uglify");
exports.optimization = function (splitChunks) {
    return {
        splitChunks: splitChunks && {
            chunks: "all",
        },
        minimize: production_1.production,
        minimizer: [
            uglify_1.uglifyPlugin,
        ],
    };
};
//# sourceMappingURL=optimization.js.map