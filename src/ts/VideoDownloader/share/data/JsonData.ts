import {RawShow} from "./access/Show";
import {Data} from "./Data";

export interface JsonData {
    
    readonly shows: ReadonlyArray<RawShow>;
    
}

export const dataToJsonData = function(data: Data): JsonData {
    return data.mapFields(e => e.raw);
};