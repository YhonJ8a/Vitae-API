import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import { env } from "./config/env";
import { globalRateLimit } from "./common/middlewares/rateLimit.middleware";

import useRoutes from "./routes/routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(globalRateLimit);

app.use('/api', useRoutes);

app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
});