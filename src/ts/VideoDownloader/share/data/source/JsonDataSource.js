"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = require("../../../../util/cache/cache");
const ClientLoader_1 = require("../../../../util/ssr/ClientLoader");
exports.createJsonDataSource = function (getJsonData) {
    return () => getJsonData().mapFields(e => cache_1.getter(e));
};
exports.jsonDataSource = exports.createJsonDataSource(() => ClientLoader_1.getClientJsonData());
//# sourceMappingURL=JsonDataSource.js.map