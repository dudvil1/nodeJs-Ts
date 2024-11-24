import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/my_database";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri).then(() => console.log(mongoUri));
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
