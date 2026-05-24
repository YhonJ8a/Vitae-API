import { Request, Response } from "express";
import {
    registerUser,
    loginUser,
    refreshSession,
    logoutUser,
} from "./auth.service";
import { setAuthCookies, clearAuthCookies } from "./auth.utils";
import { env } from "../../config/env";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { accessToken, refreshToken } = await registerUser(req.body);
        setAuthCookies(res, accessToken, refreshToken);
        res.status(201).json({ message: "User registered" });
    } catch (error: unknown) {
        console.error("REGISTER ERROR:", error);
        if (error instanceof Error && error.message === "EMAIL_TAKEN") {
            res.status(409).json({ error: "Email already in use" });
            return;
        }
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const meta = {
            ip: req.ip,
            userAgent: req.headers["user-agent"],
        };
        const { accessToken, refreshToken } = await loginUser(req.body, meta);
        setAuthCookies(res, accessToken, refreshToken);
        res.json({ message: "Logged in" });
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        res.status(500).json({ error: "Internal server error" });
    }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
    try {
        const refreshToken = req.cookies?.refresh_token;
        if (!refreshToken) {
            res.status(401).json({ error: "No refresh token" });
            return;
        }
        const { accessToken } = await refreshSession(refreshToken);
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: env.nodeEnv === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });
        res.json({ message: "Token refreshed" });
    } catch {
        res.status(401).json({ error: "Invalid session" });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const refreshToken = req.cookies?.refresh_token;
        if (refreshToken) await logoutUser(refreshToken);
        clearAuthCookies(res);
        res.json({ message: "Logged out" });
    } catch {
        res.status(500).json({ error: "Internal server error" });
    }
};