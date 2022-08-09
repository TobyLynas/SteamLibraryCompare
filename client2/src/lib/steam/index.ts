import SteamworksWebAPI from "./SteamworksWebAPI";

import User from "./User";
import type { GetPlayerSummariesResponse } from "./SteamworksWebAPI/ISteamUser";

const ID_PATTERN = /\d{17}/;
const PROFILE_ID_PATTERN =
    /^https?:\/\/steamcommunity.com\/profiles\/(\d{17})\/?$/;
const PROFILE_VANITY_PATTERN =
    /https?:\/\/steamcommunity.com\/id\/([a-zA-Z0-9]{1,32})\/?$/;

export { User };

/**
 * Main Steam API wrapper class.
 *
 * @remarks
 *   Provides access to various Steam-related API functionality. Requires a
 *   valid API auth token.
 */
export default class Steam {
    private api: SteamworksWebAPI;

    /**
     * Create a new API class instance.
     *
     * @param token - API auth token.
     */
    constructor(token?: string) {
        this.api = new SteamworksWebAPI(token);
    }

    /**
     * Get a {@link User} object from a Steam ID.
     *
     * @param id - 64-bit steam ID
     * @returns Instance of {@link User}
     */
    async getUserById(id: string): Promise<User> {
        if (!ID_PATTERN.test(id)) {
            throw new Error("Invalid input ID");
        }

        let res: GetPlayerSummariesResponse;
        try {
            res = await this.api.ISteamUser.GetPlayerSummaries([id]);
        } catch (err) {
            throw new Error("Failed to fetch player summary");
        }

        const players = res.response.players;
        if (!players.length) {
            throw new Error("Could not find user with given ID");
        }

        return new User(this.api, players[0]);
    }

    /**
     * Get a {@link User} object from a steamcommunity.com profile address
     * (including vanity addresses, which require an additional API request to resolve).
     *
     * @param profileUrl - URL/Steam ID
     * @returns Instance of {@link User}
     */
    async getUserByProfileUrl(profileUrl: string): Promise<User> {
        let steamId: string;

        // Check for default profiles/<steamId> format
        const idMatch = profileUrl.match(PROFILE_ID_PATTERN);
        if (!idMatch) {
            // If profile URL has no ID, check for custom URL id/<vanityName>
            const vanityMatch = profileUrl.match(PROFILE_VANITY_PATTERN);
            if (!vanityMatch) {
                throw new Error("Invalid profile URL");
            }

            const resolveError = () =>
                new Error("Failed to resolve vanity URL");

            try {
                // Resolve vanity name part
                const res = await this.api.ISteamUser.ResolveVanityURL(
                    vanityMatch[1]
                );
                if (!res.response.steamid) {
                    throw resolveError();
                }

                steamId = res.response.steamid;
            } catch (err) {
                throw resolveError();
            }
        } else {
            steamId = idMatch[1];
        }

        // Pass off to getUserById
        return this.getUserById(steamId);
    }
}
