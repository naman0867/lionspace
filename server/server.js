import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import http from "http"
import aiRoutes from "./routes/aiRoutes.js"

import { Server } from "socket.io"

import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"

dotenv.config()

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
})

app.set("io", io)

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id)

  socket.on("disconnect", () => {
    console.log("User Disconnected")
  })
})

app.use(cors())

app.use(express.json())
app.use("/api/ai", aiRoutes)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err))

app.use("/api/auth", authRoutes)

app.use("/api/tasks", taskRoutes)

app.get("/", (req, res) => {
  res.send("API Running")
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})