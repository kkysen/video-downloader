import * as React from "react";
import {Component, ReactNode} from "react";
import {createIframeSandbox} from "../../../../util/sandbox/iframe";
import {inBrowser} from "../../../../util/window/anyWindow";
import {Episode} from "../../../share/data/access/Show";
import {baseWebsiteUrl} from "../../../share/websiteUrl";
import {RawVideoDownload} from "./RawVideoDownload";

interface EpisodeDownloadProps {
    episode: Episode;
}

interface EpisodeDownloadState {
    url?: string;
}

export class EpisodeDownload extends Component<EpisodeDownloadProps, EpisodeDownloadState> {
    
    public readonly state: EpisodeDownloadState = {};
    
    public constructor(props: EpisodeDownloadProps) {
        super(props);
        inBrowser(async () => {
            const {number, name, url, videoServerUrl} = this.props.episode;
            window.addEventListener("message", ({data}) => {
                const {url: downloadUrl, href} = data as {url: string, href: string};
                if (downloadUrl && href === videoServerUrl) {
                    console.log({url, downloadUrl});
                    this.setState({url: downloadUrl});
                }
            });
            if (number > 1 || name !== "Winter is Coming") {
                return;
            }
            console.log(url);
            const iframe = await createIframeSandbox(videoServerUrl);
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