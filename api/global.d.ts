// .env Environment variable type declarations.
declare namespace NodeJS {
    interface ProcessEnv {
        /**
         * API server port.
         * Defaults to 9000.
         */
        PORT: string;
        /**
         * API server base URL. Should include port.
         * Defaults to "http://localhost:<port>"
         */
        BASE_URL: string;
        /**
         * Frontend client URL to redirect to after auth success.
         * Defaults to "http://localhost:9001".
         */
        FRONTEND_URL: string;

        /**
         * Private key for signing and verifying JWTs.
         */
        JWT_SECRET: string;

        // API keys
        API_KEY_STEAM: string;
    }
}

declare namespace Express {
    export interface User {
        steamId?: string;
    }
}
