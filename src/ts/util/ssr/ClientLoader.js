"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_dom_1 = require("react-dom");
const allExtensions_1 = require("../extensions/allExtensions");
const anyWindow_1 = require("../window/anyWindow");
exports.clientRootDivId = "client";
exports.clientDataField = "clientData";
exports.getClientJsonData = function () {
    const json = anyWindow_1.anyWindow[exports.clientDataField];
    return JSON.parse(json);
};
exports.ClientLoader = {
    new(args) {
        const { deserialize, create } = args;
        const _load = async () => {
            allExtensions_1.addExtensions();
            const data = await deserialize(exports.getClientJsonData());
            const node = create(data);
            const clientRoot = document.getElementById(exports.clientRootDivId);
            if (clientRoot) {
                console.log("hydrating");
                react_dom_1.hydrate(node, clientRoot);
            }
            else {
                console.log("rendering");
                const clientContainer = document.body.appendDiv();
                clientContainer.id = exports.clientRootDivId;
                react_dom_1.render(node, clientContainer);
            }
        };
        const load = () => {
            (async () => {
                try {
                    await _load();
                }
                catch (e) {
                    console.error(e);
                }
            })();
        };
        anyWindow_1.inBrowser(load);
        return {
            args,
            load,
        };
    },
};
//# sourceMappingURL=ClientLoader.js.map