const ApiError = require ('../errors/ApiError');
const SlotsRepository = require ('../repository/slots');
const SoldsService = require ('../services/solds');
const UsersService = require ('../services/users');

class SlotsService
{
    async createSlot(slotData)
    {
        const newData = await SlotsRepository.createSlot(slotData);
        const user = await UsersService.findById(slotData.user_id);
        const numslot = user.numslot + 1;
        const newBody = {numslot};
        await UsersService.updateUser(slotData.user_id, newBody);

        if(!newData)
        {
            throw ApiError.BadRequest("Переданы не верные параметры создания.");
        }

        return newData;
    }

    async searchSlots(param, value)
    {
        const srchSlots = await SlotsRepository.searchSlots(param, value);

        if(!srchSlots)
        {
            throw ApiError.BadRequest("Переданы не верные параметры поиска.");
        }

        return srchSlots;
    }

    async  findSlot(id)
    {
        const slot = await SlotsRepository.findSlot(id);

        if(!slot)
        {
            throw ApiError.BadRequest("Не удалось найти по id.");
        }

        return slot;
    }

    async listSlots(role)
    {
        const slots = await SlotsRepository.listSlots();
        
        if(!slots)
        {
            throw ApiError.BadRequest("Не удалось получить список Slots.");
        }

        let arr = [];

        for(let i = 0; i < slots.length; i++)
        {
            let bidStep = slots[i].bidStep;
            let category = slots[i].category;
            let id = slots[i].id;
            let minPrice = slots[i].minPrice;
            let redemtionPrice = slots[i].redemtionPrice;
            let saleTime = slots[i].saleTime;
            let status = slots[i].status;
            let user_id = slots[i].user_id;
            let Role = role;
            let body = {bidStep, category, id, minPrice, redemtionPrice, saleTime, status, user_id, Role};
            arr.push(body);
        }

        return arr;
    }

    async listSlotsById(id)
    {
        let arr = [];

        const arrSlotOA = await SlotsRepository.listSlotsById([id]);
        console.log(arrSlotOA);

        if(arrSlotOA.length != 0)
        {
            for(let i = 0; i < arrSlotOA.length; i++)
            {
                if(!arr.includes(arrSlotOA[i].id))
                {
                    arr.push(arrSlotOA[i].id);
                }
            }

            console.log(arr);

            const user_id = "user_id";
            const arrSolds = await SoldsService.searchSolds(user_id, id);
            console.log(arrSolds);

            if(arrSolds.length != 0)
            {
                for(let i = 0; i < arrSolds.length; i++)
                {
                    if(!arr.includes(arrSolds[i].slot_id))
                    {
                        arr.push(arrSolds[i].slot_id);
                    }
                }

                const arrSlots = await SlotsRepository.listSlotsId(arr);

                if(!arrSlots)
                {
                    throw ApiError.BadRequest("Не удалось найти по id");
                }

                return arrSlots;
            }
            else
            {
                const arrSlots = await SlotsRepository.listSlotsId(arr);

                return arrSlots;
            }
        }
        else
        {
            const user_id = "user_id";
            const arrSolds = await SoldsService.searchSolds(user_id, id);
            console.log(arrSolds);

            if(arrSolds.length != 0)
            {
                for(let i = 0; i < arrSolds.length; i++)
                {
                    if(!arr.includes(arrSolds[i].slot_id))
                    {
                        arr.push(arrSolds[i].slot_id);
                    }
                }

                const arrSlots = await SlotsRepository.listSlotsId(arr);

                if(!arrSlots)
                {
                    throw ApiError.BadRequest("Не удалось найти по id");
                }

                return arrSlots;
            }
            else
            {
                const arrSlots = [];

                return arrSlots;
            }
        }
    }

    async listWaitSlots()
    {
        const waitSlots = await SlotsRepository.listWaitSlots();

        if(!waitSlots)
        {
            throw ApiError.BadRequest("Не удалось вывести список Slots в состоянии ожидания.");
        }

        return waitSlots;
    }

