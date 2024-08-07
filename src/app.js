import express from "express";
import cors from "cors";
import yatraRouter from "./routes/yatraRoutes.js";
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/v1/yatra", yatraRouter);

export default app;