const AuctionsService = require ('../services/auctions');

class AuctionsController
{
    async createAuction(req, res, next)
    {
        try
        {
            let {slot_id, saleTime} = req.body;
            console.log(req.body);

            let startTime = new Date();
            let endTime = new Date();
            // var today = new Date();
            // var dd = String(today.getDate()).padStart(2, '0');
            // var mm = String(today.getMonth() + 1).padStart(2, '0');
            // var yyyy = today.getFullYear();
            // startTime = yyyy + '-' + mm + '-' + dd;
            // endTime = "2022-11-10";
            endTime = endTime.setMinutes(startTime.getMinutes() + 6);
            const auctionData = {slot_id, startTime, endTime};
            console.log(auctionData);

            res.json({body :  await AuctionsService.createAuction(auctionData), message : "Слот успешно выставлен на аукцион", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async listAuctions(req, res, next)
    {
        try
        {
            const id = req.userID;
            console.log("THIS IS USER ID");
            console.log(id);

            res.json( {body : await AuctionsService.listAuctions(id), message : "Список всех аукционов успешно получен", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async findAuction(req, res, next)
    {
        try
        {
            let id = req.params.id;

            res.json({body : await AuctionsService.findAuction(id), message : "Аукцион был успешно найден по id", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async searchAuctions(req, res, next)
    {
        try
        {
            const param = req.query.param;
            const value = req.query.value;
            console.log(param);
            console.log(value);

            res.json({body :  await AuctionsService.searchAuctions(param , value), message : "Список аукционов по параметрам был успешно получен", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async deleteAuction(req, res, next)
    {
        try
        {
            let id = req.params.id;

            res.json({body : await AuctionsService.deleteAuction(id), message : "Аукцион был успешно удален", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async checkAuctions(req, res, next)
    {
        try
        {
            res.json({body :  await AuctionsService.checkAuctions(), message : "Проверка всех аукционов успешно выполнена", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async find(req, res, next)
    {
        try
        {
            const slot_id = req.params.id;

            res.json({body :  await AuctionsService.find(slot_id), message : "Найден аукцион", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }
}

module.exports = new AuctionsController();