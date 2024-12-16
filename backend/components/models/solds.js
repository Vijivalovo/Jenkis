const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Solds = sequelize.define ( "solds",
{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    soldPrice:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dateSale:{
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

module.exports = Solds;