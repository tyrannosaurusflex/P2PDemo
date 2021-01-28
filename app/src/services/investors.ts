import { spawn, query, dispatch } from 'nact';
import { actr as RatesSvc, Message as RateMsg } from './rates';
import { actr as HoldingsSvc, Message as HoldingsMsg, AccountHolding } from './holdings';
import { actr as PromoCalculationSvc } from "./calculation";

//  "AccountHolding" is being imported from holdings, ideally should be a separate context
// i.e. this should have it's own types, just doing this for simplicity

export type State = {
    investorId: number,
    holdings: Array<AccountHolding>,
    rates: Map<string, number>
};

// holding service per investor
const getHoldingService = (userIdMessage: HoldingsMsg, invId: number, ctx: any) => {
    let holdingsService;
    let investorId = `holding-${invId}`;
    if (ctx.children.has(investorId)) {
        holdingsService = ctx.children.get(investorId);
    } else {
        holdingsService = HoldingsSvc(ctx.self, userIdMessage, investorId);
    }
    return holdingsService;
};

// holding service per investor
const getRatesService = (holding: AccountHolding, ctx: any) => {
    let rateService;
    let accountId = `account-${holding.accountId}`;
    if (ctx.children.has(accountId)) {
        rateService = ctx.children.get(accountId);
    } else {
        rateService = RatesSvc(ctx.self, accountId);
    }
    return rateService;
};

// promotion calculation service per account
const getCalcService = (invId: number, ctx: any) => {
    let calcService;
    let accountId = `calculation-${invId}`;
    if (ctx.children.has(accountId)) {
        calcService = ctx.children.get(accountId);
    } else {
        calcService = PromoCalculationSvc(ctx.self, accountId);
    }
    return calcService;
};

export const actr = (parent: any) =>
    spawn(
        parent,
        async (state: State = { investorId: null, holdings: [], rates: new Map<string, number>() }, invId: number, ctx: any) => {
            try {

                let userIdMessage: HoldingsMsg = {
                    location: "./resources/holdings.csv",
                    investorId: invId,
                    sender: ctx.self
                }

                let holdingsService = getHoldingService(userIdMessage, invId, ctx);

                // get the users' end of day holdings
                const investorAccount = await query(holdingsService, (sender) => Object.assign(userIdMessage, { sender }), 250);
                state.holdings = investorAccount.holdings;

                await Promise.all(state.holdings.map(async holding => {

                    let accountIdMessage: RateMsg = {
                        location: "./resources/rates.csv",
                        accountId: holding.accountId
                    }

                    let rateService = getRatesService(holding, ctx);

                    // get rates associated with this holding
                    const rates = await query(rateService, (sender) => Object.assign(accountIdMessage, { sender }), 250);
                    state.rates.set(holding.accountId, rates.rate);
                }));

                state.investorId = invId;

                let calcService = getCalcService(invId, ctx);

                dispatch(calcService, state);

            }
            catch (err) {
                // typically log to a log provider here, instead of the console
                console.error(err);
                throw err;
            }
        },
        'investors'
    );