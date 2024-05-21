import { Router } from "express";
import { getTasks, addTask, updateTask, deleteTask } from "../controllers/task";
import { login, register } from "../controllers/user";
import { auth } from "../middleware/authMiddleware";

const router: Router = Router();

router.get("/tasks/", auth, getTasks);

router.post("/task/new", auth, addTask);

router.put("/task/:id", auth, updateTask);

router.delete("/task/:id", auth, deleteTask);

router.post("/register", register);
router.post("/login", login);

export default router;
