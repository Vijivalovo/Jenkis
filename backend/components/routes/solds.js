const express = require("express");
const SoldsController = require ("../controllers/solds");
const isAdmin = require ('../middleware/isAdmin');
const isAuth = require ('../middleware/isAuth');

const router = express.Router();

router.post("/createSold", SoldsController.createSold);

router.get("/listSolds", SoldsController.listSolds);
router.get("/listMaxSolds", SoldsController.listMaxSolds);
router.get("/findSold/:id", SoldsController.findSold);
router.get("/searchSolds/", SoldsController.searchSolds);

router.delete("/deleteSold/:id", SoldsController.deleteSold);

module.exports = router;