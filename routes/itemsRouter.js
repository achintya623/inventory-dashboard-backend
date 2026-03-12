const { Router } = require("express");
const router = Router();
const itemsController = require("../controllers/itemsController");
const {
  itemCreateRules,
  itemUpdateRules,
} = require("../validators/itemValidator");
const handleValidation = require("../validators/handleValidation");

router.get("/items/all", itemsController.itemsAllGet);
router.get("/categories/:id/items/all", itemsController.itemsCategoryAllGet);
router.get("/items", itemsController.itemsGet);
router.get("/categories/:id/items", itemsController.itemsListGet);
router.post(
  "/items",
  itemCreateRules,
  handleValidation,
  itemsController.itemsCreatePost,
);
router.patch(
  "/items/:id",
  itemUpdateRules,
  handleValidation,
  itemsController.itemsUpdatePatch,
);
router.delete("/items/:id", itemsController.itemsDelete);

module.exports = router;
