import * as fs from "fs-extra";
import {ParsingOptions, WorkBook} from "xlsx";
import {xlsx} from "./xlsx";

/**
 * xlsx uses synchronous IO functions,
 * which makes it really slow,
 * so this an async wrapper on top of xlsx.
 */
export namespace xlsxAsync {
    
    export const readFile = async function(filename: string, opts?: ParsingOptions): Promise<WorkBook> {
        const buffer = await fs.readFile(filename);
        return xlsx.read(buffer, {
            type: "buffer",
        });
    };
    
}