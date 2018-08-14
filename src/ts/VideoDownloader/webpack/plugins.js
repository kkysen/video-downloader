"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderers_1 = require("../ssr/renderers");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const analyzeBundles = false;
exports.plugins = function (compileHtml) {
    const plugins = [];
    if (compileHtml) {
        plugins.addAll(renderers_1.renderers.htmlPlugins());
    }
    if (analyzeBundles) {
        plugins.push(new BundleAnalyzerPlugin());
    }
    return plugins;
};
//# sourceMappingURL=plugins.js.map