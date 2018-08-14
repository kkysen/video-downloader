"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataAccessor_1 = require("./access/DataAccessor");
const Show_1 = require("./access/Show");
const dataAccessors = { shows: Show_1.shows };
exports.data = DataAccessor_1.DataAccessor.data(dataAccessors);
exports.getAppData = function (sources) {
    // data.refresh();
    return exports.data.get(sources);
};
//# sourceMappingURL=Data.js.map