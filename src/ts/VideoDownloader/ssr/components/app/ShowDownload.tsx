import * as React from "react";
import {SFC} from "react";
import {Show} from "../../../share/data/access/Show";
import {SeasonDownload} from "./SeasonDownload";

export const ShowDownload: SFC<{show: Show}> = ({show: {name, seasons}}) => <div>
    {name}
    {seasons.map((season, i) => <SeasonDownload season={season} key={i}/>)}
</div>;