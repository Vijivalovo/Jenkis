const Express = require("./express");
const Routing = require("./routing");

const express = require("express");
const router = express.Router();

router.use(Express);
router.use(Routing);

module.exports = router;