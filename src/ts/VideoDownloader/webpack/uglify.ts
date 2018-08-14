import {CompressOptions, MangleOptions, ManglePropertiesOptions, MinifyOptions} from "uglify-js";
import {UglifyJsOptions} from "uglifyjs-webpack-plugin";
import UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const mangleReservedProperties = false;

const domProperties: string[] = require("uglify-es/tools/domprops");

const reservedProperties: string[] = [
    "constructor",
];

const compressOptions: CompressOptions = {
    ...{arrows: true},
    // arguments: true,
    booleans: true,
    collapse_vars: true,
    comparisons: true,
    ...{computed_props: true},
    conditionals: true,
    dead_code: true,
    drop_console: false,
    drop_debugger: true,
    evaluate: true,
    expression: false,
    global_defs: {},
    hoist_funs: false,
    hoist_props: true,
    hoist_vars: false,
    if_return: true,
    inline: true,
    join_vars: true,
    ...{keep_classnames: false},
    keep_fargs: false,
    keep_fnames: false,
    keep_infinity: false,
    loops: true,
    negate_iife: true,
    passes: 3,
    properties: true,
    pure_funcs: [],
    pure_getters: "strict",
    reduce_funcs: true,
    reduce_vars: true,
    sequences: true,
    side_effects: true,
    switches: true,
    toplevel: true, // check
    top_retain: [],
    typeofs: true,
    // unsafe: true,
    ...{unsafe_arrows: true},
    unsafe_comps: true,
    unsafe_Function: true,
    unsafe_math: true,
    ...({unsafe_methods: true} as any),
    unsafe_proto: true,
    unsafe_regexp: true,
    unsafe_undefined: true,
    unused: true,
    warnings: false,
};

const manglePropertiesOptions: ManglePropertiesOptions = {
    builtins: false,
    debug: false,
    keep_quoted: false,
    regex: undefined,
    reserved: [...reservedProperties, ...domProperties],
};

const mangleOptions: MangleOptions = {
    eval: true,
    ...{keep_classnames: false},
    keep_fnames: false,
    reserved: [],
    toplevel: true,
    ...({safari10: false} as any),
    properties: !mangleReservedProperties ? false : manglePropertiesOptions,
};

const uglifyOptions: MinifyOptions | UglifyJsOptions = {
    ecma: 6,
    // ...{comments: false},
    compress: compressOptions,
    keep_fnames: false,
    mangle: mangleOptions,
    sourceMap: true,
};

export const uglifyPlugin = new UglifyJsPlugin({
    uglifyOptions: uglifyOptions as any as UglifyJsOptions,
});