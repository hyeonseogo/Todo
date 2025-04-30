import express from "express";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
} from "../controller/todoController.mjs";
import { authenticateToken } from "../middleware/auth.mjs";

const router = express.Router();

// 모든 요청에 인증 미들웨어 적용
router.use(authenticateToken);

router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
