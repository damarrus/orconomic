const Field = require('./field.js');

module.exports = class Game 
{
    constructor()
    {
        this.phase = 0;
        this.player_turn = 0;
        this.players = [];
        this.status = 0;
        this.fields = [];
        this.setFields();
        this.current_player = false;
    }

    start() {
        this.current_player = players[0];
        this.current_player.turn = true;
    }

    setFields() {
        var fields = require('./../data/fields.js');
        fields.sort(function(a, b){
            return Math.random() - 0.5; // TODO сделать нормальную перетасовку полей
        });
        
        fields.forEach(function(field, i, arr){
            this.fields.push(new Field(field));
        }, this);
    }

    setStartCompany(field_key, player) {
        this.setCompany(field_key, player);
    }

    setCompany(field_key, player) {
        var field = this.fields[field_key];
        field.setCompany(player);
    }

    nextTurn() {
        this.current_player.turn = false;
        this.current_player = players[this.players.indexOf(current_player) + 1]
    }

    dice(double = false) {
        return Math.floor(Math.random() * 6) + 1;
    }
}