"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const anyWindow_1 = require("../../../../util/window/anyWindow");
const VideoDownloads_1 = require("./VideoDownloads");
exports.App = ({ data }) => {
    anyWindow_1.globals({ data });
    if (anyWindow_1.isBrowser) {
        window.addEventListener("message", console.log);
    }
    return React.createElement("div", { style: { margin: 25 } },
        React.createElement("button", { onClick: () => console.log(data) }, "Button"),
        React.createElement(VideoDownloads_1.VideoDownloads, { shows: data.shows }));
};
exports.createApp = function (data) {
    return React.createElement(exports.App, { data: data });
};
//# sourceMappingURL=App.js.map