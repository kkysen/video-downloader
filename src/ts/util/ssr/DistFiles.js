"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const fs = require("fs-extra");
const cache_1 = require("../cache/cache");
const All_1 = require("../collections/query/All");
const path_1 = require("../polyfills/path");
const fileHash = async function (path) {
    const hash = crypto_1.createHash("sha1");
    const buffer = await fs.readFile(path);
    hash.update(buffer);
    return hash.digest("hex");
};
exports.DistFiles = {
    new(directory, filter) {
        return cache_1.refreshableAsyncCache(async () => {
            const filenames = await fs.readdir(directory);
            const distFiles = await filenames
                .filter(filter || (() => true))
                .asyncMap(async (filename) => {
                const path = path_1.pathLib.join(directory, filename);
                const distFile = {
                    filename,
                    path,
                    hash: await fileHash(path),
                };
                fs.watch(path, async () => {
                    if (!fs.pathExists(path)) {
                        distFile.hash = ""; // TODO
                        return;
                    }
                    distFile.hash = await fileHash(path);
                });
                return distFile;
            });
            return All_1.All.of(distFiles, { filename: "" });
        });
    },
};
//# sourceMappingURL=DistFiles.js.map