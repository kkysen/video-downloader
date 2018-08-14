"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_selection_1 = require("d3-selection");
const React = require("react");
const react_1 = require("react");
const FauxComponent_1 = require("../../../dom/faux/FauxComponent");
const react_2 = require("../../react");
const utils_1 = require("../utils");
const _Axes = function (props) {
    const { axes, names, size: { width, height }, margins: { left, top, right, bottom }, } = props;
    const [gx, gy] = Object.values(axes).map(axis => {
        const { element: g, render } = FauxComponent_1.FauxComponent.new("g");
        axis(d3_selection_1.select(g));
        return render();
    });
    return react_2.renderNodesObj({
        axes: React.createElement(React.Fragment, null,
            React.createElement("g", { transform: utils_1.translate(0, height) }, gx),
            gy),
        names: React.createElement(React.Fragment, null,
            names.x && React.createElement("text", { transform: utils_1.translate(width / 2, height + top), style: { textAnchor: "middle" } }, names.x),
            names.y && React.createElement("text", { transform: utils_1.rotate(-90), y: -left, x: -height / 2, dy: "1em", style: { textAnchor: "middle" } }, names.y)),
    });
};
exports.Axes = function (props) {
    return react_1.createElement(_Axes, props);
};
//# sourceMappingURL=Axes.js.map