import {AxisDomain} from "d3-axis";

export interface Size {
    readonly width: number;
    readonly height: number;
}

export interface Margins {
    readonly left: number;
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
}

export type Accessor<T, Datum> = (d: Datum, i: number) => T;

export interface Scale<Domain extends AxisDomain> {
    
    range(): number[];
    
    range(range: ReadonlyArray<number>): this;
    
    domain(): Domain[];
    
    domain(domain: ReadonlyArray<Domain>): this;
    
    (x: Domain): number;
    
    invert(scaled: number): Domain;
    
    copy(): this;
    
    bandwidth?(): number;
    
}

export const translate = (x: number, y: number) => `translate(${x},${y})`;

export const rotate = (degrees: number) => `rotate(${degrees})`;