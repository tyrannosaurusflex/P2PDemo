# P2P Interest Payments Exercise
## Overview
Each morning at The P2P Investments Company, a batch job puts all the investors’ holdings for the previous day into a single log file of:

`'investor id','account id','balance in GBP'`

Another batch job `puts the daily interest` rate of each account into another log file of:

`'account id','daily % rate'`

However, there is a promotion on where each investor’s highest balance account has an additional 0.01% daily interest paid in addition to the daily rate.

  

## Task
Write a program in Node.js that when run will parse the `holdings.csv` and `rates.csv` files and print out the total portfolio value for each customer after daily interest has been paid. You can use any libraries you wish to.  

---

## Steps to see output:
Prerequisites : docker-compose is recommented  


> 1. run `docker-compose run compile` to build the app
> 2. run `docker-compose run run-app` to run and see the output
> 3. run `docker-compose run test` to run tests
> 4. run `docker-compose run console` to sh into the console of the container (for development purposes)

Alernatively: (in the `/app` directory):

> `npm install && npm start` to build and run the app
> `npm t` to run tests