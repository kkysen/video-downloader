import * as React from "react";
import {SFC} from "react";
import {Show} from "../../../share/data/access/Show";
import {FetchUrl} from "./App";
import {SeasonDownload} from "./SeasonDownload";

export const ShowDownload: SFC<{show: Show, fetchUrl: FetchUrl}> = ({show: {name, seasons}, fetchUrl}) => <div>
    {name}
    {seasons.map((season, i) => <SeasonDownload key={i} season={season} fetchUrl={fetchUrl}/>)}
</div>;