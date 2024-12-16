const SlotsService = require('../services/slots');
const CategoriesService = require ('../services/categories');
const SlotsSchema = require ('../schemes/slots');

class SlotsController
{
    async createSlot(req, res, next)
    {
        try
        {
            let {category, minPrice, redemtionPrice, saleTime, bidStep, status} = req.body;

            let user_id = req.userID;

            let slotData = {user_id, category, minPrice, redemtionPrice, saleTime, bidStep, status};

            console.log(slotData);

            let data = req.body;

            const arr = await CategoriesService.arrCategories();

            console.log(arr);

            if(!arr.includes(data.category))
            {
                res.status(400).json( {message : "Валидация слота при создании не была пройдена", statusCode : 404});
            }
            else
            {
                const {error} = SlotsSchema.createSlot.validate(data);

                if(error)
                {
                console.log(error);
                res.status(400).json( {message : "Валидация слота при создании не была пройдена", errors : error.details});
                }

                console.log(slotData);

                res.json({body : await SlotsService.createSlot(slotData), message: "Слот успешно создан", statusCode: 200 });
            }
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async searchSlots(req, res, next)
    {
        try
        {
            const param = req.query.param;
            const value = req.query.value;
            console.log(param);
            console.log(value);

            res.json({body : await SlotsService.searchSlots(param, value), message : "Успешно найдены слоты по параметрам", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async findSlot(req, res, next)
    {
        try
        {
            let id = req.params.id;
            console.log("THIS IS ID FOR SLOTS");
            console.log(id);

            res.json({body : await SlotsService.findSlot(id), message : "Успешно найден слот по id", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async listSlots(req, res, next)
    {
        try
        {
            res.json({body : await SlotsService.listSlots(req.role), message : "Успешно выведен список всех слотов", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async listSlotsById(req, res, next)
    {
        try
        {
            const id = req.userID;
            console.log("THIS IS YOUR ID SLOTS");
            console.log(id);
            const arrSlots = await SlotsService.listSlotsById(id);

            let arr = [];

            for(let i = 0; i < arrSlots.length; i++)
            {
                let bidStep = arrSlots[i].bidStep;
                let category = arrSlots[i].category;
                let id = arrSlots[i].id;
                let minPrice = arrSlots[i].minPrice;
                let redemtionPrice = arrSlots[i].redemtionPrice;
                let saleTime = arrSlots[i].saleTime;
                let status = arrSlots[i].status;
                let user_id = arrSlots[i].user_id;
                let Role = req.role;
                let body = {bidStep, category, id, minPrice, redemtionPrice, saleTime, status, user_id, Role};
                arr.push(body);
            }

            res.json({body : arr, message : "Успешно выведен список всех слотов по id", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async listWaitSlots(req, res, next)
    {
        try
        {
            res.json({body : await SlotsService.listWaitSlots(), message : "Успешно выведен список всех слотов в состоянии ожидания", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async listWaitSlotsById(req, res, next)
    {
        try
        {
            const id = req.userID;
            
            res.json({body : await SlotsService.listWaitSlotsById(id), message : "Успешно выведен список всех слотов в состоянии ожидания по id", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async listAuctionSlots(req, res, next)
    {
        try
        {
            res.json({body : await SlotsService.listAuctionSlots(), message : "Успешно выведен список всех слотов в состоянии продажи", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async listAuctionSlotsById(req, res, next)
    {
        try
        {
            const id = req.userID;
            const arrSlots = await SlotsService.listAuctionSlotsById(id);

            let arr = [];

            for(let i = 0; i < arrSlots.length; i++)
            {
                let bidStep = arrSlots[i].bidStep;
                let category = arrSlots[i].category;
                let id = arrSlots[i].id;
                let minPrice = arrSlots[i].minPrice;
                let redemtionPrice = arrSlots[i].redemtionPrice;
                let saleTime = arrSlots[i].saleTime;
                let status = arrSlots[i].status;
                let user_id = arrSlots[i].user_id;
                let Role = req.role;
                let body = {bidStep, category, id, minPrice, redemtionPrice, saleTime, status, user_id, Role};
                arr.push(body);
            }

            res.json({body : arr, message : "Успешно выведен список всех слотов в состоянии продажи по id", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async listSoldSlots(req, res, next)
    {
        try
        {
            res.json({body : await SlotsService.listSoldSlots(), message : "Успешно выведен список всех слотов в состоянии продано", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async listSoldSlotsById(req, res, next)
    {
        try
        {
            const id = req.userID;

            res.json({body : await SlotsService.listSoldSlotsById(id), message : "Успешно выведен список всех слотов в состоянии продано по id", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async deleteSlot(req, res, next)
    {
        try
        {
            let {id} = req.body;

            res.json({body : await SlotsService.deleteSlot(id), message : "Слот удалён успешно", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async updateSlot(req, res, next)
    {
        try
        {
            let {id, category, minPrice, redemtionPrice, saleTime, bidStep, status} = req.body;

            let data = req.body;

            let newId = id;
            console.log(newId);
            console.log(category);

            const {error} = SlotsSchema.updateSlot.validate(data);

            if(error)
            {
              console.log(error);
              res.status(400).json( {message : "Валидация слота при его изменении не прошла", errors : error.details});
            }

            res.json({body : await SlotsService.updateSlot(data, newId), message: "Поля слота были успешно изменены", statusCode: 200 });
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async listMaxSlots(req, res, next)
    {
        try
        {
            res.json({body : await SlotsService.listMaxSlots(), message : "Успешно выведен упорядоченный список слотов", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }
}

module.exports = new SlotsController();