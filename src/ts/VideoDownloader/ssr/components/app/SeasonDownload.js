"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const EpisodeDownload_1 = require("./EpisodeDownload");
exports.SeasonDownload = ({ season: { number, episodes } }) => React.createElement("div", null,
    "Season ",
    number,
    episodes.map((episode, i) => React.createElement(EpisodeDownload_1.EpisodeDownload, { episode: episode, key: i })));
//# sourceMappingURL=SeasonDownload.js.map