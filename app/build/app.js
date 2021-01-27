"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nact_1 = require("nact");
const holdings_1 = require("./services/holdings");
const system = nact_1.start();
const holdings = holdings_1.actr(system);
const msg = new holdings_1.Message("./resources/holdings.csv");
nact_1.dispatch(holdings, msg);
// holdingService (creates actor for each user id if not existing?)
// userActor (gets rates actor for each rate if not existing?) - > updates itself 
// 
// parse holding
// parse rates
// for each row, read in, if not exists, create actor
// each time the state is populated, get the value of the rates actor
// if not exists, then create and populate it
// on failure of holdings : escalate
// on failure of rates : error and escalate?
//# sourceMappingURL=app.js.map