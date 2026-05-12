import express from "express"

import {
  generateTasks,
} from "../controllers/aiController.js"

const router = express.Router()

router.post("/generate", generateTasks)

export default router