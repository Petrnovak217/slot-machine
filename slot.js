const getDepositeBtn = document.getElementById("btn");
document.getElementById("betForm").addEventListener("submit", game);
const error = document.getElementById("error-message");
const slotContainer = document.querySelector(".slotContainer");
const depositCapital = document.getElementById("gameCash");
const winLoseContainer = document.querySelector(".win-lose-conatiner");


class Player {
    constructor(name, balance = 0) {
        this.name = name;
        this.balance = balance;
    }

    deposit() {
        const depositInput = document.getElementById("deposit").value;
        let numberDepositeAmount = depositInput;

        if (!isNaN(numberDepositeAmount) && numberDepositeAmount > 0) {  
            this.balance += Number(numberDepositeAmount);
            depositCapital.innerHTML = this.balance;
            error.textContent = "";

        } else {
            error.textContent = "Invalid deposit amount, try again";
        }
    }
}



const ROWS = 3;
const COLS = 3;

//How many symbols are there in the slots
const SYMBOLS_COUNT = {
    "A":4,
    "B":8,
    "C":12,
    "D":16
} 

//multiplying values ​​in a slot

const SYMBOL_VALUES = {
    "A":50,
    "B":8,
    "C":4,
    "D":2
}


const player = new Player("Petr");


getDepositeBtn.addEventListener("click", () => {
    player.deposit();
});

/* Získává počet aktivních linií, kontroluje jejich platnost (1–3) a vrací hodnotu nebo chybu. */
const getNumberOfLines = () => {
    const lines = document.getElementById("numberSlot").value; 
    let numberOflines = Number(lines);
    error.textContent = "";
    if (!isNaN(numberOflines) && numberOflines > 0 && numberOflines <= 3) {    
        return numberOflines;
       
    } else {
        error.textContent = "Neplatné číslo dodržte rozsah (1-3)";
        return null;
    }
};

/* Nastavuje a ověřuje sázku hráče, odečítá ji ze zůstatku a zobrazuje výsledek. */
const getBet = (balance, lines) => {
    const betInput = document.getElementById("bet").value; 
    let numberOfBet = Number(parseFloat(betInput).toFixed(2));  

    
    if (!isNaN(numberOfBet) && numberOfBet > 0 ) {
        if (player.balance - numberOfBet >= 0 && numberOfBet <= balance/lines) {  
            player.balance -= numberOfBet * lines;  
            depositCapital.innerHTML = player.balance;
            return numberOfBet;
            error.textContent = "";
        } else {
            error.textContent = "Nedostatečný zůstatek! Nemůžeš vsadit tolik.";
            return null;
        }
    } else {
        error.textContent = "Nevhodná částka";
        return null;
    }
};

/* Náhodně generuje válce slotového automatu.
   - Vytvoří seznam symbolů na základě jejich počtu.
   - Pro každý válec vybírá náhodné symboly bez opakování.
   - Vrací matici válců se zamíchanými symboly. 
*/
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

/* Převádí válce na řádky otočením matice. */
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

/* Vykreslí herní řádky do HTML s formátovanými symboly. */
const printRows = (rows) =>{
    let fullString = "";

    for (const row of rows) {
        let rowString = "";

        for (const symbol of row) {
            rowString += `<span class="oneSymbol">${symbol}</span>`;
        }

        fullString += rowString + "<br>"; 
    }

    slotContainer.innerHTML = fullString; 
};

/* Vypočítává výhry hráče podle aktivních linií.
   - Kontroluje, zda všechny symboly v řádku jsou stejné.
   - Označuje výherní symboly vizuálním efektem.
   - Přidává výhry do hráčova zůstatku a vrací částku. */
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let firstSymbol = symbols[0];  
        let allSame = symbols.every(symbol => symbol === firstSymbol);  

        if (allSame) {

            const oneSymbol = document.getElementsByClassName("oneSymbol");

            [...oneSymbol].forEach((Item)=>{
                Item.classList.add("win");
            })

            winnings += Number((bet * SYMBOL_VALUES[firstSymbol]).toFixed(2));  
        }

        
    }
    player.balance += winnings;
    depositCapital.innerHTML = player.balance;
    return winnings;
};

/* Spouští jedno kolo hry:
   - Získává počet linií a sázku.
   - Roztočí válce, převede je na řádky a zobrazí výsledek.
   - Vypočítá výhru a zobrazí hráči. */
function game(event) {
    event.preventDefault(); 

    let numberOflines = getNumberOfLines();
    const bet = getBet(player.balance, numberOflines);

    if (numberOflines !==null && bet !==null) {
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows,bet,numberOflines);
        winLoseContainer.textContent = winnings > 0 ? `Vyhrál si: ${winnings}` : "Prohrál si";
    }
}














