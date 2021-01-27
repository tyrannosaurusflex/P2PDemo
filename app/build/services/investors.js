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
const actr = (parent, investorIdentifier) => {
    return nact_1.spawn(parent, (state = [], msg, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            state.push(msg);
        }
        catch (err) {
            // typically log to a log provider here, instead of the console
            console.error(err);
            throw err;
        }
    }), investorIdentifier);
};
exports.actr = actr;
//# sourceMappingURL=investors.js.map