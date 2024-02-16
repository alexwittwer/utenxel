const express = require("express");
const router = express.Router({ mergeParams: true });
const ingredientController = require("../controllers/ingredient_controller");

router
  .route("/")
  .get(ingredientController.ingredient_get_all)
  .post(ingredientController.ingredient_create);
router
  .route("/:ingredientid")
  .get(ingredientController.ingredient_get_single)
  .put(ingredientController.ingredient_update)
  .delete(ingredientController.ingredient_delete);

module.exports = router;
