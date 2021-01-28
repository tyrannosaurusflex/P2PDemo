import { spawn } from 'nact';
import csv from 'csvtojson';

type State = {
    hasParsed: boolean,
    rate: number
};

export type Message = {
    accountId: string,
    location: string
};

export const actr = (parent: any, accountId: string) =>
    spawn(
        parent,
        async (state: State = { hasParsed: false, rate: null }, message, ctx: any) => {
            try {
                const headerConfig = {
                    noheader: true,
                    headers: ['accountId', 'dailyRate'],
                    colParser: {
                        "accountId": "string",
                        "dailyRate": "number"
                    },
                    checkType: true
                };
                const rates = await csv(headerConfig).fromFile(message.location);

                rates.forEach(element => {
                    let rt = element.accountId;
                    if (rt == message.accountId) {

                        state.rate = element.dailyRate;
                        state.hasParsed = true;
                    }
                });
                // console.log({ rate: state.rate, id: message.accountId });
            }
            catch (err) {
                // typically log to a log provider here, instead of the console
                console.error(err);
                throw err;
            }
        },
        accountId
    );