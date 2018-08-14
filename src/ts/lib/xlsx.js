"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("xlsx");
var xlsx;
(function (xlsx) {
    xlsx.version = _.version;
    xlsx.readFile = _.readFile;
    xlsx.read = _.read;
    xlsx.writeFile = _.writeFile;
    xlsx.write = _.write;
    xlsx.utils = _.utils;
    xlsx.stream = _.stream;
    xlsx.SSF = _.SSF;
    xlsx.CFB = _.CFB;
})(xlsx = exports.xlsx || (exports.xlsx = {}));
//# sourceMappingURL=xlsx.js.map