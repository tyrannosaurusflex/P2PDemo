import { start, dispatch } from 'nact';

import { Message as HoldingsMessage, actr as HoldingsSvc } from './services/holdings';

const system = start();
const holdingsService = HoldingsSvc(system);
const msg = new HoldingsMessage("./resources/holdings.csv");

dispatch(holdingsService, msg);