import {noCopyBuffer} from "../util/types/TypedArray";
import {Brotli, BrotliLibrary} from "../util/compression/Brotli";

const browser: Brotli<Uint8Array> = require("wasm-brotli");

export const wasmBrotli: BrotliLibrary = {
    browser,
    node: {
        compress: async (buffer, options) => noCopyBuffer(await browser.compress(buffer, options)),
        decompress: async buffer => noCopyBuffer(await browser.decompress(buffer)),
    },
};