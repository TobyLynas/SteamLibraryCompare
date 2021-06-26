import SteamworksInterface from "./SteamworksInterface";

/**
 * Used to access information and interact with users.
 * https://partner.steamgames.com/doc/webapi/ISteamUser
 */
export default class ISteamUser extends SteamworksInterface {
    /**
     * Fetches the friends list for a given steam ID.
     *
     * @param steamId - Steam ID to request for
     * @param relationship - Filter friend relationship (maybe unused)
     * @returns Friends list object
     */
    async GetFriendList(
        steamId: string,
        relationship?: GetFriendListRelationship
    ): Promise<GetFriendListResponse> {
        const res = await this.ax.get("/GetFriendList/v1/", {
            params: {
                steamid: steamId,
                relationship: relationship
            }
        });

        return res.data;
    }

    /**
     * Fetches a records of player bans for a given set of steam IDs.
     *
     * @param steamIds - Array of Steam IDs to request for
     * @returns Record of players' bans
     */
    async GetPlayerBans(steamIds: string[]): Promise<GetPlayerBansResponse> {
        const res = await this.ax.get("/GetPlayerBans/v1/", {
            params: { steamids: steamIds.join(",") }
        });

        return res.data;
    }

    /**
     * Fetches user profile info for a given set of Steam IDs.
     *
     * @param steamIds - Array of Steam IDs to request for
     * @returns Players' profile info
     */
    async GetPlayerSummaries(
        steamIds: string[]
    ): Promise<GetPlayerSummariesResponse> {
        const res = await this.ax.get("/GetPlayerSummaries/v2/", {
            params: { steamids: steamIds.join(",") }
        });

        return res.data;
    }

    /**
     * Fetches a list of groups containing the given steam ID.
     *
     * @param steamId - Steam ID to request for
     * @returns List of group IDs
     */
    async GetUserGroupList(steamId: string): Promise<GetUserGroupListResponse> {
        const res = await this.ax.get("/GetUserGroupList/v1/", {
            params: { steamids: steamId }
        });

        return res.data;
    }

    /**
     * Fetches the Steam ID of a given vanity URL name.
     *
     * @param vanityUrl - Vanity URL to request Steam ID for
     * @param urlType - Type of vanity URL
     * @returns Steam ID (if found)
     */
    async ResolveVanityURL(
        vanityUrl: string,
        urlType?: number
    ): Promise<ResolveVanityUrlResponse> {
        const res = await this.ax.get("/ResolveVanityURL/v1/", {
            params: {
                vanityurl: vanityUrl,
                url_type: urlType
            }
        });

        return res.data;
    }
}

type GetFriendListRelationship = "all" | "friend";

interface GetFriendListResponse {
    friendslist: {
        friends: Array<{
            steamid: string;
            relationship: GetFriendListRelationship;
            friend_since: number;
        }>;
    };
}

interface GetPlayerBansResponse {
    players: Array<{
        SteamId: string;
        CommunityBanned: boolean;
        VACBanned: boolean;
        NumberOfVACBans: number;
        DaysSinceLastBan: number;
        NumberOfGameBans: number;
        EconomyBan: string;
    }>;
}

interface GetPlayerSummariesResponse {
    response: {
        players: Array<{
            steamid: string;
            communityvisibilitystate: number;
            profilestate: number;
            personaname: string;
            profileurl: string;
            avatar: string;
            avatarmedium: string;
            avatarfull: string;
            avatarhash: string;
            lastlogoff: number;
            personastate: number;
            primaryclanid: string;
            timecreated: number;
            personastateflags: number;
            loccountrycode: string;
        }>;
    };
}

interface GetUserGroupListResponse {
    success: boolean;
    groups: Array<{
        gid: string;
    }>;
}

interface ResolveVanityUrlResponse {
    steamid: string;
    success: number;
}
