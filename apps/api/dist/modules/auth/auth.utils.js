"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthCookies = exports.setAuthCookies = exports.generateRefreshToken = exports.generateAccessToken = exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const SALT_ROUNDS = 12;
const hashPassword = async (password) => {
    return bcryptjs_1.default.hash(password, SALT_ROUNDS);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hash) => {
    return bcryptjs_1.default.compare(password, hash);
};
exports.comparePassword = comparePassword;
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, env_1.env.jwtSecret, { expiresIn: "15m" });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, env_1.env.jwtRefreshSecret, { expiresIn: "7d" });
};
exports.generateRefreshToken = generateRefreshToken;
const setAuthCookies = (res, accessToken, refreshToken) => {
    const isProduction = env_1.env.nodeEnv === "production";
    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutos
    });
    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });
};
exports.setAuthCookies = setAuthCookies;
const clearAuthCookies = (res) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
};
exports.clearAuthCookies = clearAuthCookies;
//# sourceMappingURL=auth.utils.js.map