import SteamworksWebAPI from "./SteamworksWebAPI";

import {
    CommunityVisibilityState,
    PlayerSummary
} from "./SteamworksWebAPI/ISteamUser";
import { Game as IPlayerServiceGame } from "./SteamworksWebAPI/IPlayerService";

import Game from "./Game";

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
    async fetchGames(opts?: FetchGamesOpts): Promise<Array<UserGame>> {
        const res = await this.api.IPlayerService.GetOwnedGames(
            this.steamId,
            opts?.includeDetails ?? false,
            opts?.includeFreeGames ?? true,
            opts?.appIdsFilter
        );

        // Convert to Game objects.
        return res.response.games.map(mapToUserGame);
    }

    /**
     * Fetches user's recently played games (last two weeks).
     *
     * @param opts - Additional options
     * @returns Array of {@link UserGame} objects.
     */
    async fetchRecentGames(
        opts?: FetchRecentGamesOpts
    ): Promise<Array<UserGame>> {
        const res = await this.api.IPlayerService.GetRecentlyPlayedGames(
            this.steamId,
            opts?.limit ?? 0
        );

        return res.response.games.map(mapToUserGame);
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

/**
 * Extended {@link Game} with playtime properties used only with API methods that
 * return user-specific game info.
 */
export interface UserGame extends Game {
    playtime: number;
    playtimeRecent: number;
}

/**
 * Takes an API game object and maps it to UserGame.
 *
 * @param game - Entry obj returned by `GetOwnedGames`/`GetRecentlyPlayedGames`
 * @returns UserGame object.
 */
function mapToUserGame(game: IPlayerServiceGame): UserGame {
    // Required props
    const ret: UserGame = {
        appId: game.appid,
        playtime: game.playtime_forever,
        playtimeRecent: game.playtime_2weeks ?? 0
    };

    if (game.name) ret.name = game.name;
    if (game.img_icon_url) ret.iconUrl = game.img_icon_url;
    if (game.img_logo_url) ret.logoUrl = game.img_logo_url;

    return ret;
}
