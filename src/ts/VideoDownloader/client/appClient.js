"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClientLoader_1 = require("../../util/ssr/ClientLoader");
const Data_1 = require("../share/data/Data");
const JsonDataSource_1 = require("../share/data/source/JsonDataSource");
const App_1 = require("../ssr/components/app/App");
exports.appLoader = ClientLoader_1.ClientLoader.new({
    create: App_1.createApp,
    deserialize: () => Data_1.getAppData(JsonDataSource_1.jsonDataSource),
});
//# sourceMappingURL=appClient.js.map