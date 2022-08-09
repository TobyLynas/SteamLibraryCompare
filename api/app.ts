import crypto from "crypto";
import fs from "fs";
import http from "http";
import https from "https";

import express, { Response } from "express";
import expressRateLimit from "express-rate-limit";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";

// Routes
import authRouter from "./routes/auth";
import proxyRouter from "./routes/proxy";
import pollsRouter from "./routes/polls";

// Check environment variables are set
if (
    !process.env.PORT_HTTP ||
    !process.env.PORT_HTTPS ||
    !process.env.BASE_URL ||
    !process.env.FRONTEND_URL ||
    !process.env.TLS_CERT_FILE ||
    !process.env.TLS_KEY_FILE ||
    !process.env.JWT_SECRET ||
    !process.env.API_KEY_STEAM
) {
    console.error("err: missing config details!");
    process.exit(1);
}

const app = express();

/**
 * Upgrade requests from http to https. If behind a proxy, check the
 * X-Forwarded-Proto header since req.secure may not be accurate.
 */
app.use((req, res, next) => {
    if (!req.secure || req.headers["x-forwarded-proto"] === "http") {
        // Add :<port> if non-default
        const port =
            process.env.PORT_HTTPS !== "443"
                ? `:${process.env.PORT_HTTPS}`
                : "";

        res.redirect(`https://${req.hostname}${port}${req.url}`);
        return;
    }

    next();
});

// Add a nonce to each request for inline scripts with a CSP.
app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString("base64");
    next();
});

app.use(
    helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                /**
                 * Set the CSP to allow for inline scripts with the nonce for
                 * the current request.
                 */
                "script-src": [
                    "'self'",
                    (req, res) => `'nonce-${(res as Response).locals.nonce}'`
                ]
            }
        }
    })
);

// Limit overall requests to 100 per 10 minutes
app.use(
    expressRateLimit({
        windowMs: 10 * (60 * 1000),
        max: 150
    })
);

// Only allow in-browser API requests from frontend origin
const corsOpts: CorsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true
};

// Add routes
app.use("/auth", authRouter);
app.use("/proxy", cors(corsOpts), proxyRouter);
app.use("/polls", cors(corsOpts), pollsRouter);

http.createServer(app).listen(process.env.PORT_HTTP);
https
    .createServer(
        {
            // Load TLS credentials
            key: fs.readFileSync(process.env.TLS_KEY_FILE, "utf-8"),
            cert: fs.readFileSync(process.env.TLS_CERT_FILE, "utf-8")
        },
        app
    )
    .listen(process.env.PORT_HTTPS, undefined, () => {
        console.log(`Listening on ${process.env.BASE_URL}...`);
    });
