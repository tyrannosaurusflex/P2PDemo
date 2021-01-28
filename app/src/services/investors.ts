import { spawn, dispatch, query } from 'nact';

import { actr as HoldingsSvc, Message as HoldingsMsg } from './holdings';

export const actr = (parent: any) =>
    spawn(
        parent,
        async (state: any, msg: number, ctx: any) => {
            try {

                let holdingsService;

                let userIdMessage: HoldingsMsg = {
                    location: "./resources/holdings.csv",
                    investorId: msg
                }

                if (ctx.children.has(msg.toString())) {
                    holdingsService = ctx.children.get(msg.toString());
                } else {
                    holdingsService = HoldingsSvc(ctx.self, userIdMessage);
                }

                // dispatch(holdingsService, userIdMessage);

                const result = await query(holdingsService, (sender) => Object.assign(msg, {sender}), 250); // Set a 250ms timeout
                console.log(result);

            }
            catch (err) {
                // typically log to a log provider here, instead of the console
                console.error(err);
                throw err;
            }
        },
        'investors'
    );