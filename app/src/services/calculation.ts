import { spawnStateless } from 'nact';
import { State as InvestorAccount } from "./investors";

//  "InvestorAccount" is being imported from investors, ideally should be a separate context
// i.e. this should have it's own types, just doing this for simplicity

const promotion: number = 0.01;

type AccountBalance =
    {
        investorId: number,
        accountId: string,
        previousBalance: number
        currentBalance: number
    };

const calculatePromo = (investorAccount: InvestorAccount) => {

    const highestHolding = Math.max(...investorAccount.holdings.map(a => a.balance));

    const currentHolding = investorAccount.holdings.map(h => {

        const isHighestHolding = h.balance == highestHolding;

        const accountRate = investorAccount.rates.get(h.accountId);
        const rateToApply = isHighestHolding ? accountRate + promotion : accountRate;

        const currentValue = h.balance + h.balance * rateToApply;

        let balance: AccountBalance =
        {
            investorId: investorAccount.investorId,
            accountId: `${h.accountId} (${accountRate}%${isHighestHolding ? ` + ${promotion}` : ''})`,
            previousBalance: h.balance,
            currentBalance: currentValue
        };

        return balance;
    });

    return currentHolding;
};

export const actr = (parent: any, investorId: string) =>
    spawnStateless(
        parent,
        (investorAccount: InvestorAccount, ctx: any) => {
            console.table(calculatePromo(investorAccount));
        },
        investorId
    );