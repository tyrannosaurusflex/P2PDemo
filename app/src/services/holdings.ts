import { spawnStateless } from 'nact';
import csv from 'csvtojson';

export class Message {
    constructor(fileLocation: string) {
        this.fileLocation = fileLocation;
    }
    public fileLocation: string;
};

type HoldingEntry = {
    investorId: number;
    accountId: string;
    balance: number;
};

export const actr = (parent: any) => {

    return spawnStateless(
        parent,
        async (msg: Message) => {
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

                const holdings = await csv(headerConfig).fromFile(msg.fileLocation);

                holdings.forEach(element => {

                    // probably better to use a library to convert / intialise into type if types are more complex
                    let entry: HoldingEntry = {
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
        },
        'holdings'
    )
};