import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

import authRoutes from "./routes/authRoutes.js"

dotenv.config()

const app = express()

// ================= MIDDLEWARE =================

app.use(cors())

app.use(express.json())

// ================= ROUTES =================

app.use("/api/auth", authRoutes)

// ================= TEST ROUTE =================

app.get("/", (req, res) => {
  res.send("LionSpace API Running")
})

// ================= DATABASE =================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected")
  })
  .catch((err) => {
    console.log(err)
  })

// ================= SERVER =================

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})