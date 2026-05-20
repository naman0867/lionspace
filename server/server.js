import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

// ======================
// MIDDLEWARE
// ======================

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

// ======================
// ROUTES
// ======================

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

// ======================
// TEST ROUTE
// ======================

app.get("/", (req, res) => {
  res.send("LionSpace API Running");
});

// ======================
// DATABASE CONNECTION
// ======================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err.message);
  });

// ======================
// EXPORT APP FOR VERCEL
// ======================

export default app;