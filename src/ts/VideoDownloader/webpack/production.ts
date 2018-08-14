export let production: boolean = false;

export const setProduction = function(_production: boolean): void {
    production = _production;
};

export const withProduction = function<T>(localProduction: boolean, f: () => T): T {
    const prevProduction = production;
    production = localProduction;
    const t = f();
    production = prevProduction;
    return t;
};

export const productionMode = () => production ? "production" : "development";