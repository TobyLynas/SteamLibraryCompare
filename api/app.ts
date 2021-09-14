import express from "express";
import cors, { CorsOptions } from "cors";

import authRouter from "./routes/auth";
import proxyRouter from "./routes/proxy";
import pollsRouter from "./routes/polls";

// Check environment variables are set
if (
    !process.env.PORT ||
    !process.env.BASE_URL ||
    !process.env.FRONTEND_URL ||
    !process.env.JWT_SECRET ||
    !process.env.API_KEY_STEAM
) {
    console.error("err: missing config details!");
    process.exit(1);
}

const app = express();

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// Only allow in-browser API requests from frontend origin
const corsOpts: CorsOptions = {
    origin: process.env.FRONTEND_URL
};

// Add routes
app.use("/auth", authRouter);
app.use("/proxy", cors(corsOpts), proxyRouter);
app.use("/polls", cors(corsOpts), pollsRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.BASE_URL}...`);
});
