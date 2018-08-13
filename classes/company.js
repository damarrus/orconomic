module.exports = class Company 
{
    constructor(player, field, isCompany = false) 
    {
        this.player = player;
        this.field = field;
        this.isCompany = isCompany;
        this.credit = false;
    }
}