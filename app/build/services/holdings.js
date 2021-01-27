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
exports.actr = exports.Message = void 0;
const nact_1 = require("nact");
const csvtojson_1 = __importDefault(require("csvtojson"));
class Message {
    constructor(fileLocation) {
        this.fileLocation = fileLocation;
    }
}
exports.Message = Message;
;
const actr = (parent) => {
    return nact_1.spawnStateless(parent, (msg) => __awaiter(void 0, void 0, void 0, function* () {
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
            // with larger files problably best to subscribe to it async
            // https://github.com/Keyang/node-csvtojson#asynchronously-process-each-line-from-csv-url
            const holdings = yield csvtojson_1.default(headerConfig).fromFile(msg.fileLocation);
            holdings.forEach(element => {
                // probably better to use a library to convert / intialise into type if types are more complex
                let entry = {
                    investorId: element.investorId,
                    accountId: element.accountId,
                    balance: element.balance,
                };
                console.log(entry);
            });
        }
        catch (err) {
            // typically log to a log provider here, instead of the console
            console.error(err);
            throw err;
        }
    }), 'holdings');
};
exports.actr = actr;
//# sourceMappingURL=holdings.js.map