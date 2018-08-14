"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FauxElement_1 = require("./FauxElement");
exports.FauxComponent = {
    new(tagName) {
        const element = FauxElement_1.FauxElement.new(tagName);
        return {
            element,
            render: element.render,
        };
    },
};
//# sourceMappingURL=FauxComponent.js.map