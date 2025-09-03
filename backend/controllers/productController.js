import pool from "../config/db.js";

/* public Get published products */
export const getPublishedProducts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT product_id, product_name, product_desc, created_by, created_at, status
       FROM Products
       WHERE status = ? AND is_deleted = FALSE
       ORDER BY updated_at DESC, created_at DESC`,
      ["Published"]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
};

/* admin side list all products */
export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM Products WHERE is_deleted = FALSE ORDER BY updated_at DESC, created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error to get all products" });
  }
};

/* admin side get single product */
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(
      `SELECT * FROM Products WHERE product_id = ?`,
      [id]
    );
    if (!rows.length)
      return res.status(404).json({ error: "Product Not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error to get the product" });
  }
};

/* admin side create product */
export const createProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_desc = "",
      status = "Draft",
      created_by = "admin",
    } = req.body;
    if (!product_name)
      return res.status(400).json({ error: "Product name required" });

    const [result] = await pool.execute(
      `INSERT INTO Products (product_name, product_desc, status, created_by) VALUES (?, ?, ?, ?)`,
      [product_name, product_desc, status, created_by]
    );
    const [newRow] = await pool.query(
      `SELECT * FROM Products WHERE product_id = ?`,
      [result.insertId]
    );
    res.status(201).json(newRow[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error to create product" });
  }
};

/* admin side update product */
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { product_name, product_desc, status, updated_by } = req.body;
    if (!product_name)
      return res.status(400).json({ error: "Product name required" });

    await pool.execute(
      `UPDATE Products 
       SET product_name = ?, product_desc = ?, status = ?, updated_by = ? 
       WHERE product_id = ?`,
      [product_name, product_desc, status, updated_by || "admin", id]
    );
    const [updated] = await pool.query(
      `SELECT * FROM Products WHERE product_id = ?`,
      [id]
    );
    res.json(updated[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error to update product" });
  }
};

/* admin side  soft delete */
export const softDeleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { updated_by = "admin" } = req.body || {};
    await pool.execute(
      `UPDATE Products SET is_deleted = TRUE, updated_by = ? WHERE product_id = ?`,
      [updated_by, id]
    );
    const [updated] = await pool.query(
      `SELECT * FROM Products WHERE product_id = ?`,
      [id]
    );
    res.json(updated[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error to soft delete the product." });
  }
};

/* admin side publish */
export const publishProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { updated_by = "admin" } = req.body || {};
    await pool.execute(
      `UPDATE Products SET status = 'Published', updated_by = ? WHERE product_id = ?`,
      [updated_by, id]
    );
    const [updated] = await pool.query(
      `SELECT * FROM Products WHERE product_id = ?`,
      [id]
    );
    res.json(updated[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
};

/* admin side unpublish */
export const unpublishProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { updated_by = "admin" } = req.body || {};
    await pool.execute(
      `UPDATE Products SET status = 'Draft', updated_by = ? WHERE product_id = ?`,
      [updated_by, id]
    );
    const [updated] = await pool.query(
      `SELECT * FROM Products WHERE product_id = ?`,
      [id]
    );
    res.json(updated[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
};
