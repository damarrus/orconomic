module.exports = class Player 
{
    constructor(socket, name) 
    {
        this.socket = socket;
        this.key = false;
        this.number = 0;
        this.oracle = false;
        this.flawed = false;
        this.name = name;
        this.money = 21;
        this.trophy = 0;
        this.cards = 3;
        this.company_chips = 10;
        this.companies = [];
        this.turn = false;
    }
}

