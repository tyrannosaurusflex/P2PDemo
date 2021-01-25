"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actr = exports.message = void 0;
const nact_1 = require("nact");
class message {
    constructor(name) {
        this.name = name;
    }
}
exports.message = message;
;
const actr = (system) => {
    return nact_1.spawnStateless(system, (msg, ctx) => console.log(`Hello ${msg.name}`), 'hiactor');
};
exports.actr = actr;
//# sourceMappingURL=hiactor.js.map