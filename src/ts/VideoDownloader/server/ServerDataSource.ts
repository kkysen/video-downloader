import * as fs from "fs-extra";
import {axios} from "../../lib/axios";
import {cmp} from "../../util/misc/compare";
import {regex} from "../../util/misc/regex";
import {path} from "../../util/polyfills/path";
import {RawEpisode, RawShow, Shows} from "../share/data/access/Show";
import {JsonData} from "../share/data/JsonData";
import {DataSources} from "../share/data/source/DataSources";
import {baseWebsiteUrl} from "../share/websiteUrl";
import {dir} from "./dir";

const baseUrl = baseWebsiteUrl;

const showNames: ReadonlyArray<string> = [
    "Game of Thrones",
];

const findSeasons = function(html: string): string[] {
    return [
        ...new Set(
            regex.matchAll(/"(\/watch\/[a-zA-Z0-9-]+\.html)"/g, html)
                .map(([, relativeUrl]) => `${baseUrl}${relativeUrl}`)
                .filter(url => url.includes("season"))
        )
    ];
};

const findEpisodes = function(url: string, html: string): [string, string][] {
    // RawEpisode = [name, url]
    const aHref = `<a href="`;
    const baseSeasonUrl = url.slice(baseUrl.length, url.indexOf("season"));
    let start = 0;
    return [
        ...(function* () {
            for (; ;) {
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
                    console.log({url, name});
                }
                yield [name, url] as [string, string];
            }
        })()
    ];
};

const findVideoUrl = function(html: string): string {
    const match = /data-video="([^"]*)/.exec(html);
    if (!match) {
        throw new Error("no video url found");
    }
    const [, url] = match;
    return url;
};

export const serverDataSource: DataSources = {
    
    shows: async () => {
        
        const cacheFile = path.join(dir.testData, "data.json");
        if (await fs.pathExists(cacheFile)) {
            return await fs.readJson(cacheFile) as RawShow[];
        }
        
        const fetchHtml = async (url: string) => (await axios.get<string>(url)).data;
        const shows = await showNames._()
            .asyncMap(async showName => [
                showName,
                await findSeasons(await fetchHtml(`${baseUrl}/search.html?keyword=${showName}`))
                    .sort()
                    .asyncMap(async url => await findEpisodes(url, await fetchHtml(url))
                        .sort(cmp.byString(episode => episode[1])) // by url
                        .asyncMap(async ([name, url]) => [
                                name,
                                url,
                                findVideoUrl(await fetchHtml(`${baseUrl}${url}`))
                            ] as RawEpisode,
                        )
                    ),
            ] as RawShow);
        
        await fs.writeJson(cacheFile, shows);
        return shows;
    },
    
};