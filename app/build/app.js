"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nact_1 = require("nact");
const hiactor_1 = require("./services/hiactor");
const system = nact_1.start();
const greeting = hiactor_1.actr(system);
const msg = new hiactor_1.message("John Doe");
nact_1.dispatch(greeting, msg);
// holding :investorId, accountId, balance
// rates: - accountId, dailyRate
// parse holding -> group per investor
// parse rates -> group per accountId
// get all investors (then parse per holding)
// get all rates
//# sourceMappingURL=app.js.map