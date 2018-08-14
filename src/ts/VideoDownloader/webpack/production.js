"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.production = false;
exports.setProduction = function (_production) {
    exports.production = _production;
};
exports.withProduction = function (localProduction, f) {
    const prevProduction = exports.production;
    exports.production = localProduction;
    const t = f();
    exports.production = prevProduction;
    return t;
};
exports.productionMode = () => exports.production ? "production" : "development";
//# sourceMappingURL=production.js.map