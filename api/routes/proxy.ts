import axios, { AxiosError, Method } from "axios";
import express from "express";

import { authenticateToken } from "./auth";

const router = express.Router();

/**
 * Takes a Steamworks Web API request, adds our API key, makes the request and
 * then and pipes the response back to the client.
 */
router.use("/steamworks", authenticateToken(), async (req, res) => {
    const url = new URL(req.url, "http://api.steampowered.com");
    url.searchParams.set("key", process.env.API_KEY_STEAM);

    try {
        // Match request method
        const proxiedRes = await axios.request({
            method: req.method as Method,
            url: url.href,
            params: req.params,
            timeout: 1000
        });

        return res.json(proxiedRes.data);
    } catch (err) {
        // Match API error status is response was received
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError;
            if (axiosError.response) {
                return res.sendStatus(axiosError.response.status);
            }
        }

        return res.sendStatus(500);
    }
});

export default router;
