import { start, dispatch } from 'nact';

import { Message as holdingsMessage, actr as holdingsActr } from './services/holdings';

const system = start();
const holdings = holdingsActr(system);
const msg = new holdingsMessage("./resources/holdings.csv");

dispatch(holdings, msg);