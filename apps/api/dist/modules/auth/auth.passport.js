"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const env_1 = require("../../config/env");
const auth_service_1 = require("./auth.service");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: env_1.env.googleClientId,
    clientSecret: env_1.env.googleClientSecret,
    callbackURL: env_1.env.googleCallbackUrl,
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        const tokens = await (0, auth_service_1.findOrCreateGoogleUser)({
            googleId: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name?.givenName || "",
            lastName: profile.name?.familyName || "",
        });
        done(null, tokens);
    }
    catch (error) {
        done(error);
    }
}));
exports.default = passport_1.default;
//# sourceMappingURL=auth.passport.js.map