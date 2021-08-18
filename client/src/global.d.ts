// .env Environment variable type declarations.
declare namespace NodeJS {
    interface ProcessEnv {
        /**
         * API server base URL.
         */
        REACT_APP_API_URL: string;
    }
}
