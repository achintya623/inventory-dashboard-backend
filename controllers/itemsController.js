const itemsDB = require("../db/queries/itemsQueries");

exports.itemsAllGet = async (req, res) => {
  const items = await itemsDB.getAllItemsFull();
  res.json(items);
};

exports.itemsCategoryAllGet = async (req, res) => {
  const categoryId = req.params.id;

  const items = await itemsDB.getCategoryItemsFull(categoryId);
  res.json(items);
};

exports.itemsListGet = async (req, res) => {
  const categoryId = req.params.id;
  const search = req.query.search;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const items = await itemsDB.getAllItems(categoryId, search, limit, offset);

  const totalItems = await itemsDB.getItemsCount(categoryId, search);

  res.json({
    items,
    page,
    limit,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
  });
};

exports.itemsGet = async (req, res) => {
  const search = req.query.search;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const items = await itemsDB.getItems(search, limit, offset);

  const totalItems = await itemsDB.getItemsCountAll(search);

  res.json({
    items,
    page,
    limit,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
  });
};

exports.itemsCreatePost = async (req, res) => {
  const { name, description, price, quantity, categoryId } = req.body;
  await itemsDB.createItem(name, description, price, quantity, categoryId);
  res.status(201).json({ message: "item created" });
};

exports.itemsUpdatePatch = async (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;

  const updatedItem = await itemsDB.updateItem(id, updates);

  if (!updatedItem) {
    return res.status(404).json({
      message: "Item not found or no changes provided",
    });
  }

  res.json(updatedItem);
};

exports.itemsDelete = async (req, res) => {
  const id = Number(req.params.id);

  const deleted = await itemsDB.deleteItem(id);

  if (!deleted) {
    return res.status(404).json({
      message: "Item not found",
    });
  }

  res.status(204).send();
};
