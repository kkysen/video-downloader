"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classNames = require("classnames");
const d3_axis_1 = require("d3-axis");
const d3_scale_1 = require("d3-scale");
const d3_scale_chromatic_1 = require("d3-scale-chromatic");
const d3_shape_1 = require("d3-shape");
const React = require("react");
const Range_1 = require("../../../collections/Range");
const production_1 = require("../../../env/production");
const utils_1 = require("../../../functional/utils");
const groupBy_1 = require("../../../misc/groupBy");
const math_1 = require("../../../misc/math");
const utils_2 = require("../../../misc/utils");
const isType_1 = require("../../../types/isType");
const anyWindow_1 = require("../../../window/anyWindow");
const utils_3 = require("../utils");
const Axes_1 = require("./Axes");
exports.VariableAreaStack = function (props) {
    const { data: nonStandardizedData, values, flat = false, extendLast, forceDomain = {}, } = props;
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
        return [...(function* () {
                for (let i = 0; i < data.length; i++) {
                    const e = data[i];
                    if (i !== 0) {
                        yield { key: e.key, value: data[i - 1].value };
                    }
                    yield e;
                    if (extendLast && i === data.length - 1) {
                        const { inverse, increment } = extendLast;
                        if (increment) {
                            yield { key: increment(e.key), value: e.value };
                        }
                        else {
                            const start = +data[0].key;
                            const end = +e.key;
                            const range = end - start;
                            const avgInterval = range / data.length;
                            const next = end + avgInterval;
                            yield { key: inverse(next), value: e.value };
                        }
                    }
                }
            })()];
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
        return () => ({
            domain: {
                x: [undefined, undefined],
                y: [NaN, NaN],
            },
            render: () => null,
        });
    }
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
    const xDomain = forceDomain.x || [xValues[0], xValues._().last()];
    const value = (d, i) => {
        if (i > d.length) {
            return 0;
        }
        return values.y(d[i]);
    };
    return props => {
        const { zLine, orderBy, orderByLength, offset = d3_shape_1.stackOffsetNone, scale: { x: xScale = d3_scale_1.scaleLinear(), y: yScale = d3_scale_1.scaleLinear(), } = {}, axes: { x: xAxis = utils_1.identity, y: yAxis = utils_1.identity, } = {}, axesNames = {}, size, margins = {}, className, curve, defined, glyph, reverse = false, } = props;
        const { width, height } = size;
        const { left = 0, top = 0, bottom = 0, right = 0 } = margins;
        const _margins = { left, top, bottom, right };
        const outerWidth = width + left + right;
        const outerHeight = height + top + bottom;
        const x = xScale.range([0, width])
            .domain(xDomain);
        const y = yScale.range([height, 0]);
        const path = d3_shape_1.area()
            .x((d, i) => x(xValues[i]))
            .y0(d => y(d[0]))
            .y1(d => y(d[1]));
        curve && path.curve(curve);
        defined && path.defined((d, i) => defined(d.data, i));
        const order = !orderBy ? null : (series) => {
            // if orderByLength is given, can optimize this
            // groups will be buckets, with orderBy() giving the bucket index
            // therefore use a pre-filled, packed smi array
            // otherwise use [], a hash-map like array
            const indexedZData = series.map((e, i) => ({ i, z: zData[i] }));
            const groupBy = (e, i) => orderBy(e.z.key, i);
            const groups = orderByLength
                ? groupBy_1.groupByOrdinal(indexedZData, groupBy, orderByLength)
                : groupBy_1.groupByNumber(indexedZData, groupBy);
            for (const group of groups) {
                for (const e of group) {
                    series[e.i].hello = e.z;
                }
            }
            // need to remove holes if used groupByNumber
            return (orderByLength ? groups : utils_2.makeBlasphemous(groups))
                .flatMap(group => group.flatMap(ize => ize.i));
            // return series.map((e, i) => ({i, value: zData[i].key}))
            //     .sortBy(e => orderBy(e.value, e.i))
            //     .map(e => e.i);
        };
        const seriesData = d3_shape_1.stack()
            .keys(keys)
            .value(value)
            .order(order || d3_shape_1.stackOrderNone)
            .offset(offset)(yData._());
        const zLineHeight = zLine && math_1.sum(zData.map(e => e.key).map(zLine));
        reverse && seriesData.reverse();
        const yDomain = forceDomain.y || [
            Math.min(...seriesData[0].map(e => e[0]), zLine ? zLineHeight : Infinity),
            Math.max(...seriesData.last().map(e => e[1]), zLine ? zLineHeight : -Infinity),
        ];
        y.domain(yDomain);
        const paths = seriesData.mapFilter(path);
        const zLinePath = zLineHeight && (() => {
            const [x1, x2] = xDomain.map(x);
            const _y = y(zLineHeight);
            // TODO add argument for controlling line's style
            return React.createElement("line", { x1: x1, x2: x2, y1: _y, y2: _y, stroke: "black" });
        })();
        const _className = classNames("variable-area-stack", className);
        const glyphNodes = !!glyph && React.createElement("g", { className: "vx-area-stack-glyphs" }, xData.map(glyph));
        const axesNode = React.createElement("g", null, Axes_1.Axes({
            axes: {
                x: xAxis(d3_axis_1.axisBottom(x), xData),
                y: yAxis(d3_axis_1.axisLeft(y), yData),
            },
            names: axesNames,
            size,
            margins: _margins,
        }));
        return {
            domain: {
                x: xDomain,
                y: yDomain,
            },
            render: props => {
                const { color = d3_scale_chromatic_1.schemeCategory10, tooltip, } = props;
                const _color = isType_1.isReadonlyArray(color) ? colorFromArray(color) : color;
                const Area = (path, i) => {
                    const { key, value } = zData[i];
                    return React.createElement("path", { key: i, className: _className, d: path, fill: _color(key, i), onMouseOver: e => {
                            const mouseX = x.invert(e.nativeEvent.offsetX - left);
                            const nextIndex = xValues.findIndex(x => x > mouseX);
                            const xRegion = xValues[nextIndex - 1];
                            return (anyWindow_1.anyWindow.f || (() => {
                            }))({ e, x, y, mouseX, xValues, xRegion });
                        } }, tooltip && React.createElement("title", null, tooltip(key, i)));
                };
                return React.createElement("svg", { width: outerWidth, height: outerHeight },
                    React.createElement("g", { transform: utils_3.translate(left, top) },
                        React.createElement("g", null, paths.map(Area)),
                        zLinePath,
                        glyphNodes,
                        axesNode));
            }
        };
    };
};
//# sourceMappingURL=VariableAreaStack.js.map