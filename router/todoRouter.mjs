import express from "express";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  searchTodos,
} from "../controller/todoController.mjs";
import { authenticateToken } from "../middleware/auth.mjs";

const router = express.Router();

router.use(authenticateToken);

router.get("/search", searchTodos);
router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
