class Game {
    constructor() { 
        this.gameTitle = "Roulette";
        this.values = [];
        this.populateValues();
        this.pot = 150;
    }

    populateValues() {
        for (let i = 1; i < 37; i++) {
            let col;
            if (i % 2 == 0) {
                col = 'red';
            } else {
                col = 'black';
            }
            this.values.push({
                number: i,
                color: col
            });
        }
        this.values.push({
            number: 0,
            color: 'green'
        });
        this.values.push({
            number: 0,
            color: 'green'
        });
    }

    spin(bet) {
        let selected = Math.floor(Math.random() * 38);
        let winnings;
        let won = false;
        if (bet.color == this.values[selected].color) {
            winnings = bet.amount * 2;
            won = true;
        } else { 
            winnings = (bet.amount * -1);
        }
        this.pot += winnings;
        console.log("you have spun a " + this.values[selected].color + " - " + this.values[selected].number + ". You have won " + winnings + ". Money left: " + this.pot);
        return won;
    }

}

let roulette = new Game;

function martin(bet, betNo, maxBets, inbet) {
    if (betNo == 0) {
        initialBet = bet;
    }
    if (betNo < maxBets && roulette.pot > 0) {
        if (roulette.spin(bet)) {
            martin(initialBet, betNo + 1, maxBets, initialBet);
        } else {
            martin({color: 'black', amount: bet.amount * 2 }, betNo + 1, maxBets, initialBet);
        }
    }
}

martin({ color: 'black', amount: 10 }, 0, 10);