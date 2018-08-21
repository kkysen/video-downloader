import * as React from "react";
import {Component, ReactNode} from "react";
import {inBrowser} from "../../../../util/window/anyWindow";
import {Episode} from "../../../share/data/access/Show";
import {FetchUrl} from "./App";
import {RawVideoDownload} from "./RawVideoDownload";

interface EpisodeDownloadProps {
    episode: Episode;
    fetchUrl: FetchUrl;
}

interface EpisodeDownloadState {
    url?: string;
}

export class EpisodeDownload extends Component<EpisodeDownloadProps, EpisodeDownloadState> {
    
    public readonly state: EpisodeDownloadState = {};
    
    public constructor(props: EpisodeDownloadProps) {
        super(props);
        inBrowser(async () => {
            const {fetchUrl, episode: {number, name, url, videoServerUrl}} = this.props;
            const downloadUrl = await fetchUrl(videoServerUrl);
            this.setState({url: downloadUrl});
        });
    }
    
    public render(): ReactNode {
        const {props: {episode: {name, number}}, state: {url}} = this;
        // TODO add loading spinner
        return <div>
            Episode {number}: {name}
            {url && <RawVideoDownload url={url}/>}
        </div>;
    }
    
}