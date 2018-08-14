import * as classNames from "classnames";
import {extent} from "d3-array";
import {Axis, axisBottom, axisLeft} from "d3-axis";
import {scaleLinear} from "d3-scale";
import {schemeCategory10} from "d3-scale-chromatic";
import {area, CurveFactory, SeriesPoint, stack, stackOffsetNone, stackOrderNone} from "d3-shape";
import * as React from "react";
import {createElement, ReactNode, SFC, SFCFactory} from "react";
import {MapEntry} from "../../../collections/Map";
import {identity} from "../../../functional/utils";
import {development} from "../../../env/production";
import {Range} from "../../../collections/Range";
import {Numeric} from "../../../misc/math";
import {isArray, isReadonlyArray} from "../../../types/isType";
import {moduloIndexer} from "../../../misc/utils";
import {Accessor, Margins, Scale, Size, translate} from "../utils";
import {Axes} from "./Axes";
import {StackOffset} from "./utils";

type Entry<K, V> = MapEntry<K, V>;

type RA<T> = ReadonlyArray<T>;

interface VariableAreaStackProps<T, X, XDomain extends Numeric, Z> {
    data: Iterable<Entry<X, RA<T>>> | Iterable<[X, RA<T>]>;
    values: {
        x: (d: X) => XDomain;
        y: (d: T) => number;
        z: (d: T) => Z;
    };
    flat?: boolean;
    orderBy?: (z: Z, i: number) => number;
    offset?: StackOffset<RA<T>, number>;
    color?: RA<string> | ((z: Z, i: number) => string);
    scale?: {
        x?: Scale<XDomain>;
        y?: Scale<number>;
    };
    axes?: {
        x?: (axis: Axis<XDomain>, xData: RA<X>) => Axis<XDomain>;
        y?: (axis: Axis<number>, data: RA<RA<T>>) => Axis<number>;
    };
    axesNames?: {
        x?: string;
        y?: string;
    };
    size: Size;
    margins?: Partial<Margins>;
    curve?: CurveFactory;
    defined?: Accessor<boolean, RA<T>>;
    glyph?: (t: X, i: number, a: RA<X>) => ReactNode;
    reverse?: boolean;
    className?: string;
}

const _VariableAreaStack = function <T, X, XDomain extends Numeric, Z>(
    props: VariableAreaStackProps<T, X, XDomain, Z>): ReactNode {
    
    const {
        data: nonStandardizedData,
        values,
        flat = false,
        orderBy,
        offset = stackOffsetNone,
        color = schemeCategory10,
        scale: {
            x: xScale = scaleLinear() as any as Scale<XDomain>,
            y: yScale = scaleLinear() as Scale<number>,
        } = {},
        axes: {
            x: xAxis = identity,
            y: yAxis = identity,
        } = {},
        axesNames = {},
        size,
        margins = {},
        className,
        curve,
        defined,
        glyph,
        reverse = false,
    } = props;
    
    type DataEntry = Entry<X, RA<T>>;
    type Data = RA<DataEntry>;
    
    const dataAsEntries = function(data: typeof nonStandardizedData): Data {
        const a = [...data];
        if (a.length === 0) {
            return [];
        }
        if (!isArray(a[0])) {
            return a as Entry<X, RA<T>>[];
        }
        return (a as [X, RA<T>][]).map(([key, value]) => ({key, value}));
    };
    
    /**
     * Adds a new entry before every non-first entry
     * w/ the current key and the previous value.
     * This creates a column chart effect.
     */
    const flattenData = function(data: Data): Data {
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
    
    const standardizeData = function(): Data | undefined {
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
    
    const {width, height} = size;
    const {left = 0, top = 0, bottom = 0, right = 0} = margins;
    const _margins = {left, top, bottom, right};
    
    const outerWidth = width + left + right;
    const outerHeight = height + top + bottom;
    
    const xData: RA<X> = data.map(e => e.key);
    const xValues: RA<XDomain> = xData.map(values.x);
    
    const yData: RA<RA<T>> = data.map(e => e.value);
    
    type Key = number;
    const numZ = Math.max(...yData.map(e => e.length));
    const zRange = Range.new(numZ);
    const keys = zRange.toArray();
    const zData: RA<Entry<Z, number[]>> = zRange
    // TODO check mapFilter or map
        .map(i => yData._().mapFilter(e => e[i]))
        .mapFilter(e => {
            if (e.length === 0) {
                return;
            }
            if (development) {
                if (new Set(e.map(values.z)).size > 1) {
                    throw new Error(`each zDatum contains non-unique keys`);
                }
            }
            return {
                key: values.z(e[0]),
                value: e.map(values.y),
            };
        });
    
    const colorFromArray = function(colors: RA<string>): (z: Z, i: number) => string {
        const color = moduloIndexer(colors);
        return (z, i) => color(i);
    };
    
    const x = xScale.range([0, width])
        .domain(extent(xValues) as [XDomain, XDomain]);
    const y = yScale.range([height, 0]);
    const _color = isReadonlyArray(color) ? colorFromArray(color) : color;
    
    const path = area<SeriesPoint<RA<T>>>()
        .x((d, i) => x(xValues[i]))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]));
    curve && path.curve(curve);
    defined && path.defined((d, i) => defined(d.data, i));
    
    const seriesData = stack<RA<T>, Key>()
        .keys(keys)
        .value((d, i) => {
            if (i > d.length) {
                return 0;
            }
            return values.y(d[i]);
        })
        .order(!orderBy ? stackOrderNone : series =>
            series.map((e, i) => ({i, value: zData[i].key}))
                .sortBy(e => orderBy(e.value, e.i))
                .map(e => e.i)
        )
        .offset(offset)
        (yData._());
    y.domain(extent(seriesData.flatten(2)) as [number, number]);
    reverse && seriesData.reverse();
    const paths = seriesData.mapFilter<string>(path);
    
    return <svg width={outerWidth} height={outerHeight}>
        <g transform={translate(left, top)}>
            <g>
                {paths.map((path, i) => <path
                    key={i}
                    className={classNames("vx-area-stack", className)}
                    d={path}
                    fill={_color(zData[i].key, i)}
                    // onMouseEnter={() => console.log(zData[i].key, zData[i].value)}
                />)}
            </g>
            {!!glyph && <g className="vx-area-stack-glyphs">{xData.map(glyph)}</g>}
            <g>
                {Axes({
                    axes: {
                        x: xAxis(axisBottom(x), xData),
                        y: yAxis(axisLeft(y), yData),
                    },
                    names: axesNames,
                    size,
                    margins: _margins,
                })}
            </g>
        </g>
    </svg>;
};

export const VariableAreaStack = function <T, X, XDomain extends Numeric, Z>(
    props: VariableAreaStackProps<T, X, XDomain, Z>): ReactNode {
    return createElement(_VariableAreaStack as SFC<VariableAreaStackProps<T, X, XDomain, Z>>, props);
};