const Company = require('./company.js');

module.exports = class Field 
{
    constructor(field) {
        this.id = field.id;
        this.name = field.name;
        this.profit = field.profit;
        this.max_companies = field.max_companies;
        this.number_dice = field.number_dice;
        this.cost = (field.number_dice != 2 ? field.number_dice : 12);
        this.probability = field.probability;
        this.active = false;
        this.active_side = false;
        this.companies = [];
        this.startups = [];
    }

    setCompany(player) {
        var company = new Company(player, this, true);
        this.companies.push(company);
        player.companies.push(company);
    }
}