export default interface Game {
    appId: number;
    name?: string;
    iconUrl?: string;
    logoUrl?: string;
}

export interface UserGame extends Game {
    playtime: number;
    playtimeRecent: number;
}
