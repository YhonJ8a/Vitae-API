import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import { env } from "./config/env";
import authRoutes from "./modules/auth/auth.routes";
import { globalRateLimit } from "./common/middlewares/rateLimit.middleware";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(globalRateLimit);


app.get("/health", (req, res) => {
    res.json({ status: "ok", env: env.nodeEnv });
});

app.use("/auth", authRoutes);

app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port}`);
});