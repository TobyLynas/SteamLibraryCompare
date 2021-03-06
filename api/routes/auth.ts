import express, { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as SteamStrategy } from "passport-steam";

/**
 * JWT verification middleware. Token passed in Authorization HTTP header with
 * Bearer scheme.
 *
 * @param fail Should fail the request if unauthenticated.
 * @returns Express RequestHandler middleware
 */
export function authenticateToken(fail = true): RequestHandler {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ").pop();
        if (token == null) {
            if (!fail) return next();
            return res.sendStatus(401);
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { steamId: (decoded as Express.User).steamId };
        } catch (err) {
            if (!fail) return next();
            return res.sendStatus(403);
        }

        next();
    };
}

// Steam OpenID 2.0 identifier format
const STEAM_OID_ID_PATTERN =
    /https:\/\/steamcommunity\.com\/openid\/id\/(\d{17})/;

passport.use(
    new SteamStrategy(
        {
            returnURL: `${process.env.BASE_URL}/auth/steam/return`,
            realm: `${process.env.BASE_URL}/`,
            profile: false
        },
        (identifier: string, profile: unknown, done) => {
            const matches = identifier.match(STEAM_OID_ID_PATTERN);
            if (!matches) {
                return done(
                    new Error("Failed to parse Steam OID identifier!"),
                    {}
                );
            }

            return done(null, { steamId: matches[1] });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.steamId);
});
passport.deserializeUser((steamId: string, done) => {
    done(null, { steamId });
});

// Auth router
const router = express.Router();
router.use(passport.initialize());

/**
 * Auth entry point.
 * Redirects to steampowered.com login page.
 */
router.get(
    "/steam",
    passport.authenticate("steam", {
        session: false
    })
);

/**
 * Auth return point.
 *
 * Validates the OpenID response and signs a JWT. The token is then passed back
 * to the client app via postMessage.
 */
router.get(
    "/steam/return",
    (req, res, next) => {
        req.url = req.originalUrl;
        next();
    },
    passport.authenticate("steam", {
        session: false
    }),
    (req, res) => {
        // Sign JWT
        const token = jwt.sign(
            { steamId: req.user?.steamId },
            process.env.JWT_SECRET,
            { expiresIn: "7200s" }
        );

        // Send token message and close frame
        res.send(`
            <script nonce="${res.locals.nonce}">
                window.opener.postMessage({
                    token: "${token}"
                }, "${process.env.FRONTEND_URL}");

                window.close();
            </script>
        `);
    }
);

export default router;
