import React from "react";

export interface User {
    token: string;
    steamId: string;
}

export default React.createContext<User | undefined>(undefined);
