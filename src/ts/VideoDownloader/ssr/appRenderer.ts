import {appLoader} from "../client/appClient";
import {serverDataSource} from "../server/ServerDataSource";
import {getAppData} from "../share/data/Data";
import {dataToJsonData} from "../share/data/JsonData";
import {SsrRenderer} from "./SsrRenderer";

export const app = SsrRenderer.new({
    name: "app",
    getData: () => getAppData(serverDataSource),
    serialize: dataToJsonData,
    loader: appLoader,
});