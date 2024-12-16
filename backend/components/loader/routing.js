const express = require("express");
const router = express.Router();

const UsersRouter = require("../routes/users");
const TokensRouter = require("../routes/tokens");
const BitsRouter = require("../routes/bits");
const SlotsRouter =  require("../routes/slots");
const SelectsRouter =  require("../routes/selects");
const AuctionsRouter =  require("../routes/auctions");
const SoldsRouter =  require("../routes/solds");
//const mongoLogger = require("../logger/mongoLogger");
const CategoriesRouter = require ('../routes/categories');
//const errorHandler = require("../logger/errorHandler");

//router.use(mongoLogger.storeEvent);
router.use("/users", UsersRouter);
router.use("/tokens",TokensRouter);
router.use("/bits",BitsRouter);
router.use("/slots", SlotsRouter);
router.use("/selects", SelectsRouter);
router.use("/auctions", AuctionsRouter);
router.use("/solds", SoldsRouter);
router.use("/categories", CategoriesRouter);
//router.use(errorHandler);

module.exports = router;