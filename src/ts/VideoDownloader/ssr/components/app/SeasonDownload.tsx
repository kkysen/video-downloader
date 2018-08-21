import * as React from "react";
import {SFC} from "react";
import {Season} from "../../../share/data/access/Show";
import {FetchUrl} from "./App";
import {EpisodeDownload} from "./EpisodeDownload";

export const SeasonDownload: SFC<{season: Season, fetchUrl: FetchUrl}> = ({season: {number, episodes}, fetchUrl}) =>
    <div>
        Season {number}
        {episodes.map((episode, i) => <EpisodeDownload key={i} episode={episode} fetchUrl={fetchUrl}/>)}
    </div>;