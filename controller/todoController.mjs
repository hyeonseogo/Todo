import { db } from "../data/db.mjs";

export async function getAllTodos(req, res) {
  // req.user.id 대신 req.user.userid 사용
  const [rows] = await db.query("SELECT * FROM todos WHERE userid = ?", [
    req.user.userid, // 수정: userid를 사용
  ]);
  res.json(rows);
}

export async function getTodoById(req, res) {
  const { id } = req.params;
  const [rows] = await db.query(
    "SELECT * FROM todos WHERE task_id = ? AND userid = ?", // 수정: task_id 사용
    [id, req.user.userid] // 수정: userid를 사용
  );
  rows.length
    ? res.json(rows[0])
    : res.status(404).json({ message: "할 일을 찾을 수 없습니다." });
}

export async function createTodo(req, res) {
  const { task_list } = req.body;
  const [result] = await db.query(
    "INSERT INTO todos (userid, task_list) VALUES (?, ?)",
    [req.user.userid, task_list] // 수정: userid를 사용
  );
  res.status(201).json({ todoId: result.insertId });
}

export async function updateTodo(req, res) {
  const { id } = req.params;
  const { task_list } = req.body;
  const [result] = await db.query(
    "UPDATE todos SET task_list = ? WHERE task_id = ? AND userid = ?", // 수정: task_id 사용
    [task_list, id, req.user.userid] // 수정: userid를 사용
  );
  res.json({ updated: result.affectedRows });
}

export async function deleteTodo(req, res) {
  const { id } = req.params;
  const [result] = await db.query(
    "DELETE FROM todos WHERE task_id = ? AND userid = ?", // 수정: task_id 사용
    [id, req.user.userid] // 수정: userid를 사용
  );
  res.json({ deleted: result.affectedRows });
}

export async function searchTodos(req, res) {
  const { task_list } = req.query; // URL 쿼리 파라미터에서 텍스트 받기
  const [rows] = await db.query(
    "SELECT * FROM todos WHERE task_list LIKE ? AND userid = ?",
    [`%${task_list}%`, req.user.userid] // `task_list`에 입력된 텍스트 포함 여부 확인
  );
  res.json(rows);
}
