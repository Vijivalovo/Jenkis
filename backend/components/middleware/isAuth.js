const ApiError = require('../errors/ApiError');
const TokensService = require('../services/tokens');
const UsersService = require('../services/users');

module.exports = function (req, res, next)
{
    try
    {
        const authorizationHeader = req.headers.authorization;
        
        if(!authorizationHeader)
        {
            throw next(ApiError.UnathorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];

        if(!accessToken)
        {
            throw next(ApiError.UnathorizedError());
        }

        const userData = TokensService.validateAccessToken(accessToken);

        if(!userData)
        {
            throw next(ApiError.UnathorizedError());
        }

        req.userID = userData.NewId;
        console.log("----------------------------------------------1111111111111---------------------------");
        next();
    }
    catch(err)
    {
        return next(ApiError.UnathorizedError());
    }
}