import express from "express"

import {
  createTask,
  getTasks,
  deleteTask,
  updateTaskStatus,
} from "../controllers/taskController.js"

const router = express.Router()

router.post("/", createTask)

router.get("/", getTasks)

router.delete("/:id", deleteTask)

router.put("/:id", updateTaskStatus)

export default router