const Slots = require ('../models/slots');
const SoldsService = require ('../services/solds');
const { Op } = require('sequelize');

class SlotsRepository
{
    async createSlot(slotData)
    {
        return await Slots.create(slotData);
    }

    async searchSlots(param, value)
    {
        return await Slots.findAll( {where : { [param] : value}});
    }

    async findSlot(id)
    {
        return await Slots.findOne( { where : { id : id}});
    }

    async listSlots()
    {
        return await Slots.findAll({raw : true});
    }

    async listSlotsById(id)
    {
        return await Slots.findAll({ where : { status : { [Op.in] : ["О", "А"] }, user_id : { [Op.in] : id } } } );
    }

    async listSlotsId(arrSlot)
    {
        return await Slots.findAll({ where : { id : { [Op.in] : arrSlot } } } );
    }

    async listWaitSlots()
    {
        return await Slots.findAll( { where : {status : 'О'}});
    }

    async listWaitSlotsById(id)
    {
        return await Slots.findAll( { where : {user_id : id, status : 'О'}});
    }

    async listAuctionSlots()
    {
        return await Slots.findAll( { where : { status : 'А'}});
    }

    async listAuctionSlotsById(id)
    {
        return await Slots.findAll( { where : {user_id : id, status : 'А'}});
    }

    async listSoldSlots()
    {
        return await Slots.findAll( { where : { status : 'П'}});
    }

    async listSoldSlotsById(arrId)
    {
        return await Slots.findAll( { where : {id : { [Op.in] : arrId }, status : 'П'}});
    }

    async deleteSlot(id)
    {
        return await Slots.destroy( {where : {id : id}});
    }

    async updateSlot(slotData, id)
    {
        return await Slots.update(slotData, { where : {id : id}});
    }
}

module.exports = new SlotsRepository();