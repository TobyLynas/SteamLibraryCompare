import { writable, type Writable } from "svelte/store";
import type { User as SteamUser } from "./steam";

export interface User {
    steamId: string;
    steamUser?: SteamUser;

    steamUserError: boolean;
}
export type UserStore = Writable<User>;

// Get steam ID from cookie if available
const steamId = document.cookie
    .split(";")
    .find(cookie => cookie.startsWith("steamId="))
    ?.split("=")[1];

export default writable<User>(
    steamId ? { steamId, steamUserError: false } : null
);

export const userContext = Symbol();
