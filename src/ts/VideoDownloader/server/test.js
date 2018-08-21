"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const allExtensions_1 = require("../../util/extensions/allExtensions");
const path_1 = require("../../util/polyfills/path");
const Data_1 = require("../share/data/Data");
const dir_1 = require("./dir");
const ServerDataSource_1 = require("./ServerDataSource");
const testFetchShows = async () => {
    const _data = await Data_1.data.get(ServerDataSource_1.serverDataSource);
    console.log(_data);
};
const checkCompleted = async () => {
    const downloadsDir = path_1.path.join(dir_1.dir.data, "downloads");
    for (const show of await fs.readdir(downloadsDir)) {
        const showDir = path_1.path.join(downloadsDir, show);
        for (const season of await fs.readdir(showDir)) {
            const seasonDir = path_1.path.join(showDir, season);
            const episodes = (await fs.readdir(seasonDir))
                .filter(e => e.endsWith(".mp4"))
                .map(e => e.slice(0, -".mp4".length));
            await fs.writeJson(path_1.path.join(seasonDir, "completed.json"), episodes);
            await fs.remove(path_1.path.join(seasonDir, "completed"));
        }
    }
};
(async () => {
    allExtensions_1.addExtensions();
    // await testFetchShows();
    await checkCompleted();
})();
//# sourceMappingURL=test.js.map