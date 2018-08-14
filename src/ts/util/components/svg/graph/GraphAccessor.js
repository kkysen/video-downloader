"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isType_1 = require("../../../types/isType");
exports.GraphAccessor = (() => {
    const has = function (a) {
        if (isType_1.isBoolean(a)) {
            return () => a;
        }
        const set = new Set(a);
        return t => set.has(t);
    };
    return {
        new({ get, all, name }) {
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
//# sourceMappingURL=GraphAccessor.js.map