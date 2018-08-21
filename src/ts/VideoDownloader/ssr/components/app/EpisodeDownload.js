"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const anyWindow_1 = require("../../../../util/window/anyWindow");
const RawVideoDownload_1 = require("./RawVideoDownload");
class EpisodeDownload extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {};
        anyWindow_1.inBrowser(async () => {
            const { fetchUrl, episode: { number, name, url, videoServerUrl } } = this.props;
            const downloadUrl = await fetchUrl(videoServerUrl);
            this.setState({ url: downloadUrl });
        });
    }
    render() {
        const { props: { episode: { name, number } }, state: { url } } = this;
        // TODO add loading spinner
        return React.createElement("div", null,
            "Episode ",
            number,
            ": ",
            name,
            url && React.createElement(RawVideoDownload_1.RawVideoDownload, { url: url }));
    }
}
exports.EpisodeDownload = EpisodeDownload;
//# sourceMappingURL=EpisodeDownload.js.map