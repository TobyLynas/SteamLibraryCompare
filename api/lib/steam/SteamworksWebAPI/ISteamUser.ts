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
     * @param vanityName - Vanity URL name part to request Steam ID for
     * @param urlType - Type of vanity URL
     * @returns Steam ID (if found)
     */
    async ResolveVanityURL(
        vanityName: string,
        urlType?: number
    ): Promise<ResolveVanityUrlResponse> {
        const res = await this.ax.get("/ResolveVanityURL/v1/", {
            params: {
                vanityurl: vanityName,
                url_type: urlType
            }
        });

        return res.data;
    }
}

export type GetFriendListRelationship = "all" | "friend";

export interface GetFriendListResponse {
    friendslist: {
        friends: Array<{
            steamid: string;
            relationship: GetFriendListRelationship;
            friend_since: number;
        }>;
    };
}

export interface GetPlayerBansResponse {
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

export enum CommunityVisibilityState {
    Private = 1,
    Friends,
    Public
}

export enum PersonaState {
    Offline,
    Online,
    Busy,
    Away,
    Snooze
}

export interface PlayerSummary {
    steamid: string;
    communityvisibilitystate: CommunityVisibilityState;
    profilestate: number;
    personaname: string;
    profileurl: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    avatarhash: string;
    personastate: PersonaState;
    lastlogoff?: number;
    primaryclanid?: string;
    timecreated?: number;
    personastateflags?: number;
    loccountrycode?: string;
    realname?: string;
}

export interface GetPlayerSummariesResponse {
    response: {
        players: PlayerSummary[];
    };
}

export interface GetUserGroupListResponse {
    response: {
        success: boolean;
        groups?: Array<{
            gid: string;
        }>;
    };
}

export interface ResolveVanityUrlResponse {
    response: {
        success: number;
        steamid?: string;
        message?: string;
    };
}
