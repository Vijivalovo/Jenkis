const express = require("express");
const TokensControllers = require("../controllers/tokens");

const router = express.Router();

router.delete("/delete/:id", TokensControllers.delete);

module.exports = router;