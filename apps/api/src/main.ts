import express from "express";
import { env } from "./config/env";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok", env: env.nodeEnv });
});

app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port}`);
});