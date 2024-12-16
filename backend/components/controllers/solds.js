const SoldsService = require ('../services/solds');

class SoldsController
{
    async createSold(req, res, next)
    {
        try
        {
            let {slot_id, user_id, soldPrice, dateSale, endTime} = req.body;

            dateSale = endTime;

            const soldData = {slot_id, user_id, soldPrice, dateSale};

            console.log(soldData);

            res.json({body : await SoldsService.createSold(soldData), message : "Слот успешно продан", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async listSolds(req, res, next)
    {
        try
        {
            res.json({body : await SoldsService.listSolds(), message : "Список Проданных слотов получен", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async listMaxSolds(req, res, next)
    {
        try
        {
            res.json({body : await SoldsService.listMaxSolds(), message : "Список самых дорогих проданных слотов получен", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async findSold(req, res, next)
    {
        try
        {
            let id = req.params.id;

            res.json({body : await SoldsService.findSold(id), message : "Успешно найден проданных слот по id", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async searchSolds(req, res, next)
    {
        try
        {
            const param = req.query.param;
            const value = req.query.value;
            console.log(param);
            console.log(value);

            res.json({body : await SoldsService.searchSolds(param, value), message : "Успешно найдены проданные слоты по параметрам", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async deleteSold(req, res, next)
    {
        try
        {
            let id = req.params.id;

            res.json({body :  await SoldsService.deleteSold(id), message : "Проданный слот успешно удалён", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }
}

module.exports = new SoldsController();