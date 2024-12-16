const ApiError = require ('../errors/ApiError');
const SoldsRepositopry = require ('../repository/solds');

class SoldsService
{
    async createSold(soldData)
    {
        const newSold = await SoldsRepositopry.createSold(soldData);

        if(!newSold)
        {
            throw ApiError.BadRequest("Переданы не верные параметры для создания.");
        }

        return newSold;
    }

    async listSolds()
    {
        const solds = await SoldsRepositopry.listSolds();

        if(!solds)
        {
            throw ApiError.BadRequest("Не удалось вывести список Solds.");
        }

        return solds;
    }

    async listMaxSolds()
    {
        const maxsolds = await SoldsRepositopry.listMaxSolds();

        if(!maxsolds)
        {
            throw ApiError.BadRequest("Не удалось вывести упорядоченный список Solds.");
        }

        return maxsolds;
    }

    async findSold(id)
    {
        const sold = await SoldsRepositopry.findSold(id);

        if(!sold)
        {
            throw ApiError.BadRequest("Не удалось найти по id.");
        }

        return sold;
    }

    async searchSolds(param, value)
    {
        const srchSolds =  await SoldsRepositopry.searchSolds(param, value);

        if(!srchSolds)
        {
            throw ApiError.BadRequest("Переданы не верные парметры для поиска.");
        }

        return srchSolds;
    }

    async deleteSold(id)
    {
        return await SoldsRepositopry.deleteSold(id);
    }
}

module.exports = new SoldsService();