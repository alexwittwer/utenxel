const express = require("express");
const router = express.Router({ mergeParams: true });
const pantryController = require("../controllers/pantry_controller");

router
  .route("/")
  .get(pantryController.pantry_get_all)
  .post(pantryController.pantry_create);
router
  .route("/:pantryid")
  .get(pantryController.pantry_get_single)
  .patch(pantryController.pantry_update)
  .delete(pantryController.pantry_delete);

module.exports = router;
