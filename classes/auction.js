module.exports = class Auction 
{
    constructor(field)
    {
        this.field = field;
        this.current_bid = field.cost;
        this.players = [];
    }
    
    addPlayer(player) {

    }

    passPlayer(player) {

    }

    addBid(player, bid) {
        if (bid < this.current_bid) {
            return false;
        }
    }
}