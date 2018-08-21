import {AxiosResponse} from "axios";
import * as fs from "fs-extra";
import * as React from "react";
import {ReactElement, SFC} from "react";
import {axios} from "../../../../lib/axios";
import {ControlledIFrame} from "../../../../util/crossOrigin/ControlledIFrame";
import {sleep} from "../../../../util/misc/utils";
import {path} from "../../../../util/polyfills/path";
import {globals, isBrowser} from "../../../../util/window/anyWindow";
import {dir} from "../../../server/dir";
import {Data} from "../../../share/data/Data";
import {baseWebsiteUrl} from "../../../share/websiteUrl";
import {VideoDownloads} from "./VideoDownloads";
import ReadableStream = NodeJS.ReadableStream;

export type FetchUrl = (videoServerUrl: string) => Promise<string>;

const browserFetchUrl = (data: Data): FetchUrl => {
    
    const videoServerUrls = data.shows.all._()
        .flatMap(show => show.seasons._())
        .flatMap(season => season.episodes._())
        .map(episode => episode.videoServerUrl);
    
    type PromiseToResolve = {promise: Promise<string>, resolve: (url: string) => void};
    
    const promises: Map<string, PromiseToResolve> = new Map();
    for (const url of videoServerUrls) {
        const promiseToResolve: Partial<PromiseToResolve> = {};
        promiseToResolve.promise = new Promise<string>(resolve => {
            promiseToResolve.resolve = resolve;
        });
        promises.set(url, promiseToResolve as PromiseToResolve);
    }
    
    addEventListener("message", ({data: {url, href}}) => {
        const promise = promises.get(href);
        promise && promise.resolve(url);
    });
    
    const fetchUrl: FetchUrl = videoServerUrl => promises.get(videoServerUrl)!.promise;
    
    (async () => {
        const fMovies = await ControlledIFrame.new(baseWebsiteUrl);
        await fMovies((urls: string[]) => {
            const downloadUrls: Map<string, string> = new Map();
            addEventListener("message", ({data: {url, href}}) => {
                console.log({href, url});
                downloadUrls.set(href, url);
                window.parent !== window && window.parent.postMessage({url, href}, "*");
            });
            for (const url of urls) {
                const iframe = document.createElement("iframe");
                iframe.src = url;
                iframe.hidden = true;
                document.body.appendChild(iframe);
                console.log(iframe);
            }
        }, videoServerUrls.slice(0, 1));
        globals({urls: videoServerUrls});
    })();
    
    return fetchUrl;
};

const download = async function(data: Data): Promise<void> {
    const downloadUrls = new Map(await fs.readJson(path.join(dir.data, "downloadUrls.json")) as [string, string][]);
    const downloadDirDir = dir.data; // can change
    const downloadsDir = path.join(downloadDirDir, "downloads");
    await fs.ensureDir(downloadsDir);
    const shows = data.shows.all;
    const downloadSeasons = (await shows._().asyncMap(async show => {
        const showDir = path.join(downloadsDir, show.name);
        await fs.ensureDir(showDir);
        return show.seasons._().map(season => async () => {
            const seasonName = `Season ${season.number}`;
            const seasonDir = path.join(showDir, seasonName);
            await fs.ensureDir(seasonDir);
            const showSeasonName = [show.name, seasonName].join(" - ");
            
            const completedFile = path.join(seasonDir, "completed.json");
            await fs.ensureFile(completedFile);
            const completedEpisodes = new Set(await fs.readJson(completedFile) as string[]);
            if (completedEpisodes.size === season.episodes.length) {
                console.log(`season already downloaded: ${showSeasonName}`);
                return;
            }
            
            console.log(`downloading season: ${showSeasonName}`);
            console.time(showSeasonName);
            await season.episodes._().asyncMap(async episode => {
                const name = `${show.name} - Season ${season.number} - Episode ${episode.number} - ${episode.name}`;
                const episodeFile = path.join(seasonDir, `${name}.mp4`);
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
                    const response: AxiosResponse<ReadableStream> = await axios.get<ReadableStream>(url, {responseType: "stream"});
                    const {data, headers} = response;
                    const contentLength: number = headers["content-length"];
                    console.log(`\t${name}: ${contentLength << (2 * 10)} MB`);
                    data.pipe(fs.createWriteStream(episodeFile));
                    await new Promise((resolve, reject) => {
                        data.on("end", resolve);
                        data.on("error", reject);
                    });
                    completedEpisodes.add(name);
                } catch (e) {
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
        await Promise.race([downloadSeason(), sleep(60 * 45)]);
    }
};

export const App: SFC<{data: Data}> = ({data}) => {
    globals({data});
    // in node, never resolve promise
    const fetchUrl = isBrowser ? browserFetchUrl(data) : () => new Promise<string>(() => null);
    (async () => {
        await download(data);
        console.log("done");
    })();
    return <div style={{margin: 25}}>
        <button onClick={() => console.log(data)}>Button</button>
        <VideoDownloads shows={data.shows} fetchUrl={fetchUrl}/>
    </div>;
};

export const createApp = function(data: Data): ReactElement<{data: Data}> {
    return <App data={data}/>;
};