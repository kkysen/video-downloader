"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const server_1 = require("react-dom/server");
const cache_1 = require("../cache/cache");
const Range_1 = require("../collections/Range");
const Brotli_1 = require("../compression/Brotli");
const production_1 = require("../env/production");
const headers_1 = require("../http/headers");
const regex_1 = require("../misc/regex");
const path_1 = require("../polyfills/path");
const isType_1 = require("../types/isType");
const ClientLoader_1 = require("./ClientLoader");
const hashSources = function (htmlWithSources, jsDistFiles) {
    const scriptSrcRegex = /<script src="?([^">]*)"?><\/script>/g;
    const hashedSources = new Map(regex_1.regex.matchAll(scriptSrcRegex, htmlWithSources)
        .map(([script, src]) => {
        const { hash } = jsDistFiles.by.filename(src);
        return [src, script.replace(src, `${src}?${hash}`)];
    }));
    return htmlWithSources.replace(scriptSrcRegex, (script, src) => hashedSources.get(src));
};
exports.SsrRendererFactory = {
    new(args) {
        const { templateDirectory, debugDirectory, jsDistFilesCache, compressed, htmlPlugin, } = args;
        let nextId = 0;
        return {
            new(args) {
                const { name, getData, serialize, loader: { args: { create } } } = args;
                const id = nextId++;
                const filename = `${name}.html`;
                const templatePath = path_1.path.join(templateDirectory, filename);
                const debugPath = path_1.path.join(debugDirectory, filename);
                const readTemplate = async () => {
                    const buffer = await fs.readFile(templatePath);
                    return buffer.toString();
                };
                let renderNum = 0;
                const render = async () => {
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
                        `<script>window.${ClientLoader_1.clientDataField} = \`${json}\`</script>`,
                        `<div id="${ClientLoader_1.clientRootDivId}">${server_1.renderToString(create(data))}</div>`,
                        hashSources(after, jsDistFiles),
                    ].join("");
                    console.timeEnd(timerLabel);
                    const htmlBuffer = Buffer.from(html);
                    const compressedHtml = compressed
                        ? await Brotli_1.brotli.node.compress(htmlBuffer, Brotli_1.brotliOptions.staticText)
                        : htmlBuffer;
                    console.log({ name, html: html.length, compressed: compressedHtml.length });
                    production_1.inDevelopment(async () => {
                        await fs.writeFile(debugPath, html);
                    });
                    return {
                        html: compressedHtml,
                    };
                };
                const renderer = cache_1.refreshableAsyncCache(render);
                let serveNum = 0;
                const handler = (request, response) => {
                    const timerLabel = `serving ${name} ${++serveNum}`;
                    console.time(timerLabel);
                    const maybeRendered = renderer.get();
                    const send = ({ html }) => {
                        response.send(html);
                        console.timeEnd(timerLabel);
                    };
                    headers_1.setBrotliHeaders(response, "html", compressed);
                    if (!isType_1.isPromise(maybeRendered)) {
                        send(maybeRendered);
                    }
                    else {
                        maybeRendered.then(send);
                    }
                };
                return {
                    name,
                    ...renderer,
                    handler,
                    attachTo: server => server.get(`/${name}`, handler),
                    warmUp: repetitions => Range_1.Range.new(repetitions).map(renderer.getRefreshed),
                    htmlPlugin: htmlPlugin({
                        name,
                        templateName: "template",
                        chunks: [name],
                    }),
                };
            },
            group() {
                const renderers = [];
                return {
                    add: (..._renderers) => {
                        renderers.addAll(_renderers);
                    },
                    refresh: () => renderers.map(e => e.getRefreshed).callEach(null),
                    attachTo: server => renderers.map(e => e.attachTo).callEach(server),
                    warmUp: repetitions => renderers.map(e => e.warmUp).callEach(repetitions),
                    htmlPlugins: () => renderers.map(e => e.htmlPlugin),
                    webpackEntry: () => renderers
                        .map(({ name }) => [name, `${name}Client.ts`])
                        .toObject(),
                };
            },
        };
    },
};
//# sourceMappingURL=SsrRendererFactory.js.map