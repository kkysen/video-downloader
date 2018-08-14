import {Plugin} from "webpack";
import {renderers} from "../ssr/renderers";

const {BundleAnalyzerPlugin}: {BundleAnalyzerPlugin: {new(): Plugin}} = require("webpack-bundle-analyzer");

const analyzeBundles = false;

export const plugins = function(compileHtml: boolean): Plugin[] {
    const plugins: Plugin[] = [];
    if (compileHtml) {
        plugins.addAll(renderers.htmlPlugins());
    }
    if (analyzeBundles) {
        plugins.push(new BundleAnalyzerPlugin());
    }
    return plugins;
};