import {exec as execCallback} from "child_process";
import * as fs from "fs-extra";
import {promisify} from "util";
import {addExtensions} from "../util/extensions/allExtensions";
import {regex} from "../util/misc/regex";
import {boundSurrounding, snippet} from "../util/misc/utils";

addExtensions();

const exec = promisify(execCallback);

(async function checkForEvalInEsLintScope() {
    const stdout: string = (await exec("locate eslint-scope")).stdout;
    (await stdout.split("\n")
        .map(s => s.trim())
        .filter(s => s.endsWith(".js"))
        .asyncMap(async filename => {
            const code = (await fs.readFile(filename)).toString("utf8");
            return {
                filename,
                matches: regex.matchAll(/eval\([^)]/g, code)
                    .map(({index}) => ({index, snippet: snippet(code, index, 100)})),
            };
        }))
        .filter(e => e.matches.length > 0)
        .forEach(e => console.log(e));
})();