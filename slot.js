const getDepositeBtn = document.getElementById("btn");
document.getElementById("betForm").addEventListener("submit", handleDeposit);

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

//How many symbols are there in the slots
const SYMBOLS_COUNT = {
    "A":2,
    "B":4,
    "C":6,
    "D":8
} 

//multiplying values ​​in a slot

const SYMBOL_VALUES = {
    "A":2,
    "B":4,
    "C":3,
    "D":2
}


const player = new Player("Petr");


getDepositeBtn.addEventListener("click", () => {
    player.deposit();
});

const getNumberOfLines = () => {
    const lines = document.getElementById("numberSlot").value; 
    let numberOflines = parseFloat(lines);

    if (!isNaN(numberOflines) && numberOflines > 0 && numberOflines <= 3) {    
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

const spin = () =>{
    const symbols = [];

    for(const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
       for(let i = 0; i < count;i++){
            symbols.push(symbol);
       }
    }
    
   
    const reels = []
    for (let i = 0;i < COLS;i++){
        reels.push([]);
        const reelSymbols = [...symbols];

        for (let j =0; j < ROWS;j++){
            const randomIndex =Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }

    return reels;
}

const transpose = (reels) =>{
    const rows = [];

    for(let i =0; i < ROWS ;i++){
       
        rows.push([]);

        for(let j =0; j < COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}

const printRows = (rows) =>{
    for(const row of rows){
        let rowString = "";

        for(const [i,symbol] of rows.entries()){
            rowString += `|${symbol}|\n`
           
        }

        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let firstSymbol = symbols[0];  
        let allSame = symbols.every(symbol => symbol === firstSymbol);  

        if (allSame) {
            winnings += (bet * SYMBOL_VALUES[firstSymbol])/lines;  
        }
    }

    return winnings;
};


function handleDeposit(event) {
    event.preventDefault(); 

    let numberOflines = getNumberOfLines();
    const bet = getBet(player.balance, numberOflines);

    if (numberOflines !==null && bet !==null) {
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows,bet,numberOflines);
        console.log(`You ${player.name} won ${winnings}$`)
    }
}














