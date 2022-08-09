import type { AxiosRequestConfig } from "axios";

// APIs
import IPlayerService from "./IPlayerService";
import ISteamUser from "./ISteamUser";

/**
 * Main Steamworks Web API class.
 *
 * @remarks
 *   Provides access to a subset of interfaces, with method prototypes closely
 *   matching API routes: https://partner.steamgames.com/doc/webapi/
 */
export default class SteamworksWebAPI {
    constructor(token?: string) {
        const config: AxiosRequestConfig = {
            baseURL: `${import.meta.env.VITE_API_URL}/proxy/steamworks/`
        };
        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`
            };
        } else {
            config.withCredentials = true;
        }

        this.IPlayerService = new IPlayerService(config);
        this.ISteamUser = new ISteamUser(config);
    }

    IPlayerService: IPlayerService;
    ISteamUser: ISteamUser;
}
