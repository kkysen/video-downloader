import {Plugin} from "webpack";
import {Indexable} from "../../util/types/indexable";

// FIXME Closure Compiler Plugin is incompatible w/ Webpack v4

interface ClosureCompilerOptions {
    platform?: "JAVASCRIPT" | "JAVA" | "NATIVE";
    mode?: "STANDARD" | "AGGRESSIVE_BUNDLE" | "NONE";
    childCompilations?: boolean | ((compilation: any) => boolean);
    closureLibraryBase?: string;
    deps?: string | string[];
    extraDeps?: Indexable<string>;
}

interface ClosureCompilerFlags {
    compilation_level?: "ADVANCED";
    formatting?: "PRETTY_PRINT";
    debug?: boolean;
}

interface NewClosureCompiler {
    new (options: ClosureCompilerOptions, compilerFlags: ClosureCompilerFlags): Plugin;
}

const ClosureCompilerPlugin: NewClosureCompiler = require("closure-webpack-plugin");

export const closureCompiler: Plugin = new ClosureCompilerPlugin({

}, {

});
