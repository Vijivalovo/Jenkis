const jwt = require('jsonwebtoken');
const tokenRepository = require('../repository/tokens');

class TokensService
{
    generateTokens(payload)
    {
        console.log("----------------------");
        console.log(payload);
        console.log("----------------------");
        const jwt_access_secret = "jwt-secret-key";
        const jwt_refresh_secret = "jwt-refresh-secret-key";
        const accessToken = "Bearer " + jwt.sign(payload, jwt_access_secret, {expiresIn:'50m'});
        const refreshToken = "Bearer " +  jwt.sign(payload, jwt_refresh_secret, {expiresIn:'1d'});
        console.log("----------------------");
        console.log(accessToken);
        console.log("----------------------");
        console.log(refreshToken);
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token)
    {
        const jwt_access_secret = "jwt-secret-key";
        try
        {
            const userData = jwt.verify(token, jwt_access_secret);
            return userData;
        }
        catch(err)
        {
            return null;
        }
    }

    validateRefreshToken(token)
    {
        const jwt_refresh_secret = "jwt-refresh-secret-key";
        try
        {
            const userData = jwt.verify(token, jwt_refresh_secret);
            return userData;
        }
        catch(err)
        {
            console.log(err);
            return null;
        }
    }

    async saveToken(userId, refreshToken)
    {
        const tokenData = await tokenRepository.findUser(userId);

        if(tokenData)
        {   
            const oldrefreshToken = tokenData.tokens;
            console.log("--------oldrefreshToken--------------");
            console.log(oldrefreshToken);
            console.log("----------------------");
            tokenData.tokens = refreshToken;
            console.log(refreshToken);
            return await tokenRepository.update(refreshToken, oldrefreshToken);
        }
        console.log("----------------------");
        console.log(userId);
        console.log("----------------------");
        console.log(refreshToken);
        console.log("----------------------");
        const token = await tokenRepository.create(userId, refreshToken);
        console.log("----------------------");
        console.log(token);
        console.log("----------------------");
        return token;
    }

    async delete(id)
    {
        return await tokenRepository.delete(id);
    }

    async removeToken(refreshToken, id)
    {
        console.log(id);
        console.log(refreshToken);
        const tokenId = await tokenRepository.findToken(id);
        console.log("----------------------");
        console.log(tokenId);
        console.log("----------------------");
        const tokenData = await tokenRepository.removeToken(refreshToken, tokenId.id);
        return tokenData;
    }

    async findToken(user_id)
    {
        console.log(user_id);
        return await tokenRepository.findToken(user_id);
    }
}

module.exports = new TokensService();