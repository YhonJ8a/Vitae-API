"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_passport_1 = __importDefault(require("./auth.passport"));
const auth_controller_1 = require("./auth.controller");
const auth_utils_1 = require("./auth.utils");
const env_1 = require("../../config/env");
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.register);
router.post("/login", auth_controller_1.login);
router.post("/refresh", auth_controller_1.refresh);
router.post("/logout", auth_controller_1.logout);
router.get("/google", auth_passport_1.default.authenticate("google", { scope: ["profile", "email"], session: false }));
router.get("/google/callback", auth_passport_1.default.authenticate("google", { session: false, failureRedirect: "/auth/failed" }), (req, res) => {
    const tokens = req.user;
    (0, auth_utils_1.setAuthCookies)(res, tokens.accessToken, tokens.refreshToken);
    res.redirect(env_1.env.frontendUrl);
});
router.get("/failed", (_req, res) => {
    res.status(401).json({ error: "Google authentication failed" });
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map