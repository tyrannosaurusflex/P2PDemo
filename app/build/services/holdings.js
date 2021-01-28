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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actr = void 0;
const nact_1 = require("nact");
const csvtojson_1 = __importDefault(require("csvtojson"));
const actr = (parent, message) => nact_1.spawn(parent, (state = { holdings: [], hasParsed: false }, message, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (!state.hasParsed) {
        try {
            const headerConfig = {
                noheader: true,
                headers: ['investorId', 'accountId', 'balance'],
                colParser: {
                    "investorId": "number",
                    "accountId": "string",
                    "balance": "number",
                },
                checkType: true
            };
            const holdings = yield csvtojson_1.default(headerConfig).fromFile(message.location);
            holdings.forEach(element => {
                let inv = element.investorId;
                if (inv == message.investorId) {
                    let accountHolding = {
                        accountId: element.accountId,
                        balance: element.balance
                    };
                    state.holdings.push(accountHolding);
                }
            });
            state.hasParsed = true;
            nact_1.dispatch(message.sender, { holdings: state.holdings, sender: ctx.self });
        }
        catch (err) {
            // typically log to a log provider here, instead of the console
            console.error(err);
            throw err;
        }
    }
}), message.investorId.toString());
exports.actr = actr;
//# sourceMappingURL=holdings.js.map