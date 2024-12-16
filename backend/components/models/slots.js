const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Slots = sequelize.define ( "slots",
{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    category:{
        type: Sequelize.STRING,
        allowNull: false
    },
    minPrice:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    redemtionPrice:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    saleTime:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bidStep:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status:{
        type: Sequelize.CHAR(1),
        allowNull: false,
        defaultValue: 'О'
    }
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
}
);

module.exports = Slots;