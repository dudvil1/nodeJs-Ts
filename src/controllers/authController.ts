import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
import { validateEmail } from "../validator/emailValidator";
import { sendConfirmationEmail } from "../services/emailService";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User with this email already exists" });
      return;
    }

    if (!validateEmail(email))
      res.status(400).json({ message: "Invalid email template" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmCode = Math.floor(100000 + Math.random() * 900000).toString();

    await sendConfirmationEmail(email, confirmCode);

    const newUser = new User({
      email,
      password: hashedPassword,
      confirmCode,
      isConfirmed: false,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }
    if (!user.isConfirmed) {
      res.status(400).json({ message: "Please confirm" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const confirmUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, confirmCode } = req.body;

    const user = await User.findOne({ email, confirmCode });
    if (!user) {
      res.status(400).json({ message: "Invalid confirmation code or email." });
      return;
    }

    user.isConfirmed = true;
    await user.save();

    res.status(200).json({ message: "User confirmed successfully." });
  } catch (error) {
    next(error);
  }
};

export const logOut = (req: Request, res: Response) => {
  res.status(200).json({ message: "User logged out successfully" });
};
