import { Router } from "express";
import passport from "./auth.passport";
import { register, login, refresh, logout } from "./auth.controller";
import { setAuthCookies } from "./auth.utils";
import { env } from "../../config/env";

const router = Router();

router.post("/register", register);
router.post("/login", login);
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