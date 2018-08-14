"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
exports.StyleGroup = ({ style, children }) => React.createElement(React.Fragment, null, react_1.Children.map(children, (child, i) => React.createElement("span", { key: i, style: style }, child)));
//# sourceMappingURL=StyleGroup.js.map