const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Categories = sequelize.define("categories",
{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
}
);

module.exports = Categories;