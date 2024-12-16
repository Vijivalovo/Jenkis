const Auctions = require ('../models/auctions');

class AuctionsRepository
{
    async createAuction(auctionData)
    {
        return await Auctions.create(auctionData);
    }

    async listAuctions()
    {
        return await Auctions.findAll({raw : true});
    }

    async findAuction(id)
    {
        console.log(id);
        return await Auctions.findOne( { where : { id: id}});
    }

    async findAuctionBySlotId(id)
    {
        return await Auctions.findOne( { where : { slot_id : id}});
    }

    async searchAuctions(param, value)
    {
        return await Auctions.findAll( { where : { [param] : value}});
    }

    async deleteAuction(id)
    {
        return await Auctions.destroy( { where : { id : id}});
    }

    async find(slot_id)
    {
        return await Auctions.findOne( { where : { slot_id : slot_id}});
    }
}

module.exports = new AuctionsRepository();