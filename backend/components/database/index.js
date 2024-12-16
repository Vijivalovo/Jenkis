const sequelize = require("./sequelize");

require("../models");


class DataBase {
  async connect() {
    await sequelize.sync();
    sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
    })
    .catch(err => {
    console.error('Unable to connect to the database:', err);
    });
    console.log("DB connected");
  }
}

module.exports = new DataBase();