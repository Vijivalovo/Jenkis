const Sequelize = require('sequelize');

const sequelize = new Sequelize("Auction", "postgres", "admin", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false
});

module.exports = sequelize;
