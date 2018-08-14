"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const SeasonDownload_1 = require("./SeasonDownload");
exports.ShowDownload = ({ show: { name, seasons } }) => React.createElement("div", null,
    name,
    seasons.map((season, i) => React.createElement(SeasonDownload_1.SeasonDownload, { season: season, key: i })));
//# sourceMappingURL=ShowDownload.js.map