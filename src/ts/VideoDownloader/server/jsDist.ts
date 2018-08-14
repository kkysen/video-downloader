import {DistFiles} from "../../util/ssr/DistFiles";
import {dir} from "./dir";

export const jsDistFiles = DistFiles.new(dir.clientDist, e => e.endsWith(".js"));