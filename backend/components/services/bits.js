const ApiError = require('../errors/ApiError');
const BitsRepository = require ('../repository/bits');
const AuctionsService = require('../services/auctions');
const SlotsService = require ('../services/slots');
const UsersService = require ('../services/users');
const SoldsService = require ('../services/solds');

class BitsService
{
    async findMaxBit(param, value)
    {
        console.log("------------------------------------111111111111111111111111111111111111111111");
        const sortBits = await BitsRepository.findMaxBit(param, value);

        if(!sortBits)
        {
            throw ApiError.BadRequest("Не удалось найти по id.");
        }

        console.log(sortBits);

        return sortBits;
    }

    async createBit(bitData)
    {
        console.log("----------------123-------------------------------------------------------------------------");
        console.log(bitData.bit);
        console.log("-----------------------------------------------------------------------------------------");
        await AuctionsService.checkAuctions();

        const auction = await AuctionsService.findAuction(bitData.auction_id);
        if(auction != undefined)
        {
            const slot = await SlotsService.findSlot(auction.slot_id);
            console.log("-----------------------------------slot------------------------------------------------------");
            console.log(slot);

            const buyer = await UsersService.findById(bitData.user_id);
            console.log("-----------------------------------------------------------------------------------------");

            const param = "auction_id";
            console.log(bitData.auction_id);

            const maxBit = await BitsRepository.findMaxBit(param, bitData.auction_id);
            console.log(maxBit[0]);
            if(bitData.user_id != slot.user_id)
            {
                if(maxBit.length != 0)
                {
                    if(bitData.user_id != maxBit[0].user_id)
                    {
                        const NewBit = maxBit[0].bit + ( (slot.minPrice * slot.bidStep) / 100);
                        const wall = buyer.wallet;
                        console.log("------------------------------------wall-----------------------------------------------------");
                        console.log(wall);
                        console.log("-----------------------------------NewBit------------------------------------------------------");
                        console.log(NewBit);
            
                        if(wall >= NewBit)
                        {
                            let listBits = await BitsRepository.findUserBit(bitData.auction_id, bitData.user_id);
                            if(listBits.length != 0)
                            {
                                console.log("------------------------------------NewBit-------bitData.timeBit----------------listBits[0].id------------------------------");
                                console.log(NewBit);
                                console.log(bitData.timeBit);
                                console.log(listBits[0].id);
                                return await BitsRepository.updateBit(NewBit, bitData.timeBit, listBits[0].id);
                            }
                            else
                            {
                                bitData.bit = NewBit;
                                const newBit = await BitsRepository.createBit(bitData);
            
                                if(!newBit)
                                {
                                    throw ApiError.BadRequest("Переданы неверные параметры создания.");
                                }
            
                                return newBit;
                            }
                        }
                        else
                        {
                            throw ApiError.BadRequest("Сумма на счёте меньше, поставленной ставки.");
                        }
                    }
                    else
                    {
                        throw ApiError.BadRequest("Нельзя делать несколько ставок подряд");
                    }
                }
                else
                {
                    const NewBit = slot.minPrice + ( (slot.minPrice * slot.bidStep) / 100);
            
                    console.log("-----------------------------------NewBit------------------------------------------------------");
                    console.log(NewBit);
                    console.log(slot.minPrice);
                    console.log(slot.bidStep);
                    console.log("------------------------------------wall-----------------------------------------------------");
                    console.log(buyer.wallet);
        
                    if(buyer.wallet >= NewBit)
                    {
                        let listBits = await BitsRepository.findUserBit(bitData.auction_id, bitData.user_id);
                        if(listBits.length != 0)
                        {
                            return await BitsRepository.updateBit(NewBit, bitData.timeBit, listBits[0].id);
                        }
                        else
                        {
                            bitData.bit = NewBit;
                            const newBit = await BitsRepository.createBit(bitData);
        
                            if(!newBit)
                            {
                                throw ApiError.BadRequest("Переданы неверные параметры создания.");
                            }
        
                            return newBit;
                        }
                    }
                    else
                    {
                        throw ApiError.BadRequest("Сумма на счёте меньше, поставленной ставки.");
                    }
                }
            }
            else
            {
                throw ApiError.BadRequest("Нельзя делать ставку на свой же лот");
            }
        }
        else
        {
            throw ApiError.BadRequest("Слот уже продан");
        }
    }

