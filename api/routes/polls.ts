import express from "express";
import { body, param, validationResult } from "express-validator";
import { nanoid } from "nanoid";

export interface Poll {
    name: string;
    options: PollOption[];
}
export interface PollOption {
    text: string;
    votes: number;
}

/**
 * Poll results tied to a random ID.
 */
const polls = new Map<string, Poll>();

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
    body("name").notEmpty(),
    body("options").isArray({ min: 2 }),
    body("options.*.text").notEmpty(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, options } = req.body;

        const pollId = nanoid(8);
        polls.set(pollId, {
            name,
            options: options.map((option: { text: string }) => ({
                text: option.text,
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
router.delete("/delete/:pollId", param("pollId").notEmpty(), (req, res) => {
    const pollId: string = req.params?.pollId;

    if (!polls.has(pollId)) {
        return res.sendStatus(404);
    }

    polls.delete(pollId);
});

export default router;
