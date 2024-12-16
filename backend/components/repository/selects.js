const Selects = require ("../models/selects");
const { Op } = require('sequelize');

class SelectsRepositoery
{
    async createSelect(selectData)
    {
        return await Selects.create(selectData);
    }

    async listSelects()
    {
        return await Selects.findAll({raw: true});
    }

    async findByUserIdSlotId(userId, slotId)
    {
        return await Selects.findOne( { where : { user_id : userId, slot_id : slotId}});
    }

    async findSelectById(id)
    {
        return await Selects.findAll( { where : { user_id : id}});
    }

    async searchSelects(param, value)
    {
       return await Selects.findAll( { where : { [param] : value}});
    }

    async deleteSelect(id)
    {
        return await Selects.destroy( {where : {id : { [Op.in] : id }}});
    }

    async listSelectsById(user_id)
    {
        return await Selects.findAll( { where : { user_id : user_id}});
    }

    async delete(id)
    {
        return await Selects.destroy( { where : { id : id}});
    }
}

module.exports = new SelectsRepositoery();