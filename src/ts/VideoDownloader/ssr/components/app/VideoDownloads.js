"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ShowDownload_1 = require("./ShowDownload");
exports.VideoDownloads = ({ shows }) => React.createElement("div", null, shows.all.map((show, i) => React.createElement(ShowDownload_1.ShowDownload, { show: show, key: i })));
//# sourceMappingURL=VideoDownloads.js.map