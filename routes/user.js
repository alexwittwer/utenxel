const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controllers/user_controller");

router
  .route("/")
  .get(userController.user_get_all)
  .post(userController.user_create);
router
  .route("/:userid")
  .get(userController.user_get_single)
  .patch(userController.user_update)
  .delete(userController.user_delete);

module.exports = router;
