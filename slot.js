const getDepositeBtn = document.getElementById("btn");
document.getElementById("depositForm").addEventListener("submit", handleDeposit);

class Player {
    constructor(name, balance = 0) {
        this.name = name;
        this.balance = balance;
    }

    deposit() {
        const depositInput = document.getElementById("deposit").value;
        let numberDepositeAmount = parseFloat(depositInput);

        if (!isNaN(numberDepositeAmount) && numberDepositeAmount > 0) {  
            this.balance += numberDepositeAmount;
            console.log(`Deposited: ${numberDepositeAmount}, New Balance: ${this.balance}`);
        } else {
            console.log("Invalid deposit amount, try again");
        }
    }
}



const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A":2,
    "B":4,
    "C":6,
    "D":8
} 



const player = new Player("Petr");


getDepositeBtn.addEventListener("click", () => {
    player.deposit();
});


function handleDeposit(event) {
    event.preventDefault(); 

    let numberOflines = getNumberOfLines();
    if (numberOflines !== null) {
        const bet = getBet(player.balance, numberOflines);
        console.log("Bet:", bet);
    }
}

const getNumberOfLines = () => {
    const lines = document.getElementById("numberSlot").value; 
    let numberOflines = parseFloat(lines);

    if (!isNaN(numberOflines) && numberOflines > 0 && numberOflines < 3) {    
        return numberOflines;
    } else {
        console.log("Invalid number of lines");
        return null;
    }
};

const getBet = (balance, lines) => {
    const betInput = document.getElementById("bet").value; 
    let numberOfBet = parseFloat(betInput);

    if (!isNaN(numberOfBet) && numberOfBet > 0 && numberOfBet <= balance / lines) {
        return numberOfBet;
    } else {
        console.log("Invalid bet");
        return null;
    }
};

let numberOflines = getNumberOfLines();
if (numberOflines !== null) {
    const bet = getBet(player.balance, numberOflines);
    console.log(bet)
}
