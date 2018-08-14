import * as React from "react";
import {SFC} from "react";
import {Shows} from "../../../share/data/access/Show";
import {ShowDownload} from "./ShowDownload";


export const VideoDownloads: SFC<{shows: Shows}> = ({shows}) => <div>
    {shows.all.map((show, i) => <ShowDownload show={show} key={i}/>)}
</div>;