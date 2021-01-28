"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nact_1 = require("nact");
const investors_1 = require("./services/investors");
const system = nact_1.start();
const investorSvc = investors_1.actr(system);
nact_1.dispatch(investorSvc, 1);
nact_1.dispatch(investorSvc, 2);
nact_1.dispatch(investorSvc, 3);
nact_1.dispatch(investorSvc, 4);
nact_1.dispatch(investorSvc, 5);
nact_1.dispatch(investorSvc, 6);
nact_1.dispatch(investorSvc, 7);
// from api / messages / somewhere else
//# sourceMappingURL=app.js.map