    async listWaitSlotsById(id)
    {
        const waitSlots = await SlotsRepository.listWaitSlotsById(id);

        if(!waitSlots)
        {
            throw ApiError.BadRequest("Не удалось вывести список Slots по id в состоянии ожидания.");
        }

        return waitSlots;
    }

    async listAuctionSlots()
    {
        const auctionSlots = await SlotsRepository.listAuctionSlots();

        if(!auctionSlots)
        {
            throw ApiError.BadRequest("Не удалось вывести список Slots в состоянии Аукциона.");
        }

        return auctionSlots;
    }

    async listAuctionSlotsById(id)
    {
        const auctionSlots = await SlotsRepository.listAuctionSlotsById(id);
        console.log(auctionSlots);

        if(!auctionSlots)
        {
            throw ApiError.BadRequest("Не удалось вывести список Slots по id в состоянии Аукциона.");
        }

        return auctionSlots;
    }

    async listSoldSlots()
    {
        const soldSlots = await SlotsRepository.listSoldSlots();

        if(!soldSlots)
        {
            throw ApiError.BadRequest("Не удалось вывести список Slots в состоянии продано.");
        }

        return soldSlots;
    }

    async listSoldSlotsById(id)
    {
        const user_id = "user_id";
        const soldSlots = await SoldsService.searchSolds(user_id, id);
        console.log(soldSlots);

            let arrSlotId = [];

            for(let i = 0; i < soldSlots.length; i++)
            {
                arrSlotId.push(soldSlots[i].slot_id);
            }

            const slots = await SlotsRepository.listSoldSlotsById(arrSlotId);

            if(!slots)
            {
                throw ApiError.BadRequest("Не удалось вывести список Slots по id в состоянии продано.");
            }

            return slots;
    }

    async deleteSlot(id)
    {
        const slot = await SlotsRepository.findSlot(id);
        const user = await UsersService.findById(slot.user_id);
        const newNumSlot = user.numslot - 1;
        const newBody = {newNumSlot};
        await UsersService.updateUser(user.id, newBody);
        return await SlotsRepository.deleteSlot(id);
    }

    async updateSlot(slotData, id)
    {
        console.log(slotData);
        const updSlot = await SlotsRepository.updateSlot(slotData, id);

        if(!updSlot)
        {
            throw ApiError.BadRequest("Не удалось обновить Slot.");
        }

        return updSlot;
    }

    async listMaxSlots()
    {
        const arrSolds = await SoldsService.listMaxSolds();

        let arr = [];

        for( let i = 0; i < arrSolds.length; i++)
        {
            arr.push(arrSolds[i].slot_id);
        }

        let arrSlots = [];

        for(let i = 0; i < arr.length; i++)
        {
            let Slot = await SlotsRepository.findSlot(arr[i]);
            arrSlots.push(Slot);
        }
        console.log(arrSlots);

        let arrNewSlots = [];
        for(let i = 0; i < arrSlots.length; i++)
        {
            let id = arrSlots[i].id;
            let user_id = arrSlots[i].user_id;
            let category = arrSlots[i].category;
            let minPrice = arrSlots[i].minPrice;
            let redemtionPrice = arrSlots[i].redemtionPrice;
            let bidStep = arrSlots[i].bidStep;
            let status = arrSlots[i].status;
            let saleTimes = arrSolds[i].dateSale;
            let soldPrice = arrSolds[i].soldPrice;
            let saleTime = arrSlots[i].saleTime;
            let raiting = i + 1;
            let bodySlot = {id, user_id, category, minPrice, redemtionPrice, bidStep, status, saleTimes, soldPrice, raiting, saleTime};
            arrNewSlots.push(bodySlot);
        }
        console.log("after");
        console.log(arrNewSlots);

        if(!arrSlots)
        {
            throw ApiError.BadRequest("Не удалось вывести список слотов по убыванию");
        }

        return arrNewSlots;
    }
}

module.exports = new SlotsService();