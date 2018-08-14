import {Request, Response} from "express";
import * as fs from "fs-extra";
import {brotli, brotliOptions} from "../../util/compression/Brotli";
import {production} from "../../util/env/production";
import {addExtensions} from "../../util/extensions/allExtensions";
import {setBrotliHeaders} from "../../util/http/headers";
import {DistFiles} from "../../util/ssr/DistFiles";
import {app} from "../ssr/appRenderer";
import {renderers} from "../ssr/renderers";
import {compressed} from "./config";
import {jsDistFiles} from "./jsDist";
import e = require("express");

addExtensions();

const server = e();

const serveJS = function(files: DistFiles): void {
    files.all.forEach(async ({filename, path}) => {
        const compressedFilename = `${path}${compressed ? ".br" : ""}`;
        if (compressed) {
            const inBuffer = await fs.readFile(path);
            console.log(`read ${path}`);
            const outBuffer = await brotli.node.compress(inBuffer, brotliOptions.staticText);
            await fs.writeFile(compressedFilename, outBuffer);
            console.log(`wrote ${compressedFilename}`);
        }
        server.get(`/${filename}`, (request: Request, response: Response) => {
            setBrotliHeaders(response, "js", compressed);
            response.sendFile(compressedFilename);
        });
    });
};

renderers.attachTo(server);

server.get("/", app.handler);

// force v8 to compile and optimize
renderers.warmUp(production ? 16 : 1);

(async () => {
    serveJS(await jsDistFiles.get());
})();

console.time("listening");
server.listen(8000, () => console.timeEnd("listening"));