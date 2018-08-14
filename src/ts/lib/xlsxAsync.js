"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const xlsx_1 = require("./xlsx");
/**
 * xlsx uses synchronous IO functions,
 * which makes it really slow,
 * so this an async wrapper on top of xlsx.
 */
var xlsxAsync;
(function (xlsxAsync) {
    xlsxAsync.readFile = async function (filename, opts) {
        const buffer = await fs.readFile(filename);
        return xlsx_1.xlsx.read(buffer, {
            type: "buffer",
        });
    };
})(xlsxAsync = exports.xlsxAsync || (exports.xlsxAsync = {}));
//# sourceMappingURL=xlsxAsync.js.map