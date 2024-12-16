const express = require("express");
const SelectsController = require ("../controllers/selects");
const isAdmin = require ('../middleware/isAdmin');
const isAuth = require ('../middleware/isAuth');

const router = express.Router();

router.post("/createSelect",isAuth, SelectsController.createSelect);

router.get("/listSelects",SelectsController.listSelects);
router.get("/listSelectsById", isAuth, SelectsController.listSelectsById);
router.get("/findSelectById/:id", SelectsController.findSelectById);
router.get("/searchSelects/", SelectsController.searchSelects);

router.delete("/deleteSelect/:id", SelectsController.deleteSelect);
router.delete("/delete/:id", SelectsController.delete);

module.exports = router;