import { Router } from "express";
import { env } from "../config/env";
import authRoutes from "../routes/moduleRoutes/auth.routes";
import profileRoutes from "../routes/moduleRoutes/profile.routes";

const router = Router();

router.get("/health", (req, res) => {
    res.json({ status: "ok", env: env.nodeEnv });
});

router.use("/auth", authRoutes);

router.use("/profile", profileRoutes);

export default router;