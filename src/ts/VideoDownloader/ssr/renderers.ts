import {app} from "./appRenderer";
import {SsrRenderer} from "./SsrRenderer";

export const renderers = SsrRenderer.group();

renderers.add(app);