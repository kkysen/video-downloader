"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zlib = require("zlib");
const makeCompression = function (gzip) {
    return (buffer, options) => new Promise((resolve, reject) => {
        const cb = (error, result) => {
            error ? reject(error) : resolve(result);
        };
        options ? zlib.gzip(buffer, options, cb) : zlib.gzip(buffer, cb);
    });
};
const compressionNames = [
    "deflate",
    "deflateRaw",
    "gzip",
    "gunzip",
    "inflate",
    "inflateRaw",
    "unzip",
];
exports.compression = compressionNames.map(name => [name, makeCompression(zlib[name])]).toObject();
//# sourceMappingURL=zlib.js.map