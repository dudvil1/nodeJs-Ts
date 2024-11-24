import express, { Application } from "express";
import authRoutes from "./routes/authRoutes";
import garageRoutes from "./routes/garageRoutes";

const app: Application = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/garages", garageRoutes);

export default app;
