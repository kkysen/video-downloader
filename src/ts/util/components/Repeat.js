"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const Range_1 = require("../collections/Range");
exports.Repeat = ({ times, render }) => {
    const node = render();
    return React.createElement(React.Fragment, null, Range_1.Range.new(times).map(i => React.createElement(react_1.Fragment, { key: i }, node)));
};
//# sourceMappingURL=Repeat.js.map