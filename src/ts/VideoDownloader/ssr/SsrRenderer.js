"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SsrRendererFactory_1 = require("../../util/ssr/SsrRendererFactory");
const config_1 = require("../server/config");
const dir_1 = require("../server/dir");
const jsDist_1 = require("../server/jsDist");
const html_1 = require("../webpack/html");
exports.SsrRenderer = SsrRendererFactory_1.SsrRendererFactory.new({
    templateDirectory: dir_1.dir.clientDist,
    debugDirectory: dir_1.dir.testData,
    jsDistFilesCache: jsDist_1.jsDistFiles,
    compressed: config_1.compressed,
    htmlPlugin: html_1.htmlPlugin,
});
//# sourceMappingURL=SsrRenderer.js.map