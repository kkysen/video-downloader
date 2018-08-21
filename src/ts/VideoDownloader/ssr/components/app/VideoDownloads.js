"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ShowDownload_1 = require("./ShowDownload");
exports.VideoDownloads = ({ shows, fetchUrl }) => React.createElement("div", null, shows.all.map((show, i) => React.createElement(ShowDownload_1.ShowDownload, { key: i, show: show, fetchUrl: fetchUrl })));
//# sourceMappingURL=VideoDownloads.js.map