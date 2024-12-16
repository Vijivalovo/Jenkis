const express = require("express");
const loader = require("./components/loader");
const DataBase = require("./components/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const errorMiddleware = require('./components/errors/ErrorHandling')
//const resDocument = require('../backend/components/res.json');
//const swaggerUi = require('swagger-ui-express');
const path = require("path");
const PORT = process.env.PORT || 3030;

// const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// mongoose
//   .connect("mongodb+srv://example:12345@cluster0.qyq5ebs.mongodb.net/?retryWrites=true&w=majority")
//   .then((res) => console.log("MongoDB connected..."))
//   .catch((err) => console.log(err));

DataBase.connect();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(loader);
app.use(errorMiddleware);

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(resDocument));

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

module.exports = app;
