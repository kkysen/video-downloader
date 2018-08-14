"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs = require("fs-extra");
const util_1 = require("util");
const allExtensions_1 = require("../util/extensions/allExtensions");
const regex_1 = require("../util/misc/regex");
const utils_1 = require("../util/misc/utils");
allExtensions_1.addExtensions();
const exec = util_1.promisify(child_process_1.exec);
(async function checkForEvalInEsLintScope() {
    const stdout = (await exec("locate eslint-scope")).stdout;
    (await stdout.split("\n")
        .map(s => s.trim())
        .filter(s => s.endsWith(".js"))
        .asyncMap(async (filename) => {
        const code = (await fs.readFile(filename)).toString("utf8");
        return {
            filename,
            matches: regex_1.regex.matchAll(/eval\([^)]/g, code)
                .map(({ index }) => ({ index, snippet: utils_1.snippet(code, index, 100) })),
        };
    }))
        .filter(e => e.matches.length > 0)
        .forEach(e => console.log(e));
})();
//# sourceMappingURL=checkForViruses.js.map