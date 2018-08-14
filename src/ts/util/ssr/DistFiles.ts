import {createHash} from "crypto";
import * as fs from "fs-extra";
import {RefreshableAsyncCache, refreshableAsyncCache} from "../cache/cache";
import {All} from "../collections/query/All";
import {pathLib} from "../polyfills/path";

export interface DistFile {
    path: string;
    filename: string;
    hash: string;
}

export type DistFiles = All<DistFile, {filename: string}>;

const fileHash = async function(path: string): Promise<string> {
    const hash = createHash("sha1");
    const buffer = await fs.readFile(path);
    hash.update(buffer);
    return hash.digest("hex");
};

export type DistFilesCache = RefreshableAsyncCache<DistFiles>;

export const DistFiles = {
    
    new(directory: string, filter?: (filename: string) => boolean): DistFilesCache {
        return refreshableAsyncCache(async (): Promise<DistFiles> => {
            const filenames = await fs.readdir(directory);
            const distFiles = await filenames
                .filter(filter || (() => true))
                .asyncMap(async filename => {
                    const path = pathLib.join(directory, filename);
                    const distFile = {
                        filename,
                        path,
                        hash: await fileHash(path),
                    };
                    fs.watch(path, async () => {
                        if (!fs.pathExists(path)) {
                            distFile.hash = ""; // TODO
                            return;
                        }
                        distFile.hash = await fileHash(path);
                    });
                    return distFile;
                });
            return All.of(distFiles, {filename: ""});
        });
    },
    
};