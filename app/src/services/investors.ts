import { spawn } from 'nact';

export type Message = {
    investorId: number;
    accountId: string;
    balance: number;
};

export const actr = (parent: any, investorIdentifier: string) => {

    return spawn(
        parent,
        async (state: Array<Message> = [], msg: Message, ctx: any) => {
            try {
                state.push(msg);
            }
            catch (err) {
                // typically log to a log provider here, instead of the console
                console.error(err);
                throw err;
            }
        },
        investorIdentifier
    )
};