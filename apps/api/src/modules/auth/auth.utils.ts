import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Response } from "express";
import { env } from "../../config/env";

const SALT_ROUNDS = 12;

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
    password: string,
    hash: string
): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const generateAccessToken = (userId: string): string => {
    return jwt.sign({ userId }, env.jwtSecret, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string): string => {
    return jwt.sign({ userId }, env.jwtRefreshSecret, { expiresIn: "7d" });
};

export const setAuthCookies = (
    res: Response,
    accessToken: string,
    refreshToken: string
): void => {
    const isProduction = env.nodeEnv === "production";

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

export const clearAuthCookies = (res: Response): void => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
};