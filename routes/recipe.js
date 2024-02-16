const express = require("express");
const router = express.Router({ mergeParams: true });
const recipeController = require("../controllers/recipe_controller");

router
  .route("/")
  .get(recipeController.recipe_get_all)
  .post(recipeController.recipe_create);
router
  .route("/:recipeid")
  .get(recipeController.recipe_get_single)
  .put(recipeController.recipe_update)
  .delete(recipeController.recipe_delete);

module.exports = router;
