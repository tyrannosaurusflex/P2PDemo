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
const actr = (parent) => nact_1.spawn(parent, (state = { investorId: null, holdings: [], rates: new Map() }, msg, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let holdingsService;
        let userIdMessage = {
            location: "./resources/holdings.csv",
            investorId: msg,
            sender: ctx.self
        };
        if (ctx.children.has(msg.toString())) {
            holdingsService = ctx.children.get(msg.toString());
        }
        else {
            holdingsService = holdings_1.actr(ctx.self, userIdMessage);
        }
        // get the users end of day holdings
        const investorAccount = yield nact_1.query(holdingsService, (sender) => Object.assign(userIdMessage, { sender }), 250);
        state.holdings = investorAccount.holdings;
        yield Promise.all(state.holdings.map((holding) => __awaiter(void 0, void 0, void 0, function* () {
            let rateService;
            let accountIdMessage = {
                location: "./resources/rates.csv",
                accountId: holding.accountId
            };
            if (ctx.children.has(holding.accountId)) {
                rateService = ctx.children.get(holding.accountId);
            }
            else {
                rateService = rates_1.actr(ctx.self, holding.accountId);
            }
            const rates = yield nact_1.query(rateService, (sender) => Object.assign(accountIdMessage, { sender }), 250);
            state.rates.set(holding.accountId, rates.rate);
        })));
        state.investorId = msg;
        console.log(state);
    }
    catch (err) {
        // typically log to a log provider here, instead of the console
        console.error(err);
        throw err;
    }
}), 'investors');
exports.actr = actr;
//# sourceMappingURL=investors.js.map