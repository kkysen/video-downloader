"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DistFiles_1 = require("../../util/ssr/DistFiles");
const dir_1 = require("./dir");
exports.jsDistFiles = DistFiles_1.DistFiles.new(dir_1.dir.clientDist, e => e.endsWith(".js"));
//# sourceMappingURL=jsDist.js.map