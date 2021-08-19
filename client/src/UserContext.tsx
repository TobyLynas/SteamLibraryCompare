import React from "react";

export interface User {
    user?: {
        token: string;
        steamId: string;
    };
}

export default React.createContext<User>({});
