import * as React from "react";
import {Component, ReactNode} from "react";

interface RawVideoDownloadProps {
    url: string;
}

interface RawVideoDownloadState {

}

export class RawVideoDownload extends Component<RawVideoDownloadProps, RawVideoDownloadState> {
    
    public constructor(props: RawVideoDownloadProps) {
        super(props);
    }
    
    public render(): ReactNode {
        return <div>
            {this.props.url}
        </div>;
    }
    
}