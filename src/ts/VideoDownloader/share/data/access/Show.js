"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../../util/functional/utils");
const DataAccessor_1 = require("./DataAccessor");
exports.shows = DataAccessor_1.DataAccessor.new({
    source: e => e.shows,
    parse: ([name, seasons]) => ({
        name,
        seasons: seasons.map((episodes, i) => ({
            number: i + 1,
            episodes: episodes.map(([name, url, videoServerUrl], i) => ({
                number: i + 1,
                name,
                url,
                videoServerUrl,
            })),
        })),
    }),
    create: utils_1.identity,
    by: {},
}, {});
//# sourceMappingURL=Show.js.map