import {Express, Request, RequestHandler, Response} from "express-serve-static-core";
import * as fs from "fs-extra";
import {renderToString} from "react-dom/server";
import {RefreshableAsyncCache, refreshableAsyncCache} from "../cache/cache";
import {Range} from "../collections/Range";
import {brotli, brotliOptions} from "../compression/Brotli";
import {inDevelopment} from "../env/production";
import {setBrotliHeaders} from "../http/headers";
import {MaybePromise} from "../maybePromise/MaybePromise";
import {regex} from "../misc/regex";
import {path} from "../polyfills/path";
import {Indexable} from "../types/indexable";
import {isPromise} from "../types/isType";
import {HtmlPluginFactory} from "../webpack/html";
import {clientDataField, ClientLoader, clientRootDivId} from "./ClientLoader";
import {DistFiles, DistFilesCache} from "./DistFiles";
import HtmlWebpackPlugin = require("html-webpack-plugin");

interface SsrRendered {
    readonly html: Buffer;
}

export interface SsrRenderer extends RefreshableAsyncCache<SsrRendered> {
    readonly name: string;
    readonly handler: RequestHandler;
    readonly attachTo: (server: Express) => void;
    readonly warmUp: (repetitions: number) => void;
    readonly htmlPlugin: HtmlWebpackPlugin;
}

export interface SsrRendererArgs<Data, JsonData> {
    readonly name: string;
    readonly getData: () => MaybePromise<Data>;
    readonly serialize: (data: Data) => JsonData;
    readonly loader: ClientLoader<Data, JsonData>;
}

export interface SsrRenderers {
    
    readonly add: (...renderers: SsrRenderer[]) => void;
    
    readonly refresh: () => void;
    readonly attachTo: (server: Express) => void;
    readonly warmUp: (repetitions: number) => void;
    
    readonly htmlPlugins: () => ReadonlyArray<HtmlWebpackPlugin>;
    readonly webpackEntry: () => Indexable<string>;
    
}

const hashSources = function(htmlWithSources: string, jsDistFiles: DistFiles): string {
    const scriptSrcRegex = /<script src="?([^">]*)"?><\/script>/g;
    const hashedSources = new Map(
        regex.matchAll(scriptSrcRegex, htmlWithSources)
            .map(([script, src]) => {
                const {hash} = jsDistFiles.by.filename(src)!;
                return [src, script.replace(src, `${src}?${hash}`)] as [string, string];
            })
    );
    return htmlWithSources.replace(scriptSrcRegex, (script, src) => hashedSources.get(src)!);
};

interface SsrRendererClass {
    
    readonly "new": <Data, JsonData>(args: SsrRendererArgs<Data, JsonData>) => SsrRenderer;
    
    readonly group: () => SsrRenderers;
    
}

interface SsrRendererFactoryArgs {
    readonly templateDirectory: string;
    readonly debugDirectory: string;
    readonly jsDistFilesCache: DistFilesCache;
    readonly compressed: boolean;
    readonly htmlPlugin: HtmlPluginFactory;
}

export const SsrRendererFactory = {
    
    new(args: SsrRendererFactoryArgs): SsrRendererClass {
        const {
            templateDirectory,
            debugDirectory,
            jsDistFilesCache,
            compressed,
            htmlPlugin,
        } = args;
        
        let nextId = 0;
        
        return {
            
            new(args) {
                const {name, getData, serialize, loader: {args: {create}}} = args;
                const id = nextId++;
                const filename = `${name}.html`;
                const templatePath = path.join(templateDirectory, filename);
                const debugPath = path.join(debugDirectory, filename);
                
                const readTemplate = async (): Promise<string> => {
                    const buffer = await fs.readFile(templatePath);
                    return buffer.toString();
                };
                
                let renderNum = 0;
                
                const render = async (): Promise<SsrRendered> => {
                    const [template, jsDistFiles, data] = await Promise.all([
                        readTemplate(),
                        jsDistFilesCache.get(),
                        getData(),
                    ]);
                    const timerLabel = `rendering ${name} ${++renderNum}`;
                    console.time(timerLabel);
                    const insertionPoint = new RegExp(`<div id="?not"?></div>`);
                    const [before, after] = template.split(insertionPoint);
                    const json = JSON.stringify(serialize(data));
                    const html = [
                        before,
                        `<script>window.${clientDataField} = \`${json}\`</script>`,
                        `<div id="${clientRootDivId}">${renderToString(create(data))}</div>`,
                        hashSources(after, jsDistFiles),
                    ].join("");
                    console.timeEnd(timerLabel);
                    const htmlBuffer = Buffer.from(html);
                    const compressedHtml = compressed
                        ? await brotli.node.compress(htmlBuffer, brotliOptions.staticText)
                        : htmlBuffer;
                    console.log({name, html: html.length, compressed: compressedHtml.length});
                    inDevelopment(async () => {
                        await fs.writeFile(debugPath, html);
                    });
                    return {
                        html: compressedHtml,
                    };
                };
                
                const renderer = refreshableAsyncCache(render);
                
                let serveNum = 0;
                const handler = (request: Request, response: Response): void => {
                    const timerLabel = `serving ${name} ${++serveNum}`;
                    console.time(timerLabel);
                    
                    const maybeRendered = renderer.get();
                    
                    const send = ({html}: SsrRendered) => {
                        response.send(html);
                        console.timeEnd(timerLabel);
                    };
                    
                    setBrotliHeaders(response, "html", compressed);
                    
                    if (!isPromise(maybeRendered)) {
                        send(maybeRendered);
                    } else {
                        maybeRendered.then(send);
                    }
                };
                
                return {
                    name,
                    ...renderer,
                    handler,
                    attachTo: server => server.get(`/${name}`, handler),
                    warmUp: repetitions => Range.new(repetitions).map(renderer.getRefreshed),
                    htmlPlugin: htmlPlugin({
                        name,
                        templateName: "template",
                        chunks: [name],
                    }),
                };
            },
            
            group() {
                const renderers: SsrRenderer[] = [];
                return {
                    add: (..._renderers) => {
                        renderers.addAll(_renderers);
                    },
                    refresh: () => renderers.map(e => e.getRefreshed).callEach(null),
                    attachTo: server => renderers.map(e => e.attachTo).callEach(server),
                    warmUp: repetitions => renderers.map(e => e.warmUp).callEach(repetitions),
                    htmlPlugins: () => renderers.map(e => e.htmlPlugin),
                    webpackEntry: () => renderers
                        .map(({name}) => [name, `${name}Client.ts`] as [string, string])
                        .toObject(),
                };
            },
            
        };
        
    },
    
};