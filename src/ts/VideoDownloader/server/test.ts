import * as fs from "fs-extra";
import {addExtensions} from "../../util/extensions/allExtensions";
import {path} from "../../util/polyfills/path";
import {data} from "../share/data/Data";
import {dir} from "./dir";
import {serverDataSource} from "./ServerDataSource";

type AsyncVoidFunc = () => Promise<void>;

const testFetchShows: AsyncVoidFunc = async () => {
    const _data = await data.get(serverDataSource);
    console.log(_data);
};

const checkCompleted: AsyncVoidFunc = async () => {
    const downloadsDir = path.join(dir.data, "downloads");
    for (const show of await fs.readdir(downloadsDir)) {
        const showDir = path.join(downloadsDir, show);
        for (const season of await fs.readdir(showDir)) {
            const seasonDir = path.join(showDir, season);
            const episodes = (await fs.readdir(seasonDir))
                .filter(e => e.endsWith(".mp4"))
                .map(e => e.slice(0, -".mp4".length));
            await fs.writeJson(path.join(seasonDir, "completed.json"), episodes);
            await fs.remove(path.join(seasonDir, "completed"));
        }
    }
};

(async () => {
    addExtensions();
    // await testFetchShows();
    await checkCompleted();
})();