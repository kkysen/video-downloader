import {addExtensions} from "../../util/extensions/allExtensions";
import {data} from "../share/data/Data";
import {serverDataSource} from "./ServerDataSource";

const testFetchShows = async function(): Promise<void> {
    const _data = await data.get(serverDataSource);
    console.log(_data);
};

(async () => {
    addExtensions();
    await testFetchShows();
})();