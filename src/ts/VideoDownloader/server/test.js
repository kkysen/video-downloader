"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allExtensions_1 = require("../../util/extensions/allExtensions");
const Data_1 = require("../share/data/Data");
const ServerDataSource_1 = require("./ServerDataSource");
const testFetchShows = async function () {
    const _data = await Data_1.data.get(ServerDataSource_1.serverDataSource);
    console.log(_data);
};
(async () => {
    allExtensions_1.addExtensions();
    await testFetchShows();
})();
//# sourceMappingURL=test.js.map