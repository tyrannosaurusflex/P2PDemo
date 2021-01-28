import { spawn, dispatch } from 'nact';
import csv from 'csvtojson';

export type AccountHolding = {
    accountId: string;
    balance: number;
};

type State = {
    hasParsed: boolean,
    holdings: Array<AccountHolding>
};

export type Message = {
    investorId: number,
    location: string,
    sender: any
};

export const actr = (parent: any, message: Message, investorId: string) =>
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
                    dispatch(message.sender, { holdings: state.holdings, sender: ctx.self });
                }
                catch (err) {
                    // typically log to a log provider here, instead of the console
                    console.error(err);
                    throw err;
                }
            }




        },
        investorId
    );