const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Tokens = sequelize.define("tokens",
{
    tokens:{
        type: Sequelize.CHAR(344),
        allowNull:false
    }

},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
}
);

module.exports = Tokens;