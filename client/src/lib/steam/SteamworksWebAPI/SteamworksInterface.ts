import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 * Represents a Steamworks API (ISteamUser, ISteamApps, etc...). Interface
 * objects are created by the main `SteamworksWebAPI` class, passing config info
 * for authentication.
 */
export default abstract class SteamworksInterface {
    protected ax: AxiosInstance;

    constructor(parentConfig: AxiosRequestConfig) {
        this.ax = axios.create({
            ...parentConfig,
            baseURL: new URL(this.constructor.name, parentConfig.baseURL).href
        });

        this.ax.interceptors.response.use(
            res => res,
            error => Promise.reject(error.message)
        );
    }
}
