import webpack = require("webpack");
import Optimization = webpack.Options.Optimization;
import {closureCompiler} from "./closureCompiler";
import {production} from "./production";
import {uglifyPlugin} from "./uglify";

export const optimization = function(splitChunks: boolean): Optimization {
    return {
        splitChunks: splitChunks && {
            chunks: "all",
        },
        minimize: production,
        minimizer: [
            uglifyPlugin,
            // closureCompiler,
        ],
    };
};