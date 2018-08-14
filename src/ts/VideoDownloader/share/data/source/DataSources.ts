import {ValueOrGetter} from "../../../../util/types/ValueOrGetter";
import {ShowsSource} from "../access/Show";

export interface DataSources {
    
    readonly shows: ShowsSource;
    
}

export type DataSourcesOrGetter = ValueOrGetter<DataSources>;