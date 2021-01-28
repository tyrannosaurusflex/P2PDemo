import { spawn, dispatch } from 'nact';
import csv from 'csvtojson';
import { actr as RatesSvc, Message as RateMsg } from './rates';

type AccountHolding = {
    accountId: string;
    balance: number;
};

type State = {
    hasParsed: boolean,
    holdings: Array<AccountHolding>
};

export type Message = {
    investorId: number,
    location: string
};

export const actr = (parent: any, message: Message) =>
    spawn(
        parent,
        async (state: State = { holdings: [], hasParsed: false }, message, ctx: any) => {

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

                    const holdings = await csv(headerConfig).fromFile(message.location);

                    holdings.forEach(element => {

                        let inv = element.investorId;
                        if (inv == message.investorId) {

                            let accountHolding: AccountHolding = {
                                accountId: element.accountId,
                                balance: element.balance
                            };
                            state.holdings.push(accountHolding);
                        }
                    });

                    state.hasParsed = true;
                    // console.log({ holdings: state.holdings, id: message.investorId });
                }
                catch (err) {
                    // typically log to a log provider here, instead of the console
                    console.error(err);
                    throw err;
                }

                state.holdings.forEach(holding => {

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
                    dispatch(rateService, accountIdMessage);

                });
            }




        },
        message.investorId.toString()
    );