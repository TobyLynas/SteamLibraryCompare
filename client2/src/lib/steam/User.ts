import type SteamworksWebAPI from "./SteamworksWebAPI";

import {
    CommunityVisibilityState,
    type PlayerSummary
} from "./SteamworksWebAPI/ISteamUser";
import type { Game as IPlayerServiceGame } from "./SteamworksWebAPI/IPlayerService";

/**
 * User-related Steam API functionality.
 *
 * @remarks
 *   Provides a wrapper around the base `ISteamUser` and `IPlayerService`
 *   Steamworks Web APIs.
 */
export default class User {
    public steamId: string;
    public profileVisibility: CommunityVisibilityState;
    public displayName: string;
    public realName?: string;
    public avatar: {
        hash: string;
        sizes: {
            small: string;
            medium: string;
            large: string;
        };
    };
    public countryCode?: string;
    public primaryGroupId?: string;

    // Timestamps
    public createdAt?: number;
    public lastLoggedOffAt?: number;

    /**
     * Creates a User instance.
     *
     * @param api - Steamworks API instance
     * @param summary - `IPlayerService.GetPlayerSummary` response player object
     */
    public constructor(private api: SteamworksWebAPI, summary: PlayerSummary) {
        // Copy properties from summary
        this.steamId = summary.steamid;
        this.profileVisibility = summary.communityvisibilitystate;
        this.displayName = summary.personaname;

        this.avatar = {
            hash: summary.avatarhash,
            sizes: {
                small: summary.avatar,
                medium: summary.avatarmedium,
                large: summary.avatarfull
            }
        };

        // If the profile is public, set some additional properties
        if (
            summary.communityvisibilitystate === CommunityVisibilityState.Public
        ) {
            if (summary.timecreated) this.createdAt = summary.timecreated;
            if (summary.lastlogoff) this.lastLoggedOffAt = summary.lastlogoff;
            if (summary.realname) this.realName = summary.realname;
            if (summary.loccountrycode)
                this.countryCode = summary.loccountrycode;

            /*
               For users without a primary group, the API returns a Steam ID
               without the account number resulting in a weird-looking ID that
               we can just ignore.
              
               Structure:
                 dec: 103582791429521408
                 hex: 17xxxxx00000000
                      1 = Public account
                       7 = Group/Clan account
                             0... = Account identifier
             */
            if (summary.primaryclanid) {
                // 64-bit IDs are too large for JavaScript Number type
                const numericalId = BigInt(summary.primaryclanid);

                // Set group ID if lower 32 bits do not contain an account number
                if ((numericalId & 0x00000000ffffffffn) !== 0n) {
                    this.primaryGroupId = numericalId.toString();
                }
            }
        }
    }

    /**
     * Fetches user's game list.
     *
     * @param opts - Additional options
     * @returns Array of `SteamGame` objects
     */
    async fetchGames(opts?: FetchGamesOpts): Promise<Array<Game>> {
        const res = await this.api.IPlayerService.GetOwnedGames(
            this.steamId,
            opts?.includeDetails ?? false,
            opts?.includeFreeGames ?? true,
            opts?.appIdsFilter
        );

        // Convert to Game objects.
        return res.response.games.map(mapToGame);
    }

    /**
     * Fetches user's recently played games (last two weeks).
     *
     * @param opts - Additional options
     * @returns Array of {@link Game} objects.
     */
    async fetchRecentGames(opts?: FetchRecentGamesOpts): Promise<Array<Game>> {
        const res = await this.api.IPlayerService.GetRecentlyPlayedGames(
            this.steamId,
            opts?.limit ?? 0
        );

        return res.response.games.map(mapToGame);
    }