    async buySlotAlready(bitData)
    {
        await AuctionsService.checkAuctions();
        console.log(bitData.auction_id);
        const auction = await AuctionsService.findAuction(bitData.auction_id);
        if(auction != undefined)
        {
            console.log("---------------------");
            console.log(auction);
            console.log("---------------------");
            const slot = await SlotsService.findSlot(auction.slot_id);
            console.log(slot);

            const buyer = await UsersService.findById(bitData.user_id);
            console.log(buyer);
            const seller = await UsersService.findById(slot.user_id);
            console.log(seller);

            const param = "auction_id";
            const maxBit = await BitsRepository.findMaxBit(param, auction.id);
            
            if(maxBit.length != 0)
            {
                if(maxBit[0].bit < slot.redemtionPrice)
                {
                    if(buyer.wallet >= slot.redemtionPrice)
                    {
                        let wallet = buyer.wallet - slot.redemtionPrice;
                        console.log(wallet);
                        const buyerBody = {wallet};
                        console.log("---------buyerWallet------------");
                        console.log(wallet);
                        console.log("---------------------");
                        await UsersService.updateUser(buyer.id, buyerBody);

                        wallet = seller.wallet + slot.redemtionPrice;
                        let earned = seller.earned + slot.redemtionPrice;
                        let numslot = seller.numslot - 1;
                        let sellerBody = {wallet, earned, numslot};
                        console.log("----------sellerBody-----------");
                        console.log(wallet);
                        console.log(earned);
                        console.log(numslot);
                        console.log("---------------------");
                        await UsersService.updateUser(seller.id, sellerBody);

                        await AuctionsService.deleteAuction(auction.id);
                        const status = "П";
                        console.log("--------newStatus-------------");
                        console.log(status);
                        console.log(auction.slot_id);
                        const slotData = {status};
                        console.log("---------------------");
                        await SlotsService.updateSlot(slotData, auction.slot_id);
                        
                        const slot_id = slot.id;
                        const user_id = buyer.id;
                        const soldPrice = slot.redemtionPrice;
                        console.log(slot.redemtionPrice);
                        const dateSale = bitData.timeBit;
                        const SoldData = {slot_id, user_id, soldPrice, dateSale};
                        console.log(SoldData);
                        
                        return await SoldsService.createSold(SoldData);
                    }
                    else
                    {
                        throw ApiError.BadRequest("Суммы на счёте не хватает на покупку Slot.");
                    }
                }
                else
                {
                    throw ApiError.BadRequest("Ставка уже превысила значения выкупа, вы не можете сразу купить Slot.");
                }
            }
            else
            {
                if(buyer.wallet >= slot.redemtionPrice)
                    {
                        let wallet = buyer.wallet - slot.redemtionPrice;
                        console.log(wallet);
                        const buyerBody = {wallet};
                        console.log("---------buyerWallet------------");
                        console.log(wallet);
                        console.log("---------------------");
                        await UsersService.updateUser(buyer.id, buyerBody);

                        wallet = seller.wallet + slot.redemtionPrice;
                        let earned = seller.earned + slot.redemtionPrice;
                        let numslot = seller.numslot - 1;
                        let sellerBody = {wallet, earned, numslot};
                        console.log("----------sellerBody-----------");
                        console.log(wallet);
                        console.log(earned);
                        console.log(numslot);
                        console.log("---------------------");
                        await UsersService.updateUser(seller.id, sellerBody);

                        await AuctionsService.deleteAuction(auction.id);
                        const status = "П";
                        console.log("--------newStatus-------------");
                        console.log(status);
                        console.log(auction.slot_id);
                        const slotData = {status};
                        console.log("---------------------");
                        await SlotsService.updateSlot(slotData, auction.slot_id);
                        
                        const slot_id = slot.id;
                        const user_id = buyer.id;
                        const soldPrice = slot.redemtionPrice;
                        console.log(slot.redemtionPrice);
                        const dateSale = bitData.timeBit;
                        const SoldData = {slot_id, user_id, soldPrice, dateSale};
                        console.log(SoldData);
                        
                        return await SoldsService.createSold(SoldData);
                    }
                    else
                    {
                        throw ApiError.BadRequest("Суммы на счёте не хватает на покупку Slot.");
                    }
            }
        }
        else
        {
            throw ApiError.BadRequest("Слот уже продан");
        }
    }

    async listBits()
    {
        const listBits = await BitsRepository.listBits();

        if(!listBits)
        {
            throw ApiError.BadRequest("Не удалось получить список Bits.");
        }

        return listBits;
    }

    async findBit(id)
    {
        const bit = await BitsRepository.findBit(id);

        if(!bit)
        {
            throw ApiError.BadRequest("Не удалось найти по id.");
        }

        return bit;
    }

    async findBitsByAuctionId(id, user_id)
    {
        const arrBits = await BitsRepository.findBitsByAuctionId(id);
        console.log(arrBits);

        if(!arrBits)
        {
            throw ApiError.BadRequest("Не удалось получить список ставок по auction_id");
        }

        let arr = [];

        for( let i = 0; i < arrBits.length; i++)
        {
            let id = arrBits[i].id;
            let user_id = arrBits[i].user_id;
            let user = await UsersService.findById(arrBits[i].user_id);
            let lastname = user.lastname;
            let bit = arrBits[i].bit;
            let timeBit = arrBits[i].timeBit;
            let userID = user_id;
            let body = {id, user_id, bit, timeBit, userID, lastname};
            arr.push(body);
        }

        return arr;
    }

    async searchBits(param, value)
    {
        const srchBits = await BitsRepository.searchBits(param, value);

        if(!srchBits)
        {
            throw ApiError.BadRequest("Переданы не верные параметры поиска.");
        }

        return srchBits;
    }

    async deleteBit(id)
    {
        return await BitsRepository.deleteBit(id);
    }

    async findUserBit(id)
    {
        const bitId = await BitsRepository.findUserBit(id);

        if(!bitId)
        {
            throw ApiError.BadRequest("Не удалось найти по id.");
        }

        return bitId;
    }
}

module.exports = new BitsService();