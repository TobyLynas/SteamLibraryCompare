import { AxiosRequestConfig } from "axios";

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
    constructor(token: string) {
        const config: AxiosRequestConfig = {
            baseURL: `${process.env.REACT_APP_API_URL}/proxy/steamworks/`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        this.IPlayerService = new IPlayerService(config);
        this.ISteamUser = new ISteamUser(config);
    }

    IPlayerService: IPlayerService;
    ISteamUser: ISteamUser;
}
