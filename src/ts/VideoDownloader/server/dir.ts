import * as fs from "fs";
import * as path from "path";

const dirParts = path.parse(__filename).dir.split(path.sep);
while (!fs.existsSync(path.join(...dirParts, ".git"))) {
    dirParts.pop();
}

export namespace dir {
    
    export const root: string = path.join(...dirParts);
    export const dist: string = path.join(root, "dist");
    export const clientDist: string = path.join(dist, "client");
    export const serverDist: string = path.join(dist, "server");
    export const src: string = path.join(root, "src");
    export const data: string = path.join(src, "data");
    export const ts: string = path.join(src, "ts");
    export const project: string = path.join(ts, "VideoDownloader");
    export const client: string = path.join(project, "client");
    export const server: string = path.join(project, "server");
    export const testData: string = path.join(data, "test");
    
}