import {Data} from "../../../../VideoDownloader/share/data/Data";
import {MapEntry} from "../../../collections/Map";
import {isBoolean} from "../../../types/isType";

// TODO remove Data dependency, Data should be generic

export interface Id {
    readonly id: number;
}

export interface GraphAccessorArgs<E, T extends Id> {
    
    get(e: E): T;
    
    all(data: Data): ReadonlyArray<T>;
    
    name(t: T): string;
    
}

export interface GraphOrder<E> {
    
    order(e: E, i: number): number;
    
    tooltip(e: E, i: number): string;
    
    all(data: Data): {length: number};
    
}

export type RawGraphFilter<E> = (e: E) => boolean;

export interface GraphFilter<E, T extends Id> {
    
    filter(include: ReadonlyArray<T> | boolean, exclude: ReadonlyArray<T> | boolean): RawGraphFilter<E>;
    
    all(data: Data): ReadonlyArray<T>;
    
    name(t: T): string;
    
}

export interface GraphAccessor<E, T extends Id> extends GraphAccessorArgs<E, T>, GraphOrder<E>, GraphFilter<E, T> {
    
    all(data: Data): ReadonlyArray<T>;
    
}

export type GraphAccessorsAs<E, T> = GraphAccessor<E, Id> extends T ? ReadonlyArray<MapEntry<string, T>> : never;

export const GraphAccessor = (() => {
    
    const has = function <T>(a: ReadonlyArray<T> | boolean): (t: T) => boolean {
        if (isBoolean(a)) {
            return () => a;
        }
        const set = new Set(a);
        return t => set.has(t);
    };
    
    return {
        
        new<E, T extends Id>({get, all, name}: GraphAccessorArgs<E, T>): GraphAccessor<E, T> {
            return {
                get,
                order: e => get(e).id,
                filter: (include, exclude) => {
                    const includes = has(include);
                    const excludes = has(exclude);
                    return e => {
                        const t = get(e);
                        return includes(t) && !excludes(t);
                    };
                },
                all,
                name,
                tooltip: e => {
                    const t = get(e);
                    return `${name(t)}: ${t.id}`;
                },
            };
        },
        
    };
})();

export type SetGraphOrder<E> = (order: GraphOrder<E>, i: number) => void;
export type SetGraphFilter<E> = (filter: RawGraphFilter<E>, i: number) => void;

export interface SetGraphControls<E> {
    readonly order: SetGraphOrder<E>;
    readonly filter: SetGraphFilter<E>;
    readonly reScale: () => void;
}

export interface GraphControlIndices {
    readonly orderIndex: number;
    readonly filterIndex: number;
}