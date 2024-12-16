const BitsService = require ('../services/bits');
const BitsShema = require ('../schemes/bits');

class BitsController
{
    async createBit(req, res, next)
    {
        try
        {
            let {auction_id, bit, timeBit} = req.body;

            timeBit = new Date();
            // var today = new Date();
            // var dd = String(today.getDate()).padStart(2, '0');
            // var mm = String(today.getMonth() + 1).padStart(2, '0');
            // var yyyy = today.getFullYear();
            // timeBit = yyyy + '-' + mm + '-' + dd;
            console.log("!!!!!!!!!!!");
            console.log(timeBit);
            console.log(bit);
            let user_id = req.userID;
            let data = {auction_id, user_id, bit};
            console.log(data);

            const {error} = BitsShema.createBit.validate(data);

            if(error)
            {
              console.log(error);
              res.status(400).json( {message : "Валидация создания ставки не была пройдена", errors : error.details});
            }

            const bitData = {auction_id, user_id, bit, timeBit};

            console.log(bitData);

            res.json({body : await BitsService.createBit(bitData), message: "Ставка успешно сделана", statusCode: 200 });
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async buySlotAlready(req, res, next)
    {
        try
        {
            let {auction_id, bit, timeBit} = req.body;

            timeBit = new Date();

            let user_id = req.userID;

            const bitData = {auction_id, user_id, bit, timeBit};

            let data = req.body;

            const {error} = BitsShema.buySlotAlready.validate(data);

            if(error)
            {
              console.log(error);
              res.status(400).json( {message : "Валидация покупки слота не была пройдена", errors : error.details});
            }

            console.log(bitData);

            res.json({body : await BitsService.buySlotAlready(bitData), message: "Слот успешно куплен сразу", statusCode: 200 });
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async listBits(req, res, next)
    {
        try
        {
            res.json({body : await BitsService.listBits(), message : "Список ставок успешно получен", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async findMaxBit(req, res, next)
    {
        try
        {
            let param = req.query.param;
            let value = req.query.value;

            res.json({body : await BitsService.findMaxBit(param , value), message : "Успешно найдены ставки", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async findBit(req, res, next)
    {
        try
        {
            let id = req.params.id;

            res.json( {body : await BitsService.findBit(id), message : "Ставка была найдена по id", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async findBitsByAuctionId(req, res, next)
    {
        try
        {
            let id = req.params.id;
            let user_id = req.userID;
            console.log("START FIND +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

            res.json( {body : await BitsService.findBitsByAuctionId(id, user_id), message : "Ставки были найдены по auction_id", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async searchBits(req, res, next)
    {
        try
        {
            const param = req.query.param;
            const value = req.query.value;
            console.log(param);
            console.log(value);

            res.json( {body : await BitsService.searchBits(param, value), message : "Список ставок по параметрам успешно получен", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async deleteBit(req, res, next)
    {
        try
        {
            let id = req.params.id;

            res.json({body : await BitsService.deleteBit(id), message : "Ставка успешно удалена", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }
}

module.exports = new BitsController();