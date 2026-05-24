import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

interface JwtPayload {
    userId: string;
}

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const token = req.cookies?.access_token;

        if (!token) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
        req.userId = payload.userId;
        next();
    } catch {
        res.status(401).json({ error: "Invalid or expired token" });
    }
};