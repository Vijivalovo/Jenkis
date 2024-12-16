const SelectsService = require('../services/selects');
const SelectsRepositoery = require ('../repository/selects');
const ApiError = require('../errors/ApiError');

class SelectsController
{
    async createSelect(req, res, next)
    {
        try
        {
            let user_id = req.userID;
            let { slot_id } = req.body;

            const select = await SelectsRepositoery.findByUserIdSlotId(user_id, slot_id);

            if(select)
            {
                throw ApiError.BadRequest("Нельзя выбрать два раза слот");
            }
            else
            {
                let selectData = {user_id, slot_id};

                console.log(selectData);

                res.json({body : await SelectsService.createSelect(selectData), message : "Выбранный успешно создан", statusCode : 200});
            }
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async listSelects(req, res, next)
    {
        try
        {
            res.json({body : await SelectsService.listSelects(), message : "Список выбранных успешно получен", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async listSelectsById(req, res, next)
    {
        try
        {
            const id = req.userID;
            console.log(id);

            res.json({body : await SelectsService.listSelectsById(id), message : "Список выбранных успешно получен", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async findSelectById(req, res, next)
    {
        try
        {
            let id = req.uerID;

            res.json({body :  await SelectsService.findSelectById(id), message : "Выбранный был успешно найден по id", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async searchSelects(req, res, next)
    {
        try
        {
            let param = req.query.param;
            let value = req.query.value;

            res.json({body : await SelectsService.searchSelects(param, value), message : "Список выбранных по параметрам успешно получен", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async deleteSelect(req, res, next)
    {
        try
        {
            let id = req.params.id;
            console.log("THIS IS ID DELETE");
            console.log(id);

            res.json({body :  await SelectsService.deleteSelect(id), message : "Выбранный удалён успешно", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async delete(req, res, next)
    {
        try
        {
            let id = req.params.id;
            console.log("********************************************");
            console.log(id);

            res.json({body :  await SelectsService.delete(id), message : "Выбранный удалён успешно", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }
}

module.exports = new SelectsController();