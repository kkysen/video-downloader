"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const Brotli_1 = require("../../util/compression/Brotli");
const production_1 = require("../../util/env/production");
const allExtensions_1 = require("../../util/extensions/allExtensions");
const headers_1 = require("../../util/http/headers");
const appRenderer_1 = require("../ssr/appRenderer");
const renderers_1 = require("../ssr/renderers");
const config_1 = require("./config");
const jsDist_1 = require("./jsDist");
const e = require("express");
allExtensions_1.addExtensions();
const server = e();
const serveJS = function (files) {
    files.all.forEach(async ({ filename, path }) => {
        const compressedFilename = `${path}${config_1.compressed ? ".br" : ""}`;
        if (config_1.compressed) {
            const inBuffer = await fs.readFile(path);
            console.log(`read ${path}`);
            const outBuffer = await Brotli_1.brotli.node.compress(inBuffer, Brotli_1.brotliOptions.staticText);
            await fs.writeFile(compressedFilename, outBuffer);
            console.log(`wrote ${compressedFilename}`);
        }
        server.get(`/${filename}`, (request, response) => {
            headers_1.setBrotliHeaders(response, "js", config_1.compressed);
            response.sendFile(compressedFilename);
        });
    });
};
renderers_1.renderers.attachTo(server);
server.get("/", appRenderer_1.app.handler);
// force v8 to compile and optimize
renderers_1.renderers.warmUp(production_1.production ? 16 : 1);
(async () => {
    serveJS(await jsDist_1.jsDistFiles.get());
})();
console.time("listening");
server.listen(8000, () => console.timeEnd("listening"));
//# sourceMappingURL=server.js.map