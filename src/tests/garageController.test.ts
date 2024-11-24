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

describe("Garage Controller", () => {
  it("should get all garages", async () => {
    const res = await request(app).get("/api/garages").query({ type: "all" });

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should get limited garages", async () => {
    const res = await request(app)
      .get("/api/garages")
      .query({ type: "limit", limit: 5 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeLessThanOrEqual(5);
  });

  it("should add a new garage", async () => {
    const token = "your_jwt_token_here";

    const res = await request(app)
      .post("/api/garages")
      .set("Authorization", `Bearer ${token}`)
      .send({
        mispar_mosah: 123,
        shem_mosah: "Test Garage",
        cod_sug_mosah: 6,
        sug_mosah: "Authorized",
        ktovet: "123 Main St",
        yishuv: "Test City",
        telephone: "123-456-7890",
        mikud: 12345,
        cod_miktzoa: 10,
        miktzoa: "Mechanics",
        menahel_miktzoa: "Test Manager",
        rasham_havarot: 123456789,
        TESTIME: "",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.shem_mosah).toEqual("Test Garage");
  });
});
