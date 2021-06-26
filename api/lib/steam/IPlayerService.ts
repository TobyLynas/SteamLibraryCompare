import SteamworksInterface from "./SteamworksInterface";

/**
 * Provides additional methods for interacting with Steam Users.
 * https://partner.steamgames.com/doc/webapi/IPlayerService
 */
export default class IPlayerService extends SteamworksInterface {
    /**
     * Fetches info about recently played games for a given Steam ID.
     *
     * @param steamId - Steam ID to request for
     * @returns List of recently played games
     */
    async GetRecentlyPlayedGames(
        steamId: string,
        count = 0
    ): Promise<GetRecentlyPlayedGamesResponse> {
        const res = await this.ax.get("/GetRecentlyPlayedGames/v1/", {
            params: {
                steamid: steamId,
                count
            }
        });

        return res.data;
    }

    /**
     * Fetches info about games owned by a given Steam ID.
     *
     * @param steamId - Steam ID to request for
     * @param includeAppInfo - Include name/icons with response
     * @param includePlayedFreeGames - Include free games with response
     * @param appIdsFilter - Array of app IDs to restrict to
     * @returns List of owned games
     */
    async GetOwnedGames(
        steamId: string,
        includeAppInfo?: boolean,
        includePlayedFreeGames?: boolean,
        appIdsFilter?: number[]
    ): Promise<GetOwnedGamesResponse> {
        const params = {
            steamid: steamId,
            include_appinfo: includeAppInfo,
            include_played_free_games: includePlayedFreeGames
        };

        // Handle array parameter
        if (appIdsFilter?.length) {
            appIdsFilter.forEach((appId, index) => {
                (params as any)[`appids_filter[${index}]`] = appId;
            });
        }

        const res = await this.ax.get("/GetOwnedGames/v1/", {
            params: {
                steamid: steamId,
                include_appinfo: includeAppInfo,
                include_played_free_games: includePlayedFreeGames
            }
        });

        return res.data;
    }

    /**
     * Fetches Steam level for a given Steam ID.
     *
     * @param steamId - Steam ID to request for
     * @returns Steam level
     */
    async GetSteamLevel(steamId: string): Promise<GetSteamLevelResponse> {
        const res = await this.ax.get("/GetSteamLevel/v1/", {
            params: { steamid: steamId }
        });

        return res.data;
    }

    /**
     * Fetches badges owned by a given Steam ID.
     *
     * @param steamId - Steam ID to request for
     * @returns List of badges
     */
    async GetBadges(steamId: string): Promise<GetBadgesResponse> {
        const res = await this.ax.get("/GetBadges/v1/", {
            params: { steamid: steamId }
        });

        return res.data;
    }

    /**
     * Fetches badge's quest info for a given Steam ID.
     *
     * @param steamId - Steam ID to request for
     * @param badgeId - Badge ID to request for
     * @returns List of quests and completion status
     */
    async GetCommunityBadgeProgress(
        steamId: string,
        badgeId: string
    ): Promise<GetCommunityBadgeProgressResponse> {
        const res = await this.ax.get("/GetCommunityBadgeProgress/v1/", {
            params: {
                steamid: steamId,
                badgeid: badgeId
            }
        });

        return res.data;
    }

    /**
     * Fetches info about whether the currently played game is borrowed.
     *
     * @param steamId -Steam ID to request for
     * @param appIdPlaying - App ID of currently played game
     * @returns Lender Steam ID (or "0" if not borrowed)
     */
    async IsPlayingSharedGame(
        steamId: string,
        appIdPlaying: number
    ): Promise<IsPlayingSharedGameResponse> {
        const res = await this.ax.get("/IsPlayingSharedGame/v1/", {
            params: {
                steamid: steamId,
                appid_playing: appIdPlaying
            }
        });

        return res.data;
    }
}

interface Game {
    appid: number;
    name?: string;
    playtime_2weeks?: number;
    playtime_forever?: number;
    img_icon_url?: string;
    img_logo_url?: string;
    playtime_windows_forever?: number;
    playtime_mac_forever?: number;
    playtime_linux_forever?: number;
}

interface GetRecentlyPlayedGamesResponse {
    response: {
        total_count: number;
        games: Game[];
    };
}

interface GetOwnedGamesResponse {
    response: {
        game_count: number;
        games: Game[];
    };
}

interface GetSteamLevelResponse {
    response: {
        player_level: number;
    };
}

interface GetBadgesResponse {
    response: {
        badges: Array<{
            badgeid: number;
            appid?: number;
            level: number;
            completion_time: number;
            xp: number;
            communityitemid: string;
            border_color: number;
            scarcity: number;
        }>;
        player_xp: number;
        player_level: number;
        player_xp_needed_to_level_up: number;
        player_xp_needed_current_level: number;
    };
}

interface GetCommunityBadgeProgressResponse {
    response: {
        quests: Array<{
            questid: number;
            completed: boolean;
        }>;
    };
}

interface IsPlayingSharedGameResponse {
    response: {
        lender_steamid: number;
    };
}
