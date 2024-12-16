const { verify } = require('jsonwebtoken');
const ApiError = require('../errors/ApiError');
const TokensService = require('../services/tokens');

module.exports = function (req, res, next)
{
    try
    {
        const jwt_access_secret = "jwt-secret-key";
        const authorizationHeader = req.headers.authorization;
        console.log("------------authorizationHeader---------------");
        console.log(authorizationHeader);
        const accessToken = authorizationHeader.split(' ')[1];
        console.log("------------accessToken---------------");
        console.log(accessToken);
        const data = verify(accessToken,jwt_access_secret);

        console.log(data);

        console.log("------------data---------------");
        const role = data.NewRole;

        console.log("------------role---------------");
        console.log(role);
        console.log("---------------------------");

        req.role = role;
        next();
    }
    catch(err)
    {
        req.role = 1;
        next();
    }
}