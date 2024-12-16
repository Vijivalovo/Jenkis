const ApiError = require ('../errors/ApiError');
const AuctionsRepository = require ('../repository/auctions');
const BitsRepository = require ('../repository/bits');
const BitsService = require ('../services/bits');
const SoldsService = require ('../services/solds');
const UsersService = require ('../services/users');
const SlotsService = require ('../services/slots');
const SelectsService = require ('../services/selects');

class AuctionsService
{
    async createAuction(auctionData)
    {
        const findAuction = await AuctionsRepository.findAuction(auctionData.slot_id);

        if(findAuction)
        {
            throw ApiError.BadRequest("Слот уже выставлен на аукцион");
        }
        else
        {
            const newAuction = await AuctionsRepository.createAuction(auctionData);

            if(!newAuction)
            {
                throw ApiError.BadRequest("Переданы не верные парметры для создания.");
            }

            const status = "А";
            const slotData = {status};

            await SlotsService.updateSlot(slotData,auctionData.slot_id);

            return newAuction;
        }
    }

    async listAuctions(id1)
    {
        const auctions = await AuctionsRepository.listAuctions();
        console.log(auctions);

        if(!auctions)
        {
            throw ApiError.BadRequest("Не удалось вывести список Auctions.");
        }

        let arr = [];

        for ( let i = 0 ; i < auctions.length; i++)
        {
            let user_id = id1;
            let slot_id = auctions[i].slot_id;
            let id = auctions[i].id;
            let startTime = auctions[i].startTime;
            let endTime = auctions[i].endTime;
            let body = {user_id, id, slot_id, startTime, endTime};
            arr.push(body);
        }

        return arr;
    }

    async findAuction(id)
    {
        console.log(id);
        const auction = await AuctionsRepository.findAuction(id);
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        console.log(auction);
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');

        if(!auction)
        {
            throw ApiError.BadRequest("Не удалось найти по id.");
        }

        return auction;
    }

    async searchAuctions(param, value)
    {
        const srchAuctions = await AuctionsRepository.searchAuctions(param, value);

        if(!srchAuctions)
        {
            throw ApiError.BadRequest("Переданы не верные параметры ддля поиска.");
        }

        return srchAuctions;
    }

    async deleteAuction(id)
    {
        return await AuctionsRepository.deleteAuction(id);
    }

    async checkAuctions()
    {
        let returnArr = [];
        let nowTime = new Date();

        const listAuctions = await AuctionsRepository.listAuctions();
        console.log("-----------------listAuctions----------------------------");
        console.log(listAuctions);
        console.log("---------------------------------------------");

        for(let i = 0; i < listAuctions.length; i++)
        {
            console.log("------------------nowTime---------------------------");
            console.log(nowTime);
            console.log("---------------------------------------------");
            console.log("---------------------listAuctions[i].endTime------------------------");
            console.log(listAuctions[i].endTime);
            console.log("---------------------------------------------");
            if(listAuctions[i].endTime < nowTime)
            {
                console.log("---------------------------------------------");
                console.log("true")
                console.log("---------------------------------------------");
            }

            if(listAuctions[i].endTime < nowTime)
            {
                const auction_id = "auction_id";
                const sortListForMaxBit = await BitsRepository.findMaxBit(auction_id, listAuctions[i].id);

                console.log("-----------------sortListForMaxBit----------------------------");
                console.log(sortListForMaxBit);
                console.log("---------------------------------------------");

                if(sortListForMaxBit != null)
                {
                    for( let g = 0; g < sortListForMaxBit.length;g++)
                    {
                        const buyer = await UsersService.findById(sortListForMaxBit[g].user_id);

                        console.log("-----------------buyer----------------------------");
                        console.log(buyer);
                        console.log("---------------------------------------------");

                        if(buyer.wallet >= sortListForMaxBit[g].bit)
                        {
                            let wallet = buyer.wallet - sortListForMaxBit[g].bit;
                            let newBody = {wallet};
                            console.log("-----------------newBodyBuyer----------------------------");
                            console.log(newBody);
                            console.log("---------------------------------------------");
                            await UsersService.updateUser(buyer.id, newBody);

                            const slot = await SlotsService.findSlot(listAuctions[i].slot_id);
                            console.log("-----------------slot----------------------------");
                            console.log(slot);
                            console.log("---------------------------------------------");
                            const seller = await UsersService.findById(slot.user_id);
                            console.log("-----------------seller----------------------------");
                            console.log(seller);
                            console.log("---------------------------------------------");
                            let earned = sortListForMaxBit[g].bit;
                            earned = earned + seller.earned;
                            wallet = seller.wallet + earned;
                            let numslot = seller.numslot - 1;
                            let newBody1 = {earned,wallet, numslot};
                            console.log("-----------------newBody1Seller----------------------------");
                            console.log(newBody1);
                            console.log("---------------------------------------------");
                            await UsersService.updateUser(seller.id, newBody1);

                            await AuctionsRepository.deleteAuction(listAuctions[i].id);
                            await SelectsService.deleteSelect(slot.id);

                            const status = "П";
                            let bodyStatus = {status};
                            await SlotsService.updateSlot(bodyStatus, slot.id);

                            let user_id = buyer.id;
                            let slot_id = slot.id;
                            let soldPrice = sortListForMaxBit[g].bit;
                            let dateSale = listAuctions[i].endTime;
                            let bodySold = {user_id, slot_id, soldPrice, dateSale}

                            const newSold =  await SoldsService.createSold(bodySold);
                            returnArr.push(newSold);
                            break;
                        }
                    }
                }
                else
                {
                    const slot = await SlotsService.findSlot(listAuctions[i].slot_id);
                    console.log("-----------------slot----------------------------");
                    console.log(slot);
                    console.log("---------------------------------------------");
                    const status = "О";
                    let bodyStatus = {status};
                    await SlotsService.updateSlot(bodyStatus, slot.id);

                    const newSold = await AuctionsRepository.deleteAuction(listAuctions[i].id);
                    returnArr.push(newSold);
                }
            }
        }

        return returnArr;
    }

    async find(slot_id)
    {
        const auction = await AuctionsRepository.find(slot_id);

        if(!auction)
        {
            throw ApiError.BadRequest("Не удалось найти аукцион");
        }

        return auction;
    }
}

module.exports =  new AuctionsService();