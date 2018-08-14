import * as zlib from "zlib";
import {InputType, ZlibOptions} from "zlib";

interface ZlibCompression {
    
    (buf: InputType, callback: (error: Error | null, result: Buffer) => void): void;
    
    (buf: InputType, options: ZlibOptions, callback: (error: Error | null, result: Buffer) => void): void;
    
}

interface Compression {
    
    (buffer: InputType, options?: ZlibOptions): Promise<Buffer>;
    
}

const makeCompression = function(gzip: ZlibCompression): (buffer: InputType, options?: ZlibOptions) => Promise<Buffer> {
    return (buffer: InputType, options?: ZlibOptions) =>
        new Promise((resolve, reject) => {
            const cb = (error: Error | null, result: Buffer) => {
                error ? reject(error) : resolve(result);
            };
            options ? zlib.gzip(buffer, options, cb) : zlib.gzip(buffer, cb);
        });
};

export interface Compressions {
    
    readonly deflate: Compression;
    readonly deflateRaw: Compression;
    readonly gzip: Compression;
    readonly gunzip: Compression;
    readonly inflate: Compression;
    readonly inflateRaw: Compression;
    readonly unzip: Compression;
    readonly unzipSync: Compression;

}

type CompressionType = keyof Compressions;

const compressionNames: CompressionType[] = [
    "deflate",
    "deflateRaw",
    "gzip",
    "gunzip",
    "inflate",
    "inflateRaw",
    "unzip",
];

export const compression: Compressions = compressionNames.map(name =>
    [name, makeCompression(zlib[name] as ZlibCompression)] as [CompressionType, Compression]
).toObject();