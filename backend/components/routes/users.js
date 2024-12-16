const express = require("express");
const UsersController = require("../controllers/users");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const isRole = require("../middleware/isRole");

const router = express.Router();

router.post("/registration", UsersController.registration);
router.post("/login", UsersController.login);
router.post("/logout", UsersController.logout);
router.post("/createUser", UsersController.createUser);
router.post("/updateUser/:id", UsersController.updateUser);
router.post("/refresh", UsersController.refresh);

router.get("/getRoleAndId",isAuth, isRole, UsersController.getRoleAndId);
router.get("/search/", UsersController.search);
router.get("/findById",isAuth, UsersController.findById);
router.get("/list",isAuth, isAdmin, UsersController.list);
router.get("/listMax",isAuth, UsersController.listMax);

router.delete("/delete/:id", UsersController.delete);

module.exports = router;
