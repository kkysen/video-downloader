"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
exports.renderNodes = function (nodes) {
    return nodes.map((node, i) => React.createElement(react_1.Fragment, { key: i }, node));
};
exports.renderNodesObj = function (nodes) {
    return exports.renderNodes(Object.values(nodes));
};
//# sourceMappingURL=react.js.map