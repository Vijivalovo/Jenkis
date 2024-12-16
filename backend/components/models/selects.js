const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Selects = sequelize.define ("selects",
{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
}
);

module.exports = Selects;