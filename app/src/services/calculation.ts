import { spawnStateless } from 'nact';
import { State as InvestorAccount } from "./investors";

//  "InvestorAccount" is being imported from investors, ideally should be a separate context
// i.e. this should have it's own types, just doing this for simplicity

const promotion: number = 0.01;

export const actr = (parent: any, investorId: string) =>
    spawnStateless(
        parent,
        (investorAccount: InvestorAccount, ctx: any) => {

            investorAccount.holdings.map(h => {

                const highestHolding = Math.max(...investorAccount.holdings.map(a => a.balance));

                const accountRate = investorAccount.rates.get(h.accountId);
                const rateToApply = accountRate == highestHolding ? accountRate + promotion : accountRate;

                const currentValue = h.balance + h.balance * rateToApply;

                console.table([{ investorAccount: investorAccount.investorId, account: h.accountId, balance: currentValue }]);
            });

        },
        investorId
    );