const express = require("express");
const router = express.Router({ mergeParams: true });
const pantryController = require("../controllers/pantry_controller");

router
  .route("/")
  .get(pantryController.pantry_get_all)
  .post(pantryController.pantry_add)
  .delete(pantryController.pantry_delete);

module.exports = router;
