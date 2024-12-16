const express = require("express");
const SlotsController = require ("../controllers/slots");
const isAdmin = require ('../middleware/isAdmin');
const isAuth = require ('../middleware/isAuth');
const isRole = require("../middleware/isRole");

const router = express.Router();

router.post("/createSlot", isAuth, SlotsController.createSlot);
router.post("/updateSlot", SlotsController.updateSlot);

router.get("/searchSlots/", SlotsController.searchSlots);
router.get("/findSlot/:id", SlotsController.findSlot);
router.get("/listSlots", isRole, SlotsController.listSlots);
router.get("/listMaxSlots", isAuth, SlotsController.listMaxSlots);
router.get("/listSlotsById",isRole, isAuth, SlotsController.listSlotsById);
router.get("/listWaitSlots", SlotsController.listWaitSlots);
router.get("/listWaitSlotsById", isAuth, SlotsController.listWaitSlotsById);
router.get("/listAuctionSlots", SlotsController.listAuctionSlots);
router.get("/listAuctionSlotsById",isRole, isAuth, SlotsController.listAuctionSlotsById);
router.get("/listSoldSlots", SlotsController.listSoldSlots);
router.get("/listSoldSlotsById", isAuth, SlotsController.listSoldSlotsById);

router.delete("/delete", SlotsController.deleteSlot);

module.exports = router;