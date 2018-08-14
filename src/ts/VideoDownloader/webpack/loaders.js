"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsLoader = {
    test: /\.tsx?$/,
    loader: "ts-loader",
    options: {
        allowTsInNodeModules: false,
        reportFiles: ["src/ts/**/*.{ts,tsx}"],
    },
};
const binaryNodeLoader = {
    test: /\.node$/,
    loader: "node-loader",
};
exports.loaders = {
    rules: [
        tsLoader,
        binaryNodeLoader,
    ],
};
//# sourceMappingURL=loaders.js.map