import {AccessData} from "../../../util/data/DataAccessor";
import {MaybePromise} from "../../../util/maybePromise/MaybePromise";
import {DataAccessor} from "./access/DataAccessor";
import {shows} from "./access/Show";
import {DataSourcesOrGetter} from "./source/DataSources";

const dataAccessors = {shows};

export type Data = AccessData<typeof dataAccessors>;

export const data = DataAccessor.data(dataAccessors);

export const getAppData = function(sources: DataSourcesOrGetter): MaybePromise<Data> {
    // data.refresh();
    return data.get(sources);
};