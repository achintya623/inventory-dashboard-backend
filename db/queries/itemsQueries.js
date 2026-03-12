const pool = require("../pool");

exports.getAllItemsFull = async () => {
  const { rows } = await pool.query("SELECT * FROM items ORDER BY name");
  return rows;
};

exports.getCategoryItemsFull = async (categoryId) => {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id = $1 ORDER BY name",
    [categoryId],
  );
  return rows;
};

exports.getAllItems = async (categoryId, search, limit, offset) => {
  let query = "SELECT * FROM items WHERE category_id = $1";
  const values = [categoryId];
  let idx = 2;

  if (search) {
    query += " AND name ILIKE $2";
    values.push(`%${search}%`);
    idx++;
  }

  query += ` ORDER BY name LIMIT $${idx} OFFSET $${idx + 1}`;
  values.push(limit, offset);

  const { rows } = await pool.query(query, values);
  return rows;
};

exports.getItems = async (search, limit, offset) => {
  let query = "SELECT * FROM items";
  const values = [];
  let idx = 1;

  if (search) {
    query += ` WHERE name ILIKE $${idx}`;
    values.push(`%${search}%`);
    idx++;
  }

  query += ` ORDER BY name LIMIT $${idx} OFFSET $${idx + 1}`;
  values.push(limit, offset);

  const { rows } = await pool.query(query, values);
  return rows;
};

exports.getItemsCountAll = async (search) => {
  let query = "SELECT COUNT(*) FROM items";
  const values = [];

  if (search) {
    query += " WHERE name ILIKE $1";
    values.push(`%${search}%`);
  }

  const { rows } = await pool.query(query, values);
  return Number(rows[0].count);
};

exports.getItemsCount = async (categoryId, search) => {
  let query = "SELECT COUNT(*) FROM items WHERE category_id = $1";
  const values = [categoryId];
  let idx = 2;

  if (search) {
    query += ` AND name ILIKE $${idx}`;
    values.push(`%${search}%`);
  }

  const { rows } = await pool.query(query, values);
  return Number(rows[0].count);
};

exports.createItem = async (name, description, price, quantity, categoryId) => {
  await pool.query(
    "INSERT INTO items (name, description, price, quantity, category_id) VALUES ($1, $2, $3, $4, $5)",
    [name, description, price, quantity, categoryId],
  );
};

exports.updateItem = async (id, fields) => {
  const updates = [];
  const values = [];
  let idx = 1;

  if (fields.name !== undefined) {
    updates.push(`name = $${idx}`);
    values.push(fields.name);
    idx++;
  }

  if (fields.description !== undefined) {
    updates.push(`description = $${idx}`);
    values.push(fields.description);
    idx++;
  }

  if (fields.price !== undefined) {
    updates.push(`price = $${idx}`);
    values.push(fields.price);
    idx++;
  }

  if (fields.quantity !== undefined) {
    updates.push(`quantity = $${idx}`);
    values.push(fields.quantity);
    idx++;
  }

  if (fields.categoryId !== undefined) {
    updates.push(`category_id = $${idx}`);
    values.push(fields.categoryId);
    idx++;
  }

  if (updates.length === 0) {
    return null;
  }

  const { rows, rowCount } = await pool.query(
    `UPDATE items
     SET ${updates.join(", ")}
     WHERE id = $${idx}
     RETURNING *`,
    [...values, id],
  );

  return rowCount ? rows[0] : null;
};

exports.deleteItem = async (id) => {
  const result = await pool.query("DELETE FROM items WHERE id = $1", [id]);

  return result.rowCount > 0;
};
