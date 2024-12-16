const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Bits = sequelize.define ("bits",
{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    bit:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    timeBit:{
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

module.exports = Bits;