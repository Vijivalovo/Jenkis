const express = require("express");
const BitsController = require ("../controllers/bits");
const isAdmin = require ('../middleware/isAdmin');
const isAuth = require ('../middleware/isAuth');

const router = express.Router();

router.post("/createBit",isAuth, BitsController.createBit);
router.post("/buySlotAlready", isAuth, BitsController.buySlotAlready);

router.get("/listBits", BitsController.listBits);
router.get("/findBit/:id", BitsController.findBit);
router.get("/findBitsByAuctionId/:id", isAuth, BitsController.findBitsByAuctionId);
router.get("/searchBits/", BitsController.searchBits);

router.delete("/delete/:id", BitsController.deleteBit);

module.exports = router;