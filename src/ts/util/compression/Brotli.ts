import {iltorb} from "../../lib/iltorb";
import {production} from "../env/production";

interface AllBrotliOptions {
    
    mode: "generic" | "text" | "font";
    quality: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11; // [0, 11]
    windowSize: 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24; // [10, 24]
    inputBlockSize: 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24; // [16, 24]
    disableLiteralContextModeling: boolean;
    sizeHint: number;
    largeWindow: boolean;
    numPostfixBits: 0 | 1 | 2 | 3;
    numDirect: 1 | 15 | 2 | 30 | 3 | 60 | 4 | 120; // [1 << numPostfixBits, 15 << numPostfixBits]
    
}

export interface BrotliOptions extends Partial<AllBrotliOptions> {

}

export interface Brotli<Buffer> {
    
    compress(buffer: Buffer, options?: BrotliOptions): Promise<Buffer>;
    
    decompress(buffer: Buffer): Promise<Buffer>;
    
}

export interface BrotliLibrary {
    
    browser: Brotli<Uint8Array>;
    
    node: Brotli<Buffer>;
    
}

// TODO change to wasmBrotli once it supports options (encode params)
export const brotli: BrotliLibrary = iltorb;

type _CommonBrotliOptions = {[key: string]: BrotliOptions};

export interface CommonBrotliOptions extends _CommonBrotliOptions {
    staticText: BrotliOptions;
}

export const brotliOptions: CommonBrotliOptions = {
    staticText: {
        mode: "text",
        quality: production ? 11 : 5,
    },
};

