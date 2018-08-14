import {SsrRendererFactory} from "../../util/ssr/SsrRendererFactory";
import {compressed} from "../server/config";
import {dir} from "../server/dir";
import {jsDistFiles} from "../server/jsDist";
import {htmlPlugin} from "../webpack/html";

export const SsrRenderer = SsrRendererFactory.new({
    templateDirectory: dir.clientDist,
    debugDirectory: dir.testData,
    jsDistFilesCache: jsDistFiles,
    compressed,
    htmlPlugin,
});