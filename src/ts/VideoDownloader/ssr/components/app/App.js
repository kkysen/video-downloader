"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const React = require("react");
const axios_1 = require("../../../../lib/axios");
const ControlledIFrame_1 = require("../../../../util/crossOrigin/ControlledIFrame");
const utils_1 = require("../../../../util/misc/utils");
const path_1 = require("../../../../util/polyfills/path");
const anyWindow_1 = require("../../../../util/window/anyWindow");
const dir_1 = require("../../../server/dir");
const websiteUrl_1 = require("../../../share/websiteUrl");
const VideoDownloads_1 = require("./VideoDownloads");
const browserFetchUrl = (data) => {
    const videoServerUrls = data.shows.all._()
        .flatMap(show => show.seasons._())
        .flatMap(season => season.episodes._())
        .map(episode => episode.videoServerUrl);
    const promises = new Map();
    for (const url of videoServerUrls) {
        const promiseToResolve = {};
        promiseToResolve.promise = new Promise(resolve => {
            promiseToResolve.resolve = resolve;
        });
        promises.set(url, promiseToResolve);
    }
    addEventListener("message", ({ data: { url, href } }) => {
        const promise = promises.get(href);
        promise && promise.resolve(url);
    });
    const fetchUrl = videoServerUrl => promises.get(videoServerUrl).promise;
    (async () => {
        const fMovies = await ControlledIFrame_1.ControlledIFrame.new(websiteUrl_1.baseWebsiteUrl);
        await fMovies((urls) => {
            const downloadUrls = new Map();
            addEventListener("message", ({ data: { url, href } }) => {
                console.log({ href, url });
                downloadUrls.set(href, url);
                window.parent !== window && window.parent.postMessage({ url, href }, "*");
            });
            for (const url of urls) {
                const iframe = document.createElement("iframe");
                iframe.src = url;
                iframe.hidden = true;
                document.body.appendChild(iframe);
                console.log(iframe);
            }
        }, videoServerUrls.slice(0, 1));
        anyWindow_1.globals({ urls: videoServerUrls });
    })();
    return fetchUrl;
};
const download = async function (data) {
    const downloadUrls = new Map(await fs.readJson(path_1.path.join(dir_1.dir.data, "downloadUrls.json")));
    const downloadDirDir = dir_1.dir.data; // can change
    const downloadsDir = path_1.path.join(downloadDirDir, "downloads");
    await fs.ensureDir(downloadsDir);
    const shows = data.shows.all;
    const downloadSeasons = (await shows._().asyncMap(async (show) => {
        const showDir = path_1.path.join(downloadsDir, show.name);
        await fs.ensureDir(showDir);
        return show.seasons._().map(season => async () => {
            const seasonName = `Season ${season.number}`;
            const seasonDir = path_1.path.join(showDir, seasonName);
            await fs.ensureDir(seasonDir);
            const showSeasonName = [show.name, seasonName].join(" - ");
            const completedFile = path_1.path.join(seasonDir, "completed.json");
            await fs.ensureFile(completedFile);
            const completedEpisodes = new Set(await fs.readJson(completedFile));
            if (completedEpisodes.size === season.episodes.length) {
                console.log(`season already downloaded: ${showSeasonName}`);
                return;
            }
            console.log(`downloading season: ${showSeasonName}`);
            console.time(showSeasonName);
            await season.episodes._().asyncMap(async (episode) => {
                const name = `${show.name} - Season ${season.number} - Episode ${episode.number} - ${episode.name}`;
                const episodeFile = path_1.path.join(seasonDir, `${name}.mp4`);
                if (completedEpisodes.has(name)) {
                    console.log(`episode already downloaded: ${name}`);
                    return;
                }
                let href = episode.videoServerUrl;
                if (href.startsWith("//")) {
                    href = "https:" + href;
                }
                const url = downloadUrls.get(encodeURI(href));
                if (!url) {
                    console.log(`no download url: ${name}`);
                    return;
                }
                console.log(`downloading episode: ${name}: ${url}`);
                console.time(name);
                try {
                    const response = await axios_1.axios.get(url, { responseType: "stream" });
                    const { data, headers } = response;
                    const contentLength = headers["content-length"];
                    console.log(`\t${name}: ${contentLength << (2 * 10)} MB`);
                    data.pipe(fs.createWriteStream(episodeFile));
                    await new Promise((resolve, reject) => {
                        data.on("end", resolve);
                        data.on("error", reject);
                    });
                    completedEpisodes.add(name);
                }
                catch (e) {
                    console.error(`download error: ${name}`);
                    // console.error(e);
                }
                console.timeEnd(name);
            });
            console.timeEnd(showSeasonName);
            await fs.writeJson(completedFile, [...completedEpisodes].sort());
        });
    })).flatMap(e => e);
    for (const downloadSeason of downloadSeasons) {
        // sometimes it gets stuck even after it finished downloading
        // it doesn't recognize that the download is finished for some reason
        await Promise.race([downloadSeason(), utils_1.sleep(60 * 45)]);
    }
};
exports.App = ({ data }) => {
    anyWindow_1.globals({ data });
    // in node, never resolve promise
    const fetchUrl = anyWindow_1.isBrowser ? browserFetchUrl(data) : () => new Promise(() => null);
    (async () => {
        await download(data);
        console.log("done");
    })();
    return React.createElement("div", { style: { margin: 25 } },
        React.createElement("button", { onClick: () => console.log(data) }, "Button"),
        React.createElement(VideoDownloads_1.VideoDownloads, { shows: data.shows, fetchUrl: fetchUrl }));
};
exports.createApp = function (data) {
    return React.createElement(exports.App, { data: data });
};
//# sourceMappingURL=App.js.map