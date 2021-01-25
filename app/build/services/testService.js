"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greeter = void 0;
const nact_1 = require("nact");
const system = nact_1.start();
const greeter = (system) => {
    return nact_1.spawnStateless(system, // parent
    (msg, ctx) => console.log(`Hello ${msg.name}`), // function
    'greeter' // name
    );
};
exports.greeter = greeter;
//# sourceMappingURL=testService.js.map