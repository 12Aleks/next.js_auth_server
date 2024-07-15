declare namespace NodeJS{
    export interface ProcessEnv{
        DATABASE_URL: string;
        JWT_SECRET_KEY: string;
        REFRESH_SECRET_TOKEN_KEY: string;
    }
}