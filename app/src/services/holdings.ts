import { spawnStateless, dispatch } from 'nact';
import { Message as HoldingEntry, actr as InvestorSvc } from './investors';

import csv from 'csvtojson';

export class Message {
    constructor(fileLocation: string) {
        this.fileLocation = fileLocation;
    }
    public fileLocation: string;
};


export const actr = (parent: any) => {

    return spawnStateless(
        parent,
        async (msg: Message, ctx: any) => {
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

                const holdings = await csv(headerConfig).fromFile(msg.fileLocation);

                holdings.forEach(element => {

                    // probably better to use a library to convert / intialise into type if types are more complex
                    let entry: HoldingEntry = {
                        investorId: element.investorId,
                        accountId: element.accountId,
                        balance: element.balance,
                    };

                    let investorIdentifier = `investor-${entry.investorId}`;

                    let investorService;

                    if (ctx.children.has(investorIdentifier)) {
                        investorService = ctx.children.get(investorIdentifier);

                    } else {
                        console.log("----------");
                        investorService = InvestorSvc(ctx.self, investorIdentifier);
                    }

                    dispatch(investorService, entry);
                    console.log(ctx);
                });

            }
            catch (err) {
                // typically log to a log provider here, instead of the console
                console.error(err);
                throw err;
            }
        },
        'holdings'
    )
};