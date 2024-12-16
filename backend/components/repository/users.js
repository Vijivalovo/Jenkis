const Users = require("../models/users");
const bcrypt = require("bcrypt");
const sequelize = require("../database/sequelize");

class UsersRepository
{
    async registration(role, lastname, firstname, patronymic,password, datebirth)
    {
        return await Users.create({lastname: lastname, firstname: firstname, patronymic: patronymic,role : role, datebirth: datebirth, password: password});
    }

    async searchForRegistration(lastname, firstname, patronymic)
    {
        return await Users.findOne({where: {lastname: lastname, firstname: firstname, patronymic: patronymic}});
    }

    async hashpassword(password)
    {
        return await bcrypt.hash(password, 5);
    }

    async sortParam(order)
    {
        console.log({order});
        return await Users.findAll(order);
    }

    async search(param,value)
    {
        return await Users.findOne({where:{[param]: value}});
    }
    
    async findById(id)
    {
        return await Users.findOne( { where: {id: id} } )
    }

    async createUser(userData)
    {
        try
        {   
            console.log(userData);
            console.log("6666");
            return await Users.create(userData);
        }
        catch(err)
        {
            console.log(err);
            return next(err);
        }
    }

    async lists()
    {   
        console.log("44444");
        return await Users.findAll({ raw: true });
    }

    async listMax()
    {
        return await Users.findAll({order : [['earned', 'DESC']]})
    }

    async delete(id) 
    {
        console.log(id);
        return await Users.destroy({ where: { id: id } });
    }

    async updateUser(UserId, NewBody)
    {
        console.log("lol");
        return Users.update(NewBody, {where: {id: UserId}});
    }

    async changePassword(id, passwords)
    {
        const user = await Users.findOne( {where: {id: id}});
        const oldIsCorrect = user.validatePassword(passwords.oldPassword);
        let userData = new Object();

        if(oldIsCorrect)
        {
            userData.password = bcrypt.hashSync(passwords.newPassword, bcrypt.genSaltSync(8));
        }
        else
        {
            throw new NotAcceptableError("Incorrect old password");
        }

        return Users.update(userData, {where: {id: id}});
    }
}

module.exports = new UsersRepository();