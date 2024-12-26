const sequelize = require("./sequelize");

class DataBase {
    async connect() {
        if (!sequelize.connectionManager.pool) {
            console.log("Re-establishing database connection...");
        }

        await sequelize.sync();
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }

    async close() {
        console.log("Closing database connection.");
        await sequelize.close();
    }
}

module.exports = new DataBase();
