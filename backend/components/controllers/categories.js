const CategoriesService = require ('../services/categories');

class CategoriesController
{
    async createCategory(req, res, next)
    {
        try
        {
            const title = req.body;

            res.json( {body : await CategoriesService.createCategory(title), message: "Категория успешно создана", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async findCategory(req, res, next)
    {
        try
        {
            const id = req.params.id;

            res.json({body : await CategoriesService.findCategory(id), message : "Категория была найдена", statusCode: 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async listCategories(req, res, next)
    {
        try
        {
            res.json({body: await CategoriesService.listCategories(), message : "Категории были найдены", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async arrCategories(req, res, next)
    {
        try
        {
            res.json({body: await CategoriesService.arrCategories(), message : "Массив названий категорий были найдены", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async deleteCategory(req, res, next)
    {
        try
        {
            const id = req.params.id;

            res.json({body : await CategoriesService.deleteCategory(id), message : "Категория успешно удалена", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }
}

module.exports = new CategoriesController();