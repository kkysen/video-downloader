"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const EpisodeDownload_1 = require("./EpisodeDownload");
exports.SeasonDownload = ({ season: { number, episodes }, fetchUrl }) => React.createElement("div", null,
    "Season ",
    number,
    episodes.map((episode, i) => React.createElement(EpisodeDownload_1.EpisodeDownload, { key: i, episode: episode, fetchUrl: fetchUrl })));
//# sourceMappingURL=SeasonDownload.js.map