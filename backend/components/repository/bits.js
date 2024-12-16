const Bits = require ('../models/bits');

class BitsRepository
{
    async createBit(bitData)
    {
        return await Bits.create(bitData);
    }

    async listBits()
    {
        return Bits.findAll( { raw : true});
    }

    async findBit(id)
    {
        return await Bits.findOne( {where : { id : id}});
    }

    async findBitsByAuctionId(id)
    {
        return await Bits.findAll( { where : {auction_id : id}, order : [['bit', 'DESC']]});
    }

    async searchBits(param, value)
    {
        return await Bits.findAll( {where : {[param] : value}});
    }

    async deleteBit(id)
    {
        return await Bits.destroy({where : {id : id}});
    }

    async findMaxBit(param, value)
    {
        return await Bits.findAll( { where : { [param] : value}, order : [['bit', 'DESC']]});
    }

    async findUserBit(auction_id, user_id)
    {
        return await Bits.findAll( { where : { user_id : user_id, auction_id : auction_id}});
    }

    async updateBit(bit, timeBit, id)
    {
        return await Bits.update({bit : bit, timeBit : timeBit} , {where : { id : id}});
    }
}

module.exports = new BitsRepository();