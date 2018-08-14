import * as React from "react";
import {ReactElement, SFC} from "react";
import {globals, inBrowser, isBrowser} from "../../../../util/window/anyWindow";
import {Data} from "../../../share/data/Data";
import {VideoDownloads} from "./VideoDownloads";

export const App: SFC<{data: Data}> = ({data}) => {
    globals({data});
    if (isBrowser) {
        window.addEventListener("message", console.log);
    }
    return <div style={{margin: 25}}>
        <button onClick={() => console.log(data)}>Button</button>
        <VideoDownloads shows={data.shows}/>
    </div>;
};

export const createApp = function(data: Data): ReactElement<{data: Data}> {
    return <App data={data}/>;
};