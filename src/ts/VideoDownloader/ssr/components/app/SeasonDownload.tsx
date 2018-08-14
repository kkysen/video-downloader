import * as React from "react";
import {SFC} from "react";
import {Season} from "../../../share/data/access/Show";
import {EpisodeDownload} from "./EpisodeDownload";

export const SeasonDownload: SFC<{season: Season}> = ({season: {number, episodes}}) => <div>
    Season {number}
    {episodes.map((episode, i) => <EpisodeDownload episode={episode} key={i}/>)}
</div>;