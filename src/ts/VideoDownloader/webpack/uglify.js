"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const mangleReservedProperties = false;
const domProperties = require("uglify-es/tools/domprops");
const reservedProperties = [
    "constructor",
];
const compressOptions = {
    ...{ arrows: true },
    // arguments: true,
    booleans: true,
    collapse_vars: true,
    comparisons: true,
    ...{ computed_props: true },
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
    ...{ keep_classnames: false },
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
    toplevel: true,
    top_retain: [],
    typeofs: true,
    // unsafe: true,
    ...{ unsafe_arrows: true },
    unsafe_comps: true,
    unsafe_Function: true,
    unsafe_math: true,
    ...{ unsafe_methods: true },
    unsafe_proto: true,
    unsafe_regexp: true,
    unsafe_undefined: true,
    unused: true,
    warnings: false,
};
const manglePropertiesOptions = {
    builtins: false,
    debug: false,
    keep_quoted: false,
    regex: undefined,
    reserved: [...reservedProperties, ...domProperties],
};
const mangleOptions = {
    eval: true,
    ...{ keep_classnames: false },
    keep_fnames: false,
    reserved: [],
    toplevel: true,
    ...{ safari10: false },
    properties: !mangleReservedProperties ? false : manglePropertiesOptions,
};
const uglifyOptions = {
    ecma: 6,
    // ...{comments: false},
    compress: compressOptions,
    keep_fnames: false,
    mangle: mangleOptions,
    sourceMap: true,
};
exports.uglifyPlugin = new UglifyJsPlugin({
    uglifyOptions: uglifyOptions,
});
//# sourceMappingURL=uglify.js.map