    /**
     * Fetches friends list and player summaries and wraps in {@link User}
     * objects.
     *
     * @returns Array of {@link User} objects.
     */
    async fetchFriendsList(): Promise<Array<User>> {
        /*const summariesRes = await this.api.ISteamUser.GetPlayerSummaries(
            (
                await this.api.ISteamUser.GetFriendList(this.steamId)
            ).friendslist.friends.map(friend => friend.steamid)
        );*/

        const summariesRes = {
            response: {
                players: [
                    {
                        steamid: "76561198055038604",
                        communityvisibilitystate: 3,
                        profilestate: 1,
                        personaname: "LizarDio",
                        commentpermission: 1,
                        profileurl:
                            "https://steamcommunity.com/profiles/76561198055038604/",
                        avatar: "https://avatars.akamai.steamstatic.com/a08dfb8d068cee4fed6c543d5a806e242342a460.jpg",
                        avatarmedium:
                            "https://avatars.akamai.steamstatic.com/a08dfb8d068cee4fed6c543d5a806e242342a460_medium.jpg",
                        avatarfull:
                            "https://avatars.akamai.steamstatic.com/a08dfb8d068cee4fed6c543d5a806e242342a460_full.jpg",
                        avatarhash: "a08dfb8d068cee4fed6c543d5a806e242342a460",
                        lastlogoff: 1659132991,
                        personastate: 0,
                        realname: "???",
                        primaryclanid: "103582791429521408",
                        timecreated: 1324566962,
                        personastateflags: 0,
                        loccountrycode: "GB",
                        locstatecode: "E4"
                    },
                    {
                        steamid: "76561198037922029",
                        communityvisibilitystate: 1,
                        profilestate: 1,
                        personaname: "Nat",
                        profileurl:
                            "https://steamcommunity.com/profiles/76561198037922029/",
                        avatar: "https://avatars.akamai.steamstatic.com/c14da99d7afdac7a744a40125d1d18b66bfde4c8.jpg",
                        avatarmedium:
                            "https://avatars.akamai.steamstatic.com/c14da99d7afdac7a744a40125d1d18b66bfde4c8_medium.jpg",
                        avatarfull:
                            "https://avatars.akamai.steamstatic.com/c14da99d7afdac7a744a40125d1d18b66bfde4c8_full.jpg",
                        avatarhash: "c14da99d7afdac7a744a40125d1d18b66bfde4c8",
                        lastlogoff: 1659220994,
                        personastate: 0,
                        personastateflags: 0
                    },
                    {
                        steamid: "76561198081208425",
                        communityvisibilitystate: 3,
                        profilestate: 1,
                        personaname: "Nissjing",
                        commentpermission: 1,
                        profileurl:
                            "https://steamcommunity.com/profiles/76561198081208425/",
                        avatar: "https://avatars.akamai.steamstatic.com/93342004651f96ab156e1db028c1194b198b017f.jpg",
                        avatarmedium:
                            "https://avatars.akamai.steamstatic.com/93342004651f96ab156e1db028c1194b198b017f_medium.jpg",
                        avatarfull:
                            "https://avatars.akamai.steamstatic.com/93342004651f96ab156e1db028c1194b198b017f_full.jpg",
                        avatarhash: "93342004651f96ab156e1db028c1194b198b017f",
                        lastlogoff: 1659184808,
                        personastate: 0,
                        realname: "Toby",
                        primaryclanid: "103582791434293256",
                        timecreated: 1357999901,
                        personastateflags: 0,
                        loccountrycode: "GB",
                        locstatecode: "E4"
                    },
                    {
                        steamid: "76561198272338118",
                        communityvisibilitystate: 3,
                        profilestate: 1,
                        personaname: "jenkinator2k",
                        profileurl:
                            "https://steamcommunity.com/profiles/76561198272338118/",
                        avatar: "https://avatars.akamai.steamstatic.com/5ed1ba657a027783140325d80d9fd787a95cc7fc.jpg",
                        avatarmedium:
                            "https://avatars.akamai.steamstatic.com/5ed1ba657a027783140325d80d9fd787a95cc7fc_medium.jpg",
                        avatarfull:
                            "https://avatars.akamai.steamstatic.com/5ed1ba657a027783140325d80d9fd787a95cc7fc_full.jpg",
                        avatarhash: "5ed1ba657a027783140325d80d9fd787a95cc7fc",
                        lastlogoff: 1655895834,
                        personastate: 0,
                        primaryclanid: "103582791429521408",
                        timecreated: 1451159891,
                        personastateflags: 0,
                        loccountrycode: "GB"
                    },
                    {
                        steamid: "76561198060047432",
                        communityvisibilitystate: 3,
                        profilestate: 1,
                        personaname: "CurledErmine",
                        commentpermission: 2,
                        profileurl:
                            "https://steamcommunity.com/profiles/76561198060047432/",
                        avatar: "https://avatars.akamai.steamstatic.com/1ffb1fd15bdf2290867a338caebd2ca997e1ffab.jpg",
                        avatarmedium:
                            "https://avatars.akamai.steamstatic.com/1ffb1fd15bdf2290867a338caebd2ca997e1ffab_medium.jpg",
                        avatarfull:
                            "https://avatars.akamai.steamstatic.com/1ffb1fd15bdf2290867a338caebd2ca997e1ffab_full.jpg",
                        avatarhash: "1ffb1fd15bdf2290867a338caebd2ca997e1ffab",
                        lastlogoff: 1647462830,
                        personastate: 0,
                        realname: "Jack",
                        primaryclanid: "103582791429521408",
                        timecreated: 1331232734,
                        personastateflags: 0,
                        loccountrycode: "GB",
                        locstatecode: "M4",
                        loccityid: 17192
                    },
                    {
                        steamid: "76561198079918633",
                        communityvisibilitystate: 3,
                        profilestate: 1,
                        personaname: "Privateblue",
                        commentpermission: 1,
                        profileurl:
                            "https://steamcommunity.com/id/Privateblue/",
                        avatar: "https://avatars.akamai.steamstatic.com/74dbf536a03f8538aefd6a93f1f8396e0946843d.jpg",
                        avatarmedium:
                            "https://avatars.akamai.steamstatic.com/74dbf536a03f8538aefd6a93f1f8396e0946843d_medium.jpg",
                        avatarfull:
                            "https://avatars.akamai.steamstatic.com/74dbf536a03f8538aefd6a93f1f8396e0946843d_full.jpg",
                        avatarhash: "74dbf536a03f8538aefd6a93f1f8396e0946843d",
                        lastlogoff: 1659134098,
                        personastate: 0,
                        realname: "Hannah",
                        primaryclanid: "103582791434323324",
                        timecreated: 1356797235,
                        personastateflags: 0,
                        loccountrycode: "GB"
                    }
                ]
            }
        };

        return summariesRes.response.players.map(
            player => new User(this.api, player)
        );
    }
}

