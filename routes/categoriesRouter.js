const { Router } = require("express");
const router = Router();
const categoriesController = require("../controllers/categoriesController");
const {
  categoryCreateRules,
  categoryUpdateRules,
} = require("../validators/categoryValidator");
const handleValidation = require("../validators/handleValidation");

router.get("/", categoriesController.categoriesListGet);
router.post(
  "/",
  categoryCreateRules,
  handleValidation,
  categoriesController.categoriesCreatePost,
);
router.patch(
  "/:id",
  categoryUpdateRules,
  handleValidation,
  categoriesController.categoriesUpdatePatch,
);
router.delete("/:id", categoriesController.categoriesDelete);

module.exports = router;
