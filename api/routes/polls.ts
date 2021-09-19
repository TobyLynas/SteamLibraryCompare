import express from "express";
import { body, param, validationResult } from "express-validator";
import { nanoid } from "nanoid";

import { authenticateToken } from "./auth";

export interface Poll {
    name: string;
    authorId: string;
    options: PollOption[];
}

export interface PollOption {
    content: string;
    votes: PollVote[];
}

export interface PollVote {
    voterId?: string;
    voterIp: string;
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
            authorId: req.user?.steamId,
            options: options.map((option: { content: string }) => ({
                content: option.content,
                votes: []
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
    authenticateToken(false),
    param("pollId").notEmpty(),
    param("optionIndex").isInt(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const pollId: string = req.params?.pollId;
        const optionIndex: number = parseInt(req.params?.optionIndex, 10);

        // Check poll exists
        const poll = polls.get(pollId);
        if (!poll) {
            return res.sendStatus(404);
        }
        // Check option index is within range
        if (poll.options.length <= optionIndex) {
            return res.sendStatus(500);
        }

        for (const option of poll.options) {
            for (const vote of option.votes) {
                /**
                 * If a vote has already been recorded from this IP address or the
                 * same authenticated user, return 403.
                 */
                if (
                    req.ip === vote.voterIp ||
                    (req.isAuthenticated() && req.user.steamId === vote.voterId)
                ) {
                    return res.sendStatus(403);
                }
            }
        }

        const { votes } = poll.options[optionIndex];

        const vote: PollVote = { voterIp: req.ip };
        if (req.isAuthenticated()) {
            vote.voterId = req.user.steamId;
        }

        votes.push(vote);
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
        if (req.user?.steamId !== poll.authorId) {
            return res.sendStatus(403);
        }

        polls.delete(pollId);
    }
);

export default router;
