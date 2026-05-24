import "dotenv/config";

export const env = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    jwtSecret: process.env.JWT_SECRET!,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
    googleClientId: process.env.GOOGLE_CLIENT_ID!,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL!,
    frontendUrl: process.env.FRONTEND_URL!,
};