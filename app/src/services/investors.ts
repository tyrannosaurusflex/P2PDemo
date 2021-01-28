import { spawn, query } from 'nact';
import { actr as RatesSvc, Message as RateMsg } from './rates';
import { actr as HoldingsSvc, Message as HoldingsMsg, AccountHolding } from './holdings';
//  "AccountHolding" is being imported from holdings, ideally should be a separate context
// i.e. this should have it's own types, just doing this for simplicity

type State = {
    investorId: number,
    holdings: Array<AccountHolding>,
    rates: Map<string, number>
};

export const actr = (parent: any) =>
    spawn(
        parent,
        async (state: State = { investorId: null, holdings: [], rates: new Map<string, number>() }, msg: number, ctx: any) => {
            try {

                let holdingsService;

                let userIdMessage: HoldingsMsg = {
                    location: "./resources/holdings.csv",
                    investorId: msg,
                    sender: ctx.self
                }

                if (ctx.children.has(msg.toString())) {
                    holdingsService = ctx.children.get(msg.toString());
                } else {
                    holdingsService = HoldingsSvc(ctx.self, userIdMessage);
                }

                // get the users end of day holdings
                const investorAccount = await query(holdingsService, (sender) => Object.assign(userIdMessage, { sender }), 250);
                state.holdings = investorAccount.holdings;

                state.holdings.forEach(async holding => {

                    let rateService;

                    let accountIdMessage: RateMsg = {
                        location: "./resources/rates.csv",
                        accountId: holding.accountId
                    }

                    if (ctx.children.has(holding.accountId)) {
                        rateService = ctx.children.get(holding.accountId);
                    } else {
                        rateService = RatesSvc(ctx.self, holding.accountId);
                    }

                    const rates = await query(rateService, (sender) => Object.assign(accountIdMessage, { sender }), 250);
                    state.rates.set(holding.accountId, rates.rate);
                });

                state.investorId = msg;

            }
            catch (err) {
                // typically log to a log provider here, instead of the console
                console.error(err);
                throw err;
            }
        },
        'investors'
    );