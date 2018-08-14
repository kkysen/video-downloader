import * as classNames from "classnames";
import {extent} from "d3-array";
import {Axis, axisBottom, axisLeft} from "d3-axis";
import {scaleLinear} from "d3-scale";
import {area, CurveFactory, SeriesPoint, stack, stackOffsetNone, stackOrderNone} from "d3-shape";
import * as React from "react";
import {createElement, ReactNode, SFC} from "react";
import {identity} from "../../../functional/utils";
import {Numeric} from "../../../misc/math";
import {isReadonlyArray} from "../../../types/isType";
import {moduloIndexer} from "../../../misc/utils";
import {Accessor, Margins, Scale, Size, translate} from "../utils";
import {Axes} from "./Axes";
import {StackOffset, StackOrder} from "./utils";

// TODO add updates made to VariableAreaStack

type GetKey<T, XKey> = Exclude<keyof T, XKey>;

interface FixedAreaStackProps<T, XKey extends keyof T, XDomain extends Numeric> {
    data: ReadonlyArray<T>;
    xKey: XKey;
    values: {[K in keyof T]: (d: T[K], i: number) => K extends XKey ? XDomain : number};
    order?: StackOrder<T, GetKey<T, XKey>>;
    offset?: StackOffset<T, GetKey<T, XKey>>;
    color?: ReadonlyArray<string> | ((key: GetKey<T, XKey>, i: number) => string);
    scale?: {
        x?: Scale<XDomain>;
        y?: Scale<number>;
    };
    axes?: {
        x?: (axis: Axis<XDomain>, xData: ReadonlyArray<T[XKey]>) => Axis<XDomain>;
        y?: (axis: Axis<number>, data: ReadonlyArray<T>) => Axis<number>;
    };
    axesNames?: {
        x?: string;
        y?: string;
    };
    size: Size;
    margins: Partial<Margins>;
    curve?: CurveFactory;
    defined?: Accessor<boolean, T>;
    glyph?: (t: T[XKey], i: number, a: T[XKey][]) => ReactNode;
    reverse?: boolean;
    className?: string;
}

const _FixedAreaStack = function <T, XKey extends keyof T, XDomain extends Numeric>(
    props: FixedAreaStackProps<T, XKey, XDomain>): ReactNode {
    const {
        data,
        xKey,
        values,
        order = stackOrderNone,
        offset = stackOffsetNone,
        color = ["red", "blue", "green"],
        scale: {
            x: xScale = scaleLinear() as any as Scale<XDomain>,
            y: yScale = scaleLinear() as Scale<number>,
        } = {},
        axes: {
            x: xAxis = identity,
            y: yAxis = identity,
        } = {},
        axesNames = {},
        size: {width, height},
        margins: {left = 0, top = 0, bottom = 0, right = 0},
        className,
        curve,
        defined,
        glyph,
        reverse = false,
    } = props;
    
    type X = T[XKey];
    
    if (data.length === 0) {
        return;
    }
    
    const outerWidth = width + left + right;
    const outerHeight = height + top + bottom;
    
    const xData: X[] = data.map(d => d[xKey]);
    const xValues: XDomain[] = xData.map(values[xKey] as (d: X, i: number) => XDomain);
    
    const yValues = values as {[K in keyof T]: (d: T[K], i: number) => number};
    
    type Key = GetKey<T, XKey>;
    const keys = Object.allKeys(data[0]).filter((key: keyof T): key is Key => key !== xKey);
    
    const colorFromArray = function(colors: ReadonlyArray<string>): (key: Key, i: number) => string {
        const color = moduloIndexer(colors);
        return (key, i) => color(i);
    };
    
    const x = xScale.range([0, width])
        .domain(extent(xValues) as [XDomain, XDomain]);
    const y = yScale.range([height, 0]);
    const _color = isReadonlyArray(color) ? colorFromArray(color) : color;
    
    const path = area<SeriesPoint<T>>()
        .x((d, i) => x(xValues[i]))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]));
    curve && path.curve(curve);
    defined && path.defined((d, i) => defined(d.data, i));
    
    const seriesData = stack<T, Key>()
        .keys(keys)
        .value((d, key, i) => yValues[key](d[key], i))
        .order(order)
        .offset(offset)
        (data._());
    y.domain(extent(seriesData.flatten(2)) as [number, number]);
    reverse && seriesData.reverse();
    const paths = seriesData.mapFilter<string>(path);
    
    return <svg width={outerWidth} height={outerHeight}>
        <g transform={translate(left, top)}>
            {paths.map((path, i) => <path
                key={i}
                className={classNames("vx-area-stack", className)}
                d={path}
                fill={_color(keys[i], i)}
                onMouseEnter={() => console.log(keys[i])}
            />)}
            {!!glyph && <g className="vx-area-stack-glyphs">{xData.map(glyph)}</g>}
            {Axes({
                axes: {
                    x: xAxis(axisBottom(x), xData),
                    y: yAxis(axisLeft(y), data),
                },
                names: axesNames,
                size: {width, height},
                margins: {left, top, right, bottom},
            })}
        </g>
    </svg>;
};

export const FixedAreaStack = function <T, XKey extends keyof T, XDomain extends Numeric>(
    props: FixedAreaStackProps<T, XKey, XDomain>): ReactNode {
    return createElement(_FixedAreaStack as SFC<FixedAreaStackProps<T, XKey, XDomain>>, props);
};