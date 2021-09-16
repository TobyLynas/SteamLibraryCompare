import express from "express";
import { body, param, validationResult } from "express-validator";
import { nanoid } from "nanoid";

import { authenticateToken } from "./auth";

export interface Poll {
    name: string;
    /**
     * SteamID of the poll author.
     */
    author: string;
    options: PollOption[];
}
export interface PollOption {
    content: string;
    votes: number;
}

/**
 * Poll results tied to a random ID.
 */
export const polls = new Map<string, Poll>();

const router = express.Router();
router.use(express.json());

/**
 * Gets poll info.
 */
router.get("/:pollId", param("pollId").notEmpty(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const pollId: string = req.params?.pollId;

    const poll = polls.get(pollId);
    if (!poll) {
        return res.sendStatus(404);
    }

    res.send({
        id: pollId,
        ...poll
    });
});

/**
 * Takes an array of strings to use as poll options and provides a poll ID to
 * use with other routes.
 */
router.post(
    "/",
    authenticateToken(),
    body("name").notEmpty(),
    body("options").isArray({ min: 2 }),
    body("options.*.content").notEmpty(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (!req.user?.steamId) {
            return res.sendStatus(500);
        }

        const { name, options } = req.body;

        const pollId = nanoid(8);
        polls.set(pollId, {
            name,
            author: req.user?.steamId,
            options: options.map((option: { content: string }) => ({
                content: option.content,
                votes: 0
            }))
        });

        return res.send(pollId);
    }
);

/**
 * Takes a poll ID and an option index and increments the vote count for the
 * given poll option.
 */
router.put(
    "/vote/:pollId/:optionIndex",
    param("pollId").notEmpty(),
    param("optionIndex").isInt().toInt(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const pollId: string = req.params?.pollId;
        const optionIndex: number = req.params?.optionIndex;

        // Check poll exists
        const poll = polls.get(pollId);
        if (!poll) {
            return res.sendStatus(404);
        }
        // Check option index is within range
        if (poll.options.length <= optionIndex) {
            return res.sendStatus(500);
        }

        poll.options[optionIndex].votes++;
        polls.set(pollId, poll);
    }
);

/**
 * Deletes an existing poll.
 */
router.delete(
    "/:pollId",
    authenticateToken(),
    param("pollId").notEmpty(),
    (req, res) => {
        const pollId: string = req.params?.pollId;
        const poll = polls.get(pollId);
        if (!poll) {
            return res.sendStatus(404);
        }

        // Only the author can delete a poll
        if (req.user?.steamId !== poll.author) {
            return res.sendStatus(403);
        }

        polls.delete(pollId);
    }
);

export default router;
