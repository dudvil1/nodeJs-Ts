import { Schema, Document, Model, model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  confirmCode: string;
  isConfirmed: boolean;
}

const userSchema: Schema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmCode: { type: String, required: true },
  isConfirmed: { type: Boolean, default: false },
});

export const User: Model<IUser> = model<IUser>("User", userSchema);
