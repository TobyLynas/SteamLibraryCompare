import { AxiosRequestConfig } from "axios";

// APIs
import IPlayerService from "./IPlayerService";
import ISteamUser from "./ISteamUser";

/**
 * Main Steamworks Web API class.
 * https://partner.steamgames.com/doc/webapi/
 */
export default class SteamworksWebAPI {
    constructor(apiKey: string) {
        const config: AxiosRequestConfig = {
            baseURL: "https://api.steampowered.com/",
            params: { key: apiKey }
        };

        this.IPlayerService = new IPlayerService(config);
        this.ISteamUser = new ISteamUser(config);
    }

    IPlayerService: IPlayerService;
    ISteamUser: ISteamUser;
}
