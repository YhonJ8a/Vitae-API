import rateLimit from "express-rate-limit";

export const globalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    message: { error: "Too many requests, please try again later" },
    standardHeaders: true,
    legacyHeaders: false,
});

export const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // máx 10 intentos de login cada 15 min
    message: { error: "Too many attempts, please try again later" },
    standardHeaders: true,
    legacyHeaders: false,
});