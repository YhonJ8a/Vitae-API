import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "../src/routes/moduleRoutes/auth.routes";
import { prisma } from "../src/config/prisma";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

const testUser = {
    email: "jest@test.com",
    password: "Test1234!",
    firstName: "Jest",
    lastName: "Test",
};

beforeAll(async () => {
    await prisma.session.deleteMany({ where: { user: { email: testUser.email } } });
    await prisma.user.deleteMany({ where: { email: testUser.email } });
});

afterAll(async () => {
    await prisma.session.deleteMany({ where: { user: { email: testUser.email } } });
    await prisma.user.deleteMany({ where: { email: testUser.email } });
    await prisma.$disconnect();
});

describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
        const res = await request(app).post("/api/auth/register").send(testUser);
        expect(res.status).toBe(201);
        expect(res.body.ok).toBe(true);
        expect(res.body.message).toBe("User registered");
    });

    it("should fail if email is already taken", async () => {
        const res = await request(app).post("/api/auth/register").send(testUser);
        expect(res.status).toBe(409);
        expect(res.body.ok).toBe(false);
    });
});

describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: testUser.email,
            password: testUser.password,
        });
        expect(res.status).toBe(200);
        expect(res.body.ok).toBe(true);
        expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("should fail with invalid credentials", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: testUser.email,
            password: "wrongpassword",
        });
        expect(res.status).toBe(401);
        expect(res.body.ok).toBe(false);
    });
});