/** Options for {@link User.fetchGames}. */
interface FetchGamesOpts {
    /** Include name and icon/logo URLs with game entries. Defaults to `false`. */
    includeDetails?: boolean;
    /** Include game entries for free games (must have been played). Defaults to `true`. */
    includeFreeGames?: boolean;
    /** Array of Steam app IDs to limit response to. */
    appIdsFilter?: number[];
}

/** Options for {@link User.fetchRecentGames}. */
interface FetchRecentGamesOpts {
    /**
     * Number of results to return. Omitting or setting this property to `0`
     * will return all results. Defaults to `0`.
     */
    limit?: number;
}

export interface Game {
    appId: number;
    playtime: number;
    playtimeRecent: number;
    name?: string;
    iconUrl?: string;
    logoUrl?: string;
}

/**
 * Takes an API game object and maps it to Game.
 *
 * @param game - Entry obj returned by `GetOwnedGames`/`GetRecentlyPlayedGames`
 * @returns Game object.
 */
function mapToGame(game: IPlayerServiceGame): Game {
    // Required props
    const ret: Game = {
        appId: game.appid,
        playtime: game.playtime_forever,
        playtimeRecent: game.playtime_2weeks ?? 0
    };

    if (game.name) ret.name = game.name;
    if (game.img_icon_url) ret.iconUrl = game.img_icon_url;
    if (game.img_logo_url) ret.logoUrl = game.img_logo_url;

    return ret;
}
