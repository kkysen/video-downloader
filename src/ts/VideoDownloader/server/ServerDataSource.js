"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const axios_1 = require("../../lib/axios");
const compare_1 = require("../../util/misc/compare");
const regex_1 = require("../../util/misc/regex");
const path_1 = require("../../util/polyfills/path");
const websiteUrl_1 = require("../share/websiteUrl");
const dir_1 = require("./dir");
const baseUrl = websiteUrl_1.baseWebsiteUrl;
const showNames = [
    "Game of Thrones",
];
const findSeasons = function (html) {
    return [
        ...new Set(regex_1.regex.matchAll(/"(\/watch\/[a-zA-Z0-9-]+\.html)"/g, html)
            .map(([, relativeUrl]) => `${baseUrl}${relativeUrl}`)
            .filter(url => url.includes("season")))
    ];
};
const findEpisodes = function (url, html) {
    // RawEpisode = [name, url]
    const aHref = `<a href="`;
    const baseSeasonUrl = url.slice(baseUrl.length, url.indexOf("season"));
    let start = 0;
    return [
        ...(function* () {
            for (;;) {
                const urlStart = html.indexOf(`${aHref}${baseSeasonUrl}`, start);
                if (urlStart === -1) {
                    break;
                }
                start = urlStart + aHref.length + baseSeasonUrl.length;
                const urlEnd = html.indexOf(`"`, start);
                const url = html.slice(urlStart + aHref.length, urlEnd);
                start = urlEnd + 1;
                const nameEnd = html.indexOf(`">`, start);
                const section = html.slice(start, nameEnd);
                start = nameEnd;
                const nameStart = (section.lastIndexOf(`:`) + 1) || (section.lastIndexOf("-") + 1);
                const name = section.slice(nameStart).trim();
                if (name.length > 50 || name.length === 0) {
                    console.log({ url, name });
                }
                yield [name, url];
            }
        })()
    ];
};
const findVideoUrl = function (html) {
    const match = /data-video="([^"]*)/.exec(html);
    if (!match) {
        throw new Error("no video url found");
    }
    const [, url] = match;
    return url;
};
exports.serverDataSource = {
    shows: async () => {
        const cacheFile = path_1.path.join(dir_1.dir.testData, "data.json");
        if (await fs.pathExists(cacheFile)) {
            return await fs.readJson(cacheFile);
        }
        const fetchHtml = async (url) => (await axios_1.axios.get(url)).data;
        const shows = await showNames._()
            .asyncMap(async (showName) => [
            showName,
            await findSeasons(await fetchHtml(`${baseUrl}/search.html?keyword=${showName}`))
                .sort()
                .asyncMap(async (url) => await findEpisodes(url, await fetchHtml(url))
                .sort(compare_1.cmp.byString(episode => episode[1])) // by url
                .asyncMap(async ([name, url]) => [
                name,
                url,
                findVideoUrl(await fetchHtml(`${baseUrl}${url}`))
            ])),
        ]);
        await fs.writeJson(cacheFile, shows);
        return shows;
    },
};
//# sourceMappingURL=ServerDataSource.js.map