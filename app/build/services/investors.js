"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actr = void 0;
const nact_1 = require("nact");
const rates_1 = require("./rates");
const holdings_1 = require("./holdings");
const calculation_1 = require("./calculation");
const actr = (parent) => nact_1.spawn(parent, (state = { investorId: null, holdings: [], rates: new Map() }, invId, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userIdMessage = {
            location: "./resources/holdings.csv",
            investorId: invId,
            sender: ctx.self
        };
        let holdingsService;
        let investorId = `holding-${invId}`;
        if (ctx.children.has(investorId)) {
            holdingsService = ctx.children.get(investorId);
        }
        else {
            holdingsService = holdings_1.actr(ctx.self, userIdMessage, investorId);
        }
        // get the users' end of day holdings
        const investorAccount = yield nact_1.query(holdingsService, (sender) => Object.assign(userIdMessage, { sender }), 250);
        state.holdings = investorAccount.holdings;
        yield Promise.all(state.holdings.map((holding) => __awaiter(void 0, void 0, void 0, function* () {
            let accountIdMessage = {
                location: "./resources/rates.csv",
                accountId: holding.accountId
            };
            let rateService;
            let accountId = `account-${holding.accountId}`;
            if (ctx.children.has(accountId)) {
                rateService = ctx.children.get(accountId);
            }
            else {
                rateService = rates_1.actr(ctx.self, accountId);
            }
            // get rates associated with this holding
            const rates = yield nact_1.query(rateService, (sender) => Object.assign(accountIdMessage, { sender }), 250);
            state.rates.set(holding.accountId, rates.rate);
        })));
        state.investorId = invId;
        let calcService;
        let accountId = `calculation-${invId}`;
        if (ctx.children.has(accountId)) {
            calcService = ctx.children.get(accountId);
        }
        else {
            calcService = calculation_1.actr(ctx.self, accountId);
        }
        nact_1.dispatch(calcService, state);
    }
    catch (err) {
        // typically log to a log provider here, instead of the console
        console.error(err);
        throw err;
    }
}), 'investors');
exports.actr = actr;
//# sourceMappingURL=investors.js.map