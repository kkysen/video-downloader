import {Series} from "d3-shape";

export type StackOrder<T, Key> = (series: Series<T, Key>) => number[];

export type StackOffset<T, Key> = (series: Series<T, Key>, order: number[]) => void;
