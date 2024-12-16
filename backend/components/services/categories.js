const ApiError = require('../errors/ApiError');
const CategoriesRepository = require ('../repository/categories');

class CategoriesService
{
    async createCategory(title)
    {
        const arrCategories = await CategoriesRepository.listCategories();

        let arr = [];

        for(let i = 0; i < arrCategories.length; i++)
        {
            arr.push(arrCategories[i].title);
        }

        console.log(arr);

        if(arrCategories != 0)
        {
            if(arr.includes(title.title))
            {
                throw ApiError.BadRequest("Категория уже существует");
            }
    
            console.log(title);
            const newCategory = await CategoriesRepository.createCategory(title);
    
            if(!newCategory)
            {
                throw ApiError.BadRequest("Не удалось создать категорию");
            }

            return newCategory;
        }
        else
        {
            console.log(title);
            const newCategory = await CategoriesRepository.createCategory(title);
    
            if(!newCategory)
            {
                throw ApiError.BadRequest("Не удалось создать категорию");
            }

            return newCategory;
        }
    }

    async findCategory(id)
    {
        const category = await CategoriesRepository.findCategory(id);

        if(!category)
        {
            throw ApiError.BadRequest("Не удалось найти по id");
        }

        return category;
    }

    async listCategories()
    {
        const arrCategories = await CategoriesRepository.listCategories();

        if(!arrCategories)
        {
            throw ApiError.BadRequest("Не удалось вывести список Categories");
        }

        return arrCategories;
    }

    async arrCategories()
    {
        const arrCategories = await CategoriesRepository.listCategories();
        
        if(!arrCategories)
        {
            throw ApiError.BadRequest("Не удалось вывести список Categories");
        }

        let arr = [];

        for( let i = 0; i < arrCategories.length; i++)
        {
            arr.push(arrCategories[i].title);
        }

        console.log(arr);

        return arr;
    }

    async deleteCategory(id)
    {
        const category = await CategoriesRepository.findCategory(id);

        if(!category)
        {
            throw ApiError.BadRequest("Не удалось найти категорию для удаления");
        }

        return await CategoriesRepository.deleteCategory(category.id);
    }
}

module.exports = new CategoriesService();