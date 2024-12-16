const Categories = require ('../models/categories');

class CategoriesRepository
{
    async createCategory(title)
    {
        return await Categories.create(title);
    }

    async findCategory(id)
    {
        return await Categories.findOne( {where : {id : id}});
    }

    async listCategories()
    {
        return await Categories.findAll({raw:true});
    }

    async deleteCategory(id)
    {
        return await Categories.destroy( { where : { id : id}});
    }
}

module.exports = new CategoriesRepository();