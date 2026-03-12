const pool = require("../pool");

exports.getAllCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY id");

  return rows;
};

exports.createCategory = async (name, description) => {
  await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2)",
    [name, description],
  );
};

exports.updateCategory = async (id, fields) => {
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

  if (updates.length === 0) {
    return null;
  }

  const { rows, rowCount } = await pool.query(
    `UPDATE categories
    SET ${updates.join(", ")}
    WHERE id = $${idx}
    RETURNING *`,
    [...values, id],
  );

  return rowCount ? rows[0] : null;
};

exports.deleteCategory = async (id) => {
  const result = await pool.query("DELETE FROM categories WHERE id = $1", [id]);

  return result.rowCount > 0;
};
