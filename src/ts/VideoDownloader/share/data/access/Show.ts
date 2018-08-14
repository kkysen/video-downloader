import {All} from "../../../../util/collections/query/All";
import {DataSource} from "../../../../util/data/DataSource";
import {identity} from "../../../../util/functional/utils";
import {DataAccessor} from "./DataAccessor";

export interface Episode {
    readonly number: number;
    readonly name: string;
    readonly url: string;
    readonly videoServerUrl: string;
}

export type RawEpisode = [string, string, string];

export interface Season {
    readonly number: number;
    readonly episodes: ReadonlyArray<Episode>;
}

type RawSeason = ReadonlyArray<RawEpisode>;

export interface Show {
    readonly name: string;
    readonly seasons: ReadonlyArray<Season>;
}

export type RawShow = [string, ReadonlyArray<RawSeason>];

export type Shows = All<Show, {}>;

type ShowsArgs = {};

export type ShowsSource = DataSource<RawShow, ShowsArgs>;

export const shows = DataAccessor.new<Show, {}, Show, RawShow, ShowsArgs>({
    source: e => e.shows,
    parse: ([name, seasons]) => ({
        name,
        seasons: seasons.map((episodes, i) => ({
            number: i + 1,
            episodes: episodes.map(([name, url, videoServerUrl], i) => ({
                number: i + 1,
                name,
                url,
                videoServerUrl,
            })),
        })),
    }),
    create: identity,
    by: {},
}, {});