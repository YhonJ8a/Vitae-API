import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { env } from "../../config/env";
import { findOrCreateGoogleUser } from "./auth.service";

passport.use(
    new GoogleStrategy(
        {
            clientID: env.googleClientId,
            clientSecret: env.googleClientSecret,
            callbackURL: env.googleCallbackUrl,
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const tokens = await findOrCreateGoogleUser({
                    googleId: profile.id,
                    email: profile.emails![0].value,
                    firstName: profile.name?.givenName || "",
                    lastName: profile.name?.familyName || "",
                });
                done(null, tokens);
            } catch (error) {
                done(error);
            }
        }
    )
);

export default passport;