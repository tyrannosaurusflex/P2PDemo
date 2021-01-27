"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nact_1 = require("nact");
const holdings_1 = require("./services/holdings");
const system = nact_1.start();
const holdingsService = holdings_1.actr(system);
const msg = new holdings_1.Message("./resources/holdings.csv");
nact_1.dispatch(holdingsService, msg);
//# sourceMappingURL=app.js.map