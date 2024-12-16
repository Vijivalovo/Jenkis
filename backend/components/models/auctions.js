const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Auctions = sequelize.define( "auctions",
{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    startTime:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        timezone: false
    },
    endTime:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        timezone: false
    }
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
}
);

module.exports = Auctions;