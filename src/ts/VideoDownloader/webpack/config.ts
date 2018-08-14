import {Configuration} from "webpack";
import {addExtensions} from "../../util/extensions/allExtensions";
import {path} from "../../util/polyfills/path";
import {dir} from "../server/dir";
import {renderers} from "../ssr/renderers";
import {loaders} from "./loaders";
import {optimization} from "./optimization";
import {plugins} from "./plugins";
import {production, productionMode, setProduction, withProduction} from "./production";

addExtensions();

type Entry = {[key: string]: string};

const clients: Entry = renderers.webpackEntry();

const servers: Entry = {
    server: "server.ts",
};

const commonConfig: Configuration = {
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: loaders,
    cache: true,
};

type Target = never
    | "web"
    | "webworker"
    | "node"
    | "async-node"
    | "node-webkit"
    | "atom"
    | "electron"
    | "electron-renderer"
    | "electron-main";

const entryFor = function({base, entry}: {base: string, entry: Entry}): Entry {
    return entry.mapFields(e => path.join(base, e));
};

export const configFor = function(target: Target, clientsEntry: Entry = clients): Configuration {
    const isWeb = ["web", "webworker"].includes(target);
    return {
        ...commonConfig,
        target,
        node: !isWeb ? false : {
            fs: "empty",
            net: "empty",
        },
        entry: entryFor(isWeb
            ? {base: dir.client, entry: clientsEntry}
            : {base: dir.server, entry: servers}
        ),
        output: {
            filename: "[name].js",
            path: isWeb ? dir.clientDist : dir.serverDist,
        },
        optimization: optimization(isWeb),
        plugins: plugins(isWeb),
        mode: productionMode(),
    };
};

export const webConfig = configFor("web");
export const nodeConfig = configFor("node");

// always use production mode
export const sandboxConfig = withProduction(true, () => configFor("web", {sandbox: "sandbox.ts"}));

export const configs: Configuration[] = [webConfig, nodeConfig, sandboxConfig];