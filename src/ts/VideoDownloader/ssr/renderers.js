"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appRenderer_1 = require("./appRenderer");
const SsrRenderer_1 = require("./SsrRenderer");
exports.renderers = SsrRenderer_1.SsrRenderer.group();
exports.renderers.add(appRenderer_1.app);
//# sourceMappingURL=renderers.js.map