import { spawnStateless } from 'nact';

export class message {
    constructor(name: string) {
        this.name = name;
    }
    public name: string;
};

export const actr = (system: any) => {
    return spawnStateless(
        system,
        (msg, ctx) => console.log(`Hello ${msg.name}`),
        'hiactor'
    )
};