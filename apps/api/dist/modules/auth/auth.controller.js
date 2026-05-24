"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refresh = exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const auth_utils_1 = require("./auth.utils");
const env_1 = require("../../config/env");
const register = async (req, res) => {
    try {
        const { accessToken, refreshToken } = await (0, auth_service_1.registerUser)(req.body);
        (0, auth_utils_1.setAuthCookies)(res, accessToken, refreshToken);
        res.status(201).json({ message: "User registered" });
    }
    catch (error) {
        if (error instanceof Error && error.message === "EMAIL_TAKEN") {
            res.status(409).json({ error: "Email already in use" });
            return;
        }
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const meta = {
            ip: req.ip,
            userAgent: req.headers["user-agent"],
        };
        const { accessToken, refreshToken } = await (0, auth_service_1.loginUser)(req.body, meta);
        (0, auth_utils_1.setAuthCookies)(res, accessToken, refreshToken);
        res.json({ message: "Logged in" });
    }
    catch (error) {
        if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.login = login;
const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refresh_token;
        if (!refreshToken) {
            res.status(401).json({ error: "No refresh token" });
            return;
        }
        const { accessToken } = await (0, auth_service_1.refreshSession)(refreshToken);
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: env_1.env.nodeEnv === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });
        res.json({ message: "Token refreshed" });
    }
    catch {
        res.status(401).json({ error: "Invalid session" });
    }
};
exports.refresh = refresh;
const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refresh_token;
        if (refreshToken)
            await (0, auth_service_1.logoutUser)(refreshToken);
        (0, auth_utils_1.clearAuthCookies)(res);
        res.json({ message: "Logged out" });
    }
    catch {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map