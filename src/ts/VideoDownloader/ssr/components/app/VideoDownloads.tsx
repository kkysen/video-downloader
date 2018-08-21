import * as React from "react";
import {SFC} from "react";
import {Shows} from "../../../share/data/access/Show";
import {FetchUrl} from "./App";
import {ShowDownload} from "./ShowDownload";


export const VideoDownloads: SFC<{shows: Shows, fetchUrl: FetchUrl}> = ({shows, fetchUrl}) => <div>
    {shows.all.map((show, i) => <ShowDownload key={i} show={show} fetchUrl={fetchUrl}/>)}
</div>;