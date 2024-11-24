import request from "supertest";
import app from "../app";
import { connectDB } from "../config/db";
import mongoose from "mongoose";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Authentication Controller", () => {
  it("should sign up a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual(
      "User registered successfully. Please check your email for the confirmation code."
    );
  });

  it("should not allow duplicate sign up", async () => {
    await request(app).post("/api/auth/signup").send({
      email: "test@example.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/signup").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("User with this email already exists");
  });
});
