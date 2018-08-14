"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPromises = function (observable) {
    return new Promise((resolve, reject) => {
        const a = [];
        observable.subscribe(t => a.push(t), error => reject(error), () => resolve(a));
    });
};
//# sourceMappingURL=toPromises.js.map