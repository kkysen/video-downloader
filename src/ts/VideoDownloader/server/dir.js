"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const dirParts = path.parse(__filename).dir.split(path.sep);
while (!fs.existsSync(path.join(...dirParts, ".git"))) {
    dirParts.pop();
}
var dir;
(function (dir) {
    dir.root = path.join(...dirParts);
    dir.dist = path.join(dir.root, "dist");
    dir.clientDist = path.join(dir.dist, "client");
    dir.serverDist = path.join(dir.dist, "server");
    dir.src = path.join(dir.root, "src");
    dir.data = path.join(dir.src, "data");
    dir.ts = path.join(dir.src, "ts");
    dir.project = path.join(dir.ts, "VideoDownloader");
    dir.client = path.join(dir.project, "client");
    dir.server = path.join(dir.project, "server");
    dir.testData = path.join(dir.data, "test");
})(dir = exports.dir || (exports.dir = {}));
//# sourceMappingURL=dir.js.map