import { db } from "../data/db.mjs";

export async function getAllTodos(req, res) {
  const [rows] = await db.query("SELECT * FROM todos WHERE user_id = ?", [
    req.user.id,
  ]);
  res.json(rows);
}

export async function getTodoById(req, res) {
  const { id } = req.params;
  const [rows] = await db.query(
    "SELECT * FROM todos WHERE id = ? AND user_id = ?",
    [id, req.user.id]
  );
  rows.length ? res.json(rows[0]) : res.status(404).json({ message: "없음" });
}

export async function createTodo(req, res) {
  const { title, description, due_date } = req.body;
  const [result] = await db.query(
    "INSERT INTO todos (user_id, title, description, due_date) VALUES (?, ?, ?, ?)",
    [req.user.id, title, description, due_date]
  );
  res.status(201).json({ todoId: result.insertId });
}

export async function updateTodo(req, res) {
  const { id } = req.params;
  const { title, description, is_done, due_date } = req.body;
  const [result] = await db.query(
    "UPDATE todos SET title=?, description=?, is_done=?, due_date=? WHERE id=? AND user_id=?",
    [title, description, is_done, due_date, id, req.user.id]
  );
  res.json({ updated: result.affectedRows });
}

export async function deleteTodo(req, res) {
  const { id } = req.params;
  const [result] = await db.query(
    "DELETE FROM todos WHERE id = ? AND user_id = ?",
    [id, req.user.id]
  );
  res.json({ deleted: result.affectedRows });
}
