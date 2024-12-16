const Solds = require ('../models/solds');

class SlodsRepository
{
    async createSold(soldData)
    {
        return await Solds.create(soldData);
    }

    async listSolds()
    {
        return await Solds.findAll( { raw : true});
    }

    async listMaxSolds()
    {
        return await Solds.findAll( {order : [['soldPrice', 'DESC']]});
    }

    async findSold(id)
    {
        return await Solds.findOne( { where : { id : id}});
    }

    async searchSolds(param, value)
    {
        return await Solds.findAll( { where : { [param] : value}});
    }

    async deleteSold(id)
    {
        return await Solds.destroy( { where : { id : id}});
    }
}

module.exports = new SlodsRepository();