const Tokens = require("../models/tokens");
const sequelize = require("../database/sequelize");

class TokensRepository
{
    async findUser(userId)
    {
        return await Tokens.findOne({where: {user_id: userId}});
    }

    async findToken(id)
    {
        return await Tokens.findOne({where: {user_id: id}});
    }

    async create(userId, refreshToken)
    {
        return await Tokens.create({user_id: userId, tokens: refreshToken})
    }

    async delete(id)
    {
        return await Tokens.destroy({where: {id:id}});
    }

    async removeToken(refreshToken)
    {
        const tokenData = await Tokens.destroy({where: {tokens: refreshToken}});

        return tokenData;
    }

    async update(refreshToken, oldrefreshToken)
    {
        return await Tokens.update({tokens: refreshToken},{where: {tokens: oldrefreshToken}});
    }
}

module.exports = new TokensRepository();