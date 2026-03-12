const categoriesDb = require("../db/queries/categoriesQueries");

exports.categoriesListGet = async (req, res) => {
  const categories = await categoriesDb.getAllCategories();
  res.json(categories);
};

exports.categoriesCreatePost = async (req, res) => {
  const { name, description } = req.body;
  await categoriesDb.createCategory(name, description);
  res.status(201).json({ message: "category created" });
};

exports.categoriesUpdatePatch = async (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;

  const updatedCategory = await categoriesDb.updateCategory(id, updates);

  if (!updatedCategory) {
    return res.status(404).json({
      message: "Category not found or no changes provided",
    });
  }
  res.json(updatedCategory);
};

exports.categoriesDelete = async (req, res) => {
  const id = Number(req.params.id);

  const deleted = await categoriesDb.deleteCategory(id);

  if (!deleted) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.status(204).send();
};
