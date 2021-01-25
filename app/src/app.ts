import { start, dispatch } from 'nact';
import { message, actr } from './services/hiactor';

const system = start();

const greeting = actr(system);
const msg = new message("John Doe");

dispatch(greeting, msg);
