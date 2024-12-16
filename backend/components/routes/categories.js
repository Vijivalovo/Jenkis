const express = require("express");
const CategoriesController = require ("../controllers/categories");
const isAdmin = require ('../middleware/isAdmin');
const isAuth = require ('../middleware/isAuth');

const router = express.Router();

router.post("/createCategory", CategoriesController.createCategory);

router.get("/findCategory/:id", CategoriesController.findCategory);
router.get("/listCategories", CategoriesController.listCategories);
router.get("/arrCategories", CategoriesController.arrCategories);

router.delete("/deleteCategory/:id", CategoriesController.deleteCategory);

module.exports = router;