import app from "./app";
import { connectDB } from "./config/db";
import * as dotenv from "dotenv";

dotenv.config();

const PORT: number = parseInt(process.env.PORT || "5000", 10);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
