import {BrotliEncodeParams, compress, decompress} from "iltorb";
import {BrotliLibrary, BrotliOptions} from "../util/compression/Brotli";

const convertOptions = function(
    {
        mode,
        quality,
        windowSize,
        inputBlockSize,
        disableLiteralContextModeling,
        sizeHint,
        largeWindow,
        numPostfixBits,
        numDirect,
    }: BrotliOptions): BrotliEncodeParams {
    const allParams: BrotliEncodeParams = {
        mode: mode && {
            generic: 0,
            text: 1,
            font: 2,
        }[mode],
        quality,
        lgwin: windowSize,
        lgblock: inputBlockSize,
        disable_literal_context_modeling: disableLiteralContextModeling,
        size_hint: sizeHint,
        large_window: largeWindow,
        npostfix: numPostfixBits,
        ndirect: numDirect,
    };
    
    // if any param is left as undefined,
    // it is interpreted badly by iltorb,
    // so those undefined fields need to not exists, not just undefined
    const specifiedParams: BrotliEncodeParams = {};
    for (const [key, value] of Object.entries(allParams)) {
        if (value !== undefined) {
            specifiedParams[key] = value;
        }
    }
    return specifiedParams;
};

const _compress = compress as (buffer: Buffer, params?: BrotliEncodeParams) => Promise<Buffer>;
const _decompress = decompress as (buffer: Buffer) => Promise<Buffer>;

export const iltorb: BrotliLibrary = {
    
    get browser(): never {
        throw new Error("Iltorb uses native-bindings so is Node only. Use wasm-brotli instead.");
    },
    
    node: {
        compress: (buffer, options) => _compress(buffer, options && convertOptions(options)),
        decompress: _decompress,
    },
    
};