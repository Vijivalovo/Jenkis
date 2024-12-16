const TokensServices = require("../services/tokens");

class TokensControllers
{
    async delete(req, res, next)
    {
        try
        {
            const tokenId = req.params.id;

            res.json({body : await TokensServices.delete(tokenId), message : "Токен успешно удалён", statusCode : 200});
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }
}

module.exports = new TokensControllers();