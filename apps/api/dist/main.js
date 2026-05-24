"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/health", (req, res) => {
    res.json({ status: "ok", env: env_1.env.nodeEnv });
});
app.use("/auth", auth_routes_1.default);
app.listen(env_1.env.port, () => {
    console.log(`🚀 Server running on port ${env_1.env.port}`);
});
//# sourceMappingURL=main.js.map