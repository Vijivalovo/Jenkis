const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const bcrypt = require("bcrypt");

const Users = sequelize.define( "users", 
{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    role:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    lastname:{
        type: Sequelize.STRING,
        allowNull: false
    },
    firstname:{
        type: Sequelize.STRING,
        allowNull: false
    },
    patronymic:{
        type: Sequelize.STRING,
        allowNull: false
    },
    datebirth:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    numslot:{
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    earned:{
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    wallet:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1000
    }
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
}
);

module.exports = Users;