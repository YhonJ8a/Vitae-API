import { Router } from "express";
import passport from "../../modules/auth/auth.passport";
import { register, login, refresh, logout } from "../../modules/auth/auth.controller";
import { setAuthCookies } from "../../modules/auth/auth.utils";
import { env } from "../../config/env";
import { authRateLimit } from "../../common/middlewares/rateLimit.middleware";

const router = Router();

router.post("/register", authRateLimit, register);
router.post("/login", authRateLimit, login);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/auth/failed" }),
    (req, res) => {
        const tokens = req.user as { accessToken: string; refreshToken: string };
        setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
        res.redirect(env.frontendUrl);
    }
);

router.get("/failed", (_req, res) => {
    res.status(401).json({ error: "Google authentication failed" });
});

export default router;