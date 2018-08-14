"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path_1 = require("../util/polyfills/path");
const regex_1 = require("../util/misc/regex");
var matchAll = regex_1.regex.matchAll;
const coerceExportType = function (type) {
    switch (type) {
        case "const":
        case "function":
            return "const";
        case "type":
        case "interface":
            return "type";
    }
};
const exportAsNamespaceString = function ({ namespace, importPath, code, aliases }) {
    const namespaceBody = [
        ...matchAll(/export\s+(const|function|interface|type)\s+([a-zA-Z$_][a-zA-Z$_0-9]*)/g, code)
            .map((e, i) => (console.log([...e]), e))
            .map(([_, type, name]) => ({
            type: coerceExportType(type),
            name,
        })),
        ...matchAll(/export\s*{([^}]*)}/g, code)
            .map((e, i) => (console.log([...e]), e))
            .map(([_, exports]) => exports.trim().split(/\s*,\s*/))
            .flatten()
            .map(name => ({ type: "const", name }))
    ]
        .map(({ type, name }) => `    export ${type} ${aliases[name] || name} = _.${name};`)
        .join("\n");
    return `import * as _ from "${importPath}";

export namespace ${namespace} {

${namespaceBody}

}
`;
};
exports.exportAsNamespace = async function ({ namespace, importPath, typeDeclarationsPath, nodeModule = true, outDirectory = "../lib", aliases = {} }) {
    const path = nodeModule ? exports.fromNodeModule(importPath, typeDeclarationsPath) : typeDeclarationsPath;
    const buffer = await fs.readFile(path);
    const code = buffer.toString("utf8");
    await fs.writeFile(path_1.path.join(outDirectory, `${namespace}.ts`), exportAsNamespaceString({ namespace, importPath, code, aliases }));
};
exports.fromNodeModule = function (nodeModule, path) {
    return path_1.path.join("../../../node_modules", nodeModule, path);
};
(async () => {
    await exports.exportAsNamespace({
        namespace: "xlsx",
        importPath: "xlsx",
        typeDeclarationsPath: `types/index.d.ts`,
        outDirectory: "../lib",
        aliases: {
            XLSX$Utils: "Utils",
            XLSX$Consts: "Consts",
        },
    });
    console.log("done");
})();
//# sourceMappingURL=exportAsNamespace.js.map