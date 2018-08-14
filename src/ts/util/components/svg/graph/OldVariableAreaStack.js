"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classNames = require("classnames");
const d3_array_1 = require("d3-array");
const d3_axis_1 = require("d3-axis");
const d3_scale_1 = require("d3-scale");
const d3_scale_chromatic_1 = require("d3-scale-chromatic");
const d3_shape_1 = require("d3-shape");
const React = require("react");
const react_1 = require("react");
const utils_1 = require("../../../functional/utils");
const production_1 = require("../../../env/production");
const Range_1 = require("../../../collections/Range");
const isType_1 = require("../../../types/isType");
const utils_2 = require("../../../misc/utils");
const utils_3 = require("../utils");
const Axes_1 = require("./Axes");
const _VariableAreaStack = function (props) {
    const { data: nonStandardizedData, values, flat = false, orderBy, offset = d3_shape_1.stackOffsetNone, color = d3_scale_chromatic_1.schemeCategory10, scale: { x: xScale = d3_scale_1.scaleLinear(), y: yScale = d3_scale_1.scaleLinear(), } = {}, axes: { x: xAxis = utils_1.identity, y: yAxis = utils_1.identity, } = {}, axesNames = {}, size, margins = {}, className, curve, defined, glyph, reverse = false, } = props;
    const dataAsEntries = function (data) {
        const a = [...data];
        if (a.length === 0) {
            return [];
        }
        if (!isType_1.isArray(a[0])) {
            return a;
        }
        return a.map(([key, value]) => ({ key, value }));
    };
    /**
     * Adds a new entry before every non-first entry
     * w/ the current key and the previous value.
     * This creates a column chart effect.
     */
    const flattenData = function (data) {
        if (!flat) {
            return data;
        }
        return data.flatMap((e, i, a) => {
            if (i === 0) {
                return e;
            }
            return [
                {
                    key: e.key,
                    value: a[i - 1].value,
                },
                e,
            ];
        });
    };
    const standardizeData = function () {
        const data = dataAsEntries(nonStandardizedData);
        switch (data.length) {
            case 0:
                return;
            case 1:
                return data;
            default:
                return flattenData(data);
        }
    };
    const data = standardizeData();
    if (!data) {
        return;
    }
    const { width, height } = size;
    const { left = 0, top = 0, bottom = 0, right = 0 } = margins;
    const _margins = { left, top, bottom, right };
    const outerWidth = width + left + right;
    const outerHeight = height + top + bottom;
    const xData = data.map(e => e.key);
    const xValues = xData.map(values.x);
    const yData = data.map(e => e.value);
    const numZ = Math.max(...yData.map(e => e.length));
    const zRange = Range_1.Range.new(numZ);
    const keys = zRange.toArray();
    const zData = zRange
        // TODO check mapFilter or map
        .map(i => yData._().mapFilter(e => e[i]))
        .mapFilter(e => {
        if (e.length === 0) {
            return;
        }
        if (production_1.development) {
            if (new Set(e.map(values.z)).size > 1) {
                throw new Error(`each zDatum contains non-unique keys`);
            }
        }
        return {
            key: values.z(e[0]),
            value: e.map(values.y),
        };
    });
    const colorFromArray = function (colors) {
        const color = utils_2.moduloIndexer(colors);
        return (z, i) => color(i);
    };
    const x = xScale.range([0, width])
        .domain(d3_array_1.extent(xValues));
    const y = yScale.range([height, 0]);
    const _color = isType_1.isReadonlyArray(color) ? colorFromArray(color) : color;
    const path = d3_shape_1.area()
        .x((d, i) => x(xValues[i]))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]));
    curve && path.curve(curve);
    defined && path.defined((d, i) => defined(d.data, i));
    const seriesData = d3_shape_1.stack()
        .keys(keys)
        .value((d, i) => {
        if (i > d.length) {
            return 0;
        }
        return values.y(d[i]);
    })
        .order(!orderBy ? d3_shape_1.stackOrderNone : series => series.map((e, i) => ({ i, value: zData[i].key }))
        .sortBy(e => orderBy(e.value, e.i))
        .map(e => e.i))
        .offset(offset)(yData._());
    y.domain(d3_array_1.extent(seriesData.flatten(2)));
    reverse && seriesData.reverse();
    const paths = seriesData.mapFilter(path);
    return React.createElement("svg", { width: outerWidth, height: outerHeight },
        React.createElement("g", { transform: utils_3.translate(left, top) },
            React.createElement("g", null, paths.map((path, i) => React.createElement("path", { key: i, className: classNames("vx-area-stack", className), d: path, fill: _color(zData[i].key, i) }))),
            !!glyph && React.createElement("g", { className: "vx-area-stack-glyphs" }, xData.map(glyph)),
            React.createElement("g", null, Axes_1.Axes({
                axes: {
                    x: xAxis(d3_axis_1.axisBottom(x), xData),
                    y: yAxis(d3_axis_1.axisLeft(y), yData),
                },
                names: axesNames,
                size,
                margins: _margins,
            }))));
};
exports.VariableAreaStack = function (props) {
    return react_1.createElement(_VariableAreaStack, props);
};
//# sourceMappingURL=OldVariableAreaStack.js.map