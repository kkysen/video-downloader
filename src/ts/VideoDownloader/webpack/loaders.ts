import {Module, RuleSetRule} from "webpack";

const tsLoader: RuleSetRule = {
    test: /\.tsx?$/,
    loader: "ts-loader",
    options: {
        allowTsInNodeModules: false,
        reportFiles: ["src/ts/**/*.{ts,tsx}"],
    },
};

const binaryNodeLoader: RuleSetRule = {
    test: /\.node$/,
    loader: "node-loader",
};

export const loaders: Module = {
    rules: [
        tsLoader,
        binaryNodeLoader,
    ],
};