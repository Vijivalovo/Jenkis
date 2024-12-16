const express = require("express");
const AuctionsController = require ("../controllers/auctions");
const isAdmin = require ('../middleware/isAdmin');
const isAuth = require ('../middleware/isAuth');

const router = express.Router();

router.post("/createAuction", isAuth ,AuctionsController.createAuction);
router.post("/checkAuctions", AuctionsController.checkAuctions);

router.get("/listAuctions", isAuth, AuctionsController.listAuctions);
router.get("/findAuction/:id", AuctionsController.findAuction);
router.get("/find/:id", isAuth, AuctionsController.find);
router.get("/searchAuctions/", AuctionsController.searchAuctions);

router.delete("/deleteAuction/:id", AuctionsController.deleteAuction);

module.exports = router;
