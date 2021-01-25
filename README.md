# P2P Interest Payments Exercise
Each morning at The P2P Investments Company, a batch job puts all the investors’ holdings for the previous day into a single log file of:

`'investor id','account id','balance in GBP'`

  

Another batch job `puts the daily interest` rate of each account into another log file of:

`'account id','daily % rate'`

However, there is a promotion on where each investor’s highest balance account has an additional 0.01% daily interest paid in addition to the daily rate.

  

# Task
Write a program in Node.js that when run will parse the `holdings.csv` and `rates.csv` files and print out the total portfolio value for each customer after daily interest has been paid. You can use any libraries you wish to.