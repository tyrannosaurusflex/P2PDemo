import { query, start } from 'nact';
import { actr as Calculator, Message as CalcMsg } from '../src/services/calculation';
import { State as InvestorAccount } from '../src/services/investors';

test('test_that_promotion_is_calculated_correctly', async () => {

  console.table = jest.fn();


  const accountId = "investor-1";
  const investorId = 1;

  const fakeAccount: InvestorAccount = {
    investorId,
    holdings: [{ accountId: "AC1", balance: 10 }, { accountId: "AC2", balance: 20 }],
    rates: new Map<string, number>([["AC1", 0.10], ["AC2", 0.20]])
  };

  const system = start();

  const msg: CalcMsg = {
    sender: system,
    investorAccount: fakeAccount
  };

  const sut = Calculator(start(), accountId);

  const accounts = await query(sut, (sender) => Object.assign(msg, { sender }), 250);

  const expected = [{
    investorId: investorId,
    accountId: "AC1 (0.1%)",
    previousBalance: 10,
    currentBalance: 11
  },
  {
    investorId: investorId,
    accountId: "AC2 (0.2% + 0.01)",
    previousBalance: 20,
    currentBalance: 24.2
  }];

  expect(accounts.balances).toMatchObject(expected);

});