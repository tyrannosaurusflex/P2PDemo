import { start, dispatch } from 'nact';
import { actr as InvestorSvc } from './services/investors';


const system = start();
const investorSvc = InvestorSvc(system);

dispatch(investorSvc, 1);
dispatch(investorSvc, 2);
dispatch(investorSvc, 3);
dispatch(investorSvc, 4);
dispatch(investorSvc, 5);
dispatch(investorSvc, 6);
dispatch(investorSvc, 7);

// from api / messages / somewhere else