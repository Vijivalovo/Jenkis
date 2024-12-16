const ApiError = require ('../errors/ApiError');
const SelectsRepository = require ('../repository/selects');
const AuctionsRepository = require ('../repository/auctions');
const SlotService = require ('../services/slots');

class SelectsService
{
    async createSelect(selectData)
    {
        const newSelect = await SelectsRepository.createSelect(selectData);

        console.log(newSelect);

        if(!newSelect)
        {
            throw ApiError.BadRequest("Переданы не верные данные для создания.");
        }

        return newSelect;
    }

    async listSelects()
    {
        const selects = await SelectsRepository.listSelects();

        if(!selects)
        {
            throw ApiError.BadRequest("Не удалось получить список Selects.");
        }

        return selects;
    }

    async findSelectById(id)
    {
        const select = await SelectsRepository.findSelectById(id);

        if(!select)
        {
            throw ApiError.BadRequest("Не удалось найти по id.");
        }

        return select;
    }

    async searchSelects(param, value)
    {
        const srchSelects = await SelectsRepository.searchSelects(param,value);

            if(!srchSelects)
            {
                throw ApiError.BadRequest("Переданы не верные парметры для поиска.");
            }

            return srchSelects;
    }

    async deleteSelect(id)
    {
        const param = "slot_id";
        const value = id;

        const selects = await SelectsRepository.searchSelects(param, value);
        console.log(selects);

        if(!selects)
        {
            throw ApiError.BadRequest("Не верно переданы парметры для удаления");
        }

        let arr = [];

        for( let i = 0; i < selects.length; i++)
        {
            arr.push(selects[i].id)
        }
        console.log(arr);

        return await SelectsRepository.deleteSelect(arr);
    }

    async listSelectsById(id)
    {
        const arrSelects = await SelectsRepository.listSelectsById(id);
        console.log("arrSelects");
        console.log(arrSelects);

        if(!arrSelects)
        {
            throw ApiError.BadRequest("Не удалось вывести список выбранных вами слотов");
        }

        let arrAuctions = [];

        for(let i = 0; i < arrSelects.length; i++)
        {
            let auction = await AuctionsRepository.findAuctionBySlotId(arrSelects[i].slot_id);
            console.log(auction);
            let slot = await SlotService.findSlot(arrSelects[i].slot_id);
            console.log(slot);
            let id = arrSelects[i].id;
            let user_id = id;
            let slot_id = slot.id;
            let category = slot.category;
            let startTime = auction.startTime;
            let endTime = auction.endTime;
            let body = {category, id , user_id, startTime, endTime, slot_id};
            arrAuctions.push(body);
        }

        console.log(arrAuctions);

        return arrAuctions;
    }

    async delete(id)
    {
        return await SelectsRepository.delete(id);
    }
}

module.exports = new SelectsService();